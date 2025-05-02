import dotenv from "dotenv";
import express from "express";
import db from "./database/configdb.js";
import userRoute from "./routes/user.route.js";

dotenv.config();   
db.connect();

const app = express();

app.use(express.json());

app.use("/", userRoute);
app.use("/SecuredRoute", userRoute);
app.use("/users", userRoute);

app.get("/", (req, res) => {
    res.send("EXPRESS BACKEND COM MONGODB");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

