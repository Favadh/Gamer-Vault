import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      gameAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GameAccount',
        required: true,
      },
      
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

CartSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});


const Cart = mongoose.model('Cart', CartSchema);

export default Cart;