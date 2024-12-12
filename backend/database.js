import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
    .createPool({
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DATABASE,
    })
    .promise();

const ConnetToSQLServer = async () => {
    console.log("Connecting to MySQL Server...");
    let isReattemptFailed = false;

    for (let i = 0; i < 3; i++) {
        try {
            const [rows] = await pool.query("SELECT 1");
            console.log("MySQL connection successful");
            break;
        } catch (error) {
            console.error("MySQL connection error:", error.message);
            console.error(`Reattempting...(Attempt: ${i + 1})`);
            if (i == 2) isReattemptFailed = true;
            continue;
        }
    }
    if (isReattemptFailed) console.error("Reattempt Failed");
};

/*
! Admin Queries
*/
const GetAdmin = async (id) => {
    try {
        const [rows] = await pool.query("CALL GetAdmin(?)", [id]);
        return rows[0][0];
    } catch (error) {
        return `error fetching admin from database: ${error}`;
    }
};

const GetAdmins = async () => {
    try {
        const [rows] = await pool.query("SELECT  * FROM admin");
        return rows;
    } catch (error) {
        return `error fetching admins from database: ${error}`;
    }
};

const RegisterAdmin = async (id) => {
    try {
        const [rows] = await pool.query("CALL AddAdmin(?)", [id]);
        return rows[0][0];
    } catch (error) {
        return `error adding admin to the database: ${error}`;
    }
};

/*
! Owner Queries
*/
export const GetAnalisys = async (id) => {
    try {
        const [totalViews] = await pool.query(
            `
            SELECT
                SUM(p.views) AS totalViews
            FROM
                properties p
            WHERE
                p.owner_id = ?
        `,
            [id]
        );

        const [totalPublished] = await pool.query(
            `
            SELECT
                COUNT(*) AS totalPublished
            FROM
                properties p
            WHERE
                p.owner_id = ? AND p.status = 'approved'
        `,
            [id]
        );

        const [waitingForApproval] = await pool.query(
            `
            SELECT
                COUNT(*) AS waitingForApproval
            FROM
                properties p
            WHERE
                p.owner_id = ? AND p.status = 'pending'
        `,
            [id]
        );

        const [mostViewed] = await pool.query(
            `
            SELECT
                p.name,
                p.published_at AS pubDate,
                p.views AS totalViews,
                TIMESTAMPDIFF(DAY, p.published_at, NOW()) AS pubDuration
            FROM
                properties p
            WHERE
                p.owner_id = ? AND p.status = 'approved'
            ORDER BY
                p.views DESC
            LIMIT 1
        `,
            [id]
        );

        return {
            totalViews: totalViews[0].totalViews,
            totalPublished: totalPublished[0].totalPublished,
            waitingForApproval: waitingForApproval[0].waitingForApproval,
            mostViewed: mostViewed[0]
                ? {
                      name: mostViewed[0].name,
                      pubDate: mostViewed[0].pubDate
                          ? mostViewed[0].pubDate.toISOString().split("T")[0]
                          : null,
                      totalViews: mostViewed[0].totalViews,
                      pubDuration: mostViewed[0].pubDuration,
                  }
                : null,
        };
    } catch (error) {
        return `error fetching analysis from database: ${error}`;
    }
};

export const GetProfileById = async (id) => {
    try {
        const [rows] = await pool.query(
            `
            SELECT
                user_name AS userName,
                CONCAT(f_name, ' ', l_name) AS name,
                about,
                email,
                phone,
                profile_url AS image,
                address,
                legal_name AS legName
            FROM
                owners
            WHERE
                id = ?
            `,
            [id]
        );

        if (rows.length === 0) {
            return `Owner with ID ${id} not found.`;
        }

        const owner = rows[0];

        return {
            userName: owner.userName,
            name: owner.name,
            about: owner.about,
            email: owner.email,
            phone: owner.phone,
            image: owner.image,
            address: owner.address,
            legName: owner.legName,
        };
    } catch (error) {
        console.error("Error fetching owner profile:", error);
        throw error;
    }
};



