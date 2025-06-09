import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./DriverSidebar";
import axios from "axios";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import "./driverdashboard.css";

const API_BASE_URL = "http://localhost:5000/api/bookings";
const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  autoConnect: false,
});

const DriverDashboard = () => {
  const [user, setUser] = useState(null);
  const [assignedRides, setAssignedRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingRide, setProcessingRide] = useState({});
  const [rideOtps, setRideOtps] = useState({});
  const [otpVerifiedRides, setOtpVerifiedRides] = useState({});
  const [otpLoading, setOtpLoading] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "driver") {
      localStorage.removeItem("user");
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  useEffect(() => {
    if (user?.driver_id) {
      if (!socket.connected) socket.connect();

      const updateRides = () => fetchAssignedRides();

      fetchAssignedRides();

      socket.on("newRide", updateRides);
      socket.on("rideStatusUpdated", updateRides);

      return () => {
        socket.off("newRide", updateRides);
        socket.off("rideStatusUpdated", updateRides);
      };
    }
  }, [user]);

  const fetchAssignedRides = async () => {
    if (!user?.driver_id) return;

    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/assigned/${user.driver_id}`);
      setAssignedRides(res.data?.rides || []);
    } catch (err) {
      console.error("Error fetching rides:", err);
      toast.error("❌ Error fetching rides.");
    } finally {
      setLoading(false);
    }
  };

  const updateRideStatus = (rideId, status) => {
    setAssignedRides((prev) =>
      prev.map((ride) => (ride.id === rideId ? { ...ride, status } : ride))
    );
  };

  const handleRideAction = async (rideId, action) => {
    const confirmMessages = {
      accept: "Do you want to accept this ride?",
      reject: "Do you want to reject this ride?",
      start: "Do you want to start this ride now?",
      complete: "Do you want to mark this ride as completed?",
    };

    if (!window.confirm(confirmMessages[action])) return;

    const statusMap = {
      accept: "Accepted",
      reject: "Rejected",
      start: "Started",
      complete: "Completed",
    };

    const apiMap = {
      accept: `${API_BASE_URL}/accept-ride/${rideId}`,
      reject: `${API_BASE_URL}/reject-ride/${rideId}`,
      start: `${API_BASE_URL}/start-ride/${rideId}`,
      complete: `${API_BASE_URL}/complete-ride/${rideId}`, // Make sure this API is correct
    };

    try {
      setProcessingRide((prev) => ({ ...prev, [rideId]: true }));

      const res = await axios.patch(apiMap[action], {
        status: statusMap[action],
      });

      if (res.data.success) {
        updateRideStatus(rideId, statusMap[action]);
        socket.emit("rideStatusUpdated", rideId);
        toast.success(`✅ Ride ${statusMap[action].toLowerCase()} successfully`);
      } else {
        toast.error("❌ Error updating ride status.");
      }
    } catch (err) {
      console.error(`Error on ${action}:`, err);
      toast.error(`❌ Error: ${err.message}`);
    } finally {
      setProcessingRide((prev) => ({ ...prev, [rideId]: false }));
    }
  };

  const handleOtpChange = (rideId, value) => {
    setRideOtps((prev) => ({ ...prev, [rideId]: value }));
  };

  const handleVerifyOtp = async (rideId) => {
    const enteredOtp = rideOtps[rideId];

    if (!enteredOtp || enteredOtp.trim() === "") {
      toast.error("❌ Please enter the OTP.");
      return;
    }

    setOtpLoading((prev) => ({ ...prev, [rideId]: true }));

    try {
      const res = await axios.post(`${API_BASE_URL}/verify-otp`, {
        rideId,
        enteredOtp,
      });

      if (res.data.success) {
        setOtpVerifiedRides((prev) => ({ ...prev, [rideId]: true }));
        setRideOtps((prev) => ({ ...prev, [rideId]: "" }));
        toast.success("✅ OTP verified! You can now start the ride.");
      } else {
        toast.error(`❌ ${res.data.message || "Invalid OTP. Try again."}`);
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      toast.error("❌ Server error while verifying OTP.");
    } finally {
      setOtpLoading((prev) => ({ ...prev, [rideId]: false }));
    }
  };

  return (
    <div className="driver-dashboard-container">
      <div className="dashboard-layout">
        <Sidebar setUser={setUser} />
        <div className="dashboard-content">
          <h3>🚗 Assigned Rides</h3>

          {loading ? (
            <div className="loading-spinner">Loading rides...</div>
          ) : assignedRides.length > 0 ? (
            <ul className="ride-list">
              {assignedRides.map((ride) => {
                const status = (ride.status || "").toLowerCase();
                const isOtpVerified = otpVerifiedRides[ride.id];

                return (
                  <li key={ride.id} className="ride-card">
                    <p>
                      <strong>Rider:</strong>{" "}
                      {ride.riderName || ride.rider_name || "Unknown"}
                    </p>
                    <p>
                      <strong>From:</strong> {ride.from_location} →{" "}
                      <strong>To:</strong> {ride.to_location}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className={`status ${status}`}>{ride.status}</span>
                    </p>

                    {status === "pending" && (
                      <div className="btn-group">
                        <button
                          className="accept-btn"
                          onClick={() => handleRideAction(ride.id, "accept")}
                          disabled={processingRide[ride.id]}
                        >
                          ✅ Accept
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => handleRideAction(ride.id, "reject")}
                          disabled={processingRide[ride.id]}
                        >
                          ❌ Reject
                        </button>
                      </div>
                    )}

                    {status === "accepted" && (
                      <div>
                        {!isOtpVerified ? (
                          <>
                            <input
                              type="text"
                              placeholder="Enter OTP"
                              className="otp-input"
                              value={rideOtps[ride.id] || ""}
                              onChange={(e) =>
                                handleOtpChange(ride.id, e.target.value)
                              }
                            />
                            <button
                              className="verify-btn"
                              onClick={() => handleVerifyOtp(ride.id)}
                              disabled={otpLoading[ride.id]}
                            >
                              {otpLoading[ride.id]
                                ? "Verifying..."
                                : "🔐 Verify OTP"}
                            </button>
                          </>
                        ) : (
                          <button
                            className="start-btn"
                            onClick={() => handleRideAction(ride.id, "start")}
                            disabled={processingRide[ride.id]}
                          >
                            🚗 Start Ride
                          </button>
                        )}
                      </div>
                    )}

                    {status === "started" && (
                      <button
                        className="complete-btn"
                        onClick={() => handleRideAction(ride.id, "complete")}
                        disabled={processingRide[ride.id]}
                      >
                        🏁 Complete Ride
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No assigned rides at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
