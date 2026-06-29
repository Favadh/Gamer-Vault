// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Nav from './Nav';
// import { useNavigate } from 'react-router-dom';

// const SellerHome = () => {

//   const navigate = useNavigate()

//   const handleEditProfile = () => {
//     navigate('/sellerprofile')
//   }
  

//   const handleAddProduct = () => {
//     navigate('/add')
//   }

//   return (
//     <div>
//      <Nav />
//       {/* Main Content */}
//       <div className="container mt-5">
//         <h1 className="text-center">Welcome to Seller's Dashboard</h1>
//         <div className="row mt-4">
//           {/* Image 1 */}
//           <div className="col-md-4">
//             <div className="card">
//               <img src="https://via.placeholder.com/350x250" className="card-img-top" alt="Product" />
//               <div className="card-body">
//                 <h5 className="card-title">Product 1</h5>
//                 <p className="card-text">Add your product details.</p>
//                 <button onClick={handleAddProduct} className="btn btn-primary">Add</button>
//               </div>
//             </div>
//           </div>

//           {/* Image 2 */}
//           <div className="col-md-4">
//             <div className="card">
//               <img src="https://via.placeholder.com/350x250" className="card-img-top" alt="Orders" />
//               <div className="card-body">
//                 <h5 className="card-title">Orders</h5>
//                 <p className="card-text">View and manage your orders.</p>
//                 <button  className="btn btn-primary">View Orders</button>
//               </div>
//             </div>
//           </div>

//           {/* Image 3 */}
//           <div className="col-md-4">
//             <div className="card">
//               <img src="https://via.placeholder.com/350x250" className="card-img-top" alt="Profile" />
//               <div className="card-body">
//                 <h5 className="card-title">Profile</h5>
//                 <p className="card-text">Update your profile details.</p>
//                 <button className="btn btn-primary" onClick={handleEditProfile}>Edit Profile</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer
//   className="bg-dark text-white text-center py-3"
//   style={{
//     position: 'fixed',
//     bottom: 0,
//     left: 0,
//     width: '100%',
//     zIndex: 100,
//   }}
// >
//   &copy; 2025 Your Website. All rights reserved.
// </footer>
// </div>
//   );
// }

// export default SellerHome;



// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Nav from './Nav';
// import { useNavigate } from 'react-router-dom';

// const SellerHome = () => {
//   const navigate = useNavigate();

//   const handleEditProfile = () => {
//     navigate('/sellerprofile');
//   };

//   const handleAddProduct = () => {
//     navigate('/add');
//   };

//   const handleOrders = () => {
//     navigate('/orders')
//   }
//   return (
//     <div style={{ minHeight: '100vh', paddingBottom: '60px' }}>
//       <Nav />

//       {/* Main Content */}
//       <div className="container mt-5">
//         <h1 className="text-center text-white mb-5">Welcome to Seller's Dashboard</h1>
//         <div className="row g-4 justify-content-center">
//           {/* Card 1 */}
//           <div className="col-md-4">
//             <div className="card shadow-lg border-0 bg-transparent text-white" style={glassCardStyle}>
//               <img src="https://via.placeholder.com/350x250" className="card-img-top" alt="Product" />
//               <div className="card-body">
//                 <h5 className="card-title">Product</h5>
//                 <p className="card-text">Add your product details to start selling.</p>
//                 <button onClick={handleAddProduct} className="btn btn-outline-light w-100">Add Product</button>
//               </div>
//             </div>
//           </div>

//           {/* Card 2 */}
//           <div className="col-md-4">
//             <div className="card shadow-lg border-0 bg-transparent text-white" style={glassCardStyle}>
//               <img src="https://via.placeholder.com/350x250" className="card-img-top" alt="Orders" />
//               <div className="card-body">
//                 <h5 className="card-title">Orders</h5>
//                 <p className="card-text">View and manage all your orders here.</p>
//                 <button onClick={handleOrders} className="btn btn-outline-light w-100">View Orders</button>
//               </div>
//             </div>
//           </div>

//           {/* Card 3 */}
//           <div className="col-md-4">
//             <div className="card shadow-lg border-0 bg-transparent text-white" style={glassCardStyle}>
//               <img src="https://via.placeholder.com/350x250" className="card-img-top" alt="Profile" />
//               <div className="card-body">
//                 <h5 className="card-title">Profile</h5>
//                 <p className="card-text">Update your seller profile and settings.</p>
//                 <button onClick={handleEditProfile} className="btn btn-outline-light w-100">Edit Profile</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer
//         className="bg-dark text-white text-center py-3"
//         style={{
//           position: 'fixed',
//           bottom: 0,
//           left: 0,
//           width: '100%',
//           zIndex: 100,
//         }}
//       >
//         &copy; 2025 Your Website. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// const glassCardStyle = {
//   background: 'rgba(255, 255, 255, 0.05)',
//   borderRadius: '15px',
//   backdropFilter: 'blur(10px)',
//   WebkitBackdropFilter: 'blur(10px)',
//   padding: '20px',
// };

// export default SellerHome;






import React, { useEffect, useState } from 'react';
import './SellerHome.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SellerSide from './sellerSide';

const SellerHome = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const userId = localStorage.getItem('userid'); // Assuming you stored the userId on login

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8000/api/viewuser/${userId}`)
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userId]);

  const handleProfile = () => {
    navigate('/sellerprofile');
  }

  return (
    <div className="seller-dashboard">
      <SellerSide />
      <div className="main-content">
        <div className="top-bar">
          <h2>Dashboard</h2>
          <div className="profile" onClick={handleProfile}>
            <div className="profile-info">
              <span className="username">{userData ? userData.username : 'Seller'}</span>
            </div>
            {userData && userData.profilePhoto ? (
              <img className='profilepic'
                src={`http://localhost:8000/uploads/profilePhotos/${userData.profilePhoto}`}
                alt="profile"
              />
            ) : (
              <div className="profile-placeholder"><i className="bi bi-person"></i></div>
            )}
          </div>
        </div>

        {/* Stat Cards */}
        <div className="stats">
          <div className="stat-card">
            <h4>Total Profit</h4>
            <p>₹12,450</p>
            <span className="stat-trend positive">+10.25%</span>
          </div>
          <div className="stat-card">
            <h4>Accounts Sold</h4>
            <p>24</p>
            <span className="stat-trend positive">+2 this week</span>
          </div>
          <div className="stat-card">
            <h4>Active Listings</h4>
            <p>11</p>
            <span className="stat-trend">Manage Items</span>
          </div>
        </div>

        {/* Chart Section */}
        <div className="chart">
          <h4>Sales Performance</h4>
          <div className="chart-placeholder">
            <img src="/graph.png" alt="chart" style={{ width: '100%', height: 'auto', borderRadius: '12px' }}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerHome;
