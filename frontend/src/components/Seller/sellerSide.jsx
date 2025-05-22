import React, { useState } from 'react';
import './SellerHome.css';
import { useNavigate } from 'react-router-dom';

const   SellerSide = () => {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleAddProduct = () => navigate('/add');
  const handleViewProduct = () => navigate('/userGameAccount');
  const handleChange = () => navigate('/game');
  const handleOrders = () => navigate('/orders');
  const handleDash = () => navigate('/seller');
  const handleReview = () => navigate('/sellerreview');

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('userid');
    localStorage.clear();
    alert('👋 You have been logged out.');
    navigate('/');
  };

  return (
    <div>
      <div className="sidebar">
        <h3 className="logo">
          <img src="/logo.png" alt="Gamer Vault Logo" className="logo-img" />
          Gamer Vault
        </h3>
        <ul className="blah">
          <li onClick={handleDash}><i className="bi bi-speedometer2"></i> Dashboard</li>
          <li onClick={handleViewProduct}><i className="bi bi-person-circle"></i> Products</li>
          <li onClick={handleChange}><i className="bi bi-toggle-on"></i> Switch to Buyer</li>
          <li onClick={handleReview}><i className="bi bi-toggle-on"></i> Review</li>
          <li onClick={handleOrders}><i className="bi bi-toggle-on"></i> Orders</li>
        </ul>
        <div className="logout" onClick={handleLogout}>
          <i className="bi bi-box-arrow-left"></i> Log Out
        </div>
      </div>

      {/* Logout confirmation popup */}
      {showLogoutConfirm && (
        <div className="logout-modal">
          <div className="logout-box">
            <h3>Log Out</h3>
            <hr />
            <p>Are you sure you want to logout?</p>
            <div className="logout-buttons">
              <button className="yes-btn" onClick={confirmLogout}>Yes</button>
              <button className="no-btn" onClick={() => setShowLogoutConfirm(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerSide;
