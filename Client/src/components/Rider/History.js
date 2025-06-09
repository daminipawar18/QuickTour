import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

const RideHistory = () => {
    const { user } = useContext(AuthContext); // Get user details from context
    const userId = user?.id; // Ensure we have userId

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("🔍 Checking User ID in RideHistory:", userId); // Debugging

    useEffect(() => {
        if (!userId) {
            setError("User ID is missing. Please log in again.");
            setLoading(false);
            return;
        }

        const fetchRideHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/rides/history/${userId}`);
                setHistory(response.data);
            } catch (err) {
                console.error("❌ Error fetching ride history:", err);
                setError("Failed to load ride history.");
            } finally {
                setLoading(false);
            }
        };

        fetchRideHistory();
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="rides-container">
            <h3>Ride History</h3>
            {history.length === 0 ? (
                <p>No past rides found.</p>
            ) : (
                <ul className="ride-list">
                    {history.map((ride) => (
                        <li key={ride.booking_id} className="ride-item">
                            <strong>{ride.from_location} → {ride.to_location}</strong>
                            <p>Date: {new Date(ride.date).toLocaleDateString()}</p>
                            <p>Fare: ₹{ride.price}</p>
                            <p>Status: {ride.booking_status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RideHistory;
