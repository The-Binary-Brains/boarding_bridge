import express from "express";
import { GetAdmin, GetAdmins, RegisterAdmin } from "../../database.js";
import { VerifyTokenAndAdmin } from "../../verifyToken.js";

import dotnet from "dotenv";
dotnet.config();

import jwt from "jsonwebtoken";

const adminApi = express.Router();

adminApi.get("/alladmins", VerifyTokenAndAdmin, async (req, res) => {
    try {
        const admins = await GetAdmins();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json(`error fetching admins: ${error}`);
    }
});

adminApi.post("/register", VerifyTokenAndAdmin, async (req, res) => {
    const id = req.body.staffId;

    try {
        const status = await RegisterAdmin(id);
        res.status(200).json(status);
    } catch (error) {
        res.status(500).json(`error fetching admins: ${error}`);
    }
});
/*
adminApi.post("/login", async (req, res) => {
    const { staffId, password } = req.body;

    try {
        const result = await GetAdmin(staffId);

        if (result && result.password === password) {
            const payload = {
                id: result.staffId,
                role: "admin",
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
                expiresIn: "1d",
            });

            res.status(200).json({
                message: "Login Success",
                token: token,
            });
        } else {
            res.status(400).json("Wrong Credentials");
        }
    } catch (error) {
        res.status(500).json("Error:" + error);
    }
});
*/
adminApi.post("/login", async (req, res) => {
    const {userName, password} = req.body
    console.log(userName)
    res.status(200).json("success")
})

export default adminApi;
