import express from "express";

const ownerView = express.Router();

ownerView.get("/dashboard", (req, res) => {
    res.render("owner_boilerplate", { page: "dashboard"});
});

ownerView.get("/property", (req, res) => {
    res.render("owner_boilerplate", { page: "properties"});
});

ownerView.get("/property/new", (req, res) => {
    res.render("owner_boilerplate", { page: "new property"});
});

ownerView.get("/property/edit", (req, res) => {
    res.render("owner_boilerplate", { page: "edit property"});
});

ownerView.get("/inbox", (req, res) => {
    res.render("owner_boilerplate", { page: "inbox"});
});

ownerView.get("/profile", (req, res) => {
    res.render("owner_boilerplate", { page: "profile"});
});

export default ownerView;
