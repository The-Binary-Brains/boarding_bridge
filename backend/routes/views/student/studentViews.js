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
        const accommodationData = {
            id: 1,
            propertyType: "Room",
            name: "Oakwood Manor",
            address: "123 Main St",
            occupancy: 2,
            distance: 1,
            furnishingType: "fully_furnished",
            amenities: ["wifi", "kitchen"],
            propertyPhoto: [
                "/uploads/prop5.jpg",
                "/uploads/prop6.jpg",
                "/uploads/prop7.jpg",
                "/uploads/prop8.jpg",
                "/uploads/prop9.jpg",
            ],
            about: "Cozy room with all amenities",
            f_name: "John",
            l_name: "Doe",
            email: "john.doe@example.com",
            phone: "1234567890",
            profile_url: "/uploads/pers1.jpg",
            price: 500,
            latitude: 34,
            longitude: -118,
        };
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
