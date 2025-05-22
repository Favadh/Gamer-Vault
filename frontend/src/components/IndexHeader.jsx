import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./IndexHeader.css";

const IndexHeader = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-dark container">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img 
            src="/logo.png" 
            alt="Gamer Vault" 
            className="logo-img" 
            style={{ height: "50px" }} 
          />
        </Link>

        {/* Navbar Toggler for Mobile */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item">
  <a
    className="nav-link store"
    href="#"
    onClick={(e) => {
      e.preventDefault();
      const storeSection = document.getElementById("store");
      if (storeSection) {
        storeSection.scrollIntoView({ behavior: "smooth" });
      }
    }}
  >
    Store
  </a>
</li>

            <li className="nav-item"><Link className="nav-link" to="/news">News</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
          </ul>

          {/* Login & Signup - Aligned Right */}
          <div className="d-flex">
            <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
            <Link className="btn btn-primary" to="/signup">Signup</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default IndexHeader;
