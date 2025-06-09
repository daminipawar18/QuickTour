// Importing required modules
const express = require("express");
const router = express.Router();
const db = require("../db");

const maxOtpAttempts = 3;
const validStatuses = [
  'pending', 'confirmed', 'cancelled',
  'started', 'accepted', 'rejected',
  'ongoing', 'completed', 'otp_verified'
];

// 🔧 Utility: Update Ride Status
const updateRideStatus = async (rideId, status) => {
  try {
    const normalizedStatus = status.toLowerCase();
    if (!validStatuses.includes(normalizedStatus)) {
      throw new Error(`Invalid status: ${status}`);
    }
    const [result] = await db.query("UPDATE bookings SET status = ? WHERE id = ?", [normalizedStatus, rideId]);
    return result;
  } catch (err) {
    console.error(`❌ Error updating ride status: ${err.message}`);
    throw new Error("Error updating ride status");
  }
};

// 🔐 Utility: Validate OTP
const validateOtp = async (rideId, enteredOtp) => {
  try {
    const [rows] = await db.query("SELECT otp FROM bookings WHERE id = ?", [rideId]);
    if (rows.length === 0) return false;
    return rows[0].otp.toString().trim() === enteredOtp.toString().trim();
  } catch (err) {
    console.error(`❌ OTP Validation Error: ${err.message}`);
    throw new Error("Error validating OTP");
  }
};

// 🔁 Utility: Update OTP Attempts
const updateOtpAttempts = async (rideId) => {
  const [rows] = await db.query("SELECT otp_attempts FROM bookings WHERE id = ?", [rideId]);
  if (rows.length === 0) throw new Error("Ride not found");
  const attempts = rows[0].otp_attempts;
  if (attempts >= maxOtpAttempts) throw new Error("Maximum OTP attempts exceeded");

  await db.query("UPDATE bookings SET otp_attempts = otp_attempts + 1 WHERE id = ?", [rideId]);
};

