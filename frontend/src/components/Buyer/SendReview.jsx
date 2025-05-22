import React, { useState } from 'react';
import axios from 'axios';
import BuyerProdNav from './BuyerProdNav';
import './SendReview.css';
import { FaStar } from 'react-icons/fa'; // ⭐ React icons for stars
import { useNavigate } from 'react-router-dom';

const SendReview = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const userId = localStorage.getItem("userid");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !comment) {
      alert("Please give a rating and write a comment.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:8000/api/send-review/${userId}`, {
        rating,
        comment,
      });

      alert("✅ Review submitted successfully!");
      navigate('/game')
      setRating(0);
      setComment('');
    } catch (error) {
      console.error(error);
      alert("❌ Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <BuyerProdNav />

      <div className="review-container">
        <h2>📝 Leave a Review</h2>
        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-group">
            <label>Rating:</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className="star"
                  size={30}
                  color={star <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your experience..."
              required
            ></textarea>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendReview;
