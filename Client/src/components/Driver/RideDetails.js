// RideDetails.js
import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/bookings";

const RideDetails = ({
  ride,
  onRideStatusUpdated,
  rideToVerify,
  setOtpInputs,
  otpInputs,
  errorMessages,
  setErrorMessages,
}) => {
  const handleVerifyOtp = async () => {
    const enteredOtp = otpInputs[ride.id];

    if (!enteredOtp) {
      setErrorMessages((prev) => ({ ...prev, [ride.id]: "Please enter OTP" }));
      return;
    }

    try {
      const res = await axios.patch(`${API_BASE_URL}/accept-ride/${ride.id}`, {
        otp: enteredOtp,
      });

      if (res.data.success) {
        onRideStatusUpdated(ride.id, "Started");
        setOtpInputs((prev) => ({ ...prev, [ride.id]: "" }));
        setErrorMessages((prev) => ({ ...prev, [ride.id]: "" }));
        alert("✅ OTP verified! Ride started.");
      } else {
        setErrorMessages((prev) => ({
          ...prev,
          [ride.id]: res.data.message || "Invalid OTP",
        }));
      }
    } catch (error) {
      setErrorMessages((prev) => ({
        ...prev,
        [ride.id]: error.response?.data?.message || "Error verifying OTP",
      }));
    }
  };

  const handleCompleteRide = async () => {
    try {
      const res = await axios.patch(`${API_BASE_URL}/update-ride-status/${ride.id}`, {
        status: "Completed",
      });

      if (res.data.success) {
        onRideStatusUpdated(ride.id, "Completed");
        alert("🎉 Ride successfully completed!");
      } else {
        alert("❌ Failed to mark as completed");
      }
    } catch (error) {
      alert("⚠️ Server error");
    }
  };

  return (
    <li key={ride.id} className="ride-card">
      <p><strong>Rider:</strong> {ride.riderName || "Unknown"}</p>
      <p><strong>From:</strong> {ride.from_location} → <strong>To:</strong> {ride.to_location}</p>
      <p><strong>Status:</strong> <span className={`status ${ride.status.toLowerCase()}`}>{ride.status}</span></p>

      {ride.status === "pending" && (
        <>
          <button className="accept-btn" onClick={() => onRideStatusUpdated(ride.id, "Accepted")}>✅ Accept</button>
          <button className="reject-btn" onClick={() => onRideStatusUpdated(ride.id, "Rejected")}>❌ Reject</button>
        </>
      )}

      {ride.status === "accepted" && ride.id === rideToVerify && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otpInputs[ride.id] || ""}
            onChange={(e) =>
              setOtpInputs((prev) => ({
                ...prev,
                [ride.id]: e.target.value.trim(),
              }))
            }
            className="otp-input"
          />
          {errorMessages[ride.id] && (
            <p className="otp-error">{errorMessages[ride.id]}</p>
          )}
          <button className="confirm-otp-btn" onClick={handleVerifyOtp}>🚗 Start Ride</button>
        </>
      )}

      {ride.status === "started" && (
        <button className="complete-btn" onClick={handleCompleteRide}>✅ Complete Ride</button>
      )}

      {ride.status === "completed" && <p className="success-msg">🎉 Ride completed</p>}
    </li>
  );
};

export default RideDetails;
