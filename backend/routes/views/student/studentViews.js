import express from "express";

const studentView = express.Router();


studentView.get("/login", (req, res) => {
    res.render("student_login");
});

studentView.get("/register", (req, res) => {
    res.render("student_reg");
});

studentView.get("/property/:id", async (req, res) => {
    try {
        const analysisData = await getAnalisys();
        const notificationData = await getNotificationsTable();

        res.render("owner_boilerplate", { page: "dashboard", analisys: analysisData, notificationData: notificationData });
    } catch (error) {
        console.error("Error fetching analysis data:", error);
        res.status(500).send("Error fetching dashboard data.");
    }
});

studentView.get("/home", async (req, res) => {
        res.render("student_home");
});


export default studentView;
