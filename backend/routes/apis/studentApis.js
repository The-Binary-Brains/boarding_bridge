import express from "express";
import {
    getReservationDetailsByDate,
    getReservedDatesOfMonth,
} from "../controllers/ownerController.js";

const studentApi = express.Router();

studentApi.post("/reservation/cancel/:id", async (req, res) => {
    const id = req.params.id;
    res.status(200).json(id);
});

studentApi.post("/profile/update/password", async (req, res) => {
    console.log("Form Data:", req.body);
    res.status(200).json("Recieved");
});

studentApi.post("/reservations/new/:id", async (req, res) => {
    const id = req.params.id;
    res.status(200).json(id);
});

studentApi.post("/reservations/cancel/:id", async (req, res) => {
    const id = req.params.id;
    res.status(200).json(id);
});

studentApi.post("/login", async (req, res) => {
    const { userName, password } = req.body;
    res.status(200).json("success");
});

studentApi.post("/register", async (req, res) => {
    const { userName, password } = req.body;
    console.log(userName);
    res.status(200).json(userName);
});

export default studentApi;
