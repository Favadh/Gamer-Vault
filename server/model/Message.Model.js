import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,  // Ensure that buyer is required
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,  // Ensure that seller is required
    },
    message: {
        type: String,
        required: true,
        maxlength: 500,  // Limit the length of the message to 500 characters
    },
    date: {
        type: Date,
        default: Date.now,
    },
    read: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt
});

// Add indexes for faster queries
messageSchema.index({ buyer: 1, seller: 1 });
messageSchema.index({ date: -1 }); // Sort messages by date in descending order

export const Message = mongoose.model('Message', messageSchema);
