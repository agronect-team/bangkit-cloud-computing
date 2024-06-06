import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const dbPool = mysql.createPool({
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    // socketPath: process.env.DB_SOCKET_PATH,

    host: "127.0.0.1",
    port: 1234,
    user: "bagus",
    password: "baguskeren77",
    database: "capstone-database",
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