export const GetInboxById = async (notificationId) => {
    const connection = await pool.getConnection();  // Get a connection to execute a transaction
    try {
        await connection.beginTransaction();  // Start a transaction

        // Query to select the notification details
        const [rows] = await connection.query(
            `
            SELECT
                n.title,
                n.timestamp,
                n.description AS message
            FROM
                notifications n
            WHERE
                n.id = ?
            `,
            [notificationId]
        );

        if (rows.length === 0) {
            await connection.rollback();  // Rollback if no notification is found
            return `Notification with id ${notificationId} not found.`;
        }

        const notification = rows[0];

        // Query to update the status of the notification to 'read'
        await connection.query(
            `
            UPDATE notifications
            SET status = 'read'
            WHERE id = ?
            `,
            [notificationId]
        );

        // Commit the transaction after both queries have succeeded
        await connection.commit();

        const formattedTimestamp = new Date(notification.timestamp).toISOString().split("T")[0] + " " + new Date(notification.timestamp).toLocaleTimeString('en-GB', { hour12: false });

        return {
            title: notification.title,
            timestamp: formattedTimestamp,
            message: notification.message,
        };
    } catch (error) {
        await connection.rollback();  // Rollback if there is any error
        return `Error fetching or updating notification: ${error.message}`;
    } finally {
        connection.release();  // Release the connection back to the pool
    }
};



export const GetInboxTable = async (ownerId) => {
    try {
        const [rows] = await pool.query(
            `
            SELECT
                n.id,
                n.category,
                n.status,
                n.title,
                n.description,
                DATE_FORMAT(n.timestamp, '%Y-%m-%d') AS date
            FROM
                notifications n
            WHERE
                n.owner_id = ?
            ORDER BY
                n.timestamp DESC
            `,
            [ownerId]
        );

        return rows.map((notification) => ({
            id: notification.id,
            category: notification.category,
            status: notification.status,
            content: {
                title: notification.title,
                description: notification.description,
            },
            date: notification.date,
        }));
    } catch (error) {
        return `Error fetching notifications: ${error.message}`;
    }
};



export const GetReservationById = async (id) => {
    try {
        const [rows] = await pool.query(
            `
            SELECT
                CONCAT(us.f_name, ' ', us.l_name) AS name,
                p.name AS property,
                p.id AS propertyId,
                r.timestamp AS date,
                us.phone AS phone,
                us.email AS email,
                (SELECT i.url FROM images i WHERE i.property_id = p.id LIMIT 1) AS image
            FROM
                reservations r
            JOIN
                boardingbridge_students bbs ON r.student_id = bbs.id
            JOIN
                university_students us ON bbs.student_id = us.id
            JOIN
                properties p ON r.property_id = p.id
            WHERE
                r.id = ?
            `,
            [id]
        );

        if (rows.length === 0) {
            return `No reservation found with id: ${id}`;
        }

        const reservation = rows[0];
        return {
            name: reservation.name,
            property: reservation.property,
            propertyId: reservation.propertyId,
            date:  new Date(reservation.date).toLocaleDateString("en-GB", {
                timeZone: 'UTC', // Ensures it's in UTC without shifting
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }),
            phone: reservation.phone,
            email: reservation.email,
            image: reservation.image,
        };
    } catch (error) {
        return `Error fetching reservation: ${error.message}`;
    }
};


export const GetReservationsTable = async (ownerId) => {
    try {
        const [rows] = await pool.query(
            `
            SELECT
                r.id AS reservationId,
                r.timestamp AS reservationTimestamp,
                p.name AS propertyName,
                (SELECT i.url FROM images i WHERE i.property_id = p.id LIMIT 1) AS propertyImage,
                bb.student_id AS studentId,
                u.f_name AS studentFirstName,
                u.l_name AS studentLastName
            FROM
                reservations r
            JOIN
                properties p ON r.property_id = p.id
            JOIN
                owners o ON p.owner_id = o.id
            JOIN
                boardingbridge_students bb ON r.student_id = bb.id
            JOIN
                university_students u ON bb.student_id = u.id
            WHERE
                o.id = ?;

                        `,
            [ownerId]
        );


        return rows.map((reservation) => ({
            id: reservation.reservationId,
            timestamp: new Date(reservation.reservationTimestamp).toLocaleDateString("en-GB", {
                timeZone: 'UTC', // Ensures it's in UTC without shifting
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }),
            property: {
                name: reservation.propertyName,
                image: reservation.propertyImage,
            },
            student: {
                id: reservation.studentId,
                firstName: reservation.studentFirstName,
                lastName: reservation.studentLastName,
            },
        }));



    } catch (error) {
        console.error(`Error fetching reservations: ${error.message}`);
        throw error;
    }
};

