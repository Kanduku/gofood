import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'; // Ensure CSS is imported

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">
        <h1>go food</h1>
      </div>

      <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
        {isLoggedIn ? (
          <>
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/restaurants" className="navbar-link">Restaurants</Link>
            <Link to="/admin" className="navbar-link">Admin</Link>
          
            <button onClick={handleLogout} className="navbar-logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </>
        )}
      </div>

      {/* Hamburger Icon for mobile */}
      <div className="navbar-hamburger" onClick={toggleMobileMenu}>
        &#9776;
      </div>
    </nav>
  );
};

export default Navbar;
