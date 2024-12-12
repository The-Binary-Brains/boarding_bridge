import express from "express";

import {
    getReservationTable,
    getReservationById,
} from "../../controllers/ownerController.js";

const reservationView = express.Router();

reservationView.get("/", async (req, res) => {
    const id = 1;

    try {
        const reservationData = [
            {
                id: 1,
                timestamp: "01/12/2024",
                property: {
                    name: "Oakwood Manor",
                    image: "/uploads/prop5.jpg",
                },
                student: { id: "US001", firstName: "John", lastName: "Doe" },
            },
            {
                id: 2,
                timestamp: "12/12/2024",
                property: {
                    name: "Sunnyvale Estates",
                    image: "/uploads/prop6.jpg",
                },
                student: { id: "US002", firstName: "Jane", lastName: "Doe" },
            },
            {
                id: 3,
                timestamp: "08/12/2024",
                property: {
                    name: "Bluebell Villa",
                    image: "/uploads/prop11.jpg",
                },
                student: { id: "US003", firstName: "Bob", lastName: "Smith" },
            },
            {
                id: 4,
                timestamp: "04/12/2024",
                property: {
                    name: "Riverside Heights",
                    image: "/uploads/prop13.jpg",
                },
                student: {
                    id: "US004",
                    firstName: "Alice",
                    lastName: "Johnson",
                },
            },
        ];

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
    const id = req.params.id;

    try {
        const reservationData = {
            name: "Jackson Cooper",
            property: "Oakwood Manor",
            propertyId: 1,
            date: "02/12/2024",
            phone: "9876543210",
            email: "jane.doe@example.com",
            image: "/uploads/prop5.jpg",
        };

        console.log(reservationData);
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
