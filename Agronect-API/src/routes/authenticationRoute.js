import express from "express";
import {
    signinValidate,
    signupValidate,
} from "../validation/authenticationValidate.js";
import { validate } from "../middleware/validate.js";
import dotenv from "dotenv";
import {
    signIn,
    signUp,
    refresh,
    signOut,
} from "../controller/authenticationController.js";
import auth from "../middleware/authentication.js";

dotenv.config();

const router = express.Router();

router.post("/signin", validate(signinValidate), signIn);
router.post("/signup", validate(signupValidate), signUp);
router.post("/signout", auth, signOut);
router.post("/refreshtoken", auth, refresh);

export default router;
