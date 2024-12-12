import {
    GetPropertyTable,
    GetPropertyView,
    GetAnalisys,
    GetReservedDatesOfMonth,
    GetReservationDetailsByDate,
    GetNotificationsTable,
} from "../../database.js";

export const getAnalisys = async (id) => {
    try {
        const data = await GetAnalisys(1);
        console.log(data);

        return data;
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const getReservedDatesOfMonth = async (id, month) => {
    try {
        const data = await GetReservedDatesOfMonth(1, month);
        return {
            availableDates: data.reservedDates,
        };
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const getReservationDetailsByDate = async (id, date) => {
    try {
        const data = await GetReservationDetailsByDate(id, date);
        console.log(data)
        return data;
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const getNotificationsTable = async (userId) => {
    try {

        const data = await GetNotificationsTable(1)
        return data

    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const getPropertiesTable = async (userId) => {
    try {
        let properties = [];
        const result = await GetPropertyTable(1);
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const getPropertyViewById = async (id) => {
    try {
        const data = await GetPropertyView(1);
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const getSolvePropertyById = async (id) => {
    try {
        return {
            name: "Cozy Apartment",
            propertyType: "apartment",
            address: "123 Main Street, Colombo, Sri Lanka",
            occupancy: 4,
            distance: 3,
            furnishingType: "fully-furnished",
            amenities: ["wifi", "kitchen", "bath", "food"],
            about: "A fully furnished cozy apartment near the university with all necessary amenities. Perfect for students.",
            email: "owner@example.com",
            phone: "+94 123 456 7890",
            legName: "John Doe",
            latitude: 6.986789822161486,
            longitude: 81.04111155389603,
            rejectReson:
                "repudiandae, pariatur laudantium officiis odit porro explicabo officia optio sequi. Porro iusto et dignissimos incidunt architecto nam veniam optio!",
        };
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const getEditPropertyById = async (id) => {
    try {
        return {
            name: "Cozy Apartment",
            propertyType: "apartment",
            address: "123 Main Street, Colombo, Sri Lanka",
            occupancy: 4,
            furnishingType: "fully-furnished",
            amenities: ["wifi", "kitchen", "bath", "food"],
            about: "A fully furnished cozy apartment near the university with all necessary amenities. Perfect for students.",
            email: "owner@example.com",
            phone: "+94 123 456 7890",
        };
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const getReservationById = async (id) => {
    try {
        return {
            name: "Y Thilukshan",
            property: "apartment",
            propertyId: 1,
            date: "2024-06-11",
            phone: "456456465",
            email: "fully-furnished@gmail.com",
            image: "/images/property1.jpg",
        };
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const getReservationTable = async () => {
    try {
        return [
            {
                id: 1,
                property: {
                    image: "/images/property1.jpg",
                    title: "Property One",
                },
                startDate: "2024-12-04",
                endDate: "2024-12-04",
            },
            {
                id: 2,
                property: {
                    image: "/images/property2.jpg",
                    title: "Property Two",
                },
                startDate: "2024-12-10",
                endDate: "2024-12-12",
            },
        ];
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const getInboxById = async (id) => {
    try {
        return {
            title: "Y Thilukshan",
            timestamp: "2024-06-11 12:55",
            message:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat doloribus id eligendi ducimus magni soluta architecto assumenda maxime non sapiente.",
        };
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const getInboxTable = async () => {
    try {
        return [
            {
                id: 1,
                category: "reservation",
                status: "read",
                content: {
                    title: "Reservation One",
                    description: "Reservation details go here.",
                },
                date: "2024-12-04",
            },
            {
                id: 2,
                category: "property",
                status: "unread",
                content: {
                    title: "Property One",
                    description: "Property details go here.",
                },
                date: "2024-12-05",
            },
            {
                id: 3,
                category: "profile",
                status: "unread",
                content: {
                    title: "User Profile",
                    description: "Profile details go here.",
                },
                date: "2024-12-06",
            },
        ];
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const getProfileById = async (id) => {
    try {
        return {
            userName: "Jane's Accomandations",
            name: "Y Thilukshan",
            about: "2024-06-11 12:55",
            email: "6546@dsaasd.sad",
            phone: "56+468+44555",
            image: "/images/fow_owners.png",
            address: "asdwadsdasdawdasdadawd",
            legName: "asdw asdwadwa",
        };
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};
