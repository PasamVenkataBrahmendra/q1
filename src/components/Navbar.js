import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaBuilding, FaNewspaper, FaChartBar, FaSignal, FaInfoCircle, FaSearch } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery);
    setSearchQuery('');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">Q</span>
          <span className="logo-text">QuantumStock</span>
        </Link>

        <div className="search-bar-container">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search stocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <FaSearch />
            </button>
          </form>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/')}`} onClick={() => setIsOpen(false)}>
              <FaHome className="nav-icon" />
              <span>Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/companies" className={`nav-link ${isActive('/companies')}`} onClick={() => setIsOpen(false)}>
              <FaBuilding className="nav-icon" />
              <span>Companies</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/news" className={`nav-link ${isActive('/news')}`} onClick={() => setIsOpen(false)}>
              <FaNewspaper className="nav-icon" />
              <span>News</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/market-mood" className={`nav-link ${isActive('/market-mood')}`} onClick={() => setIsOpen(false)}>
              <FaChartBar className="nav-icon" />
              <span>Market Mood</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/trading-signals" className={`nav-link ${isActive('/trading-signals')}`} onClick={() => setIsOpen(false)}>
              <FaSignal className="nav-icon" />
              <span>Trading Signals</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className={`nav-link ${isActive('/about')}`} onClick={() => setIsOpen(false)}>
              <FaInfoCircle className="nav-icon" />
              <span>About</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;