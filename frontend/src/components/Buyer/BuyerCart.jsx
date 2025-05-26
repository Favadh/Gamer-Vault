// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './styles/gameAccountList.css';
// import BuyerProdNav from './BuyerProdNav';

// const BuyerCart = () => {
//     const [cartItems, setCartItems] = useState([]);
//     const [totalPrice, setTotalPrice] = useState(0);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchCart = async () => {
//             const userId = localStorage.getItem('userid');
//             if (!userId) {
//                 setError('User ID not found');
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const res = await axios.get(`http://localhost:8000/api/usercart/${userId}`);
//                 const cart = res.data.cart;

//                 if (cart && Array.isArray(cart.items)) {
//                     setCartItems(cart.items);
//                 }

//                 // Get total price
//                 const totalRes = await axios.get(`http://localhost:8000/api/totalprice/${userId}`);
//                 setTotalPrice(totalRes.data.totalPrice || 0);
//             } catch (err) {
//                 setError('Error loading cart');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCart();
//     }, []);

//     const handleRemoveItem = async (itemId) => {
//         try {
//             await axios.delete(`http://localhost:8000/api/cart/remove/${itemId}`);
//             setCartItems(prev => prev.filter(item => item._id !== itemId));
//         } catch (err) {
//             alert('Failed to remove item');
//         }
//     };

//     const handleClearCart = async () => {
//         const userId = localStorage.getItem('userid');
//         await axios.delete(`http://localhost:8000/api/cart/clear/${userId}`);
//         setCartItems([]);
//     };

//     const handleCheckout = () => {
//         navigate('/payment');
//     };

//     return (
//         <div>
//             <BuyerProdNav />
//             <h2 className="text-center mt-5">Your shopping Cart</h2>

//             {loading ? (
//                 <p className="text-center">Loading cart...</p>
//             ) : (
//                 <div className="cart-container">
//                     <div className="cart-items">
//                         {cartItems.map(item => {
//                             const account = item.gameAccountId;
//                             return (
//                                 <div className="cart-card" key={item._id}>
//                                     <img
//                                         src={`http://localhost:8000/uploads/coverPhotos/${account.coverPhoto}`}
//                                         alt={account.gameName}
//                                         className="cart-image"
//                                     />
//                                     <div className="cart-info">
//                                         <h4>{account.gameName}</h4>
//                                         <p>₹{account.price}</p>
//                                         <p>{account.description}</p>
//                                         <button className="remove-btn" onClick={() => handleRemoveItem(item._id)}>Remove</button>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>

//                     <div className="cart-summary">
//                         <h5>Prices:</h5>
//                         {cartItems.map(item => (
//                             <p key={item._id}>₹{item.gameAccountId?.price}</p>
//                         ))}

//                         <hr />
//                         <p>Taxes: <em>calculated at checkout</em></p>
//                         <p><strong>Subtotal ({cartItems.length} items): ₹{totalPrice}</strong></p>

//                         <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
//                         <div className="cart-actions">
//                             <button className="btn-outline" onClick={() => navigate('/gameaccounts')}>Continue Shopping</button>
//                             <button className="btn-outline red" onClick={handleClearCart}>Remove All</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BuyerCart;


// ... other imports


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './styles/gameAccountList.css';
// import BuyerProdNav from './BuyerProdNav';

// const BuyerCart = () => {
//     const [cartItems, setCartItems] = useState([]);
//     const [totalPrice, setTotalPrice] = useState(0);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchCart = async () => {
//             const userId = localStorage.getItem('userid');
//             if (!userId) {
//                 setError('User ID not found');
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const res = await axios.get(`http://localhost:8000/api/usercart/${userId}`);
//                 const cart = res.data.cart;
//                 if (cart && Array.isArray(cart.items)) {
//                     setCartItems(cart.items);
//                 }

//                 const totalRes = await axios.get(`http://localhost:8000/api/totalprice/${userId}`);
//                 setTotalPrice(totalRes.data.total || 0);
//             } catch (err) {
//                 setError('Error loading cart');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCart();
//     }, []);

