import {
    updateUserModel,
    getUserByIdModel,
    getAllUsersModel,
} from "../models/usersModel.js";
import bcrypt from "bcrypt";

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

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    try {
        const result = await updateUserModel(userId, name, email);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: "failed",
                message: "User not found or no update performed",
                data: null,
            });
        }

        res.status(200).json({
            status: "success",
            message: "User updated successfully",
            data: {
                user_id: userId,
                name,
                email,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message,
            data: null,
        });
    }
};

export { updateUser, getUserById, getAllUsers };
