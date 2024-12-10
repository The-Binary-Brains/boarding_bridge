import express from "express";

import { getAnalisys, getNotificationsTable, getPropertiesTable } from "../../controllers/ownerController.js";
import propertyView from "./propertyViews.js";

const ownerView = express.Router();


ownerView.get("/login", (req, res) => {
    res.render("owner_login");
});

ownerView.get("/register", (req, res) => {
    res.render("owner_reg");
});

ownerView.get("/dashboard", async (req, res) => {
    try {
        const analysisData = await getAnalisys();
        const notificationData = await getNotificationsTable();

        res.render("owner_boilerplate", { page: "dashboard", analisys: analysisData, notificationData: notificationData });
    } catch (error) {
        console.error("Error fetching analysis data:", error);
        res.status(500).send("Error fetching dashboard data.");
    }
});

ownerView.use("/property", propertyView);

ownerView.get("/reservations", (req, res) => {
    res.render("owner_boilerplate", { page: "reservations"});
});

ownerView.get("/reservations/info/:id", (req, res) => {
    res.render("owner_boilerplate", { page: "reservation info"});
});

ownerView.get("/inbox", (req, res) => {
    res.render("owner_boilerplate", { page: "inbox"});
});

ownerView.get("/inbox/view/:id", (req, res) => {
    res.render("owner_boilerplate", { page: "inbox view"});
});

ownerView.get("/profile", (req, res) => {
    res.render("owner_boilerplate", { page: "profile"});
});

export default ownerView;
