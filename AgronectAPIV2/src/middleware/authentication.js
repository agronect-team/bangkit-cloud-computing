import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { signoutCheck } from "../models/authenticationModels.js";

dotenv.config();

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader) {
            return res.status(401).json({
                message: "Please authenticate first",
            });
        }

        const token = authHeader.split(" ")[1];
        const [check] = await signoutCheck(token);
        if (check && check.length > 0) {
            return res.status(400).json({
                status: "failed",
                message: "Please authenticate first",
                data: null,
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.email = decoded.email;
        next();
    } catch (err) {
        console.error("Kesalahan verifikasi token : ", err);
        return res.status(403).json({
            status: "failed",
            message: "Token not valid",
        });
    }
};

export default auth;
