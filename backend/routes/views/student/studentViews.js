import express from "express";

import { getAvailableAccommodation, getAccommodationByID  } from "../../controllers/studentController.js";

const studentView = express.Router();


studentView.get("/login", (req, res) => {
    res.render("student_login");
});

studentView.get("/register", (req, res) => {
    res.render("student_reg");
});

studentView.get("/accommodation/:id", async (req, res) => {
    try {
        const accommodationData = await getAccommodationByID();
        res.render("property_info", { accommodationData: accommodationData });
    } catch (error) {
        console.error("Error fetching analysis data:", error);
        res.status(500).send("Error fetching dashboard data.");
    }
});

studentView.get("/home", async (req, res) => {
    const accommodationData = await getAvailableAccommodation();
        res.render("student_home", {accommodationData: accommodationData});
});

studentView.get("/profile", async (req, res) => {
        res.render("student_profile");
});


export default studentView;
