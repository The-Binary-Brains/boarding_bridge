import express from "express";

import {
    getReservationTable,
    getReservationById,
} from "../../controllers/ownerController.js";

const reservationView = express.Router();

reservationView.get("/", async (req, res) => {

    const id = 1

    try {
        const reservationData = await getReservationTable(id);
        res.render("owner_boilerplate", {
            page: "reservations",
            reservationData: reservationData,
        });
    } catch (error) {
        console.error("Error fetching analysis data:", error);
        res.status(500).send("Error fetching dashboard data.");
    }
});

reservationView.get("/view/:id", async (req, res) => {

    const id = req.params.id

    try {
        const reservationData = await getReservationById(id);
        res.render("owner_boilerplate", {
            page: "reservation info",
            reservationData: reservationData,
        });
    } catch (error) {
        console.error("Error fetching analysis data:", error);
        res.status(500).send("Error fetching dashboard data.");
    }
});


export default reservationView;
