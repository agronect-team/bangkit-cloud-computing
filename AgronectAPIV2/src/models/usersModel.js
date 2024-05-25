import dbPool from "../config/connection.js";

const getByTokenUserModel = (user_id) => {
    const SQLQuery = `SELECT * FROM users WHERE user_id = ?`;
    const values = [user_id];
    return dbPool.execute(SQLQuery, values);
};

const checkEmailUser = (body, user_id) => {
    const SQLQuery = `SELECT * FROM users WHERE email = ? AND user_id != ?`;
    const values = [body.email, user_id];
    return dbPool.execute(SQLQuery, values);
};

const getPasswordUser = (user_id) => {
    const SQLQuery = `SELECT password FROM users WHERE user_id = ?`;
    const values = [user_id];
    return dbPool.execute(SQLQuery, values);
};

const updateUserModel = (body, user_id, dates) => {
    const SQLQuery = `UPDATE users SET name = ?, email = ?, updated_at = ? WHERE user_id = ?`;
    const values = [body.name, body.email, dates, user_id];
    return dbPool.execute(SQLQuery, values);
};

const changePasswordModel = (user_id, hashedPassword, dates) => {
    const SQLQuery = `UPDATE users SET password = ?, updated_at = ? WHERE user_id = ?`;
    const values = [hashedPassword, dates, user_id];
    return dbPool.execute(SQLQuery, values);
};

export {
    getByTokenUserModel,
    checkEmailUser,
    getPasswordUser,
    updateUserModel,
    changePasswordModel,
};
