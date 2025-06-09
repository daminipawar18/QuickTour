import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookRide = () => {
    const { id } = useParams(); // Get ride ID from URL
    const [ride, setRide] = useState(null);

    useEffect(() => {
        // Fetch ride details from localStorage
        const storedRides = JSON.parse(localStorage.getItem("bookings")) || [];
        const selectedRide = storedRides.find((r) => r.id === parseInt(id, 10)); // Ensure correct type

        if (selectedRide) {
            setRide(selectedRide);
        }
    }, [id]);

    if (!ride) {
        return <p>Loading ride details...</p>;
    }

    return (
        <div>
            <h2>Booking Confirmation</h2>
            <p><strong>From:</strong> {ride.from}</p>
            <p><strong>To:</strong> {ride.to}</p>
            <p><strong>Price:</strong> ₹{ride.price}</p>
            <button onClick={() => alert("✅ Ride Confirmed!")}>Confirm Booking</button>
        </div>
    );
};

export default BookRide;
