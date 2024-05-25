import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const dbPool = mysql.createPool({
    host: "127.0.0.1",
    port: 1234,
    user: "bagus",
    password: "baguskeren77",
    database: "agronect_database",
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
