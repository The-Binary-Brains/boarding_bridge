import express from "express";

import {
    getAvailablePropertiesForReview,
    getAllProperties,
    getAccommodationByID,
    getAvailableOwnersForReview,
    getAllOwners,
} from "../../controllers/adminController.js";

const adminView = express.Router();

adminView.get("/login", (req, res) => {
    res.render("admin_login");
});

adminView.get("/review", async (req, res) => {
    const propertiesData = [
        {
          id: 1,
          image: '/uploads/prop13.jpg',
          title: 'Bluebell Villa',
          submitDate: '2024-10-21'
        },
        {
          id: 2,
          image: '/uploads/prop14.jpg',
          title: 'Golden Horizon Apartments',
          submitDate: '2024-04-15'
        },
        {
          id: 3,
          image: '/uploads/prop15.jpg',
          title: 'Evergreen Residences',
          submitDate: '2024-10-10'
        }
      ]

    const ownersData = [
        { id: 1, name: 'Golden Horizon Apartments', submitDate: '2024-10-21' },
        { id: 2, name: 'Bluebell Villa', submitDate: '2024-12-21' },
        { id: 3, name: 'Riverside Heights', submitDate: '2024-01-08' }
      ]
    console.log(propertiesData)
    res.render("admin_boilerplate", {
        page: "reviews",
        propertiesData: propertiesData,
        ownersData: ownersData,
    });
});

adminView.get("/properties", async (req, res) => {
    const reservationData = [
        {
          id: 1,
          image: '/uploads/prop1.jpeg',
          title: 'Evergreen Residences',
          owner: '2024-04-11;',
          contact: '2024-07-07',
          status: 'rejected'
        },
        {
          id: 2,
          image: '/uploads/prop2.jpeg',
          title: 'Sunnyvale Estates',
          owner: '2023-08-04;',
          contact: '2023-08-06',
          status: 'published'
        },
        {
          id: 3,
          image: '/uploads/prop3.jpeg',
          title: 'Golden Horizon Apartments',
          owner: '2024-10-21;',
          contact: '2024-10-25',
          status: 'pending'
        }
      ]
    console.log(reservationData)
    res.render("admin_boilerplate", {
        page: "properties",
        reservationData: reservationData,
    });
});

adminView.get("/owners", async (req, res) => {
    const ownersData = [
        {
          id: 1,
          name: 'Benjamin Scott',
          email: 'benjaminscott@email.com',
          phone: '45278623',
          status: 'rejected'
        },
        {
          id: 2,
          name: 'Jackson Cooper',
          email: 'jacksoncooper@email.com',
          phone: '4568946',
          status: 'published'
        },
        {
          id: 3,
          name: 'Lucas Brooks',
          email: 'lucasbrooks@email.com',
          phone: '7585636',
          status: 'pending'
        }
      ]
    res.render("admin_boilerplate", {
        page: "owners",
        ownersData: ownersData,
    });
});

adminView.get("/owners/view/:id", async (req, res) => {

    const id = 1

    try {
        const profileData = {
            userName: "john's Accommodations",
            name: 'John Doe',
            about: 'An experienced owner managing multiple properties across various locations, specializing in providing comfortable and well-maintained accommodations. Dedicated to ensuring a seamless renting experience with prompt communication and attention to tenant needs. Actively seeking to build long-term relationships with renters through transparency and quality service.',
            email: 'john.doe@example.com',
            phone: '1234567890',
            image: '/uploads/pers2.jpeg',
            address: '123 Main St',
            legName: 'John Doe Enterprises'
          }
        res.render("admin_boilerplate", { page: "view owner", profileData: profileData });
    } catch (error) {
        console.error("Error fetching analysis data:", error);
        res.status(500).send("Error fetching dashboard data.");
    }

});

adminView.get("/owner/review/:id", async (req, res) => {

    const id = 1

    try {
        const profileData = {
            userName: "john's Accommodations",
            name: 'John Doe',
            about: 'An experienced owner managing multiple properties across various locations, specializing in providing comfortable and well-maintained accommodations. Dedicated to ensuring a seamless renting experience with prompt communication and attention to tenant needs. Actively seeking to build long-term relationships with renters through transparency and quality service.',
            email: 'john.doe@example.com',
            phone: '1234567890',
            image: '/uploads/pers2.jpeg',
            address: '123 Main St',
            legName: 'John Doe Enterprises'
          }
        res.render("admin_boilerplate", { page: "review owner", profileData: profileData });
    } catch (error) {
        console.error("Error fetching analysis data:", error);
        res.status(500).send("Error fetching dashboard data.");
    }

});

adminView.get("/property/view/:id", async (req, res) => {
    const propertyData = {
        id: 1,
        propertyType: "Room",
        name: "Oakwood Manor",
        address: "123 Main St",
        occupancy: 2,
        distance: 1,
        furnishingType: "fully_furnished",
        amenities: ["wifi", "kitchen"],
        propertyPhoto: [
            "/uploads/prop5.jpg",
            "/uploads/prop6.jpg",
            "/uploads/prop7.jpg",
            "/uploads/prop8.jpg",
            "/uploads/prop9.jpg",
        ],
        about: "Cozy room with all amenities",
        f_name: "John",
        l_name: "Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
        profile_url: "/uploads/pers3.jpg",
        price: 500,
        latitude: 34,
        longitude: -118,
    };
    res.render("admin_boilerplate", {
        page: "view property",
        propertyData: propertyData,
    });
});

adminView.get("/property/review/:id", async (req, res) => {
    const propertyData = {
        id: 1,
        propertyType: "Room",
        name: "Oakwood Manor",
        address: "123 Main St",
        occupancy: 2,
        distance: 10,
        furnishingType: "fully_furnished",
        amenities: ["wifi", "kitchen"],
        propertyPhoto: [
            "/uploads/prop5.jpg",
            "/uploads/prop6.jpg",
            "/uploads/prop7.jpg",
            "/uploads/prop8.jpg",
            "/uploads/prop9.jpg",
        ],
        about: "Cozy room with all amenities",
        f_name: "John",
        l_name: "Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
        profile_url: "/uploads/pers3.jpg",
        price: 500,
        latitude: 34,
        longitude: -118,
    };
    res.render("admin_boilerplate", {
        page: "review property",
        propertyData: propertyData,
    });
});

export default adminView;
