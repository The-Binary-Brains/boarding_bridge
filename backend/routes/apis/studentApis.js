import express from "express";
import {
    getAccommodationAvailabilityByDate,
    getAccommodationImagesByID
} from "../controllers/studentController.js";

const studentApi = express.Router();

studentApi.post("/filter", async (req, res) => {
    const data = req.body
    res.status(200).json(data);
    console.log(data)
});


studentApi.post("/reservation/cancel/:id", async (req, res) => {
    const id = req.params.id;
    res.status(200).json(id);
});

studentApi.post("/reservation/new", async (req, res) => {
    const body = req.body;

    const state = await getAccommodationAvailabilityByDate(body.date)

    console.log(state.availability)

    if (state.availability == true) {
        res.status(200).json("success");
    } else {
        res.status(200).json("failed");
    }

});

studentApi.get("/accommodation/imgaes/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id)

    const images = await getAccommodationImagesByID(id)
    res.status(200).json({images: images});

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
