import express from "express";
import { discussionValidate } from "../validation/discussionValidate.js";
import { validate } from "../middleware/validate.js";
import auth from "../middleware/authentication.js";
import verifyOwnership from "../middleware/verify.js";
import {
    postSharing,
    getAllSharing,
    getSharingById,
    updateSharing,
    deleteSharing,
    getSharingByUserId, // Add this import
} from "../controller/discussionController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/sharing", auth, getAllSharing);
router.get("/sharing/:sharing_id", auth, getSharingById);
router.get("/sharing/users/:user_id", auth, getSharingByUserId); // Add this route
router.post("/sharing", auth, upload.single("imgUrl"), postSharing);
router.put(
    "/sharing/:sharing_id",
    auth,
    verifyOwnership,
    validate(discussionValidate),
    updateSharing
);
router.delete("/sharing/:sharing_id", auth, verifyOwnership, deleteSharing);

export default router;
