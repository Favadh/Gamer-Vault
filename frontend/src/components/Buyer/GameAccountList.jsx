import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Accounts.css';
import "../GameAccounts.css";
import BuyerProdNav from './BuyerProdNav';
import BuyerHome from './BuyerHome';

const GameAccountList = () => {
  const [gameAccounts, setGameAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [error, setError] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedGameMode, setSelectedGameMode] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    const fetchGameAccounts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/game`);
        setGameAccounts(response.data);
      } catch (err) {
        setError('Failed to fetch game accounts');
        console.error(err);
      }
    };
    fetchGameAccounts();
  }, []);

  useEffect(() => {
    let filtered = [...gameAccounts];

    // Search Filter
    if (search) {
      filtered = filtered.filter(account =>
        account.username?.toLowerCase().includes(search) ||
        account.description?.toLowerCase().includes(search) ||
        account.keywords?.some(kw => kw.toLowerCase().includes(search))
      );
    }

    // Platform Filter
    if (selectedPlatform) {
      filtered = filtered.filter(account =>
        account.platform?.toLowerCase() === selectedPlatform.toLowerCase()
      );
    }

    // Game Mode Filter
    if (selectedGameMode) {
      filtered = filtered.filter(account =>
        account.gameMode?.toLowerCase() === selectedGameMode.toLowerCase()
      );
    }

    // Sorting
    if (sortOrder === 'lowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredAccounts(filtered);
  }, [search, gameAccounts, sortOrder, selectedPlatform, selectedGameMode]);

  const handleViewDetails = (accountId) => {
    localStorage.setItem('selectedGameAccountId', accountId);
    navigate('/gameaccount');
  };

  return (
    <div className="dashboard-wrapper">
      <BuyerProdNav />
      <BuyerHome />

      <div className="store-container">
        <div className="header-bar">
          <div className="title-group">
            <h2 className="featured-title">MARKET<span>PLACE</span></h2>
            <p className="results-count">{filteredAccounts.length} accounts available</p>
          </div>

          <div className="filters-group">
            <div className="filter-item">
              <select
                className="custom-select"
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
              >
                <option value="">All Platforms</option>
                <option value="PC">PC</option>
                <option value="PS4">PS4</option>
                <option value="Xbox">Xbox</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>

            <div className="filter-item">
              <select
                className="custom-select"
                value={selectedGameMode}
                onChange={(e) => setSelectedGameMode(e.target.value)}
              >
                <option value="">All Modes</option>
                <option value="Multiplayer">Multiplayer</option>
                <option value="Single Player">Single Player</option>
                <option value="Co-op">Co-op</option>
              </select>
            </div>

            <div className="filter-item">
              <select
                className="custom-select sort-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Sort by Price</option>
                <option value="lowToHigh">Lowest Price</option>
                <option value="highToLow">Highest Price</option>
              </select>
            </div>
          </div>
        </div>

        {error ? (
          <div className="error-box">{error}</div>
        ) : (
          <div className="game-grid">
            {filteredAccounts.map((account) => (
              <div key={account._id} className="modern-card" onClick={() => handleViewDetails(account._id)}>
                <div className="card-image-wrapper">
                  <img
                    src={`http://localhost:8000/uploads/coverPhotos/${account.coverPhoto}`}
                    alt={account.gameName}
                    className="card-image"
                  />
                  <div className="platform-tag">{account.platform}</div>
                  <div className="price-tag">₹{account.price}</div>
                </div>
                
                <div className="card-body">
                  <h3 className="card-title">{account.gameName}</h3>
                  <div className="card-meta">
                    <span className="mode-badge">{account.gameMode}</span>
                  </div>
                  
                  <div className="card-footer">
                    <div className="seller-mini">
                      <img 
                        src={`http://localhost:8000/uploads/profilePhotos/${account.profilePhoto}`} 
                        alt={account.username} 
                      />
                      <span>{account.username}</span>
                    </div>
                    <button className="view-btn">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredAccounts.length === 0 && !error && (
          <div className="no-results-box">
            <p>No accounts match your criteria.</p>
            <button onClick={() => {setSelectedPlatform(''); setSelectedGameMode(''); setSortOrder('');}} className="clear-filters">Clear All Filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameAccountList;
