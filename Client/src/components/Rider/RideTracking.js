import React, { useState, useEffect } from "react";
import RiderDashboard from "./RiderDashboard"; // ✅ Correct path
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const RideTracking = () => {
  const [position, setPosition] = useState([19.9975, 73.7898]); // Default Nashik location

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => [
        prevPosition[0] + 0.0005, 
        prevPosition[1] + 0.0005 
      ]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <NavbarWrapper /> {/* ✅ Correct Navbar will load automatically */}

      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* Rider Dashboard on the Left */}
        <div style={{ width: "30%", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
          <RiderDashboard />
        </div>

        {/* Ride Tracking Map on the Right */}
        <div style={{ width: "70%", height: "500px" }}> {/* ✅ Map size reduced */}
          <MapContainer center={position} zoom={13} style={{ width: "100%", height: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position}>
              <Popup>🚗 Your ride is here!</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default RideTracking;
