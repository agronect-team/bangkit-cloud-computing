import dbPool from "../config/connection.js";
import { nanoid } from "nanoid";

// const postSharingModel = (sharing_id, body, userId, name, imgUrl) => {
//     const SQLQuery = `
//         INSERT INTO sharing (sharing_id, user_id, name, content, imgUrl)
//         VALUES (?, ?, ?, ?, ?)
//     `;
//     const values = [
//         sharing_id,
//         userId,
//         name,
//         body.content,
//         body.imgUrl || null,
//     ];
//     return dbPool.execute(SQLQuery, values);
// };

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

// const getAllSharingModel = () => {
//     const SQLQuery = "SELECT * FROM sharing";
//     return dbPool.query(SQLQuery);
// };
const getAllSharingModel = async (offset, limit) => {
    const [rows] = await dbPool.query(
        "SELECT * FROM sharing ORDER BY created_at DESC LIMIT ?, ?",
        [offset, limit]
    );
    return rows;
};

// Assuming you have a function to get the total count of sharing
const getTotalSharingCount = async () => {
    const [rows] = await dbPool.query("SELECT COUNT(*) as count FROM sharing");
    return rows[0].count;
};
const getSharingByIdModel = async (sharing_id) => {
    const [rows, fields] = await dbPool.execute(
        "SELECT * FROM sharing WHERE sharing_id = ?",
        [sharing_id]
    );

    return rows.length > 0 ? rows[0] : null;
};

const updateSharingModel = async (sharing_id, content, imgUrl) => {
    const SQLQuery = `
        UPDATE sharing
        SET content = ?, ImgUrl = ?
        WHERE sharing_id = ?
    `;
    const values = [content, imgUrl, sharing_id];
    return dbPool.execute(SQLQuery, values);
};

const deleteSharingModel = async (sharing_id) => {
    const SQLQuery = `
        DELETE FROM sharing
        WHERE sharing_id = ?
    `;
    return dbPool.execute(SQLQuery, [sharing_id]);
};

export {
    postSharingModel,
    getAllSharingModel,
    getSharingByIdModel,
    updateSharingModel,
    deleteSharingModel,
    getTotalSharingCount,
};
