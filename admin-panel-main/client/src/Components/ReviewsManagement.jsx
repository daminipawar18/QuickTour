import React, { useState, useEffect } from "react";
import "./ReviewsManagement.css";

const ReviewsManagement = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const dummyReviews = [
      { id: 1, user: "golu", text: "Excellent ride experience. Driver was punctual and courteous.", rating: 5 },
      { id: 2, user: "Rashi", text: "Loved the service. The app is super easy to use!", rating: 4 },
      { id: 3, user: "rushiii", text: "Driver was very professional. Clean car and smooth ride.", rating: 5 },
      { id: 4, user: "sahil", text: "Good support from the team. Will book again!", rating: 4 },
      { id: 5, user: "Priyanka", text: "Quick booking process. Driver was friendly.", rating: 3 },
      { id: 6, user: "Rutuja", text: "Comfortable trip. I really enjoyed the ride.", rating: 5 },
      { id: 7, user: "Sayali", text: "Driver was a bit late but ride was safe and relaxing.", rating: 3 },
      { id: 8, user: "rajas", text: "Affordable and efficient. Great app for daily travel!", rating: 4 },
      { id: 9, user: "Rajashree", text: "Driver followed all safety protocols. Impressive!", rating: 5 },
      { id: 10, user: "prajakta", text: "Just testing the review feature, works perfectly.", rating: 4 },
    ];

    setReviews(dummyReviews);
  }, []);

  const handleDelete = (id) => {
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    return "⭐".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="reviews-management">
      <h2>Reviews Management</h2>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="review">
            <p><strong>{review.user}:</strong> {review.text}</p>
            <p className="stars">{renderStars(review.rating)}</p>
            <button onClick={() => handleDelete(review.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewsManagement;
