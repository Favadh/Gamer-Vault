import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Accounts.css';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';

const BuyerProdNav = () => {
  // const [searchTerm, setSearchTerm] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const userId = localStorage.getItem('userid');

  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (userId) {
          const response = await axios.get(`http://localhost:8000/api/viewuser/${userId}`);
          setUserProfile(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };
    fetchUserProfile();
  }, [userId]);

  // Fetch cart item count
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (userId) {
          const response = await axios.get(`http://localhost:8000/api/usercart/${userId}`);
          console.log('-------------------no of items in the cart -------------------->', response.data);
          
          // If response contains an array of items
          if (Array.isArray(response.data.cart)) {
            setCartItemCount(response.data.cart.length);
          } else if (response.data.cart && Array.isArray(response.data.cart.items)) {
            setCartItemCount(response.data.cart.items.length);
          } else {
            setCartItemCount(0);
          }
        }
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };
    fetchCartItems();
  }, [userId]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSellerSwitch = () => {
    navigate('/seller');
  };

  const handleCart = () => {
    navigate('/cart');
  };

  const handleLogout = () => {
    alert('logout successfully')
    localStorage.removeItem('userid');
    navigate('/');
  };

  return (
    <>
      <nav className="ssk navbar navbar-expand-lg">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <Link to='/game' className="navbar-brand text-white">
            <img src="/logo.png" alt="Logo" className="nav-logo-img" />
            <span>GAMER VAULT</span>
          </Link>

          <div className="nav-links-center d-flex align-items-center gap-5">
            <Link to='/game' className="nav-link text-white">Store</Link>
            <Link to='/history' className="nav-link text-white">Orders</Link>
            <Link to='/review' className="nav-link text-white">Review</Link>
            <Link to='#contact' className="nav-link text-white">Contact</Link>
          </div>

          <div className="nav-actions d-flex align-items-center gap-4">
            <button onClick={handleSellerSwitch} className="switch">
              Switch to Seller
            </button>

            <div className="cart-wrapper" onClick={handleCart}>
              <FaShoppingCart className="cart-icon" />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </div>

            <div ref={dropdownRef} className="profile-dropdown-wrapper">
              <img
                src={userProfile ? `http://localhost:8000/uploads/profilePhotos/${userProfile.profilePhoto}` : "/profile.png"}
                alt="Profile"
                className="profile-img-nav rounded-circle"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              
              {showDropdown && (
                <div className="modern-dropdown">
                  <div className="dropdown-user-info">
                    <p className="user-name-small">{userProfile?.username || 'Gamer'}</p>
                    <p className="user-email-small">{userProfile?.email}</p>
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-link" onClick={() => { navigate('/updateprofilebuy'); setShowDropdown(false); }}>
                    <i className="bi bi-person"></i> Profile
                  </div>
                  <div className="dropdown-link text-danger" onClick={() => { setShowConfirmLogout(true); setShowDropdown(false); }}>
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showConfirmLogout && (
        <div className="logout-modal">
          <div className="logout-box">
            <h3>Log Out</h3>
            <p>Are you sure you want to exit the vault?</p>
            <div className="logout-buttons">
              <button className="no-btn" onClick={() => setShowConfirmLogout(false)}>Cancel</button>
              <button className="yes-btn" onClick={handleLogout}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyerProdNav;