const express = require("express");
const db = require("../db"); // ✅ Ensure correct path
const router = express.Router();

// ✅ Driver Dashboard API
router.get("/driver/dashboard/:driverId", (req, res) => {
    const driverId = req.params.driverId; // Get ID from URL

    if (!driverId) {
        return res.status(400).json({ error: "Driver ID is required" });
    }

    const query = "SELECT id, `from`, `to`, `status` FROM rides WHERE driver_id = ?";
    
    db.query(query, [driverId], (err, results) => {
        if (err) {
            console.error("❌ Error fetching driver rides:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});

module.exports = router;
