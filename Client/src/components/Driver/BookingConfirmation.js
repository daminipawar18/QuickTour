import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaComments, FaTimesCircle, FaMapMarkedAlt } from "react-icons/fa";
import "./BookingConfirmation.css";

const BookingConfirmation = () => {
  const navigate = useNavigate();

  // Fetch ride details from localStorage
  const [rideDetails, setRideDetails] = useState(() => {
    const savedRide = localStorage.getItem("bookedRide");
    return savedRide ? JSON.parse(savedRide) : null;
  });

  const otp = rideDetails?.otp || "Not available";

  useEffect(() => {
    if (rideDetails) {
      localStorage.setItem("bookedRide", JSON.stringify(rideDetails));
    }
  }, [rideDetails]);

  const handleCallDriver = () => {
    if (rideDetails?.driver_phone && rideDetails.driver_phone !== "Unknown") {
      window.location.href = `tel:${rideDetails.driver_phone}`;
    } else {
      alert("Driver contact number is not available!");
    }
  };

  const handleChatDriver = () => {
    if (rideDetails?.driver_name) {
      navigate("/chat", {
        state: {
          driverId: rideDetails.driver_id,
          driverName: rideDetails.driver_name,
        },
      });
    } else {
      alert("Driver information is missing!");
    }
  };

  const handleCancelRide = () => {
    if (window.confirm("Are you sure you want to cancel this ride?")) {
      localStorage.removeItem("bookedRide");
      localStorage.removeItem("otp"); // Optional: if stored separately
      navigate("/rider-dashboard");
    }
  };

  // New: Track Ride Button handler
  const handleTrackRide = () => {
    navigate("/track-ride", { state: { rideDetails } });
  };

  // Check if ride started (adjust status name as per your system)
  const rideStarted = rideDetails?.status === "Confirmed" || rideDetails?.status === "Started";

  return (
    <div className="booking-confirmation">
      <h2>🚖 Ride Booking Successful</h2>
      {rideDetails ? (
        <>
          <h3>
            📍 {rideDetails.from_location} → {rideDetails.to_location}
          </h3>
          <p>
            <strong>👨‍✈️ Driver:</strong> {rideDetails.driver_name}
          </p>
          <p>
            <strong>📞 Contact:</strong> {rideDetails.driver_phone}
          </p>
          <p>
            <strong>🚗 Car:</strong> {rideDetails.vehicle} - {rideDetails.car_number}
          </p>
          <p>
            <strong>🕒 Estimated Time:</strong> 20-25 mins
          </p>
          <p>
            <strong>💰 Fare:</strong> ₹{rideDetails.price}
          </p>
          <p>
            <strong>🔢 OTP:</strong> {otp}
          </p>

          <div className="button-group">
            <button className="call-driver-btn" onClick={handleCallDriver}>
              <FaPhoneAlt /> Call Driver
            </button>
            <button className="chat-driver-btn" onClick={handleChatDriver}>
              <FaComments /> Chat with Driver
            </button>
            <button className="cancel-ride-btn" onClick={handleCancelRide}>
              <FaTimesCircle /> Cancel Ride
            </button>

            {/* Show "Track Your Ride" only when ride started */}
            {rideStarted && (
              <button className="track-ride-btn" onClick={handleTrackRide}>
                <FaMapMarkedAlt /> Track Your Ride
              </button>
            )}
          </div>
        </>
      ) : (
        <p>No ride details found.</p>
      )}
    </div>
  );
};

export default BookingConfirmation;
