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

const updateUserModel = async (userId, name, email) => {
    const SQLQuery = "UPDATE user SET name = ?, email = ? WHERE user_id = ?";
    const [result] = await dbPool.execute(SQLQuery, [name, email, userId]);
    return result;
};



export {
    updateUserModel,
    getAllUsersModel,
    getUserByIdModel,
};
