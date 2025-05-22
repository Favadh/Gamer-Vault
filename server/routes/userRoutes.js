import express from 'express';
import upload from '../middleware/upload.js'; 
import {  addGameAccount, AddtoCart, BookAllGameAccounts, BookGameAccount, CalculateCartPrice,Vieworderstrans, deleteGameAccount, getAllGameAccounts, GetBooking, loginUser, recordPayment, RemoveItemFromCart, signup, updateGameAccount, updateUser, viewAllUsers, ViewCartOfUser, viewGameAccount, viewGameAccountsByUser, viewSellers, viewUser, ViewHistoryTransactionOfUSer, sendReview, getReviews, DeleteUser } from '../control/userControl.js';


const router = express.Router();

// POST route for user signup
router.post('/signup', upload.single('profilePhoto'), signup);
router.post('/login', loginUser)
router.get('/viewuser/:id', viewUser)
router.get('/viewalluser', viewAllUsers)
router.post(
    '/addgameaccount/:userId', 
    upload.fields([
      { name: 'coverPhoto', maxCount: 1 }, 
      { name: 'screenshots', maxCount: 100 } 
    ]), 
    addGameAccount
  );
router.get('/view/:id', viewGameAccount)
router.get('/game', getAllGameAccounts)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteGameAccount)
router.get('/viewbyuser/:userId', viewGameAccountsByUser)
router.put('/updategame/:id', updateGameAccount)
router.get('/get-booking/:id', GetBooking);
router.post('/addtocart/:id', AddtoCart)
router.get('/usercart/:userId', ViewCartOfUser)
router.delete('/removecart/:userId/:gameAccountId', RemoveItemFromCart)
router.post("/payment-success", recordPayment);
  router.get('/totalprice/:userId', CalculateCartPrice)
router.post('/book-product/:userId/:gameAccountId', BookGameAccount)
router.post('/bookall/:userId', BookAllGameAccounts)
router.get('/orders/:buyerId', Vieworderstrans);
// router.post('/message/:buyerId/:sellerId', sendingMessage)
router.get('/sellers', viewSellers)
router.get('/user-transactions/:userId', ViewHistoryTransactionOfUSer)
router.post('/send-review/:userId', sendReview);
router.get('/viewreviews', getReviews)
router.delete('/deleteuser/:id', DeleteUser)



// router.get('/getmessages/:userId', getMessages)

export default router;
