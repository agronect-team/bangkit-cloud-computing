import dbPool from "../config/connection.js";
import { nanoid } from "nanoid";

const postSharingModel = (body, userId, name, imgUrl) => {
    const sharing_id = "sharing-" + nanoid(4); // Generate a unique ID
    const SQLQuery = `
        INSERT INTO sharing (sharing_id, user_id, name, content, imgUrl)
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
        sharing_id,
        userId,
        name,
        body.content,
        body.imgUrl || null,
    ];
    return dbPool.execute(SQLQuery, values);
};

const getAllSharingModel = () => {
    const SQLQuery = `
        SELECT s.sharing_id, s.content, s.imgUrl, s.created_at, s.updated_at, u.name, u.user_id
        FROM sharing s
        INNER JOIN user u ON s.user_id = u.user_id
        ORDER BY s.created_at DESC
    `;
    return dbPool.query(SQLQuery);
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

export { postSharingModel, getAllSharingModel,getSharingByIdModel,updateSharingModel,deleteSharingModel, };
