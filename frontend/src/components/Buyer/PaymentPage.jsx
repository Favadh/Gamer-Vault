// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Payement.css";

// const PAYMENT_MODES = {
//   UPI: "upi",
//   CARD: "card",
//   NETBANKING: "netbanking",
//   WALLET: "wallet",
// };

// const PaymentForm = () => {
//   const [formData, setFormData] = useState({
//     buyerId: "",
//     bookingId: "",
//     amount: "",
//     paymentMode: PAYMENT_MODES.UPI,
//     methodDetails: {},
//   });

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const buyerId = localStorage.getItem("userid");
//     const storedAmount = localStorage.getItem("cartAmount");
//     const bookingId = localStorage.getItem("bookingId");

//     if (buyerId) {
//       setFormData((prev) => ({
//         ...prev,
//         buyerId,
//         bookingId: bookingId || "",
//       }));

//       if (bookingId) {
//         axios
//           .get(`http://localhost:8000/api/get-booking/${bookingId}`)
//           .then((res) => {
//             setFormData((prev) => ({
//               ...prev,
//               amount: res.data.totalPrice,
//             }));
//           })
//           .catch((err) => {
//             console.error(err);
//             alert("Failed to fetch booking details.");
//           });
//       } else if (storedAmount) {
//         setFormData((prev) => ({
//           ...prev,
//           amount: storedAmount,
//         }));
//       }
//     }
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (["upiId", "cardLast4", "cardType", "netbankingBank", "walletName"].includes(name)) {
//       setFormData((prev) => ({
//         ...prev,
//         methodDetails: {
//           ...prev.methodDetails,
//           [name]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.post("http://localhost:8000/api/record-payment", formData);
//       const { transactionId, gameUsername, gamePassword } = res.data;

//       navigate("/payment-success", {
//         state: { games: [{ gameUsername, gamePassword }] },
//       });
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("❌ Payment failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="payment-wrapper">
//       <form className="payment-form" onSubmit={handleSubmit}>
//         <h2 className="text-white">Complete Your Payment</h2>

//         <InputField label="Amount (INR)" name="amount" value={formData.amount} readOnly />

//         <div className="input-group">
//           <label>Select Payment Method</label>
//           <select name="paymentMode" value={formData.paymentMode} onChange={handleInputChange}>
//             <option value={PAYMENT_MODES.UPI}>UPI</option>
//             <option value={PAYMENT_MODES.CARD}>Card</option>
//             <option value={PAYMENT_MODES.NETBANKING}>Net Banking</option>
//             <option value={PAYMENT_MODES.WALLET}>Wallet</option>
//           </select>
//         </div>

//         <button type="submit" className="payment-button" disabled={loading}>
//           {loading ? "Processing..." : "Pay Now"}
//         </button>

//         <p className="secure-text">🔒 Your transaction is secure.</p>
//       </form>
//     </div>
//   );
// };

// const InputField = ({ label, name, value, onChange, placeholder, readOnly }) => (
//   <div className="input-group">
//     <label>{label}</label>
//     <input type="text" name={name} value={value} onChange={onChange} placeholder={placeholder} readOnly={readOnly} required />
//   </div>
// );

// export default PaymentForm;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Payement.css";

// const PAYMENT_MODES = {
//   UPI: "upi",
//   CARD: "card",
//   NETBANKING: "netbanking",
//   WALLET: "wallet",
// };

// const PaymentForm = () => {
//   const [formData, setFormData] = useState({
//     buyerId: "",
//     bookingId: "",
//     amount: "",
//     paymentMode: PAYMENT_MODES.UPI,
//     methodDetails: {},
//   });

//   const [gameDetails, setGameDetails] = useState([]); // ✅ Game credentials
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const buyerId = localStorage.getItem("userid");
//     const storedAmount = localStorage.getItem("cartAmount");
//     const bookingId = localStorage.getItem("bookingId");
//     const gamesFromStorage = JSON.parse(localStorage.getItem("gameDetails")) || [];

//     if (buyerId) {
//       setFormData((prev) => ({
//         ...prev,
//         buyerId,
//         bookingId: bookingId || "",
//         amount: storedAmount || "",
//       }));
//     }

//     setGameDetails(gamesFromStorage); // ✅ Set games from localStorage
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (["upiId", "cardLast4", "cardType", "netbankingBank", "walletName"].includes(name)) {
//       setFormData((prev) => ({
//         ...prev,
//         methodDetails: {
//           ...prev.methodDetails,
//           [name]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
  
//     const transactionId = "TXN" + Date.now(); // ✅ Fake TXN ID for testing
  
//     try {
//       const res = await axios.post("http://localhost:8000/api/payment-success", {
//         ...formData,
//         transactionId,
//       });
  
//       navigate("/payment-success", {
//         state: { games: res.data.games }, // ✅ Use response from backend
//       });
//     } catch (err) {
//       console.error("Payment error:", err);
  
//       if (err.response) {
//         console.error("❌ Backend responded with error:", err.response.data);
//         console.error("❌ Status code:", err.response.status);
//       } else if (err.request) {
//         console.error("❌ No response from backend:", err.request);
//       } else {
//         console.error("❌ Axios setup error:", err.message);
//       }
  
//       alert("❌ Payment failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <div className="payment-wrapper">
//       <form className="payment-form" onSubmit={handleSubmit}>
//         <h2 className="text-white">Complete Your Payment</h2>

//         <InputField label="Amount (INR)" name="amount" value={formData.amount} readOnly />

//         <div className="input-group">
//           <label>Select Payment Method</label>
//           <select name="paymentMode" value={formData.paymentMode} onChange={handleInputChange}>
//             <option value={PAYMENT_MODES.UPI}>UPI</option>
//             <option value={PAYMENT_MODES.CARD}>Card</option>
//             <option value={PAYMENT_MODES.NETBANKING}>Net Banking</option>
//             <option value={PAYMENT_MODES.WALLET}>Wallet</option>
//           </select>
//         </div>

//         {/* Dynamic Input Fields */}
//         {formData.paymentMode === PAYMENT_MODES.UPI && (
//           <InputField
//             label="UPI ID"
//             name="upiId"
//             value={formData.methodDetails.upiId || ""}
//             onChange={handleInputChange}
//             placeholder="example@upi"
//           />
//         )}
//         {formData.paymentMode === PAYMENT_MODES.CARD && (
//           <>
//             <InputField
//               label="Card Last 4 Digits"
//               name="cardLast4"
//               value={formData.methodDetails.cardLast4 || ""}
//               onChange={handleInputChange}
//               placeholder="1234"
//             />
//             <InputField
//               label="Card Type"
//               name="cardType"
//               value={formData.methodDetails.cardType || ""}
//               onChange={handleInputChange}
//               placeholder="Visa / MasterCard"
//             />
//           </>
//         )}
//         {formData.paymentMode === PAYMENT_MODES.NETBANKING && (
//           <InputField
//             label="Bank Name"
//             name="netbankingBank"
//             value={formData.methodDetails.netbankingBank || ""}
//             onChange={handleInputChange}
//             placeholder="HDFC, ICICI, etc."
//           />
//         )}
//         {formData.paymentMode === PAYMENT_MODES.WALLET && (
//           <InputField
//             label="Wallet Name"
//             name="walletName"
//             value={formData.methodDetails.walletName || ""}
//             onChange={handleInputChange}
//             placeholder="PhonePe, Paytm, etc."
//           />
//         )}

//         <button type="submit" className="payment-button" disabled={loading}>
//           {loading ? "Processing..." : "Pay Now"}
//         </button>

//         <p className="secure-text">🔒 Your transaction is secure.</p>
//       </form>
//     </div>
//   );
// };

// const InputField = ({ label, name, value, onChange, placeholder, readOnly }) => (
//   <div className="input-group">
//     <label>{label}</label>
//     <input
//       type="text"
//       name={name}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       readOnly={readOnly}
//       required
//     />
//   </div>
// );

// export default PaymentForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Payement.css";

const PAYMENT_MODES = {
  UPI: "upi",
  CARD: "card",
  NETBANKING: "netbanking",
  WALLET: "wallet",
};

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    buyerId: "",
    bookingId: "",
    amount: "",
    paymentMode: PAYMENT_MODES.UPI,
    methodDetails: {},
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const buyerId = localStorage.getItem("userid");
    const storedAmount = localStorage.getItem("cartAmount");
    const bookingId = localStorage.getItem("bookingId");

    if (buyerId) {
      setFormData((prev) => ({
        ...prev,
        buyerId,
        bookingId: bookingId || "",
      }));

      if (bookingId) {
        // Load amount from booking
        axios
          .get(`http://localhost:8000/api/get-booking/${bookingId}`)
          .then((res) => {
            setFormData((prev) => ({
              ...prev,
              amount: res.data.totalPrice,
            }));
          })
          .catch((err) => {
            console.error(err);
            alert("Failed to fetch booking details.");
          });
      } else if (storedAmount) {
        // Load amount from cart
        setFormData((prev) => ({
          ...prev,
          amount: storedAmount,
        }));
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (
      [
        "upiId",
        "cardLast4",
        "cardType",
        "netbankingBank",
        "walletName",
      ].includes(name)
    ) {
      setFormData((prev) => ({
        ...prev,
        methodDetails: {
          ...prev.methodDetails,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/payment-success",
        formData
      );
      const { transactionId, gameUsername, gamePassword } = res.data;

      setTimeout(() => {
        navigate("/payment-success", {
          state: {
            transactionId,
            gameUsername,
            gamePassword,
          },
        });
      }, 2000);
    } catch (err) {
      console.error("Payment error:", err);
      alert("❌ Payment failed. Please try again.");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const renderMethodFields = () => {
    switch (formData.paymentMode) {
      case PAYMENT_MODES.UPI:
        return (
          <InputField
            label="UPI ID"
            name="upiId"
            value={formData.methodDetails.upiId || ""}
            onChange={handleInputChange}
            placeholder="name@oksbi"
          />
        );
      case PAYMENT_MODES.CARD:
        return (
          <>
            <InputField
              label="Card Type"
              name="cardType"
              value={formData.methodDetails.cardType || ""}
              onChange={handleInputChange}
              placeholder="e.g. Visa"
            />
            <InputField
              label="Last 4 Digits"
              name="cardLast4"
              value={formData.methodDetails.cardLast4 || ""}
              onChange={handleInputChange}
              placeholder="1234"
            />
          </>
        );
      case PAYMENT_MODES.NETBANKING:
        return (
          <InputField
            label="Bank Name"
            name="netbankingBank"
            value={formData.methodDetails.netbankingBank || ""}
            onChange={handleInputChange}
            placeholder="e.g. HDFC"
          />
        );
      case PAYMENT_MODES.WALLET:
        return (
          <InputField
            label="Wallet"
            name="walletName"
            value={formData.methodDetails.walletName || ""}
            onChange={handleInputChange}
            placeholder="e.g. PhonePe"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="payment-wrapper">
      <form className="payment-form" onSubmit={handleSubmit}>
        <h2>Complete Your Payment</h2>

        <InputField
          label="Amount (INR)"
          name="amount"
          value={formData.amount}
          readOnly
        />

        <div className="input-group">
          <label>Select Payment Method</label>
          <select
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleInputChange}
          >
            <option value={PAYMENT_MODES.UPI}>UPI</option>
            <option value={PAYMENT_MODES.CARD}>Card</option>
            <option value={PAYMENT_MODES.NETBANKING}>Net Banking</option>
            <option value={PAYMENT_MODES.WALLET}>Wallet</option>
          </select>
        </div>

        {renderMethodFields()}

        <button type="submit" className="payment-button" disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>

        <p className="secure-text">🔒 Your transaction is secure.</p>
      </form>
    </div>
  );
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  readOnly,
}) => (
  <div className="input-group">
    <label>{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      required
    />  
  </div>
);

export default PaymentForm;