// models/Payment.js
import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMode: {
    type: String,
    enum: ["upi", "netbanking", "card", "wallet", "razorpay"],
    required: true,
  },
  paymentGateway: {
    type: String,
    default: "razorpay",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  paidAt: {
    type: Date,
    default: Date.now,
  },
  methodDetails: {
    upiId: String,
    cardLast4: String,
    cardType: String,
    netbankingBank: String,
    walletName: String,
  } 
}, { timestamps: true });

const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;
