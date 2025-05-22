import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Accounts.css';
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

      <div style={{ marginTop: '100px' }}>
        <div className="header-bar">
          <h2 className="featured-title">Featured and <span>Recommended</span></h2>

          <div className="filters">
            <select
              className="filter-dropdown"
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
            >
              <option value="" className='bg-light text-dark'>All Platforms</option>
              <option value="PC" className='bg-light text-dark'>PC</option>
              <option value="PS4" className='bg-light text-dark'>PS4</option>
              <option value="Xbox" className='bg-light text-dark'>Xbox</option>
              <option value="Mobile" className='bg-light text-dark'>Mobile</option>
            </select>

            <select
              className="filter-dropdown"
              value={selectedGameMode}
              onChange={(e) => setSelectedGameMode(e.target.value)}
            >
              <option value="" className='bg-light text-dark'>All Game Modes</option>
              <option value="Multiplayer" className='bg-light text-dark'>Multiplayer</option>
              <option value="Single Player" className='bg-light text-dark'>Single Player</option>
              <option value="Co-op" className='bg-light text-dark'>Co-op</option>
            </select>

            <select
              className="sort-dropdown bg-transparent text-white" style={{ padding: '5px', borderRadius: '5px' }}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="" className='bg-light text-dark'>Sort by Price</option>
              <option value="lowToHigh" className='bg-light text-dark'>Price: Low to High</option>
              <option value="highToLow" className='bg-light text-dark'>Price: High to Low</option>
            </select>
          </div>
        </div>

        {error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <div className="game-grid">
            {filteredAccounts.map((account) => (
              <div key={account._id} className="game-card" onClick={() => handleViewDetails(account._id)}>
                <img
                  src={`http://localhost:8000/uploads/coverPhotos/${account.coverPhoto}`}
                  alt={account.username}
                  className="game-cover"
                />
                <div className="game-info">
                  <h4>{account.gameName}</h4>
                  <p className="price">${account.price}</p>
                  <p className="meta">Platform: {account.platform}</p>
                  <p className="meta">Mode: {account.gameMode}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredAccounts.length === 0 && (
          <p className="no-results">No results found for "{search}"</p>
        )}
      </div>
    </div>
  );
};

export default GameAccountList;
