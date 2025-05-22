import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

const BuyerNav = () => {

    const navigate = useNavigate()

  
        const handleLogout = () => {
            localStorage.removeItem('userid');  
            alert("Logged out successfully");
            navigate('/');  
        };
    


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to='/buyer' className="navbar-brand">BuyerPortal</Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to='/buyer' className="nav-link active" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link to='/buyerprofile' className="nav-link">Profile</Link>
            </li>
            <li className="nav-item">
              <Link to='/game' className="nav-link" >Products</Link>
            </li>
            <li className="nav-item">
              <Link to={'/cart'} className="nav-link">Cart</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link" href="#" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default BuyerNav

