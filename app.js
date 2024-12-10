import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import adminAPi from "./backend/routes/apis/adminApis.js";
import ownerApi from "./backend/routes/apis/ownerApis.js";
import ownerView from "./backend/routes/views/owner/ownerViews.js";
import { ConnetToSQLServer } from "./backend/database.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

dotenv.config();

app.use("/admin/api", adminAPi);
//app.use("/admin/page", adminView);

app.use("/owner/api", ownerApi);
app.use("/owner/page", ownerView);

app.use("/", (req, res) => {
    res.render("index");
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
    ConnetToSQLServer();
});
