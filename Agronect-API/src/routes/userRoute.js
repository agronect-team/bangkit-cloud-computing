import express from "express";
import {
    passwordValidate,
    userValidate,
} from "../validation/authenticationValidate.js";
import { validate } from "../middleware/validate.js";
import auth from "../middleware/authentication.js";

import {
    updateUser,
    getUserById,
    getAllUsers,
    changePassword,
} from "../controller/userController.js";

const router = express.Router();

router.get("/users/:id", auth, getUserById);
router.get("/users/", auth, getAllUsers);

router.put("/users/:id", auth, validate(userValidate), updateUser);
router.put("/users/change-password/:id", auth, validate(passwordValidate), changePassword);

export default router;
