import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';
import SellerSide from './sellerSide';

const SellerProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userid');
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
      setPreviewPhoto(URL.createObjectURL(file));
    }
  };

  if (!profileData) return <p>Loading profile...</p>;

  return (
    <div className="semi">
      <SellerSide />
      <div className="profile-wrapper mt-5">
        <div className="profile-section">
          <h5>Profile Picture</h5>
          <p>Upload a picture to make your profile stand out</p>
          <div className="profile-pic-container">
            <label htmlFor="profileUpload">
              <div className="profile-pic">
                <img
                  src={
                    previewPhoto ||
                    (profileData.profilePhoto
                      ? `http://localhost:8000/uploads/profilePhotos/${profileData.profilePhoto}`
                      : "/default-profile.png")
                  }
                  alt="Profile"
                  className="profile-img"
                />
                <div className="camera-icon">📷</div>
              </div>
            </label>
            <input
              type="file"
              id="profileUpload"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        <div className="account-info-section">
          <h5>Account Info</h5>
          <div className="info-grid">
            <div><input type="text" value={profileData.username} readOnly /></div>
            <div><input type="text" value={profileData.address.street} readOnly /></div>
            <div><input type="text" value={profileData.address.city} readOnly /></div>
            <div><input type="text" value={profileData.address.state} readOnly /></div>
            <div><input type="text" value={profileData.address.zipCode} readOnly /></div>
            <div><input type="text" value={profileData.address.country} readOnly /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
