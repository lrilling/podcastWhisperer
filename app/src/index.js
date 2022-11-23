import express from "express";
import SQLiteConnector from "./services/dbConnector";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    console.log("root accessed");
});

app.listen(port, () => {
    console.log("Listening on port ", port);
});