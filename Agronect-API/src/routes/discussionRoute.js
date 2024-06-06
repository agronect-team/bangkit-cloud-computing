import express from "express";
import { discussionValidate } from "../validation/discussionValidate.js";
import { validate } from "../middleware/validate.js";
import auth from "../middleware/authentication.js";
import {
    postSharing,
    getAllSharing,
    getSharingById,
    updateSharing,
    deleteSharing,
} from "../controller/discussionController.js";
const router = express.Router();

router.get("/sharing", getAllSharing);
router.get("/sharing/:id", auth, getSharingById, getAllSharing);
router.post("/sharing", auth, validate(discussionValidate), postSharing);
router.put("/sharing/:id", auth, validate(discussionValidate), updateSharing);
router.delete("/sharing/:id", auth, deleteSharing);

export default router;
