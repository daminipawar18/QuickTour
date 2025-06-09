import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import drivers from "./drivers";
import { FaUserCircle } from "react-icons/fa";
import "./DriverList.css";

const locationMapping = {
  "pune district": "Pune",
  "nashik district": "Nashik",
  "mumbai": "Mumbai",
};

const cleanLocation = (location) =>
  location?.trim().toLowerCase().replace(/\s+/g, " ").replace(/district/g, "").trim();

const mapLocation = (location) =>
  locationMapping[cleanLocation(location)]?.toLowerCase() || cleanLocation(location);

const DriverList = () => {
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [selectedSeats, setSelectedSeats] = useState({});
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const from = params.get("from")?.trim();
    const to = params.get("to")?.trim();

    if (!from || !to) {
      setLoading(false);
      return;
    }

    const searchFrom = mapLocation(from);
    const searchTo = mapLocation(to);

    const matchingDrivers = drivers.filter(
      (driver) => mapLocation(driver.from) === searchFrom && mapLocation(driver.to) === searchTo
    );

    console.log("📌 Filtered Drivers:", matchingDrivers);
    setFilteredDrivers(matchingDrivers);
    setLoading(false);
  }, [location.search]);

  const sortedDrivers = useMemo(() => {
    return [...filteredDrivers].sort((a, b) => {
      switch (sortOption) {
        case "low-price":
          return a.price - b.price;
        case "high-price":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [filteredDrivers, sortOption]);

  const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

  const handleSeatChange = useCallback((driverId, value) => {
    setSelectedSeats((prev) => ({
      ...prev,
      [driverId]: value,
    }));
  }, []);

  const handleBookRide = useCallback(
    async (ride) => {
      if (bookingLoading) return;

      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        alert("⚠️ Please log in first!");
        navigate("/login");
        return;
      }

      setBookingLoading(true);
      try {
        const driverData = filteredDrivers.find((driver) => driver.id === ride.id);
        if (!driverData) throw new Error("Driver not found");

        const bookingData = {
          ride_id: ride.id,
          driver_id: driverData.id,
          driver_name: driverData.name,
          driver_phone: driverData.phone || "Unknown",
          user_id: user.id,
          from_location: driverData.from,
          to_location: driverData.to,
          price: driverData.price,
          vehicle: driverData.vehicle || "Not specified",
          ride_date: ride.ride_date || new Date().toISOString().split("T")[0],
          ride_time: ride.ride_time || "Not specified",
          seats_booked: selectedSeats[ride.id] || 1,
          otp: generateOTP(),
        };

        console.log("🚀 Booking Data:", bookingData);

        const response = await fetch("http://localhost:5000/api/bookrides", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        });

        const data = await response.json();
        if (data.success) {
          localStorage.setItem("bookedRide", JSON.stringify(bookingData));
          alert("✅ Ride booked successfully!");
          navigate(`/booking-confirmation?rideId=${ride.id}`);
        } else {
          throw new Error(data.message || "Unknown error");
        }
      } catch (error) {
        console.error("❌ Booking error:", error);
        alert("⚠️ An error occurred while booking the ride.");
      }
      setBookingLoading(false);
    },
    [navigate, selectedSeats, filteredDrivers, bookingLoading]
  );

  return (
    <div className="driver-list-container">
      <h2>🚖 Available Drivers</h2>

      <div className="sort-container">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Select</option>
          <option value="low-price">Lowest Price</option>
          <option value="high-price">Highest Price</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : sortedDrivers.length === 0 ? (
        <p>No drivers found for this route.</p>
      ) : (
        <div className="driver-list-grid">
          {sortedDrivers.map((driver, index) => (
            <div className="driver-card" key={index}>
              <div className="driver-info">
                <div className="driver-pic">
                  {driver.avatar ? (
                    <img src={driver.avatar} alt="Driver Avatar" className="rounded-circle hover-effect" />
                  ) : (
                    <FaUserCircle size={60} className="text-secondary" />
                  )}
                </div>
                <div className="driver-details">
                  <h3 className="driver-name">{driver.name}</h3>
                  <p><strong>From:</strong> {driver.from} → {driver.to}</p>
                  <p><strong>Price:</strong> ₹{driver.price}</p>
                  <label><strong>Seats:</strong></label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={selectedSeats[driver.id] || 1}
                    onChange={(e) => handleSeatChange(driver.id, Number(e.target.value))}
                    className="seat-input"
                  />
                  <button 
                    className="book-btn interactive" 
                    onClick={() => handleBookRide(driver)}
                    disabled={bookingLoading}
                  >
                    {bookingLoading ? "Booking..." : "Book Ride"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriverList;