export const GetEditPropertyById = async (id) => {
    try {
        const [rows] = await pool.query(
            `
            SELECT
                p.id,
                p.name,
                p.property_type AS propertyType,
                p.address,
                p.rental_price,
                p.occupancy,
                p.distance_from_university AS distance,
                p.furnishing_essentials AS furnishingType,
                p.amenities,
                p.description AS about,
                o.email,
                o.phone,
                CONCAT(o.f_name, ' ', o.l_name) AS legName,
                p.lat AS latitude,
                p.lang AS longitude,
                (SELECT i.url FROM images i WHERE i.property_id = p.id LIMIT 1) AS image,
                p.status
            FROM
                properties p
            JOIN
                owners o ON p.owner_id = o.id
            WHERE
                p.id = ?
        `,
            [id]
        );

        if (rows.length === 0) {
            return null;
        }

        const property = rows[0];

        return {
            name: property.name,
            propertyType: property.propertyType,
            address: property.address,
            rentalPrice: property.rental_price,
            occupancy: property.occupancy,
            distance: property.distance,
            furnishingType: property.furnishingType,
            amenities: property.amenities ? property.amenities.split(",") : [],
            about: property.about,
            email: property.email,
            phone: property.phone,
            legName: property.legName,
            latitude: property.latitude,
            longitude: property.longitude,
            image: property.image,
            status: property.status,
        };
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const GetSolvePropertyById = async (id) => {
    try {
        const [rows] = await pool.query(
            `
            SELECT
                p.id,
                p.name,
                p.property_type AS propertyType,
                p.address,
                p.occupancy,
                p.distance_from_university AS distance,
                p.furnishing_essentials AS furnishingType,
                p.amenities,
                p.description AS about,
                o.email,
                o.phone,
                CONCAT(o.f_name, ' ', o.l_name) AS legName,
                p.lat AS latitude,
                p.lang AS longitude,
                (SELECT i.url FROM images i WHERE i.property_id = p.id LIMIT 1) AS image,
                pr.comment AS reviewComment,
                pr.timestamp AS reviewTimestamp
            FROM
                properties p
            JOIN
                owners o ON p.owner_id = o.id
            LEFT JOIN
                property_review pr ON p.id = pr.property_id
            WHERE
                p.id = ?
        `,
            [id]
        );

        if (rows.length === 0) {
            return null;
        }

        const property = rows[0];

        return {
            id: property.id,
            name: property.name,
            propertyType: property.propertyType,
            address: property.address,
            occupancy: property.occupancy,
            distance: property.distance,
            furnishingType: property.furnishingType,
            amenities: property.amenities ? property.amenities.split(",") : [],
            about: property.about,
            email: property.email,
            phone: property.phone,
            legName: property.legName,
            latitude: property.latitude,
            longitude: property.longitude,
            image: property.image,
            review: {
                comment: property.reviewComment,
                timestamp: property.reviewTimestamp,
            },
        };
    } catch (error) {
        return `error fetching property by id: ${error}`;
    }
};

export const GetNotificationsTable = async (userId) => {
    try {
        const [notifications] = await pool.query(
            `
            SELECT
                id,
                timestamp,
                title,
                description,
                status,
                category
            FROM
                notifications
            WHERE
                owner_id = ?
        `,
            [userId]
        );

        return notifications;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
    }
};

export const GetReservedDatesOfMonth = async (id, month) => {
    try {
        const [reservedDates] = await pool.query(
            `
            SELECT
                DAY(r.timestamp) AS day
            FROM
                reservations r
            WHERE
                MONTH(r.timestamp) = ? AND r.property_id = ?
        `,
            [month, id]
        );

        const reservedDaysOfMonth = reservedDates.map((date) => {
            return date.day;
        });

        const totalDaysInMonth = new Date(
            new Date().getFullYear(),
            month,
            0
        ).getDate();
        const reservedDatesOfMonth = [];

        for (let i = 1; i <= totalDaysInMonth; i++) {
            if (reservedDaysOfMonth.includes(i)) {
                reservedDatesOfMonth.push(
                    `${new Date().getFullYear()}-${month
                        .toString()
                        .padStart(2, "0")}-${i.toString().padStart(2, "0")}`
                );
            }
        }

        return {
            reservedDates: reservedDatesOfMonth,
        };
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw error;
    }
};

export const GetReservationDetailsByDate = async (id, date) => {
    try {
        const [reservations] = await pool.query(
            `
            SELECT
                r.id,
                p.name,
                (SELECT i.url FROM images i WHERE i.property_id = p.id LIMIT 1) AS image,
                us.f_name AS reservedByFirstName,
                us.l_name AS reservedByLastName,
                r.timestamp AS time
            FROM
                reservations r
            JOIN
                properties p ON r.property_id = p.id
            JOIN
                boardingbridge_students bs ON r.student_id = bs.id
            JOIN
                university_students us ON bs.student_id = us.id
            WHERE
                p.owner_id = ? AND DATE(r.timestamp) = ?
        `,
            [id, date]
        );

        const reservationDetails = reservations.map((reservation) => {
            return {
                id: reservation.id,
                property: reservation.name,
                image: reservation.image,
                reservedBy: `${reservation.reservedByFirstName} ${reservation.reservedByLastName}`,
                time: reservation.time,
            };
        });

        return reservationDetails;
    } catch (error) {
        console.error("Error fetching reservation details:", error);
        throw error;
    }
};

export const GetPropertyTable = async (id) => {
    try {
        const [rows] = await pool.query(
            `
            SELECT
                p.id,
                (SELECT i.url FROM images i WHERE i.property_id = p.id LIMIT 1) AS image,
                p.name AS title,
                pr.timestamp AS reviewDate,
                p.published_at AS publishedDate,
                p.status
            FROM
                properties p
            LEFT JOIN
                property_review pr ON p.id = pr.property_id
            WHERE
                p.owner_id = ?
        `,
            [id]
        );

        if (rows.length === 0) {
            return null;
        }

        const properties = rows.map((property) => {
            return {
                id: property.id,
                image: property.image,
                title: property.title,
                reviewDate: property.reviewDate
                    ? property.reviewDate.toISOString().split("T")[0]
                    : null,
                publishedDate: property.publishedDate
                    ? property.publishedDate.toISOString().split("T")[0]
                    : null,
                status: property.status,
            };
        });

        return properties;
    } catch (error) {
        return `error fetching properties from database: ${error}`;
    }
};

export const GetPropertyView = async (id) => {
    try {
        const [rows] = await pool.query(
            `
            SELECT
                p.id,
                p.property_type AS propertyType,
                p.name,
                p.address,
                p.occupancy,
                p.distance_from_university AS distance,
                p.furnishing_essentials AS furnishingType,
                p.amenities,
                GROUP_CONCAT(i.url SEPARATOR ',') AS propertyPhoto,
                p.description AS about,
                o.f_name,
                o.l_name,
                o.email,
                o.phone,
                o.profile_url,
                p.rental_price AS price,
                p.lat AS latitude,
                p.lang AS longitude
            FROM
                properties p
            JOIN
                owners o ON p.owner_id = o.id
            LEFT JOIN
                images i ON p.id = i.property_id
            WHERE
                p.id = ?
            GROUP BY
                p.id
        `,
            [id]
        );

        if (rows.length === 0) {
            return null;
        }

        const property = rows[0];
        property.propertyPhoto = property.propertyPhoto.split(",");
        property.amenities = property.amenities.split(",");

        return property;
    } catch (error) {
        return `error fetching property from database: ${error}`;
    }
};

export const GetOwner = async (id) => {
    try {
        const [rows] = await pool.query("CALL GetOwner(?)", [id]);
        return rows[0][0];
    } catch (error) {
        return `error fetching admin from database: ${error}`;
    }
};

const GetOwners = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM owners ");
        return rows[0];
    } catch (error) {
        return `error fetching owners from database: ${error}`;
    }
};

