import dbPool from "../config/connection.js";

// get history

const getHistoryByIdModel = async (id) => {
    try {
        const [rows] = await dbPool.execute(
            "SELECT * FROM predictions WHERE id = ? ORDER BY created_at DESC",
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
            "SELECT * FROM predictions WHERE user_id = ? ORDER BY created_at DESC",
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
            "DELETE FROM predictions WHERE id = ?",
            [id]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

export { getHistoryByIdModel, getAllHistoryByUserIdModel, deleteHistoryModel };
