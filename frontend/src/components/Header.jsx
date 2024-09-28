import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; 

const Header = () => {
  return (
    <header className="main-header">
      <Link to="/" className="brand-logo">
        S
      </Link>
      <Link to="/dashboard" className="navbtn">
        Dashboard
      </Link>
    </header>
  );
};

export default Header;
