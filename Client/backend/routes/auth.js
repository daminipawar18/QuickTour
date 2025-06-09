const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
require("dotenv").config(); // ✅ Load environment variables

const router = express.Router();

// ✅ User Signup Route
router.post("/signup", async (req, res) => {
    const { first_name, role, mobile_no, email, password } = req.body;

    if (!first_name || !role || !mobile_no || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        console.log("🔍 Checking if user already exists:", email);
        
        // ✅ Check if user already exists
        const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        
        if (existingUser && existingUser.length > 0) {
            console.log("❌ Email already in use:", email);
            return res.status(400).json({ error: "Email already in use" });
        }

        console.log("✅ Email available, proceeding with signup:", email);

        // ✅ Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Insert user into database
        const [result] = await db.query(
            "INSERT INTO users (first_name, role, mobile_no, email, password) VALUES (?, ?, ?, ?, ?)",
            [first_name, role, mobile_no, email, hashedPassword]
        );

        if (result.affectedRows > 0) {
            console.log("✅ Signup successful for:", email);
            return res.status(201).json({ message: "Signup successful!" });
        } else {
            console.error("❌ Database insert failed.");
            return res.status(500).json({ error: "Signup failed, please try again." });
        }
    } catch (err) {
        console.error("❌ Signup Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ User Login Route (Returns driver_id for drivers)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        console.log("🔍 Attempting login for:", email);

        // ✅ Fetch user data
        const [users] = await db.query(
            `SELECT id, first_name, email, mobile_no, role, password,
            CASE WHEN role = 'driver' THEN id ELSE NULL END AS driver_id
            FROM users WHERE email = ?`,
            [email]
        );

        if (!users || users.length === 0) {
            console.log("❌ User not found:", email);
            return res.status(404).json({ error: "User not found" });
        }

        const user = users[0];

        console.log("✅ User found, verifying password:", email);

        // ✅ Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("❌ Invalid password attempt:", email);
            return res.status(401).json({ error: "Invalid password" });
        }

        console.log("✅ Password matched, generating token for:", email);

        // ✅ Generate JWT Token
        const token = jwt.sign(
            { user_id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "7d" }
        );

        console.log("✅ Token generated successfully for:", email);

        // ✅ Return token & user data
        return res.json({
            token,
            user: {
                id: user.id,
                driver_id: user.driver_id,  // ✅ Only for drivers
                first_name: user.first_name,
                email: user.email,
                mobile_no: user.mobile_no,
                role: user.role
            }
        });

    } catch (err) {
        console.error("❌ Login Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
