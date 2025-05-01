import dotenv from "dotenv";
import express from "express";
import db from "./database/configdb.js";
import user from "./models/User.js";

const app = express();
dotenv.config();

db.connect();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });

