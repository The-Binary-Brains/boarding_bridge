import express from "express";

import { getAnalisys, getNotificationsTable,  getProfileById} from "../../controllers/ownerController.js";
import propertyView from "./propertyViews.js";
import reservationView from "./reservationViews.js";
import inboxView from "./inboxViews.js";

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

ownerView.use("/reservations", reservationView);

ownerView.use("/inbox", inboxView);


ownerView.get("/profile", async (req, res) => {

    const id = 1

    try {
        const profileData = await getProfileById(id);
        res.render("owner_boilerplate", { page: "profile", profileData: profileData });
    } catch (error) {
        console.error("Error fetching analysis data:", error);
        res.status(500).send("Error fetching dashboard data.");
    }

});

export default ownerView;
