import express from "express";

import {
    getInboxTable,
    getInboxById,
} from "../../controllers/ownerController.js";

const inboxView = express.Router();

inboxView.get("/", async (req, res) => {

    const id = 1

    try {
        const inboxData = await getInboxTable(id);
        res.render("owner_boilerplate", {
            page: "inbox",
            inboxData: inboxData,
        });
    } catch (error) {
        console.error("Error fetching analysis data:", error);
        res.status(500).send("Error fetching dashboard data.");
    }
});

inboxView.get("/view/:id", async (req, res) => {

    const id = req.params.id

    try {
        const inboxData = await getInboxById(id);
        res.render("owner_boilerplate", {
            page: "inbox view",
            inboxData: inboxData,
        });
    } catch (error) {
        console.error("Error fetching analysis data:", error);
        res.status(500).send("Error fetching dashboard data.");
    }
});


export default inboxView;
