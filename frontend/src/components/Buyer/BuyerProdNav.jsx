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
      <nav className="ssk navbar-expand-lg" style={{ backgroundColor: '#0e0b29', padding: '20px', width: '100%', top: '0' }}>
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <Link to='/game' className="navbar-brand text-white d-flex align-items-center">
            <img src="/logo.png" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
            <span>GAMER VAULT</span>
          </Link>

          <div className="d-flex align-items-center gap-5">
            <Link to='/game' className="nav-link text-white">Store</Link>
            <Link to='/history' className="nav-link text-white">Orders</Link>
            <Link to='/review' className="nav-link text-white">Review</Link>
            <Link to='#contact' className="nav-link text-white">Contact</Link>
          </div>

          <div className="d-flex align-items-center gap-3">

            <button onClick={handleSellerSwitch} className="btn btn-outline-primary switch">
              Switch to Seller
            </button>

            {/* Cart Icon */}
            <div className="cart-icon-container" onClick={handleCart} style={{ position: 'relative', cursor: 'pointer', marginLeft: '20px',
              marginRight: '20px'
            }}>
              <FaShoppingCart color='#7301FF' size={24} />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </div>

            {/* Profile Dropdown */}
            <div ref={dropdownRef} className="position-relative">
              <img
                src={userProfile ? `http://localhost:8000/uploads/profilePhotos/${userProfile.profilePhoto}` : "/profile.png"}
                alt="Profile"
                className="rounded-circle"
                style={{ width: '35px', height: '35px', objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="dropdown-menu show" style={{
                  position: 'absolute',
                  top: '45px',
                  right: '0',
                  cursor: 'pointer',
                  backgroundColor: '#1c1c2c',
                  borderRadius: '8px',
                  padding: '10px',
                  minWidth: '150px',
                  zIndex: 9999
                }}>
                  <div className="dropdown-item text-white" onClick={() => { navigate('/updateprofilebuy'); setShowDropdown(false); }}>
                    Profile
                  </div>
                  <div className="dropdown-item text-danger" onClick={() => { setShowConfirmLogout(true); setShowDropdown(false); }}>
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showConfirmLogout && (
        <div className="modal-backdrop">
          <div className="hi">
            <h5>Are you sure you want to logout?</h5>
            <div className="d-flex justify-content-end mt-3 gap-3">
              <button className="btn btn-secondary" onClick={() => setShowConfirmLogout(false)}>No</button>
              <button className="btn btn-danger" onClick={handleLogout}>Yes</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyerProdNav;