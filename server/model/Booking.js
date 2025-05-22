import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  gameAccountId: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'GameAccount', 
    required: true 
  }],
  buyerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["open", "sold", "reserved"],
    default: "open"
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
  },  
  transactionId: {
    type: String,
    required: function() { return this.paymentStatus === "completed"; }
  },
  paymentRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  totalPrice: { 
    type: Number, 
    required: true 
  }  // Add totalPrice field
});

const Booking = mongoose.model('Booking', BookingSchema);
export default Booking;
