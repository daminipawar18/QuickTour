const express = require("express");
const db = require("../db");
const jwt = require("jsonwebtoken"); // ✅ JWT Authentication
const router = express.Router();

// ✅ Middleware to Authenticate User (Directly in userRoutes.js)
const authenticate = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // ✅ Attach user data to request
        next();
    } catch (err) {
        res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};

// ✅ Get User Profile (Including Email Fix)
router.get("/profile", authenticate, async (req, res) => {
    try {
        const userId = req.user.user_id; // Extract user ID from token

        // ✅ Fetch user details from database
        const [users] = await db.query("SELECT first_name, email, mobile_no, address, role FROM users WHERE id = ?", [userId]);

        if (users.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = users[0];

        // ✅ Return user profile including email
        res.json({
            first_name: user.first_name,
            email: user.email, // ✅ Fix: Ensure email is returned
            mobile_no: user.mobile_no,
            address: user.address || "Not provided",
            role: user.role
        });
    } catch (err) {
        console.error("Profile Fetch Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
