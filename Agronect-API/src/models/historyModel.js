import dbPool from "../config/connection.js";

// get history
const getAllHistory = async () => {
    try {
        const [rows] = await dbPool.execute(
            "SELECT id_pred, prediction, confidence, description, solution, user_id FROM predictions ORDER BY created_at DESC"
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

const getHistoryByIdModel = async (id) => {
    try {
        const [rows] = await dbPool.execute(
            "SELECT id_pred, prediction, confidence, description, solution, user_id FROM predictions WHERE id_pred = ? ORDER BY created_at DESC",
            [id]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

const getAllHistoryByUserIdModel = async (user_id) => {
    try {
        const [rows] = await dbPool.execute(
            "SELECT id_pred, prediction, confidence, description, solution, user_id FROM predictions WHERE user_id = ? ORDER BY created_at DESC",
            [user_id]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

const deleteHistoryModel = async (id) => {
    try {
        const [rows] = await dbPool.execute(
            "DELETE FROM predictions WHERE id_pred = ?",
            [id]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

export {
    getHistoryByIdModel,
    getAllHistoryByUserIdModel,
    deleteHistoryModel,
    getAllHistory,
};
