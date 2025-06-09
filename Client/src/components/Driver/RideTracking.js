import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import RiderDashboard from "../Rider/RiderDashboard";
import "leaflet/dist/leaflet.css";

const RideTracking = () => {
  const navigate = useNavigate();
  const [rideDetails, setRideDetails] = useState(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const storedRide = JSON.parse(localStorage.getItem("selectedRide"));
    if (!storedRide) {
      alert("❌ No ride details found! Redirecting...");
      navigate("/");
      return;
    }
    setRideDetails(storedRide);
    setPosition(storedRide.startLocation); // Initial position
  }, [navigate]);

  // Simulate live tracking (Mocked movement)
  useEffect(() => {
    if (!rideDetails) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index < rideDetails.route.length) {
        setPosition(rideDetails.route[index]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          alert("🎉 Ride Completed!");
          navigate("/payment");
        }, 1000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [rideDetails, navigate]);

  return (
    <div style={{ display: "flex" }}>
      {/* Rider Dashboard Sidebar */}
      <div style={{ width: "250px", minHeight: "100vh", background: "#f4f4f4", padding: "10px" }}>
        <RiderDashboard />
      </div>

      {/* Map Section */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h2>🚗 Live Ride Tracking</h2>
        {position && rideDetails ? (
          <MapContainer
            center={position}
            zoom={13}
            style={{ width: "80vw", height: "50vh", borderRadius: "10px" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position} />
            <Polyline positions={rideDetails.route} color="blue" />
          </MapContainer>
        ) : (
          <p>Loading map...</p>
        )}
      </div>
    </div>
  );
};

export default RideTracking;
