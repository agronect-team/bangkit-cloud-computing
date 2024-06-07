import express from "express";
import predictionPlant from "../controller/predictController.js";
import upload from "../validation/predictValidate.js";
import auth from "../middleware/authentication.js";

const router = express.Router();

router.post("/prediction/potato", auth, upload.single("file"), (req, res) => {
    predictionPlant(req, res, "potato");
});

export default router;
