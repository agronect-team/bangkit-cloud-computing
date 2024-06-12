import dbPool from "../config/connection.js";

const getUserByIdModel = async (userId) => {
    const SQLQuery = "SELECT * FROM user WHERE user_id = ?";
    const [rows] = await dbPool.execute(SQLQuery, [userId]);
    return rows;
};

const getAllUsersModel = async () => {
    const SQLQuery = "SELECT user_id, name, email FROM user";
    const [rows] = await dbPool.execute(SQLQuery);
    return rows;
};

const changePasswordModel = async (userId, hashedPassword) => {
    const SQLQuery = "UPDATE user SET password = ? WHERE user_id = ?";
    const [result] = await dbPool.execute(SQLQuery, [hashedPassword, userId]);
    return result;
};

const updateUserModel = async (userId, updates) => {
    const fields = Object.keys(updates)
        .map((key) => `${key} = ?`)
        .join(", ");
    const values = [...Object.values(updates), userId];
    const SQLQuery = `UPDATE user SET ${fields} WHERE user_id = ?`;

    const [result] = await dbPool.execute(SQLQuery, values);
    return result;
};

export {
    updateUserModel,
    getAllUsersModel,
    getUserByIdModel,
    changePasswordModel,
};
