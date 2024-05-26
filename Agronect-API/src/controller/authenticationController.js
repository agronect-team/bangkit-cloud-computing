import {
    signupAuthModel,
    checkedEmailRegister,
    signinAuthModel,
    signoutAuthModel,
} from "../models/authenticationModels.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const signUp = async (req, res) => {
    const { body } = req;
    const user_id = nanoid(12);
    const dates = new Date();
    try {
        const isEmailRegistered = await checkedEmailRegister(body.email);
        if (isEmailRegistered) {
            return res.status(400).json({
                status: "failed",
                message: "Email already registered",
                data: null,
            });
        }
        const hashedPassword = await hashPassword(body.password);
        const [data] = await signupAuthModel(
            body,
            user_id,
            dates,
            hashedPassword
        );

        const responseData = { ...body };
        delete responseData.password;

        res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: responseData,
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message,
            data: null,
        });
    }
};

const hashPassword = async (password) => {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

const signIn = async (req, res) => {
    const { body } = req;
    try {
        const [user] = await signinAuthModel(body);
        if (user.length === 0) {
            return res.status(400).json({
                status: "failed",
                message: "Email not registered",
                data: null,
            });
        }

        const isMatch = await bcrypt.compare(body.password, user[0].password);
        if (!isMatch) {
            return res.status(400).json({
                status: "failed",
                message: "Password not match",
                data: null,
            });
        } else {
            const loguser = { id: user[0].user_id, email: user[0].email };
            const accessToken = jwt.sign(loguser, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });

            const refreshToken = jwt.sign(
                loguser,
                process.env.REFRESH_TOKEN_SECRET
            );
            const responseData = {
                status: "success",
                user_id: user[0].user_id,
                name: user[0].name,
                email: user[0].email,
                access_token: accessToken,
                message: "Login success",
            };
            res.json(responseData);
        }
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message,
            data: null,
        });
    }
};

const refresh = async (req, res) => {
    const refreshToken = req.body.refresh_token;
    if (!refreshToken) {
        return res.status(400).json({
            status: "failed",
            message: "Refresh token not found",
        });
    }
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    status: "failed",
                    message: "Refresh token not valid",
                });
            }
            const user = { id: decoded.id, email: decoded.email };
            console.log(user);

            const accessToken = jwt.sign(decoded, process.env.JWT_SECRET, {
                expiresIn: "1000d",
            });
            res.json({
                status: "success",
                data: { accessToken },
            });
        }
    );
};

//authenticationController.js
const signOut = async (req, res) => {
    try {
        const authHeader =
            req.headers["authorization"] || req.headers["Authorization"];
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];
            await signoutAuthModel(token); // No need to destructure the result
            res.status(200).json({
                status: "success",
                message: "Signout success",
                data: null,
            });
        } else {
            return res.status(422).json({
                status: "failed",
                message: "Token is expired or not found",
                data: null,
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

export { signUp, signIn, refresh, signOut };
