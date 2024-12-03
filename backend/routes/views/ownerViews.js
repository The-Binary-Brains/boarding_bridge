import express from "express";

const ownerView = express.Router();

ownerView.get("/dashboard", (req, res) => {
    res.render("owner_boilerplate", { page: "dashboard"});
});

ownerView.get("/property", (req, res) => {
    res.render("owner_boilerplate", { page: "property"});
});

export default ownerView;
