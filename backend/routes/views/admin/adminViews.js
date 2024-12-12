import express from "express";

import {
    getAvailablePropertiesForReview,
    getAllProperties,
    getAccommodationByID,
    getAvailableOwnersForReview,
    getAllOwners,
} from "../../controllers/adminController.js";

const adminView = express.Router();

adminView.get("/login", (req, res) => {
    res.render("admin_login");
});

adminView.get("/review", async (req, res) => {
    const propertiesData = await getAvailablePropertiesForReview();
    const ownersData = await getAvailableOwnersForReview();
    res.render("admin_boilerplate", {
        page: "reviews",
        propertiesData: propertiesData,
        ownersData: ownersData,
    });
});

adminView.get("/properties", async (req, res) => {
    const reservationData = await getAllProperties();
    res.render("admin_boilerplate", {
        page: "properties",
        reservationData: reservationData,
    });
});

adminView.get("/owners", async (req, res) => {
    const ownersData = await getAllOwners();
    res.render("admin_boilerplate", {
        page: "owners",
        ownersData: ownersData,
    });
});

adminView.get("/property/view/:id", async (req, res) => {
    const propertyData = await getAccommodationByID();
    res.render("admin_boilerplate", {
        page: "view property",
        propertyData: propertyData,
    });
});

export default adminView;
