import express from "express";

import {
    getPropertiesTable,
    getSolvePropertyById,
    getPropertyViewById,
    getEditPropertyById
} from "../../controllers/ownerController.js";

const propertyView = express.Router();

propertyView.get("/", async (req, res) => {
    try {
        const propertiesData = await getPropertiesTable();
        console.log(propertiesData)
        res.render("owner_boilerplate", {
            page: "properties",
            propertiesData: propertiesData,
        });
    } catch (error) {
        console.error("Error fetching analysis data:", error);
        res.status(500).send("Error fetching dashboard data.");
    }
});

propertyView.get("/new", (req, res) => {
    res.render("owner_boilerplate", { page: "new property" });
});

propertyView.get("/edit/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const propertyData = await getEditPropertyById(id);
        res.render("owner_boilerplate", { page: "edit property", propertyData: propertyData,});
    } catch (error) {
        console.error("Error fetching analysis data:", error);
        res.status(500).send("Error fetching dashboard data.");
    }

});

propertyView.get("/view/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        const propertyData = await getPropertyViewById(parseInt(id));
        res.render("owner_boilerplate", {
            page: "view property",
            propertyData: propertyData,
        });
    } catch (error) {
        console.error("Error fetching analysis data:", error);
        res.status(500).send("Error fetching dashboard data.");
    }
});

propertyView.get("/solve/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const propertyData = await getSolvePropertyById(id);
        res.render("owner_boilerplate", {
            page: "solve property",
            propertyData: propertyData,
        });
    } catch (error) {
        console.error("Error fetching analysis data:", error);
        res.status(500).send("Error fetching dashboard data.");
    }
});

export default propertyView;
