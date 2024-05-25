import {
    getByTokenUserModel,
    updateUserModel,
    changePasswordModel,
    getPasswordUser,
    checkEmailUser,
} from "../models/usersModel.js";
import bcrypt from "bcrypt";

const getByTokenUser = async (req, res) => {
    const user_id = req.user_id;
    try {
        const [data] = await getByTokenUserModel(user_id);
        if (data.length === 0) {
            res.status(404).json({
                status: "failed",
                message: "User not found",
                data: null,
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "Get user success",
                data: data,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message,
            data: null,
        });
    }
};

const updateUser = async (req, res) => {
    const user_id = req.user_id;
    const { body } = req;
    const dates = new Date();
    try {
        const [isRegister] = await checkEmailUser(body, user_id);
        if (isRegister.length !== 0) {
            res.status(400).json({
                status: "failed",
                message: "Email already registered",
                data: null,
            });
        }

        const [data] = await updateUserModel(body, user_id, dates);
        if (data.affectedRows === 0) {
            res.status(404).json({
                status: "failed",
                message: "User not found",
                data: null,
            });
        } else {
            const responseData = { ...req.body };
            delete responseData.password;

            res.status(200).json({
                status: "success",
                message: "Update user success",
                data: data,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message,
            data: null,
        });
    }
};

const changePassword = async (req, res) => {
    const user_id = req.user_id;
    const { body } = req;
    const dates = new Date();
    const hashedPassword = await hashPassword(body.newPassword);
    try {
        const [check] = await getPasswordUser(user_id);
        const isMatch = await bcrypt.compare(
            body.oldPassword,
            check[0].password
        );
        if (!isMatch) {
            return res.status(400).json({
                status: "failed",
                message: "Old password not match",
                data: null,
            });
        } else {
            const [data] = await changePasswordModel(
                user_id,
                hashedPassword,
                dates
            );
            if (data.affectedRows === 0) {
                res.status(404).json({
                    status: "failed",
                    message: "User not found",
                    data: null,
                });
            } else {
                res.status(200).json({
                    status: "success",
                    message: "Change password success",
                    data: data,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message,
            data: null,
        });
    }
};

const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

export { getByTokenUser, updateUser, changePassword };
