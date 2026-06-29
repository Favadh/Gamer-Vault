import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';
import './styles/gameAccountList.css';
import BuyerProdNav from './BuyerProdNav';

const BuyerCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            const userId = localStorage.getItem('userid');
            if (!userId) {
                setError('User ID not found');
                setLoading(false);
                return;
            }

            try {
                // Fetch cart items
                const res = await axios.get(`http://localhost:8000/api/usercart/${userId}`);
                const cart = res.data.cart;

                if (cart && Array.isArray(cart.items)) {
                    setCartItems(cart.items);
                }

                // Fetch total price
                const totalRes = await axios.get(`http://localhost:8000/api/totalprice/${userId}`);
                setTotalPrice(totalRes.data.total || 0); 
            } catch (err) {
                setError('Error loading cart');
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const handleRemoveItem = async (gameAccountId) => {
        try {
            const userId = localStorage.getItem('userid');
            await axios.delete(`http://localhost:8000/api/removecart/${userId}/${gameAccountId}`);
    
            // Remove the item from local state
            setCartItems(prev => prev.filter(item => item.gameAccountId._id !== gameAccountId));
    
            // Recalculate total after removal
            const totalRes = await axios.get(`http://localhost:8000/api/totalprice/${userId}`);
            setTotalPrice(totalRes.data.total || 0);
        } catch (err) {
            alert('Failed to remove item');
        }
    };

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        const userId = localStorage.getItem('userid');
        try {
            
            const paypalUrl = await axios.post('http://localhost:8000/api/paypal-initialize', {
                totalPrice,
                gameDetails:[...cartItems.map(item => {
                    return{
                        gameName: item.gameAccountId.gameName,
                        price: item.gameAccountId.price
                    }
                })],
            });
            console.log(paypalUrl.data);    

            const urlObj = new URL(paypalUrl.data.url);
            const token = urlObj.searchParams.get("token");

            await axios.post(`http://localhost:8000/api//bookall/${userId}/${token}`);

            if (!paypalUrl.data || !paypalUrl.data.url) {
                alert("Failed to get payment URL");
                setIsCheckingOut(false);
                return;
            }
            

            window.location.href = paypalUrl.data.url; // Redirect browser to PayPal 
        } catch (error) {
            console.error("Booking error:", error.message);
            alert("Failed to book game account. Please try again.");
            setIsCheckingOut(false);
        }
    };

    return (
        <div className="profile-dashboard">
            <BuyerProdNav />
            <div className="store-container">
                <div className="profile-header-main">
                    <h2>Your <span>Cart</span></h2>
                    <p>You have {cartItems.length} items in your shopping bag.</p>
                </div>

                {loading ? (
                    <div className="loading-box">
                        <div className="spinner"></div>
                        <p>Loading your cart...</p>
                    </div>
                ) : (
                    <div className="cart-container">
                        <div className="cart-items">
                            {cartItems.length > 0 ? (
                                cartItems.map(item => {
                                    const account = item.gameAccountId;
                                    return (
                                        <div className="cart-card" key={item._id}>
                                            <img
                                                src={`http://localhost:8000/uploads/coverPhotos/${account.coverPhoto}`}
                                                alt={account.gameName}
                                                className="cart-image"
                                            />
                                            <div className="cart-info">
                                                <h4>{account.gameName}</h4>
                                                <p className="price">₹{account.price}</p>
                                                <p>{account.description}</p>
                                                <button className="remove-btn" onClick={() => handleRemoveItem(account._id)}>
                                                    <i className="bi bi-trash"></i> Remove
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="no-results-box" style={{ width: '100%' }}>
                                    <i className="bi bi-cart-x" style={{ fontSize: '3rem' }}></i>
                                    <p>Your cart is empty.</p>
                                    <button className="clear-filters" onClick={() => navigate('/game')}>Explore Market</button>
                                </div>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="cart-summary">
                                <h5>Order Summary</h5>
                                <div className="summary-details">
                                    {cartItems.map(item => (
                                        <div className="summary-row" key={item._id}>
                                            <span>{item.gameAccountId?.gameName}</span>
                                            <span>₹{item.gameAccountId?.price}</span>
                                        </div>
                                    ))}
                                    <div className="summary-row">
                                        <span>Estimated Tax</span>
                                        <span>₹0.00</span>
                                    </div>
                                    <div className="summary-total">
                                        <span>Total</span>
                                        <span>₹{totalPrice}</span>
                                    </div>
                                </div>

                                <button 
                                    className={`checkout-btn ${isCheckingOut ? 'loading-state' : ''}`} 
                                    onClick={() => handleCheckout()}
                                    disabled={isCheckingOut}
                                >
                                    {isCheckingOut ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Proceed to Checkout <i className="bi bi-arrow-right"></i>
                                        </>
                                    )}
                                </button>
                                <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: '#ffffff', opacity: 0.6 }}>
                                    Secure SSL encrypted payment
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BuyerCart;
