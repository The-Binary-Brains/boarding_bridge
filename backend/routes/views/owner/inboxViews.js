import express from "express";

import {
    getInboxTable,
    getInboxById,
} from "../../controllers/ownerController.js";

const inboxView = express.Router();

inboxView.get("/", async (req, res) => {
    const id = 1;

    try {
        const inboxData = [
            {
                id: 1,
                category: "property",
                status: "unread",
                content: {
                    title: "Property Listed Successfully",
                    description:
                        "Your property has been listed and is now visible to potential renters.",
                },
                date: "2023-06-15",
            },
            {
                id: 2,
                category: "reservation",
                status: "read",
                content: {
                    title: "Reservation Confirmed",
                    description:
                        "Your reservation for Room A has been successfully confirmed.",
                },
                date: "2023-07-20",
            },
            {
                id: 3,
                category: "reservation",
                status: "read",
                content: {
                    title: "Reservation Cancelled",
                    description:
                        "Your reservation for Room B has been cancelled as per your request.",
                },
                date: "2023-08-05",
            },
        ];
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
    const id = req.params.id;

    try {
        const inboxData = {
            title: "Payment Received",
            timestamp: "2022-01-01 12:25:58",
            message: "Your payment of $100 has been received and successfully processed. The transaction has been securely recorded, and you will receive an email confirmation shortly. If you have any questions regarding this payment or need further assistance, please feel free to reach out to our support team. Thank you for choosing our services."
        };

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
