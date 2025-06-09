import React from "react";

const BookedRideCard = ({ ride, setTrackingRide }) => {
    return (
        <li className="ride-card">
            <p><strong>Driver:</strong> {ride.driverName}</p>
            <p><strong>Pickup:</strong> {ride.from} → <strong>Drop:</strong> {ride.to}</p>
            <p><strong>Time:</strong> {ride.time}</p>
            <p>
                <strong>Status:</strong> 
                <span className={`status ${ride.status?.toLowerCase() || "unknown"}`}>
                    {ride.status || "Pending"}
                </span>
            </p>

            {ride.status === "Pending" && <p>✅ Ride Confirmation Pending</p>}
            {ride.status === "Accepted" && <p>🚖 Ride Accepted by Driver</p>}
            {ride.status === "Started" && (
                <button onClick={() => setTrackingRide(ride)}>Track Your Ride</button>
            )}
            {ride.status === "Completed" && (
                <>
                    <p>🎉 Ride Completed Successfully!</p>
                    <button onClick={() => alert("⭐ Give Rating & Feedback")}>Rate Driver</button>
                    <button onClick={() => alert("💳 Proceed to Payment")}>Make Payment</button>
                </>
            )}
        </li>
    );
};

export default BookedRideCard;
