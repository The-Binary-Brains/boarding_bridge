import {
    GetPropertyTable,
    GetPropertyView,
    GetAnalisys,
    GetReservedDatesOfMonth,
    GetReservationDetailsByDate,
    GetNotificationsTable,
    GetSolvePropertyById,
    GetEditPropertyById,
    GetReservationsTable,
    GetReservationById,
    GetInboxTable,
    GetInboxById,
    GetProfileById,
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
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const getNotificationsTable = async (userId) => {
    try {
        const data = await GetNotificationsTable(1);
        return data;
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
        const data = await GetPropertyView(id);
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const getSolvePropertyById = async (id) => {
    try {
        const data = await GetSolvePropertyById(id);
        console.log(data);

        return data;
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const getEditPropertyById = async (id) => {
    try {
        const data = await GetEditPropertyById(id);
        console.log(data);

        return data;
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const getReservationById = async (id) => {
    try {
        const data = await GetReservationById(id);
        console.log(data);

        return data;
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const getReservationTable = async (id) => {
    try {
        const data = await GetReservationsTable(id);
        return data;
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const getInboxById = async (id) => {
    try {
        const data = await GetInboxById(id);
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const getInboxTable = async (id) => {
    try {
        const data = await GetInboxTable(id);
        console.log(data);

        return data;
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const getProfileById = async (id) => {
    try {
        const data = await GetProfileById(id);
        console.log(data);

        return data;
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};
