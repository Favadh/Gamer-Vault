import bcrypt from 'bcrypt';
import User from '../model/userModel.js' 
import GameAccount from '../model/gameAccountModel.js';
import mongoose from 'mongoose';
import Cart from '../model/Cart.Model.js';
import Booking from '../model/Booking.js';
import { Message } from '../model/Message.Model.js';
import { v4 as uuidv4 } from "uuid"; 
import Payment from '../model/payment.js';
import Review from '../model/Review.js';
import { initiatePaypal, capturePayment }  from '../middleware/paypal.js';


// Signup function
export const signup = async (req, res) => {
  try {
    const { username, email, phone, address, password, role } = req.body;

    // Validate required fields
    if (!username || !email || !phone || !address || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate role
    if (!['buyer', 'seller'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    // Check if the username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Check if the email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // If a file (image) is uploaded, save the path
    const profilePhoto = req.file ? req.file.filename : null;

    // Create a new user
    const newUser = new User({
      username,
      email,
      phone,
      address,
      password: hashedPassword,
      role, // Set the role (buyer or seller)
      profilePhoto, // Save the filename as reference
    });

    await newUser.save();

    // Return user data excluding sensitive information
    const { password: _, ...userWithoutPassword } = newUser.toObject(); // Exclude password

    res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });
  } catch (error) {
    console.error('Error registering user:', error); // Log the error for debugging

    // Handle validation error or any other specific error here
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Invalid user data', error: error.message });
    }

    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};



// Login user by username and password (no JWT)
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
      // Check if user exists
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(404).json({ message: 'Username not found' });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Send success response with user details including role
      res.status(200).json({
          message: 'Login successful',
          user: { 
              username: user.username, 
              id: user._id,
              role: user.role  // Include role in response
          }
      });
  } catch (err) {
      console.error('Server error:', err); // Log the error
      res.status(500).json({ message: 'Server error' });
  }
};


export const viewUser = async (req, res) => {
    const userId = req.params.id; 
  
    try {
      const user = await User.findById(userId); 
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
      res.status(200).send(user);
    } catch (err) {
      if (err.kind === 'ObjectId') {
        
        return res.status(400).send({ error: 'Invalid User ID' });
      }

      console.error(err);
      res.status(500).send({ error: 'Server error' });
    }
};
  


//code for viewing all user
export const viewAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Find all users and exclude the password
    if (!users) {
      return res.status(404).json({ message: 'No users found' });
      }
      res.status(200).json(users); // Return the list of users
  } catch (error) {
    console.error('Error fetching all users:', error); // Log the error for debugging
  }
}