module.exports = (io) => {

  // 🚗 Book Ride
  router.post("/", async (req, res) => {
    try {
      const requiredFields = [
        "ride_id", "driver_id", "driver_name", "user_id",
        "from_location", "to_location", "ride_date", "seats_booked",
        "price", "vehicle", "otp"
      ];

      for (let field of requiredFields) {
        if (!req.body[field] || req.body[field] === "Not specified") {
          return res.status(400).json({ success: false, message: `Missing or invalid: ${field}` });
        }
      }

      let {
        ride_id, driver_id, driver_name, user_id,
        from_location, to_location, ride_date, ride_time,
        seats_booked, price, vehicle, otp
      } = req.body;

      ride_time = ride_time && ride_time !== "Not specified"
        ? ride_time
        : new Date().toLocaleTimeString("en-GB", { hour12: false });

      const [insertBooking] = await db.query(
        `INSERT INTO bookings 
        (ride_id, driver_id, driver_name, user_id, from_location, to_location, ride_date, ride_time, seats_booked, price, vehicle, otp, status, otp_attempts, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 0, NOW())`,
        [ride_id, driver_id, driver_name, user_id, from_location, to_location, ride_date, ride_time, seats_booked, price, vehicle, otp]
      );

      const bookingDetails = {
        ...req.body,
        booking_id: insertBooking.insertId,
        status: 'pending'
      };

      io.emit("newRideRequest", bookingDetails);
      res.status(201).json({ success: true, message: "Ride booked successfully!", booking_id: insertBooking.insertId });

    } catch (error) {
      console.error("❌ Booking Error:", error.message);
      res.status(500).json({ success: false, message: "Internal server error while booking ride." });
    }
  });

  // 👨‍✈️ Get Assigned Ride for Driver
  router.get("/assigned/:driverId", async (req, res) => {
    try {
      const { driverId } = req.params;
      const query = `
        SELECT b.id, b.from_location, b.to_location, b.status, u.first_name AS riderName, b.otp
        FROM bookings b
        JOIN users u ON b.user_id = u.id
        WHERE b.driver_id = ? AND b.status IN ('pending', 'accepted', 'ongoing')
        ORDER BY b.created_at DESC LIMIT 1;
      `;
      const [rides] = await db.query(query, [driverId]);
      res.json({ success: true, rides });
    } catch (error) {
      console.error("❌ Assigned Ride Error:", error.message);
      res.status(500).json({ success: false, message: "Error fetching assigned rides" });
    }
  });

  // ✅ Accept Ride
  router.patch('/accept-ride/:rideId', async (req, res) => {
    const { rideId } = req.params;
    try {
      const result = await updateRideStatus(rideId, 'accepted');
      if (!result.affectedRows) {
        return res.status(404).json({ success: false, message: 'Ride not found' });
      }
      const [updatedRide] = await db.query("SELECT * FROM bookings WHERE id = ?", [rideId]);
      res.json({ success: true, message: 'Ride accepted successfully', ride: updatedRide[0] });
    } catch (error) {
      console.error("❌ Error accepting ride:", error.message);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  // 🔐 Verify OTP
 // 🔐 Verify OTP
 router.post('/verify-otp', async (req, res) => {
  const { enteredOtp } = req.body;

  try {
    const [rows] = await db.execute(
      'SELECT * FROM bookings WHERE otp = ?',
      [enteredOtp]
    );

    if (rows.length > 0) {
      res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



  

  // 🚦 Start Ride
  router.patch('/start-ride/:rideId', async (req, res) => {
    const { rideId } = req.params;
    try {
      const result = await updateRideStatus(rideId, 'started');
      if (!result.affectedRows) {
        return res.status(404).json({ success: false, message: "Ride not found" });
      }
      io.emit("rideStatusUpdated", { rideId, status: 'started' });
      res.json({ success: true, message: `Ride ${rideId} started successfully` });
    } catch (err) {
      console.error("❌ Start Ride Error:", err.message);
      res.status(500).json({ success: false, message: "Server error while starting ride" });
    }
  });


  //complete-ride
  router.patch('/complete-ride', async (req, res) => {
    try {
        // Fetch the current status of the ride that is 'started'
        const [ride] = await db.query("SELECT * FROM bookings WHERE status = 'started' LIMIT 1");

        // If the ride doesn't exist or isn't started, return an error
        if (ride.length === 0) {
            return res.status(404).json({ success: false, message: "No ride in progress to complete." });
        }

        // Get the rideId from the fetched ride (as it's now directly available)
        const rideId = ride[0].id;

        // Update the status to 'completed'
        const result = await updateRideStatus(rideId, 'completed');
        if (!result.affectedRows) {
            return res.status(404).json({ success: false, message: "Error completing the ride." });
        }

        // Emit real-time update to other parts of the app (e.g., admin, rider)
        io.emit("rideStatusUpdated", { rideId, status: "completed" });

        // Return success response
        res.json({ success: true, message: `Ride ${rideId} completed successfully` });
    } catch (error) {
        console.error("❌ Complete Ride Error:", error.message);
        res.status(500).json({ success: false, message: "Error completing ride" });
    }
});




  // ❌ Cancel Ride
  router.patch('/cancel-ride/:rideId', async (req, res) => {
    const { rideId } = req.params;
    try {
      const result = await updateRideStatus(rideId, 'cancelled');
      if (!result.affectedRows) {
        return res.status(404).json({ success: false, message: "Ride not found" });
      }
      io.emit("rideStatusUpdated", { rideId, status: "cancelled" });
      res.json({ success: true, message: `Ride ${rideId} cancelled successfully` });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to cancel ride" });
    }
  });

  // 🔍 Get Ride by ID
  router.get('/get/:rideId', async (req, res) => {
    const { rideId } = req.params;
    try {
      const [ride] = await db.query("SELECT * FROM bookings WHERE id = ?", [rideId]);
      if (ride.length === 0) {
        return res.status(404).json({ success: false, message: "Ride not found" });
      }
      res.json({ success: true, data: ride[0] });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching ride" });
    }
  });

  // 📖 Get Bookings by User ID (Ride History)
  router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      const [rides] = await db.query("SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC", [userId]);
      res.json({ success: true, data: rides });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch ride history" });
    }
  });

  return router;
};
