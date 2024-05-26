import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const dbPool = mysql.createPool({
    host: "34.101.167.118",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    socketPath: process.env.DB_SOCKET_PATH,
});

dbPool.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to database:", err);
        return;
    }
    console.log("Connected to database");
    connection.release();
});

export default dbPool.promise();
