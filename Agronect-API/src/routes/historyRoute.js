import express from "express";
import auth from "../middleware/authentication.js";

// memanggil controller history
import {
    getHistoryById,
    getHistoryByUserId,
    deleteHistory,
} from "../controller/historyController.js";
const router = express.Router();

// ENDPOINT API

// GET DATA
router.get("/history", auth, getHistoryByUserId);

// GET DATA by id
router.get("/history/:id", auth, getHistoryById);

// Delete DATA
router.delete("/history/:id", auth, deleteHistory);

export default router;
