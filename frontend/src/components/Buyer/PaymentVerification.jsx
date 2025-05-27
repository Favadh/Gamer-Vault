import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import.meta.env;

const PaymentVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");
  const [btnText, setBtnText] = useState("Loading...");
  const [navPath, setNavPath] = useState("");
 

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
          setStatus("error");
          setMessage("Payment verification failed.");
        });
        // api for email sending

    } 
  }, [location.search]);

  if (status === "pending") return <div>Processing payment...</div>;

  return (
    <div className="success-page">
      <h2>{status}</h2>
      <div className="info-box">
        <p className="secure-text">{message}</p>
      </div>
      <button onClick={() => navigate(navPath)}>{btnText}</button>
    </div>
  );
};

export default PaymentVerification;
