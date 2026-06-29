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
    <div className="seller-dashboard">
      <SellerSide />
      <div className="main-content">
        <div className="top-bar">
          <div className="title-group">
            <h2 className="featured-title">MY <span>LISTINGS</span></h2>
            <p className="results-count">{gameAccounts.length} active products</p>
          </div>
          <button className="submit-btn" style={{ width: 'auto', padding: '0.8rem 2rem' }} onClick={handleAddAccount}>
            <i className="bi bi-plus-lg"></i> Create New Listing
          </button>
        </div>

        {error ? (
          <div className="error-box">{error}</div>
        ) : (
          <div className="game-grid">
            {gameAccounts.length > 0 ? (
              gameAccounts.map((account) => (
                <div key={account._id} className="modern-card" onClick={() => handleViewDetails(account._id)}>
                  <div className="card-image-wrapper">
                    <img
                      src={`http://localhost:8000/uploads/coverPhotos/${account.coverPhoto}`}
                      alt={account.gameName}
                      className="card-image"
                    />
                    <div className="platform-tag">{account.platform || 'PC'}</div>
                    <div className="price-tag">₹{account.price}</div>
                  </div>
                  
                  <div className="card-body">
                    <h3 className="card-title">{account.gameName}</h3>
                    <div className="card-meta">
                      <span className="mode-badge">{account.gameMode || 'Multiplayer'}</span>
                    </div>
                    
                    <div className="card-footer">
                      <div className="status-indicator">
                        <span className="status-dot online"></span>
                        <span className="status-text">Active</span>
                      </div>
                      <button className="view-btn">Edit Details</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results-box" style={{ gridColumn: '1 / -1' }}>
                <p>You haven't added any products yet.</p>
                <button onClick={handleAddAccount} className="clear-filters">Start Selling Now</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    );
};

export default ViewOwnAccount;
