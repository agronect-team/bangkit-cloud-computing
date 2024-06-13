import express from "express";
import {
    passwordValidate,
    userValidate,
} from "../validation/authenticationValidate.js";
import { validate } from "../middleware/validate.js";
import { upload } from "../middleware/upload.js";

import auth from "../middleware/authentication.js";

import {
    updateUser,
    getUserById,
    getAllUsers,
    changePassword,
} from "../controller/userController.js";

const router = express.Router();

router.get("/users/:id", getUserById);
router.get("/users/", getAllUsers);

router.put(
    "/users/update-users/:id",
    auth,
    upload.single("imgUrl"),
    updateUser
);
router.put(
    "/users/change-password/:id",
    auth,
    validate(passwordValidate),
    changePassword
);

export default router;
