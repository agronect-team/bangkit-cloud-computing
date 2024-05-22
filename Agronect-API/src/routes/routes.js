import express from "express";
import multer from "multer";
import {
    login,
    register,
    logout,
    resetPassword,
    uploadProfilePicture,
    uploadProfilePictureById,
    getUsers,
    getUserUid,
} from "../handler/users.js";

const router = express.Router();
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

// routes for users
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/reset-password", resetPassword);
router.get("/users", getUsers);
router.get("/users/:uid", getUserUid);
router.post(
    "/upload-profile-picture",
    upload.single("image"),
    uploadProfilePicture
);
router.post(
    "/upload-profile-picture/:uid",
    upload.single("image"),
    uploadProfilePictureById
);

//routes for chatting/article/feedback

export default router;
