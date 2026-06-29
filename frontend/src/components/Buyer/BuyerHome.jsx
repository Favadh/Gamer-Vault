import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BuyerHome.css';
import { FaOtter, FaSearch } from 'react-icons/fa';

const BuyerHome = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/game?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="buyer-home">
      <div className="hero-content">
        <h1 className="hero-title">
          FIND YOUR NEXT <span>LEVEL</span>
        </h1>
        <p className="hero-subtitle">
          Secure, fast, and premium game account marketplace.
        </p>
        <div className="search-section">
          <form className="search-bar" onSubmit={handleSearch}>
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for Valorant, Steam, Epic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-btn">Search</button>
          </form>
        </div>
      </div>
    </div>
  );

};

export default BuyerHome;
