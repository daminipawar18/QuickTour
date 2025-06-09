const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const db = require("./db");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("✅ Middleware initialized...");

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/drivers", require("./routes/driverRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/rides", require("./routes/rides"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// ✅ Load Book Ride Routes with Socket
try {
    const bookRideRoutes = require("./routes/bookRides");
    if (typeof bookRideRoutes === "function") {
        app.use("/api/bookrides", bookRideRoutes(io));
        app.use("/api/bookings", bookRideRoutes(io));
        console.log("✅ bookRideRoutes registered successfully.");
    } else {
        console.error("❌ bookRideRoutes is not a function.");
    }
} catch (error) {
    console.error("❌ Error loading bookRideRoutes:", error);
}

// ✅ Socket.io
io.on("connection", (socket) => {
    console.log(`🚗 Connected: ${socket.id}`);

    socket.on("rideStatusUpdated", () => {
        io.emit("rideStatusUpdated");
        console.log("📢 Ride status broadcasted");
    });

    socket.on("disconnect", () => {
        console.log(`❌ Disconnected: ${socket.id}`);
    });
});

// ✅ Start Server
server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// Export io
module.exports = { io };