//     const handleRemoveItem = async (gameAccountId) => {
//         try {
//             const userId = localStorage.getItem('userid');
//             await axios.delete(`http://localhost:8000/api/removecart/${userId}`, {
//                 data: { gameAccountId }
//             });

//             setCartItems(prev => prev.filter(item => item.gameAccountId._id !== gameAccountId));

//             const totalRes = await axios.get(`http://localhost:8000/api/totalprice/${userId}`);
//             setTotalPrice(totalRes.data.total || 0);
//         } catch (err) {
//             alert('Failed to remove item');
//         }
//     };

//     const handleCheckout = async () => {
//         const userId = localStorage.getItem('userid');
//         if (!userId) {
//             alert("User not found");
//             return;
//         }

//         try {
//             const res = await axios.post(`http://localhost:8000/api/bookall/${userId}`);
//             const { games, booking } = res.data;

//             if (!games || games.length === 0) {
//                 alert("No game credentials returned");
//                 return;
//             }

//             localStorage.setItem("bookingId", booking._id);
//             localStorage.setItem("cartAmount", booking.totalPrice);
//             localStorage.setItem("gameDetails", JSON.stringify(games));

//             navigate('/payment', { state: { games } });
//         } catch (error) {
//             console.error("Checkout failed:", error);
//             alert("Checkout failed. Please try again.");
//         }
//     };

//     const handleBuyNow = async (gameAccountId) => {
//         const userId = localStorage.getItem('userid');
//         if (!userId) {
//             alert("User not found");
//             return;
//         }

//         try {
//             const res = await axios.post(`http://localhost:8000/api/bookone/${userId}/${gameAccountId}`);
//             const { game, booking } = res.data;

//             if (!game) {
//                 alert("Game credentials not found");
//                 return;
//             }

//             localStorage.setItem("bookingId", booking._id);
//             localStorage.setItem("cartAmount", booking.totalPrice);
//             localStorage.setItem("gameDetails", JSON.stringify([game]));

//             navigate('/payment', { state: { games: [game] } });
//         } catch (error) {
//             console.error("Single booking failed:", error);
//             alert("Booking failed. Please try again.");
//         }
//     };

//     return (
//         <div>
//             <BuyerProdNav />
//             <h2 className="text-center mt-5">Your Shopping Cart</h2>

//             {loading ? (
//                 <p className="text-center">Loading cart...</p>
//             ) : (
//                 <div className="cart-container">
//                     <div className="cart-items">
//                         {cartItems.map(item => {
//                             const account = item.gameAccountId;
//                             return (
//                                 <div className="cart-card" key={item._id}>
//                                     <img
//                                         src={`http://localhost:8000/uploads/coverPhotos/${account.coverPhoto}`}
//                                         alt={account.gameName}
//                                         className="cart-image"
//                                     />
//                                     <div className="cart-info">
//                                         <h4>{account.gameName}</h4>
//                                         <p>₹{account.price}</p>
//                                         <p>{account.description}</p>
//                                         <div className="btn-group">
//                                             <button className="remove-btn" onClick={() => handleRemoveItem(account._id)}>Remove</button>
//                                             <button className="buy-now-btn" onClick={() => handleBuyNow(account._id)}>Buy Now</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>

//                     <div className="cart-summary">
//                         <h5>Prices:</h5>
//                         {cartItems.map(item => (
//                             <p key={item._id}>₹{item.gameAccountId?.price}</p>
//                         ))}
//                         <hr />
//                         <p>Taxes: <em>calculated at checkout</em></p>
//                         <p><strong>Subtotal ({cartItems.length} items): ₹{totalPrice}</strong></p>

//                         <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
//                         <div className="cart-actions">
//                             <button className="btn-outline" onClick={() => navigate('/game')}>Continue Shopping</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BuyerCart;



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
            
            const paypalUrl = await axios.get('http://localhost:8000/api/paypal');
            console.log(paypalUrl.data);

            const urlObj = new URL(paypalUrl.data.url);
            const token = urlObj.searchParams.get("token");

            const res = await axios.post(`http://localhost:8000/api//bookall/${userId}/${token}`);

            if (!paypalUrl.data || !paypalUrl.data.url) {
                alert("Failed to get payment URL");
                return;
            }
            
        
            // navigate('/payment');

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
