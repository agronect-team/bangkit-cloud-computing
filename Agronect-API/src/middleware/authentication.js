import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { signoutCheck } from "../models/authenticationModels.js";

dotenv.config();

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"] || req.headers["Authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.error("Authorization header missing or incorrect format");
            return res.status(401).json({ message: "Harap autentikasi terlebih dahulu" });
        }

        const token = authHeader.split(" ")[1];
        const [check] = await signoutCheck(token);

        if (check && check.length > 0) {
            console.error("Token is blacklisted");
            return res.status(400).json({
                code: 400,
                status: "BAD REQUEST",
                message: "Token Anda telah kedaluwarsa. Silakan coba lagi",
                data: null,
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // menambahkan userId ke req
        req.email = decoded.email;
        req.name = decoded.name;
        next();
    } catch (err) {
        console.error("Kesalahan verifikasi token:", err);
        return res.status(403).json({ message: "Token tidak valid atau kedaluwarsa" });
    }
};

export default auth;
