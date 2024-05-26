import express from "express";
import dotenv from "dotenv";
import logs from "./middleware/logs.js";

import userRoute from "./routes/userRoute.js";
import authenticationRoute from "./routes/authenticationRoute.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logs);

app.get("/", (req, res) => {
    res.send("Hello this is Agronect Web Services");
});

app.use(userRoute);
app.use(authenticationRoute);

app.use((req, res, next) => {
    next(createError.NotFound("Tidak Ditemukan"));
});

//handling error
app.use((err, req, res, next) => {
    const { status = 500, message } = err;
    res.status(status).json({ error: { status, message } });
});

//port
const port = process.env.PORT || 5000;
app.listen(`${port}`, () => {
    console.log(`Server running on port ${port}`);
});
