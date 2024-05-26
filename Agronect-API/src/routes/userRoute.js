import express from "express";
import {
    userValidate,
    passwordValidate,
} from "../validation/authenticationValidate.js";
import { validate } from "../middleware/validate.js";
import auth from "../middleware/authentication.js";

import {
    getByTokenUser,
    updateUser,
    changePassword,
} from "../controller/userController.js";

const router = express.Router();

router.get("/user", auth, getByTokenUser);
router.put("/user", auth, validate(userValidate), updateUser);
router.put(
    "/user/change-password",
    auth,
    validate(passwordValidate),
    changePassword
);

export default router;
