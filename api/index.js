import dotenv from "dotenv";
import express from "express";
import db from "./database/configdb.js";
import User from "./models/User.js";
import userRoute from "./routes/user.route.js";
import exampleRoute from "./routes/example.route.js";
dotenv.config();   
db.connect();

const app = express();

app.use(express.json());

app.use("/users", userRoute);
app.use("/securedExampleRoute", exampleRoute);
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });

