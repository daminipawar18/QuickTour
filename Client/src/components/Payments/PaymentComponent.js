import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentComponent = ({ amount, rideId, userId, driverName, onPaymentSuccess, onPaymentFailure }) => {
    const [rating, setRating] = useState(0);
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRatingSubmit = () => {
        if (rating === 0) {
            alert("Please select a rating!");
            return;
        }

        const ratingPayload = {
            rideId: rideId,
            userId: userId,
            driverName: driverName,
            rating: rating
        };

        fetch('http://rideshare.ap-south-1.elasticbeanstalk.com/api/RateDriver', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ratingPayload)
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("Thank you for rating the driver!");
            } else {
                alert("Failed to submit rating.");
            }
        })
        .catch(() => alert("Error submitting rating."));
    };

    const handlePayment = (event) => {
        event.preventDefault();

        if (!window.Razorpay) {
            console.error('Razorpay is not loaded');
            return;
        }

        const options = {
            key: 'rzp_test_LMZHnNT5VlTSU1',
            amount: amount * 100,
            currency: 'INR',
            name: 'QuickTour',
            description: 'Payment For Ride',
            handler: function (response) {
                if (response.razorpay_payment_id) {
                    alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                    
                    const paymentPayload = {
                        paymentId: response.razorpay_payment_id,
                        status: 'success',
                        amount: amount,
                        rideId: rideId,
                        userId: userId
                    };

                    fetch('http://rideshare.ap-south-1.elasticbeanstalk.com/api/Payment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(paymentPayload)
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            setIsPaymentSuccess(true);
                            onPaymentSuccess && onPaymentSuccess(rideId, userId);
                            navigate('/user-rides');
                        } else {
                            alert("Payment processing failed.");
                            onPaymentFailure && onPaymentFailure();
                        }
                    })
                    .catch(() => onPaymentFailure && onPaymentFailure());
                }
            },
            modal: {
                ondismiss: function () {
                    alert('Payment was not completed.');
                    onPaymentFailure && onPaymentFailure();
                }
            },
            prefill: {
                name: 'Customer Name',
                email: 'customer@example.com',
                contact: '9999999999',
            },
            theme: { color: '#F37254' },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    return (
        <div className="p-4 border rounded shadow-lg bg-white max-w-sm mx-auto mt-4">
            <h2 className="text-xl font-bold mb-2">Payment</h2>
            <p className="text-gray-700 mb-2">Amount: ₹{amount}</p>
            <p className="text-gray-700 mb-4">Driver: <strong>{driverName}</strong></p>

            {/* Rating Section BEFORE Payment */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Rate Your Driver</h3>
                <div className="flex space-x-2 mt-2">
                    {[1, 2, 3, 4, 5].map(star => (
                        <button
                            key={star}
                            onClick={() => setRating(star)}
                            className={`p-2 rounded ${rating >= star ? 'bg-yellow-400' : 'bg-gray-200'}`}
                        >
                            ⭐
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleRatingSubmit}
                    className="mt-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
                >
                    Submit Rating
                </button>
            </div>

            {/* Payment Button */}
            {!isPaymentSuccess && (
                <button
                    onClick={handlePayment}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                    Pay Now
                </button>
            )}
        </div>
    );
};

export default PaymentComponent;
