import dbPool from "../config/connection.js";

const checkedEmailRegister = async (email) => {
    const SQLQuery = `SELECT * FROM user WHERE email = ?`;
    const [rows] = await dbPool.execute(SQLQuery, [email]);
    if (rows.length > 0) {
        return rows[0];
    } else {
        return false;
    }
};

const signupAuthModel = (body, user_id, dates, hashedPassword) => {
    const SQLQuery = `INSERT INTO user (name, email, password, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
        body.name,
        body.email,
        hashedPassword,
        user_id,
        dates,
        dates,
    ];
    return dbPool.execute(SQLQuery, values);
};

const signinAuthModel = (body) => {
    const SQLQuery = `SELECT * FROM user WHERE email = ?`;
    const values = [body.email];
    return dbPool.execute(SQLQuery, values);
};

const signoutAuthModel = (token) => {
    const SQLQuery = "INSERT INTO blacklist (token) VALUES (?)";
    const values = [token];
    return dbPool.execute(SQLQuery, values);
};

const signoutCheck = (token) => {
    const SQLQuery = "SELECT * FROM blacklist WHERE token = ?";
    const values = [token];
    return dbPool.execute(SQLQuery, values);
};

export {
    checkedEmailRegister,
    signupAuthModel,
    signinAuthModel,
    signoutAuthModel,
    signoutCheck,
};
