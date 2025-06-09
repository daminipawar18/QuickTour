import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import RideSearch from "./RideSearch";
import "./riderdashboard.css";

const RiderDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookedRides, setBookedRides] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "rider") {
      navigate("/login");
      return;
    }
    setUser(storedUser);
    setLoading(false);
  }, [navigate]);

  // Fetch booked rides
  const fetchBookedRides = () => {
    if (!user) return;
    const allRides = JSON.parse(localStorage.getItem("rideRequests")) || [];
    const userRides = allRides.filter((ride) => ride.riderId === user.id);
    setBookedRides(userRides);
  };

  useEffect(() => {
    if (user) {
      fetchBookedRides();
    }
  }, [user]);

  // Auto-Update Rides When Status Changes (from other tabs/windows)
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "rideUpdated") {
        fetchBookedRides();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleSearchResults = (rides) => {
    setSearchResults(rides);
  };

  // Book Ride with OTP
  const sendRideRequest = (ride) => {
    const otp = Math.floor(1000 + Math.random() * 9000);

    const rideRequest = {
      requestId: Date.now(),
      riderId: user.id,
      driverId: ride.driverId,
      driverName: ride.driverName,
      phone: ride.phone || "N/A",
      vehicle: ride.vehicle || "N/A",
      pickupLocation: ride.from,
      dropoffLocation: ride.to,
      time: ride.time,
      otp: otp,
      status: "Pending",
    };

    const rideRequests = JSON.parse(localStorage.getItem("rideRequests")) || [];
    rideRequests.push(rideRequest);
    localStorage.setItem("rideRequests", JSON.stringify(rideRequests));
    localStorage.setItem("pendingOtp", otp);

    setBookedRides(rideRequests);
    alert("Ride request sent successfully!");
  };

  // Verify OTP When Ride is Accepted
  const verifyOtp = (ride) => {
    const storedOtp = localStorage.getItem("pendingOtp");
    const enteredOtp = prompt(`Enter OTP for ride confirmation:`);

    if (enteredOtp !== storedOtp) {
      alert("Incorrect OTP! Ride cannot be started.");
      return;
    }

    const updatedRides = bookedRides.map((r) => {
      if (r.requestId === ride.requestId) {
        return { ...r, status: "Confirmed" };
      }
      return r;
    });

    localStorage.setItem("rideRequests", JSON.stringify(updatedRides));
    setBookedRides(updatedRides);
    localStorage.removeItem("pendingOtp");
    alert("Ride started successfully!");
  };

  // Cancel Ride
  const cancelRide = (index) => {
    const updatedRides = [...bookedRides];
    updatedRides.splice(index, 1);
    setBookedRides(updatedRides);
    localStorage.setItem("rideRequests", JSON.stringify(updatedRides));
  };

  // Navigate to Track Ride page
  const handleTrackRide = (ride) => {
    navigate("/track-ride", { state: { ride } });
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="rider-dashboard-container">
      <div className="dashboard-layout">
        <Sidebar setUser={setUser} />
        <div className="dashboard-content">
          <div className="navbar">
            <h3>Welcome, {user?.first_name || "Rider"}! 🏍️</h3>
          </div>

          <RideSearch onSearchResults={handleSearchResults} />

          {searchResults.length > 0 && (
            <div>
              <h3>🚖 Available Rides</h3>
              <ul className="ride-list">
                {searchResults.map((ride, index) => (
                  <li key={index} className="ride-card">
                    <p>
                      <strong>Driver:</strong> {ride.driverName}
                    </p>
                    <p>
                      <strong>Pickup:</strong> {ride.from} → <strong>Drop:</strong>{" "}
                      {ride.to}
                    </p>
                    <p>
                      <strong>Time:</strong> {ride.time}
                    </p>
                    <button onClick={() => sendRideRequest(ride)}>Book Ride</button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <h3>🚖 Your Booked Rides</h3>
          {bookedRides.length > 0 ? (
            <ul className="ride-list">
              {bookedRides.map((ride, index) => (
                <li key={index} className="ride-card">
                  <p>
                    <strong>Driver:</strong> {ride.driverName || "Not Assigned"}
                  </p>
                  <p>
                    <strong>Phone:</strong> {ride.phone || "N/A"}
                  </p>
                  <p>
                    <strong>Vehicle:</strong> {ride.vehicle || "N/A"}
                  </p>
                  <p>
                    <strong>Pickup:</strong> {ride.pickupLocation} →{" "}
                    <strong>Drop:</strong> {ride.dropoffLocation}
                  </p>
                  <p>
                    <strong>Time:</strong> {ride.time}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={`status ${ride.status.toLowerCase()}`}>
                      {ride.status}
                    </span>
                  </p>
                  {ride.status === "Pending" && (
                    <p className="confirmation-msg">✅ Waiting for Driver Acceptance</p>
                  )}
                  {ride.status === "Accepted" && (
                    <button onClick={() => verifyOtp(ride)}>🔑 Enter OTP</button>
                  )}
                  {ride.status === "Confirmed" && (
                    <>
                      <p className="completed-msg">✅ Ride Started</p>
                      <button onClick={() => handleTrackRide(ride)}>🚗 Track Your Ride</button>
                    </>
                  )}
                  <button
                    className="cancel-ride-btn"
                    onClick={() => cancelRide(index)}
                  >
                    ❌ Cancel Ride
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No booked rides found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;
