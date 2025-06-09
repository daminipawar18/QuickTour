const mysql = require("mysql2/promise");
require("dotenv").config();

// ✅ Check for missing environment variables
const requiredEnvVars = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];
requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
        console.error(`❌ Missing environment variable: ${key}`);
        process.exit(1);
    }
});

// ✅ Create MySQL Connection Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true, // ✅ Allow multiple queries
});

// ✅ Test database connection
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Database Connected Successfully!");

        // ✅ Check if essential tables exist
        const tablesToCheck = ["users", "rides", "drivers", "bookings"];
        for (const table of tablesToCheck) {
            const [rows] = await connection.query(`SHOW TABLES LIKE '${table}'`);
            if (rows.length > 0) {
                console.log(`✅ '${table}' table exists!`);
            } else {
                console.warn(`⚠️ Warning: '${table}' table NOT found!`);
                console.warn(`💡 Possible Fix: Create the '${table}' table manually.`);
            }
        }

        connection.release();
    } catch (err) {
        console.error("❌ Database Connection Failed:", err.message);
        process.exit(1);
    }
})();

module.exports = pool;
