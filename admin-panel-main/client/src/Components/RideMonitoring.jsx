import React, { useState, useEffect } from "react";
import "./RideMonitoring.css";

const RideMonitoring = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Static dummy data from `bookings` table structure
    const dummyBookings = [
      {
        id: 1,
        driver_id: 101,
        user_id: 501,
        seats_booked: 2,
        from_location: "Nashik",
        to_location: "Pune",
        vehicle: "Hyundai i20",
        ride_date: "2025-04-21",
        ride_time: "09:30:00",
        price: 500.00,
        ride_status: "started",
        otp_verified: 1,
      },
      {
        id: 2,
        driver_id: 102,
        user_id: 502,
        seats_booked: 1,
        from_location: "Mumbai",
        to_location: "Nashik",
        vehicle: "Swift Dzire",
        ride_date: "2025-04-22",
        ride_time: "14:15:00",
        price: 700.00,
        ride_status: "completed",
        otp_verified: 1,
      },
      {
        id: 3,
        driver_id: 103,
        user_id: 503,
        seats_booked: 3,
        from_location: "Aurangabad",
        to_location: "Nashik",
        vehicle: "Wagon R",
        ride_date: "2025-04-23",
        ride_time: "11:00:00",
        price: 450.00,
        ride_status: "pending",
        otp_verified: 0,
      },
    ];

    // Set static data
    setBookings(dummyBookings);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="ride-monitoring-container">
      <h1>Ride Monitoring</h1>
      <table className="ride-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Driver ID</th>
            <th>User ID</th>
            <th>Seats Booked</th>
            <th>From</th>
            <th>To</th>
            <th>Vehicle</th>
            <th>Date</th>
            <th>Time</th>
            <th>Price</th>
            <th>Status</th>
            <th>OTP Verified</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.driver_id}</td>
              <td>{booking.user_id}</td>
              <td>{booking.seats_booked}</td>
              <td>{booking.from_location}</td>
              <td>{booking.to_location}</td>
              <td>{booking.vehicle}</td>
              <td>{new Date(booking.ride_date).toLocaleDateString()}</td>
              <td>{booking.ride_time}</td>
              <td>{booking.price}</td>
              <td>{booking.ride_status}</td>
              <td>{booking.otp_verified ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RideMonitoring;
