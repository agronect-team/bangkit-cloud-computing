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
    try {
        const [rows] = await dbPool.query(
            `SELECT * FROM sharing ORDER BY created_at DESC LIMIT ?, ?`,
            [offset, limit]
        );
        const [[{ totalItems }]] = await dbPool.query(
            `SELECT COUNT(*) as totalItems FROM sharing`
        );
        return { rows, totalItems };
    } catch (error) {
        throw error;
    }
};

const getSharingByIdModel = async (sharing_id) => {
    const SQLQuery = `
        SELECT sharing_id, user_id, name, content, ImgUrl
        FROM sharing
        WHERE sharing_id = ?
    `;
    const [rows] = await dbPool.execute(SQLQuery, [sharing_id]);
    return rows;
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
};
