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


import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="success-page">
        <h2>Oops!</h2>
        <p>Invalid access. No payment information found.</p>
        <button className="payment-button" onClick={() => navigate("/game")}>Go Home</button>
      </div>
    );
  }

  const { transactionId, gameUsername, gamePassword } = state; // Ensure the state carries these values

  return (
    <div className="success-page">
      <h2>✅ Payment Successful!</h2>
      <div className="info-box">
        <p><strong>Game Username:</strong> {gameUsername}</p>
        <p><strong>Game Password:</strong> {gamePassword}</p>
      </div>
      <p className="secure-text">⚠️ Please copy this info. It won't be shown again.</p>
    </div>
  );
};

export default PaymentSuccess;
