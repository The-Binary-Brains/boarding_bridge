import express from "express";
import dotenv from "dotenv";
import cors from "cors" ;
import path from "path";
import adminRouter from "./backend/routes/admin.js";
import ownerRouter from "./backend/routes/owner.js";
import { ConnetToSQLServer } from "./backend/database.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/api/admin", adminRouter);
app.use("/api/owner", ownerRouter);
app.get('/dashboard', (req, res) => {
    res.status(200).render(path.join(__dirname, 'components', 'dashboard.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
    ConnetToSQLServer();
});
