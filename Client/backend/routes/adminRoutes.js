const express = require("express");
const router = express.Router();
const db = require("../db");  // ✅ Ensure this is correctly imported

// ✅ Fetch All Users (With Optional Role Filtering)
router.get("/users", async (req, res) => {
    const { role } = req.query;

    try {
        let query = "SELECT id, first_name, email, mobile_no, role FROM users";
        let values = [];

        // Add filtering by role if provided
        if (role) {
            if (role !== "user" && role !== "driver") {
                return res.status(400).json({ message: "Invalid role. Use 'user' or 'driver'." });
            }
            query += " WHERE role = ?";
            values.push(role);
        }

        const [users] = await db.query(query, values);
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Failed to fetch users." });
    }
});

// ✅ Fetch Only Drivers with selected fields (for Driver Management Page)
router.get("/drivers", async (req, res) => {
    console.log("🚀 Drivers route hit");  // Log to confirm if this is being triggered
    try {
        const [drivers] = await db.query("SELECT id, first_name, email, mobile_no FROM users WHERE role = 'driver'");
        res.json({ success: true, drivers });
    } catch (error) {
        console.error("❌ Error fetching drivers:", error);
        res.status(500).json({ error: "Failed to fetch drivers" });
    }
});

// ✅ Approve Driver
router.patch("/approve/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query("UPDATE users SET approved = 1 WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Driver not found!" });
        }
        console.log(`✅ Driver ID ${id} approved successfully.`);
        res.json({ message: "✅ Driver approved successfully!" });
    } catch (error) {
        console.error("❌ Error approving driver:", error);
        res.status(500).json({ message: "Failed to approve driver." });
    }
});

// ✅ Remove Driver (Soft Delete)
router.delete("/remove/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Driver not found!" });
        }
        console.log(`❌ Driver ID ${id} removed successfully.`);
        res.json({ message: "❌ Driver removed successfully!" });
    } catch (error) {
        console.error("❌ Error removing driver:", error);
        res.status(500).json({ message: "Failed to remove driver." });
    }
});

// ✅ Fetch Booking Details (with rider and driver names)
// adminRoutes.js
router.get("/bookings", async (req, res) => {
    try {
      const [bookings] = await db.query(`
        SELECT 
          id,
          driver_id,
          user_id,
          seats_booked,
          from_location,
          to_location,
          vehicle,
          ride_date,
          ride_time,
          price,
          ride_status,
          otp_verified
        FROM bookings
      `);
      res.json(bookings);
    } catch (error) {
      console.error("❌ Error fetching booking details:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  



module.exports = router;
