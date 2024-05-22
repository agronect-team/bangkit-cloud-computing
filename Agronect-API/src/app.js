import express from "express";
import router from "./routes/routes.js";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const host = "localhost";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(router);
app.use(fileUpload());

app.get("/", (req, res) => {
    res.send("Welcome to Agronect API");
});

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});
