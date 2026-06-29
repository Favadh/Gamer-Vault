import React, { useState } from 'react';
import './SellerHome.css';
import { useNavigate, useLocation } from 'react-router-dom';

const SellerSide = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleAddProduct = () => navigate('/add');
  const handleViewProduct = () => navigate('/userGameAccount');
  const handleChange = () => navigate('/game');
  const handleOrders = () => navigate('/orders');
  const handleDash = () => navigate('/seller');
  const handleReview = () => navigate('/sellerreview');

  const isActive = (path) => location.pathname === path;

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
          <span>Gamer Vault</span>
        </h3>
        <ul className="blah">
          <li onClick={handleDash} className={isActive('/seller') ? 'active' : ''}>
            <i className="bi bi-speedometer2"></i> 
            <span>Dashboard</span>
          </li>
          <li onClick={handleViewProduct} className={isActive('/userGameAccount') ? 'active' : ''}>
            <i className="bi bi-grid-3x3-gap"></i> 
            <span>My Products</span>
          </li>
          <li onClick={handleOrders} className={isActive('/orders') ? 'active' : ''}>
            <i className="bi bi-bag-check"></i> 
            <span>Orders</span>
          </li>
          <li onClick={handleReview} className={isActive('/sellerreview') ? 'active' : ''}>
            <i className="bi bi-star"></i> 
            <span>Reviews</span>
          </li>
          <li onClick={handleChange}>
            <i className="bi bi-arrow-left-right"></i> 
            <span>Switch to Buyer</span>
          </li>
        </ul>
        <div className="logout" onClick={handleLogout}>
          <i className="bi bi-box-arrow-left"></i> 
          <span>Log Out</span>
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
