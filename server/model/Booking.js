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
  totalPrice: { 
    type: Number, 
    required: true 
  },  // Add totalPrice field
  transactionId: {
    type: String,
    required: function() { return this.paymentStatus === "completed"; }
  },
  status: {
    type: String,
    default: function() { return this.paymentStatus;}
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  },  
  bookingDate: {
    type: Date,
    default: Date.now
  },
});

const Booking = mongoose.model('Booking', BookingSchema);
export default Booking;
