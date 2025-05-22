import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // ✅ Import BrowserRouter
import Login from './components/Login'
import Signup from './components/Signup'
import BuyerHome from './components/Buyer/BuyerHome'
import GameAccountDetail from './components/Buyer/AccountDetails'
import BuyerProfile from './components/Buyer/BuyerProfile'
import GameAccountList from './components/Buyer/GameAccountList'
import UpdateProfile from './components/UpdateProfile'
import AddGameAccount from './components/Seller/AddGameAccount'
import SellerHome from './components/Seller/SellerHome'
import SellerProfile from './components/Seller/SellerProfile'
import UpdateGameAccount from './components/Seller/UpdateGameAccount'
import ViewAccountInDetails from './components/Seller/ViewAccountInDetails'
import ViewOwnAccount from './components/Seller/ViewOwnAccount'
import MainPage from './components/IndexPage'
import BuyerCart from './components/Buyer/BuyerCart';
import PaymentForm from './components/Buyer/PaymentPage';
import ViewOrders from './components/Seller/ViewOrders';
import AdminHome from './components/Admin/AdminHome';
import BuyerOrders from './components/Buyer/BuyerOrders';
import PaymentSuccess from './components/Buyer/PaymentSuccess';
import SendReview from './components/Buyer/SendReview';
import SellerSendReview from './components/Seller/SellerSendReview';
import ViewUser from './components/Admin/ViewUser';
import ViewSales from './components/Admin/ViewSales';
import AdminViewProduct from './components/Admin/AdminViewProducts';
import UpdateProfileBuy from './components/Buyer/UpdateProfileBuy';

function App() {

  return (
    <>
    <Router>
    <Routes>
        <Route path="/login" element={ <Login /> }/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/buyer" element={<BuyerHome />} />
        <Route path="/gameaccount" element={<GameAccountDetail />} /> 
        <Route path="/buyerprofile" element={<BuyerProfile />} /> 
        <Route path="/game" element={<GameAccountList />} /> 
        <Route path="/update-profile" element={<UpdateProfile />} /> 
        <Route path="/add" element={<AddGameAccount />} /> 
        <Route path="/seller" element={<SellerHome />} /> 
        <Route path="/sellerprofile" element={<SellerProfile />} />
        <Route path="/updateGame" element={<UpdateGameAccount />} /> 
        <Route path="/ownaccount" element={<ViewAccountInDetails />} />
        <Route path="/userGameAccount" element={<ViewOwnAccount />} />   
        <Route path="" element={<MainPage />} />   
        <Route path='/cart' element={ <BuyerCart /> }/>
        <Route path='/payment' element={ <PaymentForm /> } />
        <Route path='/orders' element={ <ViewOrders /> } />
        <Route path='/admin' element={ <ViewUser /> } />
        <Route path='/history' element= { <BuyerOrders /> }/>
        <Route path='/payment-success' element ={ <PaymentSuccess /> } />
        <Route path='/review' element={ <SendReview /> }/>
        <Route path='/sellerreview' element={ <SellerSendReview /> }/>
        <Route path='/users' element={ <ViewUser /> }/>
        <Route path='/sales' element={ <ViewSales /> }/>
        <Route path='/products' element={ <AdminViewProduct /> }/>
        <Route path='/updateprofilebuy' element={ <UpdateProfileBuy /> } />
        


    </Routes>
    </Router>
     </>
  )
}

export default App