export const addGameAccount = async (req, res) => {
  try {
    const { description, price, gameName,gameUsername,gamePassword, gameMode, platform } = req.body;
    const userId = req.params.userId;

    if (!description || !price || !gameName || !gameUsername || !gamePassword || !gameMode || !platform) {
      return res.status(400).json({ message: 'Description, price, and game name are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Handle file uploads
    const coverPhoto = req.files['coverPhoto'] ? req.files['coverPhoto'][0].filename : null;
    const screenshots = req.files['screenshots'] ? req.files['screenshots'].map(file => file.filename) : [];

    // ✅ Use keywords from frontend
    let keywords = req.body.keywords;
    if (!keywords) {
      keywords = [];
    } else if (typeof keywords === 'string') {
      // When there's only one keyword, it comes as a string
      keywords = [keywords];
    }

    const newGameAccount = new GameAccount({
      username: user.username,
      email: user.email,
      profilePhoto: user.profilePhoto,
      description,
      gameName,
      price,
      coverPhoto,
      screenshots,
      userId,
      keywords,
      gameUsername,
      gamePassword,
      gameMode,
      platform
    });

    await newGameAccount.save();

    res.status(201).json({ message: 'Game account created successfully', newGameAccount });
  } catch (error) {
    console.error('Error adding game account:', error);
    res.status(500).json({ message: 'Error adding game account', error: error.message });
  }
};


// export const Vieworderstrans = async (req, res) => {
//   try {
//     const {buyerId} = buyerId;
//     const payments = await Payment.find({ paymentStatus: "success" })
//       .sort({ paidAt: -1 }) // newest first
//       .populate({
//         path: "buyerId",
//         model: "User",
//         select: "username email",
//       })
//       .populate({
//         path: "bookingId",
//         model: "Booking",
//         populate: {
//           path: "gameAccountId",
//           model: "GameAccount",
//           populate: {
//             path: "userId",
//             model: "User",
//             select: "username email",
//           },
//         },
//       });

//     if (!payments || payments.length === 0) {
//       return res.status(404).json({ message: "No successful payments found." });
//     }

//     const results = payments.map((payment) => ({
//       buyer: payment.buyerId,
//       transactionId: payment.transactionId,
//       paymentMode: payment.paymentMode,
//       paymentStatus: payment.paymentStatus,
//       totalPrice: payment.amount,
//       bookedAt: payment.paidAt,
//       gameAccount: payment.bookingId?.gameAccountId || null,
//     }));

//     res.status(200).json({
//       allTransactions: results,
//       latestTransaction: results[0], // first one is latest due to sorting
//     });
//   } catch (error) {
//     console.error("Error fetching payments:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const viewGameAccount = async (req, res) => {
  try {
      const { id } = req.params; 

      const gameAccount = await GameAccount.findById(id);

     
      if (!gameAccount) {
          return res.status(404).json({ message: 'Game account not found' });
      }

   
      res.status(200).json(gameAccount);
  } catch (error) {
      console.error('Error fetching game account:', error);
      res.status(500).json({ message: 'Error fetching game account', error: error.message });
  }
};

export const getAllGameAccounts = async (req, res) => {
  try {
  
      const gameAccounts = await GameAccount.find()
      res.status(200).json(gameAccounts);
  } catch (error) {
      console.error('Error fetching game accounts:', error);
      res.status(500).json({ message: 'Error fetching game accounts', error: error.message });
  }
};



export const updateUser = async (req, res) => {
  const userId = req.params.id; 
  const updates = req.body; // Capture the fields to update from the request body

  try {
      // Find the user by ID and update the fields
      const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true }); 

      // If user is not found, return a 404 error
      if (!user) {
          return res.status(404).send({ error: 'User not found' });
      }

      // Send the updated user details as a response
      res.status(200).send(user);
  } catch (err) {
      // Check for ObjectId errors
      if (err.kind === 'ObjectId') {
          return res.status(400).send({ error: 'Invalid User ID' });
      }

      console.error(err);
      res.status(500).send({ error: 'Server error' });
  }
};


/* function to delete the game account */
export const deleteGameAccount = async (req, res) => {
  try {
    const gameAccount = await GameAccount.findByIdAndDelete(req.params.id);
    if (!gameAccount) {
      return res.status(404).json({ message: 'Game account not found' });
    }
    res.status(200).json({ message: 'Game account deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error' });
  }
}


/* function to view all game account inserted by one user */
export const viewGameAccountsByUser = async (req, res) => {
  const userId = req.params.userId; 
  console.log('Received userId:', userId);

  // Validate the userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid User ID' });
  }

  try {
    // Find game accounts associated with the given userId
    const gameAccounts = await GameAccount.find({ userId: userId }); 

    if (gameAccounts.length === 0) {
      return res.status(404).send({ error: 'No game accounts found for this user' });
    }
      
    res.status(200).json(gameAccounts);
  } catch (error) {
      console.error('Error fetching game accounts:', error);
      res.status(500).send({ error: 'Server error' });
  }
};




export const updateGameAccount = async (req, res) => {
  const userId = req.params.id; 
  const updates = req.body;

  try {
   
      const user = await GameAccount.findByIdAndUpdate(userId, updates, {
          new: true, 
      });

      if (!user) {
          return res.status(404).send({ error: 'Game account not found' });
      }
      res.status(200).send({
          message: 'Game account updated successfully',
          updatedAccount: user, 
      });
  } catch (err) {
      if (err.kind === 'ObjectId') {
          return res.status(400).send({ error: 'Invalid Game Account ID' });
      }

      console.error(err);
      res.status(500).send({ error: 'Server error while updating the game account' });
  }
};

