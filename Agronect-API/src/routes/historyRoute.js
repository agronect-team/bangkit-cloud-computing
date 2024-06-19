import express from "express";
import auth from "../middleware/authentication.js";

// memanggil controller history
import {
    getHistoryById,
    getHistoryByUserId,
    deleteHistory,
    getAllHistorys,
} from "../controller/historyController.js";
const router = express.Router();

// ENDPOINT API

// GET DATA
router.get("/history", auth, getAllHistorys);

// GET DATA by id

router.get("/history/:user_id", auth, getHistoryByUserId);

router.get("/history/users/:id_pred", auth, getHistoryById);
// Delete DATA
router.delete("/history/users/:id_pred", auth, deleteHistory);

export default router;
