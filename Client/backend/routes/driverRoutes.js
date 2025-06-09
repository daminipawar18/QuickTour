const express = require("express");
const db = require("../db"); // MySQL database connection
const router = express.Router();

// ✅ Fetch drivers based on route
router.get("/drivers", async (req, res) => {
    const { from, to } = req.query;

    if (!from || !to) {
        return res.status(400).json({ success: false, message: "Please provide both 'from' and 'to' locations" });
    }

    try {
        const [drivers] = await db.query("SELECT * FROM drivers WHERE location_from = ? AND location_to = ?", [from, to]);

        if (drivers.length === 0) {
            return res.status(404).json({ success: false, message: "No drivers found for this route" });
        }

        res.json({ success: true, drivers });
    } catch (error) {
        console.error("❌ Error fetching drivers:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// ✅ Fetch driver details by ID
router.get("/getDriverById/:id", async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ success: false, message: "Driver ID is required" });
    }

    try {
        const [driver] = await db.query("SELECT * FROM drivers WHERE id = ?", [id]);

        if (driver.length === 0) {
            return res.status(404).json({ success: false, message: "Driver not found" });
        }

        res.json({ success: true, driver: driver[0] });
    } catch (error) {
        console.error("❌ Error fetching driver:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
