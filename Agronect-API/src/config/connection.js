import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

let dbConfig;

if (process.env.NODE_ENV === "production") {
    dbConfig = {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        socketPath: process.env.DB_SOCKET_PATH,
    };
} else {
    dbConfig = {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 1234,
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "baguskeren77",
        database: process.env.DB_NAME || "database-testing",
    };
}

const dbPool = mysql.createPool(dbConfig);

dbPool.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to database:", err);
        return;
    }
    console.log("Connected to database");
    connection.release();
});

export default dbPool.promise();
