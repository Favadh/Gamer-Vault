import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './styles/GameAccountDetail.css';
import "bootstrap/dist/css/bootstrap.min.css";
import BuyerProdNav from './BuyerProdNav';
import { useNavigate } from 'react-router-dom';

const GameAccountDetail = () => {
    const [gameAccount, setGameAccount] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const accountId = localStorage.getItem('selectedGameAccountId');
        if (accountId) {
            const fetchGameAccount = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/api/view/${accountId}`);
                    setGameAccount(response.data);
                } catch (err) {
                    setError('Failed to fetch game account details');
                    console.error(err);
                }
            };
            fetchGameAccount();
        } else {
            setError('No account ID found in local storage');
        }
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            const scrollInterval = setInterval(() => {
                scrollRef.current.scrollBy({
                    top: 0,
                    left: 100,
                    behavior: 'smooth'
                });
            }, 3000);
            return () => clearInterval(scrollInterval);
        }
    }, [gameAccount]);

    const handleBuy = () => {
        handleAddToCart();
        navigate('/cart');
    };

    const handleAddToCart = async () => {
        const userId = localStorage.getItem('userid');
        const gameAccountId = localStorage.getItem('selectedGameAccountId');

        if (!userId || !gameAccountId) {
            setError("Missing user or game account information.");
            return;
        }

        try {
            await axios.post(`http://localhost:8000/api/addtocart/${userId}`, { gameAccountId });
            setSuccess("Item added to cart successfully!");
            setError('');
        } catch (err) {
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError("Failed to add item to cart.");
            }
        }
    };

    if (error) return <p className="error-msg">{error}</p>;
    if (!gameAccount) return <p>Loading...</p>;

    return (
        <div className="detail-page-wrapper">
            <BuyerProdNav />
            
            <div className="detail-container">
                <div className="detail-layout">
                    {/* Media Gallery Section */}
                    <div className="gallery-section">
                        <div className="main-image-container">
                            <img
                                src={`http://localhost:8000/uploads/screenshots/${gameAccount.screenshots[0]}`}
                                alt="Main View"
                                className="main-display"
                                id="mainProfileImg"
                            />
                            <div className="platform-overlay">{gameAccount.platform}</div>
                        </div>
                        
                        <div className="thumbnail-track" ref={scrollRef}>
                            {gameAccount.screenshots.map((screenshot, index) => (
                                <div 
                                    className="thumb-wrapper" 
                                    key={index}
                                    onClick={() => {
                                        const mainImg = document.getElementById('mainProfileImg');
                                        if (mainImg) {
                                            mainImg.src = `http://localhost:8000/uploads/screenshots/${screenshot}`;
                                        }
                                    }}
                                >
                                    <img
                                        src={`http://localhost:8000/uploads/screenshots/${screenshot}`}
                                        alt={`View ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="info-section">
                        <div className="info-header">
                            <h1 className="game-title-main">{gameAccount.gameName}</h1>
                            <div className="badge-group">
                                <span className="mode-tag">{gameAccount.gameMode}</span>
                                <span className="status-tag active">Instant Delivery</span>
                            </div>
                        </div>

                        <div className="description-box">
                            <h3>Description</h3>
                            <p>{gameAccount.description}</p>
                        </div>

                        <div className="specs-grid">
                            <div className="spec-item">
                                <span className="label">Platform</span>
                                <span className="value">{gameAccount.platform}</span>
                            </div>
                            <div className="spec-item">
                                <span className="label">Account Region</span>
                                <span className="value">Global</span>
                            </div>
                            <div className="spec-item">
                                <span className="label">Level</span>
                                <span className="value">Competitive Ready</span>
                            </div>
                        </div>

                        <div className="seller-box">
                            <div className="seller-info-main">
                                <div className="seller-avatar">
                                    <img 
                                        src={`http://localhost:8000/uploads/profilePhotos/${gameAccount.profilePhoto}`} 
                                        alt={gameAccount.username} 
                                    />
                                </div>
                                <div className="seller-details">
                                    <h4>{gameAccount.username}</h4>
                                    <p><i className="bi bi-star-fill"></i> Top Rated Seller</p>
                                </div>
                                <button className="contact-btn">Contact Seller</button>
                            </div>
                        </div>

                        <div className="action-bar-sticky">
                            <div className="price-display">
                                <span className="label">Total Price</span>
                                <span className="amount">₹{gameAccount.price}</span>
                            </div>
                            <div className="btn-group-main">
                                <button className="add-cart-btn" onClick={handleAddToCart}>
                                    <i className="bi bi-cart-plus"></i> Add to Cart
                                </button>
                                <button className="buy-now-btn" onClick={handleBuy}>
                                    Buy Now
                                </button>
                            </div>
                        </div>
                        
                        {success && <div className="success-banner">{success}</div>}
                        {error && <div className="error-banner">{error}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameAccountDetail;
