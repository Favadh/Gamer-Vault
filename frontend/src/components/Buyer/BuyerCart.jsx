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

            const res = await axios.post(`http://localhost:8000/api//bookall/${userId}/${token}`);

            if (!paypalUrl.data || !paypalUrl.data.url) {
                alert("Failed to get payment URL");
                return;
            }
            

            window.location.href = paypalUrl.data.url; // Redirect browser to PayPal 
        } catch (error) {
            console.error("Booking error:", error.message);
            alert("Failed to book game account. Please try again.");
        }
    };

    return (
        <div>
            <BuyerProdNav />
            <h2 className="text-start cart-title">Your Shopping Cart</h2>

            {loading ? (
                <p className="text-center">Loading cart...</p>
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
                                            <p>₹{account.price}</p>
                                            <p>{account.description}</p>
                                            <button className="remove-btn" onClick={() => handleRemoveItem(account._id)}>Remove</button>

                                            
                                            
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-center">Your cart is empty.</p>
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <div className="cart-summary">
                            <div>
                                <h5>Prices:</h5>
                                {cartItems.map(item => (
                                    <p key={item._id}>₹{item.gameAccountId?.price}</p>
                                ))}

                                <hr />
                                <p>Taxes: <em>calculated at checkout</em></p>
                                <p><strong>Subtotal ({cartItems.length} items): ₹{totalPrice}</strong></p>
                            </div>

                            <div className="cart-actions">
                                {/* <button className="btn-outline" onClick={() => navigate('/game')}>Continue Shopping</button> */}

                                <button className="checkout-btn" onClick={() => handleCheckout() }>Checkout</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BuyerCart;
