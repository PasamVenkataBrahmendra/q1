import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaStar, FaRegStar, FaChartLine, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import './Companies.css';

const Companies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock data for companies
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockCompanies = [
        {
          symbol: 'AAPL',
          name: 'Apple Inc.',
          price: 182.63,
          change: 2.35,
          changePercent: 1.3,
          marketCap: '2.8T',
          sector: 'Technology',
          prediction: { direction: 'up', confidence: 87 },
          popular: true
        },
        {
          symbol: 'MSFT',
          name: 'Microsoft Corporation',
          price: 337.22,
          change: 4.56,
          changePercent: 1.37,
          marketCap: '2.5T',
          sector: 'Technology',
          prediction: { direction: 'up', confidence: 82 },
          popular: true
        },
        {
          symbol: 'GOOGL',
          name: 'Alphabet Inc.',
          price: 125.30,
          change: -1.25,
          changePercent: -0.99,
          marketCap: '1.6T',
          sector: 'Technology',
          prediction: { direction: 'down', confidence: 65 },
          popular: true
        },
        {
          symbol: 'AMZN',
          name: 'Amazon.com Inc.',
          price: 130.36,
          change: 1.87,
          changePercent: 1.45,
          marketCap: '1.3T',
          sector: 'Consumer Cyclical',
          prediction: { direction: 'up', confidence: 78 },
          popular: true
        },
        {
          symbol: 'TSLA',
          name: 'Tesla, Inc.',
          price: 248.50,
          change: -3.75,
          changePercent: -1.49,
          marketCap: '789.4B',
          sector: 'Automotive',
          prediction: { direction: 'down', confidence: 72 },
          popular: true
        },
        {
          symbol: 'META',
          name: 'Meta Platforms, Inc.',
          price: 301.28,
          change: 5.43,
          changePercent: 1.84,
          marketCap: '772.8B',
          sector: 'Technology',
          prediction: { direction: 'up', confidence: 81 },
          popular: false
        },
        {
          symbol: 'NVDA',
          name: 'NVIDIA Corporation',
          price: 418.76,
          change: 10.34,
          changePercent: 2.53,
          marketCap: '1.0T',
          sector: 'Technology',
          prediction: { direction: 'up', confidence: 91 },
          popular: true
        },
        {
          symbol: 'JPM',
          name: 'JPMorgan Chase & Co.',
          price: 145.44,
          change: -0.78,
          changePercent: -0.53,
          marketCap: '423.6B',
          sector: 'Financial Services',
          prediction: { direction: 'down', confidence: 58 },
          popular: false
        },
        {
          symbol: 'V',
          name: 'Visa Inc.',
          price: 235.32,
          change: 1.23,
          changePercent: 0.53,
          marketCap: '485.7B',
          sector: 'Financial Services',
          prediction: { direction: 'up', confidence: 67 },
          popular: false
        },
        {
          symbol: 'WMT',
          name: 'Walmart Inc.',
          price: 157.18,
          change: 2.45,
          changePercent: 1.58,
          marketCap: '423.1B',
          sector: 'Consumer Defensive',
          prediction: { direction: 'up', confidence: 75 },
          popular: false
        }
      ];
      
      setCompanies(mockCompanies);
      setFilteredCompanies(mockCompanies);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter companies based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      filterCompaniesByType(activeFilter);
    } else {
      const filtered = companies.filter(company => 
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        company.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  }, [searchQuery, companies, activeFilter]);

  const filterCompaniesByType = (filterType) => {
    setActiveFilter(filterType);
    
    let filtered;
    switch(filterType) {
      case 'popular':
        filtered = companies.filter(company => company.popular);
        break;
      case 'bullish':
        filtered = companies.filter(company => company.prediction.direction === 'up');
        break;
      case 'bearish':
        filtered = companies.filter(company => company.prediction.direction === 'down');
        break;
      case 'tech':
        filtered = companies.filter(company => company.sector === 'Technology');
        break;
      case 'finance':
        filtered = companies.filter(company => company.sector === 'Financial Services');
        break;
      default:
        filtered = companies;
    }
    
    setFilteredCompanies(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="companies-container">
      <section className="companies-header">
        <h1>Company Analysis</h1>
        <p>Explore detailed stock analysis with quantum-powered predictions</p>
      </section>

      <section className="companies-search-section">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search companies by name or symbol..." 
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => filterCompaniesByType('all')}
          >
            All
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'popular' ? 'active' : ''}`}
            onClick={() => filterCompaniesByType('popular')}
          >
            Popular
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'bullish' ? 'active' : ''}`}
            onClick={() => filterCompaniesByType('bullish')}
          >
            Bullish
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'bearish' ? 'active' : ''}`}
            onClick={() => filterCompaniesByType('bearish')}
          >
            Bearish
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'tech' ? 'active' : ''}`}
            onClick={() => filterCompaniesByType('tech')}
          >
            Tech
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'finance' ? 'active' : ''}`}
            onClick={() => filterCompaniesByType('finance')}
          >
            Finance
          </button>
        </div>
      </section>

      <section className="companies-list-section">
        {loading ? (
          <div className="loading-spinner"></div>
        ) : filteredCompanies.length > 0 ? (
          <div className="companies-grid">
            {filteredCompanies.map((company) => (
              <Link to={`/stock/${company.symbol}`} key={company.symbol} className="company-card">
                <div className="company-header">
                  <div className="company-name-section">
                    <h3>{company.symbol}</h3>
                    <p>{company.name}</p>
                  </div>
                  <div className="company-favorite">
                    {company.popular ? <FaStar className="star-icon active" /> : <FaRegStar className="star-icon" />}
                  </div>
                </div>
                
                <div className="company-price-section">
                  <div className="price-main">
                    <h2>${company.price.toFixed(2)}</h2>
                    <div className={`price-change ${company.change >= 0 ? 'positive' : 'negative'}`}>
                      {company.change >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                      <span>{Math.abs(company.change).toFixed(2)} ({Math.abs(company.changePercent).toFixed(2)}%)</span>
                    </div>
                  </div>
                  <div className="company-details">
                    <div className="detail-item">
                      <span className="detail-label">Market Cap</span>
                      <span className="detail-value">{company.marketCap}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Sector</span>
                      <span className="detail-value">{company.sector}</span>
                    </div>
                  </div>
                </div>
                
                <div className="company-prediction">
                  <div className="prediction-header">
                    <FaChartLine />
                    <span>Quantum Prediction</span>
                  </div>
                  <div className={`prediction-indicator ${company.prediction.direction === 'up' ? 'bullish' : 'bearish'}`}>
                    {company.prediction.direction === 'up' ? 'Bullish' : 'Bearish'}
                    <span className="confidence">{company.prediction.confidence}% confidence</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No companies found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Companies;