/* function for the cart function */
export const AddtoCart = async (req, res) => {
  const userId = req.params.id;
  const gameId = req.body.gameAccountId;

  try {
    // Find the user and check their role
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }



    // Find the game account
    const game = await GameAccount.findById(gameId);

    if (!game) {
      return res.status(404).send({ error: 'Game account not found' });
    }

    // Check if the cart already exists for this user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if none exists
      cart = new Cart({
        userId,
        items: [{ gameAccountId: gameId }],
      });
    } else {
      // Check if the game is already in the cart
      const existingItem = cart.items.find(
        (item) => item.gameAccountId.toString() === gameId
      );

      if (existingItem) {
        return res.status(400).send({ error: 'Game account already in cart' });
      }

      // Add the new game account to the cart
      cart.items.push({ gameAccountId: gameId });
    }

    await cart.save();
    res.status(200).send({ message: 'Item added to cart successfully', cart });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send({ error: 'Internal server error' });
  }
};

/* function to view all items of a user in the cart */
export const ViewCartOfUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Access userId from req.params
    if (!userId) {
      return res.status(400).send({ error: 'User ID is missing in the request URL' });
    }

    const cart = await Cart.findOne({ userId }).populate('items.gameAccountId'); // Populate game details if needed

    if (!cart) {
      return res.status(404).send({ error: 'Cart is empty for the user' });
    }

    res.status(200).send({ message: 'Cart items retrieved successfully', cart });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send({ error: 'Internal server error' });
  }
};

export const ViewHistoryTransactionOfUSer = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const transactions = await Payment.find({ buyerId: userId }).sort({ createdAt: -1 });

    if (transactions.length === 0) {
      return res.status(404).json({ message: 'No transactions found for this user' });
    }

    return res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



/* function for remove the item from the cart */
export const RemoveItemFromCart = async (req, res) => {
  try {
    const { userId, gameAccountId } = req.params;

    // Find the cart for the user
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for the user' });
    }

    // Filter out the item to be removed
    const initialLength = cart.items.length;
    cart.items = cart.items.filter(
      (item) => item.gameAccountId.toString() !== gameAccountId
    );

    // Check if the item was found and removed
    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: 'Item not found in the cart' });
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Item removed successfully', cart });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send({ error: 'Internal server error' });
  }
};

/* function to calculate the price of whole account in the cart */
export const CalculateCartPrice = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId }).populate('items.gameAccountId');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for the user' });
    }

    const total = cart.items.reduce((acc, item) => acc + (item.gameAccountId.price || 0), 0);

    res.status(200).json({ message: 'Cart price calculated successfully', total });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send({ error: 'Internal server error' });
  }
};


/* function for booking the game account */
export const BookGameAccount = async (req, res) => {
  try {
    const { userId, gameAccountId } = req.params;

    // Fetch the user's cart and populate game account data
    const cart = await Cart.findOne({ userId }).populate('items.gameAccountId');
    if (!cart) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }

    // Find the specific item in the cart
    const item = cart.items.find(
      (item) => item.gameAccountId._id.toString() === gameAccountId
    );

    if (!item) {
      return res.status(404).json({ message: "Game account not found in cart" });
    }

    const price = item.gameAccountId.price;

    if (!price || isNaN(price) || price <= 0) {
      return res.status(400).json({ message: "Invalid price for the game account" });
    }

    const totalPrice = price;

    // Create booking with required fields
    const booking = await Booking.create({
      buyerId: userId,
      gameAccountId,
      totalPrice
    });

    // Remove item from cart
    cart.items.pull(item._id);
    await cart.save();

    return res.status(200).json({
      message: "Game account booked successfully",
      bookingId: booking._id,  
      totalPrice,
      status: booking.status,
      paymentStatus: booking.paymentStatus
    });
    
  } catch (error) {
    console.error("Booking error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};




export const BookAllGameAccounts = async (req, res) => {
  try {
    const { userId, token} = req.params;

    const cart = await Cart.findOne({ userId }).populate('items.gameAccountId');
    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(404).json({ message: "No items in cart" });
    }

    const gameAccountId = [];
    let totalPrice = 0;

    for (let item of cart.items) {
      const game = item.gameAccountId;
      if (!game || isNaN(game.price)) continue;

      gameAccountId.push(game._id);
      totalPrice += game.price;
    }

    

    // Create the booking
    const booking = await Booking.create({
      buyerId: userId,
      paypalToken: token,
      gameAccountId,
      totalPrice
    });

    // Clear the cart after booking
    // await Cart.updateOne({ userId }, { $set: { items: [] } });

    // ❌ Removed deletion of game accounts after booking
    // await GameAccount.deleteMany({ _id: { $in: gameAccountId } });

    res.status(200).json({
      message: "Booking created successfully",
      booking,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while booking" });
  }
};





/* funcion for sending the message */
// export const sendingMessage = async(req, res) => {
//   try {
//     const { message } = req.body
//     const { buyerId, sellerId } = req.params

//     if (!message || message.trim() === '') {
//       return res.status(400).json({ message: "Message content cannot be empty" });
//     }

//     const buyer = await User.findById(buyerId)
//     const seller = await User.findById(sellerId)

//     if(!buyer || !seller) {
//       return res.status(404).json({ message: "User not found" })
//     }

//     const newMessage = new Message({
//       buyer: buyerId,
//       seller: sellerId,
//       message: message,
//       date:new Date(),
//       read: false
//     })
//     await newMessage.save()
//     res.status(201).json({ message: "Message sent Successfully" })
//   } catch (error) {
//     console.log(error.message)
//     return res.status(500).json({ message: "internal server error" })
//   }
// }


/* function to view sellers in the user model */
export const viewSellers = async(req, res) => {
  try {
    const sellers = await User.find({})
    res.status(200).json(sellers)
  } catch (error) {
    console.log();
    return res.status(500).json({ message: "internal server error" })
  }
}

export const paypalPaymentInitialize = async (req, res) => {
  const {totalPrice, gameDetails} = req.body;
  
  try {
  const url = await initiatePaypal(totalPrice, gameDetails);
  res.json({url});
  

  } catch (err) {
    res.send('❌ Error initiating PayPal payment: ' + err.message);
    console.error('❌ Error initiating PayPal payment:', err);
  }
};

export const paypalPaymentVerification = async (req, res) => {
  const {token} = req.query;
  try {
    const response = await capturePayment(token);

    // Find the booking by PayPal token
    const booking = await Booking.findOne({ paypalToken: token });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found for this PayPal token' });
    }

    // Update paymentStatus according to status, if failed the paypal returns the status failed as issue: "ORDER_NOT_APPROVED"
    if(response.status) {
      booking.paymentStatus = response.status === 'COMPLETED' 
      ? 'completed': response.status === 'FAILED' 
      ? 'cancelled' 
      : 'pending';
    } 
    else if (response.details[0].issue === 'ORDER_NOT_APPROVED') {
      booking.paymentStatus = 'cancelled';
    }

    booking.transactionId = response.id || token;
    await booking.save();
    
    if(booking.paymentStatus === 'completed') {
      booking.gameAccountId.map(async (gameAccount) => {
        // Delete the game account after successful payment
        await GameAccount.findByIdAndDelete(gameAccount);
      });
      await Cart.deleteOne({ userId: booking.buyerId });
    }

    res.json({msg: booking.paymentStatus === 'completed' 
      ? 'Game account purchased successfully!'
      : booking.paymentStatus === 'cancelled' 
      && 'Purchasing Game account failed', booking});

  } catch (err) {
    res.send('❌ Error handling PayPal payment verification: ' + err.message);
    console.error('❌ Error handling PayPal payment verification:', err);
  }
};

export const GetBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is a valid MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid booking ID format" });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// export const getMessages = async (req, res) => {
//   try {
//     const { userId } = req.params;  // Get the user ID from request params

//     // Find all messages where the user is either the buyer or the seller
//     const messages = await Message.find({
//       $or: [
//         { buyer: userId },  // Messages where the user is the buyer
//         { seller: userId }   // Messages where the user is the seller
//       ]
//     }).sort({ date: 'asc' });  // Optionally sort messages by date (ascending)

//     if (messages.length === 0) {
//       return res.status(404).json({ message: "No messages found for this conversation" });
//     }

//     // Respond with the found messages
//     res.status(200).json({ messages });
//   } catch (error) {
//     console.error('Error fetching messages:', error.message);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };


export const sendReview = async (req, res) => {
  try {
    const { userId } = req.params;
    const { rating, comment } = req.body;

    // Basic validation
    if (!rating || !comment) {
      return res.status(400).json({ message: "Rating and comment are required." });
    }

    // Optional: check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create review
    const newReview = new Review({
      userId,
      rating,
      comment,
    });

    await newReview.save();

    res.status(201).json({ message: "✅ Review submitted successfully!", review: newReview });

  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ message: "❌ Something went wrong while submitting the review." });
  }
};




export const getReviews = async (req, res) => {
  try {
    // Find all reviews and populate user info
    const reviews = await Review.find().populate('userId');

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

export const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}