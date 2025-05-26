// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const PaymentSuccess = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   if (!state) {
//     return (
//       <div className="success-page">
//         <h2>Oops!</h2>
//         <p>Invalid access. No payment information found.</p>
//         <button className="payment-button" onClick={() => navigate("/")}>Go Home</button>
//       </div>
//     );
//   }

//   const { transactionId, gameUsername, gamePassword } = state; // Ensure the state carries these values

//   return (
//     <div className="success-page">
//       <h2>✅ Payment Successful!</h2>
//       <div className="info-box">
//         <p><strong>Game Username:</strong> {gameUsername}</p>
//         <p><strong>Game Password:</strong> {gamePassword}</p>
//       </div>
//       <p className="secure-text">⚠️ Please copy this info. It won't be shown again.</p>
//     </div>
//   );
// };

// export default PaymentSuccess;

// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const PaymentSuccess = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   if (!state || !state.games || (Array.isArray(state.games) && state.games.length === 0)) {
//     return (
//       <div className="success-page">
//         <h2>Oops!</h2>
//         <p>No payment/game information found.</p>
//         <button className="payment-button" onClick={() => navigate("/")}>Go Home</button>
//       </div>
//     );
//   }

//   // Ensure state.games is always treated as an array
//   const gameList = Array.isArray(state.games) ? state.games : [state.games];

//   return (
//     <div className="success-page">
//       <h2>✅ Payment Successful!</h2>
//       {gameList.map((game, index) => (
//         <div className="info-box" key={index}>
//           <p><strong>Game {index + 1} Username:</strong> {game.gameUsername}</p>
//           <p><strong>Game {index + 1} Password:</strong> {game.gamePassword}</p>
//         </div>
//       ))}
//       <p className="secure-text">⚠️ Please copy this info. It won't be shown again.</p>
//     </div>
//   );
// };

// export default PaymentSuccess;



import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import.meta.env;

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");
 

  useEffect(() => {
  const params = new URLSearchParams(location.search);
  const token = params.get("token"); // PayPal sends token
  console.log(token);

    if (token) {
      // Call backend to capture payment and update DB
      axios.get(`${import.meta.env.VITE_GV_BASE_URL}/api/payment-success?token=${token}`)
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
      <button onClick={() => navigate("/game")}>Continue shopping</button>
    </div>
  );
};

export default PaymentSuccess;
