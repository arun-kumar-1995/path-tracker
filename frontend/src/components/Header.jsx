import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Add styles for the header

const Header = () => {
  return (
    <header className="main-header">
      <Link to="/" className="brand-logo">
        S
      </Link>
      <Link to="/dashboard" className="navbtn">
        Dashboard
      </Link>
      <Link to="/track" className="navbtn btn-track">
        Track
      </Link>
    </header>
  );
};

export default Header;
