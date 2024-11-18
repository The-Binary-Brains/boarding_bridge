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
        return rows[0][0]
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
const GetOwners = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM owners ");
        return rows[0];
    } catch (error) {
        return `error fetching owners from database: ${error}`;
    }
};

export { GetAdmin, GetAdmins, RegisterAdmin, GetOwners, ConnetToSQLServer };
