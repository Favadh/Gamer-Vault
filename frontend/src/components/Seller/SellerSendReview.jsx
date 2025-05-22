import React, { useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SellerSide from './sellerSide';

const SellerSendReview = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      navigate('/seller');
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
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <SellerSide />

      <div style={{ flex: 1, padding: '40px' }}>
        <div style={{
          border: '1px solid white',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          maxWidth: '600px',
          margin: 'auto',
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>📝 Leave a Review</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Rating:</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
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

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="comment" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Comment:</label>
              <textarea
                id="comment"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your experience..."
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  resize: 'vertical',
                  background: 'transparent',
                  color:'white',
                }}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#007bff',
                color: 'white',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.3s ease',
              }}
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerSendReview;