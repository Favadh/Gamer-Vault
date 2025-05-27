import express from 'express';
import upload from '../middleware/upload.js'; 
import {  addGameAccount, AddtoCart, BookAllGameAccounts, BookGameAccount, CalculateCartPrice,/*Vieworderstrans,*/ deleteGameAccount, getAllGameAccounts, GetBooking, loginUser, RemoveItemFromCart, signup, updateGameAccount, updateUser, viewAllUsers, ViewCartOfUser, viewGameAccount, viewGameAccountsByUser, viewSellers, viewUser, ViewHistoryTransactionOfUSer, sendReview, getReviews, DeleteUser, paypalPaymentInitialize, paypalPaymentVerification, sendEmailAgain } from '../control/userControl.js';
import { send } from 'process';


const router = express.Router();

// POST route for user signup
router.post('/signup', upload.single('profilePhoto'), signup);
router.post('/login', loginUser)
router.get('/viewuser/:id', viewUser) // to view a single user by the user himself.
router.get('/viewalluser', viewAllUsers) // to view all users, specifically for admin.
router.post(
    '/addgameaccount/:userId', 
    upload.fields([
      { name: 'coverPhoto', maxCount: 1 }, 
      { name: 'screenshots', maxCount: 100 } 
    ]), 
    addGameAccount
  );
router.get('/view/:id', viewGameAccount) // to view a single game account by the buyer.
router.get('/game', getAllGameAccounts) // to view all game accounts, specifically for home page.
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteGameAccount)
router.get('/viewbyuser/:userId', viewGameAccountsByUser) // to view all game accounts by the seller himself.
router.put('/updategame/:id', updateGameAccount)
router.get('/get-booking/:id', GetBooking); // to get a single recent booking by the buyer. if add some more code it can be used to get all bookings by the buyer.
router.post('/addtocart/:id', AddtoCart)
router.get('/usercart/:userId', ViewCartOfUser)
router.delete('/removecart/:userId/:gameAccountId', RemoveItemFromCart)
router.post('/paypal-initialize', paypalPaymentInitialize); // to get the paypal payment link.
router.get('/payment-verification', paypalPaymentVerification); // to handle the success response from PayPal.
router.post('/send-email-again', sendEmailAgain); // to send email again when the buyer clicks on the "send email again" button in the payment verification page.
router.get('/totalprice/:userId', CalculateCartPrice)
router.post('/book-product/:userId/:gameAccountId', BookGameAccount) // to book a single game account. specifically when the buyer clicks on the "buy" button.
router.post('/bookall/:userId/:token', BookAllGameAccounts) // to book all game accounts in the cart. specifically when the buyer clicks on the "checkout" button on cart page.
// router.get('/orders/:buyerId', Vieworderstrans);
// router.post('/message/:buyerId/:sellerId', sendingMessage)
router.get('/sellers', viewSellers) // no purpose rn, but can be modified to view single seller by the buyer when browsing a product.
router.get('/user-transactions/:userId', ViewHistoryTransactionOfUSer) // to view all recent orders of a user.
router.post('/send-review/:userId', sendReview);
router.get('/viewreviews', getReviews)
router.delete('/deleteuser/:id', DeleteUser) // to delete a user by the admin.



// router.get('/getmessages/:userId', getMessages)

export default router;
