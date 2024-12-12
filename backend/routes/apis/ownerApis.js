import express from "express";
import {
    getReservationDetailsByDate,
    getReservedDatesOfMonth,
} from "../controllers/ownerController.js";

import { RegisterOwner, GetOwner } from "../../database.js";

import dotnet from "dotenv";
dotnet.config();

import jwt from "jsonwebtoken";

import path from "path";
import multer from "multer";

const ownerApi = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        const fileExtension =
            path.extname(file.originalname) ||
            "." + file.mimetype.split("/")[1];
        const uniqueFileName = Date.now() + fileExtension;

        cb(null, uniqueFileName);
    },
});

const upload = multer({ storage: storage });

ownerApi.post("/reservation/cancel/:id", async (req, res) => {
    const id = req.params.id;
    res.status(200).json(id);
});

ownerApi.get("/reserved_month/:month", async (req, res) => {
    const month = req.params.month;
    const id = 1;

    try {
        const reservedDatesOfMonth = {
            availableDates: [
                "2024-12-21",
                "2024-12-02",
                "2024-12-13",
                "2024-12-24",
            ],
        };
        res.status(200).json(reservedDatesOfMonth);
    } catch (error) {
        res.status(500).json({ message: "An Error Occured:" + error });
    }
});

ownerApi.get("/reserved/:date", async (req, res) => {
    const date = req.params.date;
    console.log(date);
    const id = 1;

    try {
        let reservedDate = [];

        if (date == "2024-12-21") {
            reservedDate = [
                {
                    id: 1,
                    property: "Best Room",
                    image: "/uploads/prop1.jpeg",
                    reservedBy: "John Doe",
                    time: "2024-12-21 06:30 PM",
                },
                {
                    id: 1,
                    property: "Apartment",
                    image: "/uploads/prop2.jpeg",
                    reservedBy: "Michel Doe",
                    time: "2024-12-21 06:30 PM",
                },
            ];
        } else if (date == "2024-12-13") {
            reservedDate = [
                {
                    id: 1,
                    property: "Oakwood Manor",
                    image: "/uploads/prop3.jpeg",
                    reservedBy: "Isabella Morgan",
                    time: "2024-12-21 09:30 AM",
                },
                {
                    id: 1,
                    property: "Golden Horizon Apartments",
                    image: "/uploads/prop4.jpeg",
                    reservedBy: "Jackson Cooper",
                    time: "2024-12-21 01:30 PM",
                },
                {
                    id: 1,
                    property: "Sunnyvale Estates",
                    image: "/uploads/prop5.jpg",
                    reservedBy: "Lucas Brooks",
                    time: "2024-12-21 04:30 PM",
                },
            ];
        } else if (date == "2024-12-02") {
            reservedDate = [
                {
                    id: 1,
                    property: "Bluebell Villa",
                    image: "/uploads/prop6.jpg",
                    reservedBy: "Amelia Rivera",
                    time: "2024-12-02 10:30 AM",
                },
                {
                    id: 1,
                    property: "Riverside Heights",
                    image: "/uploads/prop7.jpg",
                    reservedBy: "Benjamin Scott",
                    time: "2024-12-02 08:30 AM",
                },
            ];
        } else if (date == "2024-12-24") {
            reservedDate = [
                {
                    id: 1,
                    property: "Evergreen Residences",
                    image: "/uploads/prop8.jpg",
                    reservedBy: "Olivia Parker",
                    time: "2024-12-24 02:30 PM",
                }]
        }

        console.log(reservedDate);
        res.status(200).json(reservedDate);
    } catch (error) {
        res.status(500).json({ message: "An Error Occured:" + error });
    }
});

ownerApi.post("/property/solve/:id", upload.any(), async (req, res) => {
    const id = req.params.id;

    // Log the incoming formData and files for debugging
    console.log("Form Data:", req.body); // Non-file form fields
    console.log("Files:", req.files); // Uploaded files

    if (!req.body || !req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No data or files received" });
    }

    // Handle formData (non-file fields)
    const formData = req.body;

    // Handle uploaded files
    const files = req.files;

    // Optionally process each file (e.g., check file types, sizes)
    files.forEach((file) => {
        console.log(`File uploaded: ${file.originalname} - ${file.path}`);
    });

    // Process form data here (e.g., save to DB)
    console.log("Form Data (Parsed):", formData);
    console.log("Files (Parsed):", files);

    // Return a response after processing
    res.status(200).json({
        message: "Data received successfully",
        formData: formData, // Send form data as part of the response
        files: files, // Send file info as part of the response
    });
});

ownerApi.post("/property/edit/:id", upload.any(), async (req, res) => {
    const id = req.params.id;

    console.log("Form Data:", req.body);
    console.log("Files:", req.files);

    if (!req.body || !req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No data or files received" });
    }

    const formData = req.body;

    const files = req.files;

    files.forEach((file) => {
        console.log(`File uploaded: ${file.originalname} - ${file.path}`);
    });

    console.log("Form Data (Parsed):", formData);
    console.log("Files (Parsed):", files);

    res.status(200).json({
        message: "Data received successfully",
        formData: formData,
        files: files,
    });
});

ownerApi.post("/property/delete/:id", async (req, res) => {
    const id = req.params.id;
    res.status(200).json(id);
});

ownerApi.post("/profile/update/account", async (req, res) => {
    console.log("Form Data:", req.body);
    res.status(200).json("Recieved");
});

ownerApi.post("/profile/update/contact", async (req, res) => {
    console.log("Form Data:", req.body);
    res.status(200).json("Recieved");
});

ownerApi.post("/profile/update/password", async (req, res) => {
    console.log("Form Data:", req.body);
    res.status(200).json("Recieved");
});

ownerApi.post("/profile/update/image", upload.any(), async (req, res) => {
    console.log("Files:", req.files);
    const files = req.files;
    files.forEach((file) => {
        console.log(`File uploaded: ${file.originalname} - ${file.path}`);
    });
    res.status(200).json("Profile Picture Uploaded");
});

ownerApi.post("/inbox/delete/:id", async (req, res) => {
    const id = req.params.id;
    res.status(200).json(id);
});

ownerApi.post("/register", upload.any(), async (req, res) => {
    const {
        firstName,
        lastName,
        legName,
        address,
        email,
        phone,
        about,
        userName,
        password,
    } = req.body;

    const getTransformedPath = (fieldname) => {
        const file = req.files.find((f) => f.fieldname === fieldname);
        if (file) {
            return file.path.replace(/\\/g, "/").replace(/^public\//, "");
        }
        return null;
    };

    const profilePhotoPath = getTransformedPath("profilePhoto");
    const legDocumentPath = getTransformedPath("legDocument");

    console.log({
        firstName,
        lastName,
        legName,
        address,
        email,
        phone,
        about,
        userName,
        password,
        profilePhotoPath,
        legDocumentPath,
    });

    try {
        const result = await RegisterOwner(
            firstName,
            lastName,
            legName,
            address,
            email,
            phone,
            about,
            userName,
            password,
            legDocumentPath,
            profilePhotoPath
        );

        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(200).json({ message: "failed" });
    }
});

ownerApi.post("/login", async (req, res) => {
    const { userName, password } = req.body;

    try {
        const result = await GetOwner(userName);

        if (result && result.password === password) {
            const payload = {
                id: result.id,
                role: "owner",
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
                expiresIn: "1d",
            });

            res.status(200).json({
                message: "success",
                token: token,
            });
        } else {
            res.status(200).json({ message: "failed" });
        }
    } catch (error) {
        res.status(200).json({ message: "failed" });
    }
});

export default ownerApi;
