// File: src/components/Header.js
import React from 'react';
import TickerBar from './TickerBar';
import Navigation from './Navigation';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <TickerBar />
      <div className="header-main">
        <div className="logo">QuantumStocks</div>
        <Navigation />
        <div className="auth-buttons">
          <button className="signup-btn">Sign Up</button>
          <button className="login-btn">Login</button>
        </div>
      </div>
    </header>
  );
};

export default Header;