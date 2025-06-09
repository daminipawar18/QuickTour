import React from "react";

const RideCard = ({ ride }) => {
    return (
        <div className="ride-card">
            <h4>Driver: {ride.driver}</h4>
            <p>From: {ride.from} → To: {ride.to}</p>
            <p>Time: {ride.time}</p>
            <p>Price: {ride.price}</p>
            <button>Book Ride</button>
        </div>
    );
};

export default RideCard;
