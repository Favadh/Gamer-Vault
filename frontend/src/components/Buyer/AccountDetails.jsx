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

    const handleBack = () => {
        localStorage.removeItem('selectedGameAccountId');
        navigate(-1);
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
        <div>
            <BuyerProdNav />
            <div className="game-detail-container mt-5">
                <div className="game-detail-card">
                    {/* Left Side */}
                    <div className="left-column">
                        <img
                            src={`http://localhost:8000/uploads/screenshots/${gameAccount.screenshots[0]}`}
                            alt="profile"
                            className="main-profile-img"
                            id="mainProfileImg"
                        />
                        <div className="screenshot-scroll" ref={scrollRef}>
                            {gameAccount.screenshots.map((screenshot, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:8000/uploads/screenshots/${screenshot}`}
                                    alt={`Screenshot ${index + 1}`}
                                    className="screenshot-img"
                                    onClick={() => {
                                        const mainImg = document.getElementById('mainProfileImg');
                                        if (mainImg) {
                                            mainImg.src = `http://localhost:8000/uploads/screenshots/${screenshot}`;
                                        }
                                    }}
                                />
                            ))}
                        </div>
                        <div className="button-group">
                            <button className="back" onClick={handleBack}>Back</button>
                            <button className="add" onClick={handleAddToCart}>Add to Cart</button>
                        </div>
                        {success && <p className="success-msg">{success}</p>}
                        {error && <p className="error-msg">{error}</p>}
                    </div>

                    {/* Right Side */}
                    <div className="right-column">

                        <img
                            src={`http://localhost:8000/uploads/coverPhotos/${gameAccount.coverPhoto}`}
                            alt="cover"
                            className="cover-img"
                        />
                        <h2 className="game-name">{gameAccount.gameName}</h2>
                        <p className="description realdes">{gameAccount.description}</p>
                        <p className="description gameMode">{gameAccount.gameMode}</p>
                        <p className="price ">${gameAccount.price}</p>
                        <p className="description">{gameAccount.platform}</p>

                        <div className="user-card">
                            <h4>Seller Info</h4>
                            <p>Username: {gameAccount.username}</p>
                            <p>Email: {gameAccount.email}</p>
                            <p>Level: Intermediate</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameAccountDetail;
