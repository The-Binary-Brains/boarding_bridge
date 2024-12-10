import express from "express";

import {
    getInboxTable,
    getInboxById,
} from "../../controllers/ownerController.js";

const inboxView = express.Router();

inboxView.get("/", async (req, res) => {
    try {
        const inboxData = await getInboxTable();
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
    try {
        const inboxData = await getInboxById();
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
