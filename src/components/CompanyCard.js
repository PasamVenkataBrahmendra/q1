import React from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding, FaGlobe, FaIndustry, FaChartLine } from 'react-icons/fa';
import './CompanyCard.css';

const CompanyCard = ({ company }) => {
  const {
    symbol,
    name,
    industry,
    sector,
    description,
    website,
    marketCap,
    employees,
    country
  } = company;

  // Truncate description
  const truncateDescription = (text, maxLength = 120) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  // Format market cap
  const formatMarketCap = (value) => {
    if (!value) return 'N/A';
    
    if (value >= 1e12) {
      return `$${(value / 1e12).toFixed(2)}T`;
    } else if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    } else {
      return `$${value.toLocaleString()}`;
    }
  };

  return (
    <div className="company-card glass">
      <div className="company-card-header">
        <div className="company-symbol">{symbol}</div>
        <div className="company-country">{country}</div>
      </div>
      
      <h3 className="company-name">{name}</h3>
      
      <div className="company-tags">
        <span className="company-tag">
          <FaIndustry /> {industry}
        </span>
        <span className="company-tag">
          <FaBuilding /> {sector}
        </span>
      </div>
      
      <p className="company-description">{truncateDescription(description)}</p>
      
      <div className="company-details">
        <div className="detail-item">
          <span className="detail-label">Market Cap</span>
          <span className="detail-value">{formatMarketCap(marketCap)}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Employees</span>
          <span className="detail-value">{employees ? employees.toLocaleString() : 'N/A'}</span>
        </div>
      </div>
      
      <div className="company-actions">
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer" className="company-website">
            <FaGlobe /> Website
          </a>
        )}
        <Link to={`/stock/${symbol}`} className="view-stock-btn">
          <FaChartLine /> View Stock
        </Link>
      </div>
      
      <div className="card-background">
        <div className="bg-pattern"></div>
      </div>
    </div>
  );
};

export default CompanyCard;