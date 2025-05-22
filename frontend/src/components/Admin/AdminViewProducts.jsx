import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Buyer/styles/gameAccountList.css';
import { Sidebar } from './SideBar';

const AdminViewProduct = () => {
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
                const response = await axios.get(`http://localhost:8000/api/game`);
                setGameAccounts(response.data);
            } catch (err) {
                setError('Failed to fetch game accounts');
                console.error(err);
            }
        };

        fetchGameAccounts();
    }, [userId]);




    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />

            <div style={{ flex: 1, padding: '20px', color: 'white', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ color: 'white' }}>Game Accounts</h2>
                   
                </div>

                {gameAccounts.length > 0 ? (
                    gameAccounts.map((account) => (
                        <div key={account._id} className="game-account-card">
                            <img 
                                src={`http://localhost:8000/uploads/coverPhotos/${account.coverPhoto}`} 
                                alt={account.username} 
                                className="cover-image" 
                            />
                            <div className="account-details">
                                <h3 className="account-username">{account.username}</h3>
                                <p className="account-price">${account.price}</p>
                                <p className="account-description">{account.gameMode}</p>
                                <p className="account-description">{account.platform}</p>
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

export default AdminViewProduct;
