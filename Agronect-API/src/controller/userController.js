import {
    updateUserModel,
    getUserByIdModel,
    getAllUsersModel,
    changePasswordModel,
} from "../models/usersModel.js";
import bcrypt from "bcrypt";

import {
    uploadProfilePhotoToGCS,
    deleteFileFromGCS,
} from "../middleware/upload.js";

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
    const file = req.file; // Assuming file is uploaded in the same request

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

        const user = rows[0];
        const oldPhotoUrl = user.photoProfileUrl;
        let newPhotoUrl = oldPhotoUrl;

        // If there's a new profile photo, upload it and delete the old one
        if (file) {
            newPhotoUrl = await uploadProfilePhotoToGCS(file);
            // Delete the old photo if it exists
            if (oldPhotoUrl) {
                const deleteResult = await deleteFileFromGCS(oldPhotoUrl);
                if (deleteResult.status === "failed") {
                    console.error(deleteResult.message); // Log the error for debugging
                }
            }
        }

        // Update user data
        const updates = {};
        if (name) {
            updates.name = name;
        }
        if (email) {
            updates.email = email;
        }
        if (newPhotoUrl) {
            updates.photoProfileUrl = newPhotoUrl;
        }

        const result = await updateUserModel(userId, updates);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: "failed",
                message: "User not found or no update performed",
                dataUpdate: null,
            });
        }

        // Return updated user data
        const updatedUserRows = await getUserByIdModel(userId);
        const updatedUser = updatedUserRows[0];

        // Extract only the required fields
        const responseData = {
            user_id: updatedUser.user_id,
            name: updatedUser.name,
            email: updatedUser.email,
            photoProfileUrl: updatedUser.photoProfileUrl,
        };

        res.status(200).json({
            status: "success",
            message: "User updated successfully",
            dataUpdate: responseData,
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message,
            dataUpdate: null,
        });
    }
};


export { updateUser, getUserById, getAllUsers, changePassword };
