import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Buyer/styles/gameAccountList.css';
import Nav from './Nav';
import SellerSide from './sellerSide';

const ViewOwnAccount = () => {
    const [gameAccounts, setGameAccounts] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const userId = localStorage.getItem('userid');
    console.log(userId);

    useEffect(() => {
        const fetchGameAccounts = async () => {
            if (!userId) {
                setError('User ID not found');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8000/api/viewbyuser/${userId}`);
                setGameAccounts(response.data);
            } catch (err) {
                setError('Failed to fetch game accounts');
                console.error(err);
            }
        };

        fetchGameAccounts();
    }, [userId]);

    const handleViewDetails = (accountId) => {
        localStorage.setItem('selectedGameAccountId', accountId);
        navigate('/ownaccount');
    };

    const handleAddAccount = () => {
        navigate('/add'); // Redirect to Add Account Page
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div style={{ display: 'flex' }}>
            <SellerSide />

            <div style={{ flex: 1, padding: '20px', color: 'white', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{color: 'white'}}>Added Products</h2>
                    <button 
                        onClick={handleAddAccount} 
                        style={{
                            backgroundColor: '#7301FF',
                            color: 'white',
                            border: 'none',
                            padding: '10px 16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '14px',
                        }}
                    >
                        Add Product
                    </button>
                </div>

                {gameAccounts.length > 0 ? (
                    gameAccounts.map((account) => (
                        <div key={account._id} className="game-account-card" onClick={() => handleViewDetails(account._id)}>
                            <img 
                                src={`http://localhost:8000/uploads/coverPhotos/${account.coverPhoto}`} 
                                alt={account.username} 
                                className="cover-image" 
                            />
                            <div className="account-details">
                                <h3 className="account-username">{account.gameName}</h3>
                                <p className="account-price">${account.price}</p>
                                <p className="account-description">{account.description}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No game accounts found.</p>
                )}
            </div>
        </div>
    );
};

export default ViewOwnAccount;
