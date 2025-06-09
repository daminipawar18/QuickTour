import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

const PaymentPage = ({ rideDetails }) => {
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [rating, setRating] = useState(0);

  const handlePayment = (token) => {
    // Simulating payment with Stripe (use your actual payment logic here)
    console.log("Payment token received:", token);
    setPaymentStatus(true);
  };

  const handleRating = (newRating) => {
    setRating(newRating);
    // You can send the rating to your backend here
    console.log(`Rated the ride with ${newRating} stars.`);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>💳 Payment for Ride</h2>
      <p>
        <strong>Ride Details:</strong>
      </p>
      <p>Pickup: {rideDetails.from} → Drop: {rideDetails.to}</p>
      <p>Total Price: ${rideDetails.price}</p>

      {/* Stripe Checkout Component */}
      {!paymentStatus ? (
        <StripeCheckout
          stripeKey="your-publishable-stripe-key"
          token={handlePayment}
          amount={rideDetails.price * 100} // Stripe expects the amount in cents
          name="Quick Tour Payment"
          description="Pay for your ride"
        />
      ) : (
        <p>✅ Payment Successful! 🎉</p>
      )}

      {/* Rating Section */}
      <h3>⭐ Rate the Driver</h3>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{ cursor: "pointer", fontSize: "24px", color: star <= rating ? "gold" : "gray" }}
            onClick={() => handleRating(star)}
          >
            ★
          </span>
        ))}
      </div>

      {rating > 0 && <p>Thank you for rating the ride! 🎉</p>}
    </div>
  );
};

export default PaymentPage;
