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
      <div className="search-section">
        <form className="search-bar" onSubmit={handleSearch}>
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
  );

};

export default BuyerHome;
