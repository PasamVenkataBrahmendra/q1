import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3 className="footer-title">QuantumStock</h3>
          <p className="footer-description">
            Advanced stock market prediction using quantum machine learning algorithms.
          </p>
          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaTwitter />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <Link to="/" className="footer-link">Home</Link>
            </li>
            <li>
              <Link to="/companies" className="footer-link">Companies</Link>
            </li>
            <li>
              <Link to="/news" className="footer-link">News</Link>
            </li>
            <li>
              <Link to="/market-mood" className="footer-link">Market Mood</Link>
            </li>
            <li>
              <Link to="/trading-signals" className="footer-link">Trading Signals</Link>
            </li>
            <li>
              <Link to="/about" className="footer-link">About</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Team</h3>
          <ul className="footer-links">
            <li><span className="footer-link">Pavan - Data Sourcing</span></li>
            <li><span className="footer-link">Sangeeth - Data Preprocessing</span></li>
            <li><span className="footer-link">Deepika - Classical ML</span></li>
            <li><span className="footer-link">Manoj - Research & Optimization</span></li>
            <li><span className="footer-link">Bhargavi - Quantum ML</span></li>
            <li><span className="footer-link">Brahmendra - Frontend & Backend</span></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">&copy; {currentYear} QuantumStock. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;