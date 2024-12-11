import express from "express";

const adminView = express.Router();


adminView.get("/login", (req, res) => {
    res.render("admin_login");
});

adminView.get("/review", (req, res) => {
    res.render("admin_boilerplate", {page: "reviews", propertiesData : []});
});

adminView.get("/properties", (req, res) => {
    res.render("admin_boilerplate", {page: "properties", reservationData : []});
});


export default adminView;
