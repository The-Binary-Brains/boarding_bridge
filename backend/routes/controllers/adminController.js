export const getAvailablePropertiesForReview = async () => {
    try {
        return [
            {
                id: 1,
                image: "/images/property1.jpg",
                title: "Prop One",
                submitDate: "2024-10-21",
            },
            {
                id: 2,
                image: "/images/property1.jpg",
                title: "Prop One",
                submitDate: "2024-10-21",
            },
            {
                id: 3,
                image: "/images/property1.jpg",
                title: "Prop One",
                submitDate: "2024-10-21",
            },
        ];
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
}

export const getAvailableOwnersForReview = async () => {
    try {
        return [
            {
                id: 1,
                name: "Prop One",
                submitDate: "2024-10-21",
            },
            {
                id: 2,
                name: "Prop One",
                submitDate: "2024-10-21",
            },
            {
                id: 3,
                name: "Prop One",
                submitDate: "2024-10-21",
            },
        ];
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
}

export const getAllProperties = async () => {
    try {
        return [
            {
                id: 1,
                image: "/images/property1.jpg",
                title: "Prop One",
                owner: "2024-10-21;",
                contact: "2024-10-21",
                status: "rejected",
            },
            {
                id: 2,
                image: "/images/property1.jpg",
                title: "Prop One",
                owner: "2024-10-21;",
                contact: "2024-10-21",
                status: "published",
            },
            {
                id: 3,
                image: "/images/property1.jpg",
                title: "Prop One",
                owner: "2024-10-21;",
                contact: "2024-10-21",
                status: "pending",
            },
        ];
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
}

export const getAllOwners = async () => {
    try {
        return [
            {
                id: 1,
                name: "Prop One",
                email: "2024-10-21;",
                phone: "2024-10-21",
                status: "rejected",
            },
            {
                id: 2,
                name: "Prop One",
                email: "2024-10-21;",
                phone: "2024-10-21",
                status: "published",
            },
            {
                id: 3,
                name: "Prop One",
                email: "2024-10-21;",
                phone: "2024-10-21",
                status: "pending",
            },
        ];
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
}

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
            ownerName: "Y Thilukshn",
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
