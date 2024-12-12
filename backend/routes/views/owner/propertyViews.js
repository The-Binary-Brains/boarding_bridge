import express from "express";

import {
    getPropertiesTable,
    getSolvePropertyById,
    getPropertyViewById,
    getEditPropertyById,
} from "../../controllers/ownerController.js";

const propertyView = express.Router();

propertyView.get("/", async (req, res) => {
    try {
        const propertiesData = [
            {
                id: 1,
                image: "/uploads/prop9.jpg",
                title: "Sunnyvale Estates",
                reviewDate: "2022-01-01",
                publishedDate: "2022-01-05",
                status: "approved",
            },
            {
                id: 2,
                image: "/uploads/prop10.jpg",
                title: "Oakwood Manor",
                reviewDate: "2022-01-02",
                publishedDate: "-",
                status: "pending",
            },
            {
                id: 3,
                image: "/uploads/prop11.jpg",
                title: "Bluebell Villa",
                reviewDate: "2022-01-03",
                publishedDate: "2022-01-04",
                status: "approved",
            },
            {
                id: 4,
                image: "/uploads/prop12.jpg",
                title: "Evergreen Residences",
                reviewDate: "2022-01-04",
                publishedDate: "-",
                status: "rejected",
            },
        ];

        console.log(propertiesData);
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
        const propertyData = {
            name: "Cozy Room",
            propertyType: "room",
            address: "13 nawala road",
            rentalPrice: 6500,
            occupancy: 2,
            distance: 2.5,
            furnishingType: "fully-furnished",
            amenities: ["wifi", "kitchen"],
            about: "Cozy room with all amenities",
            email: "vijaya45@gmail.com",
            phone: "12755542445",
            legName: "Vijayan",
            latitude: 34,
            longitude: -118,
            image: "/uploads/prop9.jpg",
            status: "approved",
        };

        res.render("owner_boilerplate", {
            page: "edit property",
            propertyData: propertyData,
        });
    } catch (error) {
        console.error("Error fetching analysis data:", error);
        res.status(500).send("Error fetching dashboard data.");
    }
});

propertyView.get("/view/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const propertyData = {
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
        console.log(propertyData);
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
        const propertyData = {
            id: 4,
            name: "Golden Horizon Apartments",
            propertyType: "room",
            address: "321 Maple St",
            occupancy: 2,
            distance: 1,
            furnishingType: "semi-furnished",
            amenities: ["wifi", "kitchen"],
            about: "Comfortable room near campus",
            email: "john.doe@example.com",
            phone: "1234567890",
            legName: "John Doe",
            latitude: 34,
            longitude: -118,
            image: null,
            review: {
                comment:
                    "This property is not suitable for families due to its limited space and specific layout designed for individuals or shared living. The room is ideal for students or professionals seeking a temporary stay with minimal occupancy. Families may find the lack of separate living areas and child-friendly amenities inconvenient. Additionally, the neighborhood may be more oriented towards young professionals, making it less family-focused.",

                timestamp: "2022-01-04 06:30:00",
            },
        };
        console.log(propertyData);
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
