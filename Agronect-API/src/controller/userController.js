import {
    updateUserModel,
    getUserByIdModel,
    getAllUsersModel,
    changePasswordModel,
} from "../models/usersModel.js";
import bcrypt from "bcrypt";

import { uploadProfilePhotoToGCS } from "../middleware/upload.js";

const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const rows = await getUserByIdModel(userId);

        if (rows.length === 0) {
            return res.status(404).json({
                status: "failed",
                message: "User not found",
                data: null,
            });
        }

        const user = rows[0];
        delete user.password;

        res.status(200).json({
            status: "success",
            message: "User found",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message,
            data: null,
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const rows = await getAllUsersModel();

        res.status(200).json({
            status: "success",
            message: "Users found",
            data: rows,
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message,
            data: null,
        });
    }
};

const changePassword = async (req, res) => {
    const userId = req.params.id;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    try {
        const rows = await getUserByIdModel(userId);

        if (rows.length === 0) {
            return res.status(404).json({
                status: "failed",
                message: "User not found",
            });
        }

        const user = rows[0];

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                status: "failed",
                message: "Old password is incorrect",
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                status: "failed",
                message: "New password and confirm password do not match",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const result = await changePasswordModel(userId, hashedPassword);

        res.status(200).json({
            status: "success",
            message: "Password updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    try {
        const result = await updateUserModel(userId, name, email);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: "failed",
                message: "User not found or no update performed",
                dataUpdate: null,
            });
        }

        res.status(200).json({
            status: "success",
            message: "User updated successfully",
            dataUpdate: {
                user_id: userId,
                name,
                email,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message,
            dataUpdate: null,
        });
    }
};

const uploadProfilePhoto = async (req, res) => {
    const userId = req.params.id;

    try {
        // Check if user exists
        const rows = await getUserByIdModel(userId);
        if (rows.length === 0) {
            return res.status(404).json({
                status: "failed",
                message: "User not found",
                data: null,
            });
        }

        // Upload the image to Google Cloud Storage
        const file = req.file;
        const publicUrl = await uploadProfilePhotoToGCS(file);

        // Update user profile photo URL in the database
        const updates = { photoProfileUrl: publicUrl };
        await updateUserModel(userId, updates);

        res.status(200).json({
            status: "success",
            message: "Profile photo uploaded successfully",
            dataUploadProfile: { photoProfileUrl: publicUrl },
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message,
            data: null,
        });
    }
};

export {
    updateUser,
    getUserById,
    getAllUsers,
    changePassword,
    uploadProfilePhoto,
};
