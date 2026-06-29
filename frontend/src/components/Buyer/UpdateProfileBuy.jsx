import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BuyerProdNav from './BuyerProdNav';
import './UpdateProfileBuy.css';

const UpdateProfileBuy = () => {
  const [profileData, setProfileData] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userid'); // Get from localStorage
        const response = await axios.get(`http://localhost:8000/api/viewuser/${userId}`);
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };
    fetchData();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewPhoto(URL.createObjectURL(file)); // Show preview if image selected
    }
  };

  if (!profileData) return <p>Loading profile...</p>;

  return (
    <div className="profile-dashboard">
      <BuyerProdNav />
      <div className="store-container">
        <div className="profile-header-main">
          <h2>Your <span>Profile</span></h2>
          <p>Manage your account settings and preferences.</p>
        </div>

        <div className="profile-grid">
          {/* Avatar Section */}
          <div className="profile-card avatar-card">
            <div className="avatar-wrapper">
              <img
                src={
                  previewPhoto ||
                  (profileData.profilePhoto
                    ? `http://localhost:8000/uploads/profilePhotos/${profileData.profilePhoto}`
                    : "/default-profile.png")
                }
                alt="Profile"
                className="main-avatar"
              />
              <label htmlFor="profileUpload" className="avatar-edit-btn">
                <i className="bi bi-camera"></i>
              </label>
              <input
                type="file"
                id="profileUpload"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
              />
            </div>
            <div className="avatar-info">
              <h3>{profileData.username}</h3>
              <p>{profileData.email}</p>
              <span className="role-badge">{profileData.role}</span>
            </div>
          </div>

          {/* Details Section */}
          <div className="profile-card details-card">
            <div className="details-header">
              <h3><i className="bi bi-person-lines-fill"></i> Account Details</h3>
            </div>
            <div className="details-grid">
              <div className="detail-item">
                <label>Username</label>
                <div className="detail-value">{profileData.username}</div>
              </div>
              <div className="detail-item">
                <label>Phone Number</label>
                <div className="detail-value">{profileData.phone}</div>
              </div>
              <div className="detail-item">
                <label>Street Address</label>
                <div className="detail-value">{profileData.address.street}</div>
              </div>
              <div className="detail-item">
                <label>City</label>
                <div className="detail-value">{profileData.address.city}</div>
              </div>
              <div className="detail-item">
                <label>State / Province</label>
                <div className="detail-value">{profileData.address.state}</div>
              </div>
              <div className="detail-item">
                <label>Zip Code</label>
                <div className="detail-value">{profileData.address.zipCode}</div>
              </div>
              <div className="detail-item">
                <label>Country</label>
                <div className="detail-value">{profileData.address.country}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileBuy;
