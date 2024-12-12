export const getAvailableAccommodation = async () => {
    try {
        return [
            {
                id: 1,
                image: "/uploads/prop15.jpg",
                type: "House",
                price: "18000",
                owner: "Ethan Harper",
            },
            {
                id: 2,
                image: "/uploads/prop14.jpg",
                type: "Room",
                price: "23000",
                owner: "Sophia Bennett",
            },
            {
                id: 3,
                image: "/uploads/prop13.jpg",
                type: "Apartment",
                price: "26000",
                owner: "Liam Carter",
            },
            {
                id: 4,
                image: "/uploads/prop10.jpg",
                type: "House",
                price: "17500",
                owner: "Jhon",
            },
            {
                id: 5,
                image: "/uploads/prop9.jpg",
                type: "Apartment",
                price: "20000",
                owner: "Ava Mitchell",
            },
            {
                id: 6,
                image: "/uploads/prop8.jpg",
                type: "Room",
                price: "29000",
                owner: "Noah Hayes",
            },
        ];
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const getAccommodationByID = async (id) => {
    try {
        return {
            name: "Cozy Apartment",
            propertyType: "apartment",
            address: "123 Main Street, Colombo, Sri Lanka",
            occupancy: 4,
            distance: 3,
            furnishingType: "fully-furnished",
            amenities: ["wifi", "kitchen", "bath", "food", "washing_machine"],
            propertyPhoto: [
                "/uploads/1733852022968.jpg",
                "/uploads/1733852022968.jpg",
                "/uploads/1733852022968.jpg",
                "/uploads/1733852022968.jpg",
                "/uploads/1733852022968.jpg",
            ],
            about: "A fully furnished cozy apartment near the university with all necessary amenities. Perfect for students.",
            email: "owner@example.com",
            phone: "+94 123 456 7890",
            ownerName: "Ava Mitchell",
            member: "2021-05-06",
            price: 24000,
            latitude: 6.986789822161486,
            longitude: 81.04111155389603,
        };
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const getAccommodationAvailabilityByDate = async (id) => {
    try {
        return {
            availability: true,
        };
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const getAccommodationImagesByID = async (id) => {
    try {
        return [
            "/uploads/1733852022968.jpg",
            "/uploads/1733852022968.jpg",
            "/uploads/1733852022968.jpg",
            "/uploads/1733852022968.jpg",
            "/uploads/1733852022968.jpg",
        ]
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
}

export const makeResrevation = async (id) => {
    try {
        return {
            availability: false,
        };
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};
