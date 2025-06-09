const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ Debugging Log
console.log("✅ Ride Routes Loaded");

// ✅ Get Available Rides
router.get("/", async (req, res) => {
    try {
        console.log("📢 Fetching rides from database...");
        const [rides] = await db.query("SELECT * FROM rides");

        if (rides.length === 0) {
            return res.status(404).json({ message: "No rides available" });
        }

        res.json(rides);
    } catch (error) {
        console.error("❌ Error fetching rides:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
