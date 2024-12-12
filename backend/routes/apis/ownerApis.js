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
        const reservedDatesOfMonth = await getReservedDatesOfMonth(id, parseInt(month)+ 1);
        res.status(200).json(reservedDatesOfMonth);
    } catch (error) {
        res.status(500).json({ message: "An Error Occured:" + error });
    }
});

ownerApi.get("/reserved/:date", async (req, res) => {
    const date = req.params.date;
    console.log(date);
    const id = 1

    try {
        const reservedDate = await getReservationDetailsByDate(id, date);
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
