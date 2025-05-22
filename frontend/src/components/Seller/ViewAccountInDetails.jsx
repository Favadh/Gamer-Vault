import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Buyer/styles/GameAccountDetail.css';
import Nav from './Nav';

const ViewAccountInDetails = () => {
    const [gameAccount, setGameAccount] = useState(null);
    const [error, setError] = useState('');
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

    const handleDelete = async () => {
        const confirm = window.confirm("Are you sure you want to delete this account?");
        if (!confirm) return;

        try {
            await axios.delete(`http://localhost:8000/api/delete/${gameAccount._id}`);
            alert("Game account deleted successfully!");
            localStorage.removeItem('selectedGameAccountId');
            navigate('/userGameAccount');
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete account.");
        }
    };

    if (error) return <p>{error}</p>;
    if (!gameAccount) return <p>Loading...</p>;

    return (
        <div>
            <Nav />
            <div className="game-account-card">
                <img
                    src={`http://localhost:8000/uploads/coverPhotos/${gameAccount.coverPhoto}`}
                    alt={gameAccount.username}
                    className="cover-image"
                />
                <div className="account-details">
                    <h2 className="account-username">{gameAccount.gameName}</h2>
                    <p className="account-price">${gameAccount.price}</p>
                    <p className="account-description">{gameAccount.description}</p>
                    <p className="account-game-name">{gameAccount.platform}</p>
                    <p className="account-game-name">{gameAccount.gameMode}</p>
                    <button className="delete-button" onClick={handleDelete}>Delete Account</button>
                </div>
            </div>

            {/* Scrolling screenshot section below */}
            <div className="screenshots" ref={scrollRef} style={{ display: 'flex', overflowX: 'auto', marginTop: '20px', padding: '0 10%' }}>
                {gameAccount.screenshots.map((screenshot, index) => (
                    <img
                        key={index}
                        src={`http://localhost:8000/uploads/screenshots/${screenshot}`}
                        alt={`Screenshot ${index + 1}`}
                        className="screenshot-image"
                        style={{
                            width: '600px',
                            height: '120px',
                            objectFit: 'cover',
                            marginRight: '10px',
                            borderRadius: '12px'
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ViewAccountInDetails;
