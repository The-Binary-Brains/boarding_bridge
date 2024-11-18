import express from "express";
import dotenv from "dotenv";
import adminRouter from "./routes/admin.js";
import ownerRouter from "./routes/owner.js";
import { ConnetToSQLServer } from "./database.js";

const app = express();
app.use(express.json());

dotenv.config();

app.use("/api/admin", adminRouter);
app.use("/api/owner", ownerRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
    ConnetToSQLServer();
});