export const RegisterOwner = async (
    firstName,
    lastName,
    legName,
    address,
    email,
    phone,
    about,
    userName,
    password,
    docUrl,
    profileUrl
) => {
    try {
        const [rows] = await pool.query(
            "CALL AddOwner(?,?,?,?,?,?,?,?,?,?,?)",
            [
                firstName,
                lastName,
                legName,
                address,
                email,
                phone,
                about,
                userName,
                password,
                docUrl,
                profileUrl,
            ]
        );
        return rows[0][0];
    } catch (error) {
        return `error student admin to the database: ${error}`;
    }
};

// ! Student Queries

const RegisterStudent = async (studentId, email, password) => {
    try {
        const [rows] = await pool.query("CALL AddStudent(?,?,?)", [
            studentId,
            email,
            password,
        ]);
        return rows[0][0];
    } catch (error) {
        return `error student admin to the database: ${error}`;
    }
};

const GetStudent = async (id) => {
    try {
        const [rows] = await pool.query("CALL GetStudent(?)", [id]);
        return rows[0][0];
    } catch (error) {
        return `error fetching admin from database: ${error}`;
    }
};

export {
    GetAdmin,
    GetAdmins,
    RegisterAdmin,
    GetOwners,
    ConnetToSQLServer,
    RegisterStudent,
    GetStudent,
};
