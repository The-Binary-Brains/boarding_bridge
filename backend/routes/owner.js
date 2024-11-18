import express from "express";
import { GetOwners } from "../database.js";

const ownerRouter = express.Router();

ownerRouter.get("/all", async (req, res) => {
    try {
        const owners = await GetOwners();
        res.status(200).json(owners);
    } catch (error) {
        res.status(500).json({ message: "An Error Occured:" + error });
    }
});

export default ownerRouter;
