import {
    getAllHistoryByUserIdModel,
    getHistoryByIdModel,
    deleteHistoryModel,
    getAllHistory,
} from "../models/historyModel.js";

const getAllHistorys = async (req, res) => {
    try {
        const rows = await getAllHistory();
        if (!rows || rows.length === 0) {
            return res.status(404).json({
                status: "failed",
                message: "No history found",
                dataHistory: null,
            });
        }
        res.status(200).json({
            status: "success",
            message: "History found",
            dataHistory: rows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "failed",
            message: "Internal server error",
        });
    }
};

const getHistoryByUserId = async (req, res) => {
    try {
        const { user_id } = req.params;
        const rows = await getAllHistoryByUserIdModel(user_id);
        if (!rows || rows.length === 0) {
            return res.status(404).json({
                status: "failed",
                message: "No history found for this user",
                dataHistoryUser: null,
            });
        }
        res.status(200).json({
            status: "success",
            message: "History found",
            dataHistoryUser: rows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "failed",
            message: "Internal server error",
            dataHistoryUser: null,
        });
    }
};

const getHistoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const history = await getHistoryByIdModel(id);
        if (!history) {
            return res.status(404).json({
                status: "failed",
                message: "History not found",
                dataHistoryById: null,
            });
        }
        res.status(200).json({
            status: "success",
            message: "History found",
            dataHistoryById: history,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "failed",
            message: "Internal server error",
            dataHistoryById: null,
        });
    }
};

const deleteHistory = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteHistoryModel(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: "failed",
                message: "History not found or no delete performed",
                dataDelete: null,
            });
        }
        res.status(200).json({
            status: "success",
            message: "History deleted successfully",
            dataDelete: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "failed",
            message: "Internal server error",
            dataDelete: null,
        });
    }
};

export { getHistoryByUserId, getHistoryById, deleteHistory, getAllHistorys };
