import express from "express";

const ownerView = express.Router();


ownerView.get("/login", (req, res) => {
    res.render("owner_login");
});

ownerView.get("/register", (req, res) => {
    res.render("owner_reg");
});

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

ownerView.get("/property/view", (req, res) => {
    res.render("owner_boilerplate", { page: "view property"});
});

ownerView.get("/property/solve", (req, res) => {
    res.render("owner_boilerplate", { page: "solve property"});
});

ownerView.get("/reservations", (req, res) => {
    res.render("owner_boilerplate", { page: "reservations"});
});

ownerView.get("/reservations/info", (req, res) => {
    res.render("owner_boilerplate", { page: "reservation info"});
});

ownerView.get("/inbox", (req, res) => {
    res.render("owner_boilerplate", { page: "inbox"});
});

ownerView.get("/inbox/red", (req, res) => {
    res.render("owner_boilerplate", { page: "inbox view"});
});

ownerView.get("/profile", (req, res) => {
    res.render("owner_boilerplate", { page: "profile"});
});

export default ownerView;
