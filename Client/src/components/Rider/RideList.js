import React, { useState } from "react";
import RideCard from "./RideCard";

const RideList = () => {
    // Dummy data (Later we'll fetch from the backend)
    const [rides, setRides] = useState([
        { id: 1, driver: "Amit", from: "Nashik", to: "Pune", time: "10:00 AM", price: "₹500" },
        { id: 2, driver: "Rahul", from: "Mumbai", to: "Nashik", time: "3:00 PM", price: "₹700" },
    ]);

    return (
        <div className="ride-list">
            <h3>Available Rides</h3>
            {rides.length > 0 ? (
                rides.map((ride) => <RideCard key={ride.id} ride={ride} />)
            ) : (
                <p>No rides available</p>
            )}
        </div>
    );
};

export default RideList;
