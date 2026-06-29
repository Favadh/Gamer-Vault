import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaCheck, FaTimes, FaEnvelope, FaShoppingBag, FaArrowLeft } from 'react-icons/fa';
import.meta.env;
import './styles/GameAccountDetail.css'

const PaymentVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");
  const [btnText, setBtnText] = useState("");
  const [navPath, setNavPath] = useState("");
  const [bookingId, setBookingId] = useState("");
 

  const handleSendEmail = (bookingId) => {
    try {
      const response = axios.post(`${import.meta.env.VITE_GV_BASE_URL}/api/send-email-again`, { bookingId });
      console.log(response.data.message); // set a toast msg here
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  useEffect(() => {
  const params = new URLSearchParams(location.search);
  const token = params.get("token"); // PayPal sends token
  console.log(token);

    if (token) {
      // Call backend to capture payment and update DB
      axios.get(`${import.meta.env.VITE_GV_BASE_URL}/api/payment-verification?token=${token}`)
        .then(res => {
          console.log(res.data);
          
          const { booking } = res.data;
          console.log(booking);
          
          setBookingId(booking._id);

          setStatus(() => {
            return booking.paymentStatus === "completed"
            ? "✅ Payment Successful!"
            : booking.paymentStatus === "cancelled" 
            && "❌ Payment Failed"
          });
          
          setMessage(() => {
            return booking.paymentStatus === "completed"
            ? `Payment successful! Thank you for your purchase.
            Game credential are sent through email, check your email !`
            : booking.paymentStatus === "cancelled" 
            && "Payment was cancelled. Please try again."
          });

          setBtnText(() => {
            return booking.paymentStatus === "completed"
            ? "Continue Shopping"
            : booking.paymentStatus === "cancelled" 
            && "Go Back to Cart"
          });

          setNavPath(() => {
            return booking.paymentStatus === "completed"
            ? "/game"
            : booking.paymentStatus === "cancelled" 
            && "/cart"
          });

        })
        .catch((err) => {
          console.log("The error:",err.message);
          setStatus("Error");
          setMessage("Payment verification failed.");
        });
        // api for email sending

    } 
  }, [location.search]);

  if (status === "pending") return (
    <div className="success-page">
      <div className="loading-container">
        <div className="spinner-glow"></div>
        <div className="spinner-main"></div>
        <p className="loading-text">Securing Your Transaction...</p>
        <p className="loading-subtext">Connecting to the vault, please do not close this window.</p>
      </div>
    </div>
  );

  const isSuccess = status === "✅ Payment Successful!";

  return (
    <div className="success-page">
      <div className="success-card">
        <div className={`success-icon-wrapper ${!isSuccess ? 'failed' : ''}`}>
          {isSuccess ? <FaCheck /> : <FaTimes />}
        </div>
        
        <h2>{isSuccess ? 'Transaction Vault Secured' : 'Transaction Interrupted'}</h2>
        
        <p className="success-message">
          {message}
        </p>

        <div className="success-actions">
          {isSuccess && (
            <button className="action-btn-secondary" onClick={() => handleSendEmail(bookingId)}>
              <FaEnvelope style={{ marginRight: '10px' }} /> Send Email Again
            </button>
          )}
          <button className="action-btn-primary" onClick={() => navigate(navPath)}>
            {isSuccess ? (
              <><FaShoppingBag style={{ marginRight: '10px' }} /> Continue Shopping</>
            ) : (
              <><FaArrowLeft style={{ marginRight: '10px' }} /> Back to Cart</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentVerification;
