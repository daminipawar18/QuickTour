import React, { useState, useEffect } from "react";

const MyRides = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
        setBookings(storedBookings);
    }, []);

    return (
        <div>
            <h2>My Rides</h2>
            {bookings.length === 0 ? (
                <p>No rides booked yet.</p>
            ) : (
                bookings.map((ride, index) => (
                    <div key={index}>
                        <p>From: {ride.from} → To: {ride.to}</p>
                        <p>Price: {ride.price}</p>
                        <p>Status: {ride.status}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyRides;
