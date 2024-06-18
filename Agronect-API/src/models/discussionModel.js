import dbPool from "../config/connection.js";
import { nanoid } from "nanoid";

const postSharingModel = async (sharing_id, content, userId, name, imgUrl) => {
    const query = `
        INSERT INTO sharing (sharing_id, content, user_id, name, imgUrl)
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [sharing_id, content, userId, name, imgUrl];

    try {
        const [rows] = await dbPool.execute(query, values);
        return rows;
    } catch (error) {
        throw error;
    }
};

const getAllSharingModel = async (offset, limit) => {
    try {
        const [rows] = await dbPool.query(
            "SELECT * FROM sharing ORDER BY created_at DESC LIMIT ?, ?",
            [offset, limit]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

const getTotalSharingCount = async () => {
    try {
        const [rows] = await dbPool.query(
            "SELECT COUNT(*) as count FROM sharing"
        );
        return rows[0].count;
    } catch (error) {
        throw error;
    }
};

const getSharingByIdModel = async (sharing_id) => {
    try {
        const [rows] = await dbPool.execute(
            "SELECT * FROM sharing WHERE sharing_id = ?",
            [sharing_id]
        );
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw error;
    }
};

const getSharingByUserIdModel = async (user_id) => {
    try {
        const [rows] = await dbPool.execute(
            "SELECT * FROM sharing WHERE user_id = ? ORDER BY created_at DESC",
            [user_id]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

const updateSharingModel = async (sharing_id, content, imgUrl) => {
    const query = `
        UPDATE sharing
        SET content = ?, imgUrl = ?
        WHERE sharing_id = ?
    `;
    const values = [content, imgUrl, sharing_id];

    try {
        const [result] = await dbPool.execute(query, values);
        return result;
    } catch (error) {
        throw error;
    }
};

const deleteSharingModel = async (sharing_id) => {
    const query = `
        DELETE FROM sharing
        WHERE sharing_id = ?
    `;

    try {
        const [result] = await dbPool.execute(query, [sharing_id]);
        return result;
    } catch (error) {
        throw error;
    }
};

export {
    postSharingModel,
    getAllSharingModel,
    getSharingByIdModel,
    updateSharingModel,
    deleteSharingModel,
    getTotalSharingCount,
    getSharingByUserIdModel, // Add this export
};
