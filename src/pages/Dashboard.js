import React, { useState, useEffect } from 'react';
import { FaSearch, FaChartLine, FaExchangeAlt } from 'react-icons/fa';
import StockChart3D from '../components/StockChart3D';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [stockData, setStockData] = useState([]);
  const [prediction, setPrediction] = useState('up');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('3d'); // '3d' or '2d'

  // Popular stocks for quick selection
  const popularStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corp.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'TSLA', name: 'Tesla Inc.' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.' },
  ];

  // Mock data for demonstration
  const generateMockData = (symbol) => {
    setLoading(true);
    
    // Generate random stock data
    const mockData = [];
    let basePrice = symbol === 'AAPL' ? 180 : 
                   symbol === 'MSFT' ? 350 : 
                   symbol === 'GOOGL' ? 140 : 
                   symbol === 'AMZN' ? 130 : 
                   symbol === 'TSLA' ? 240 : 
                   symbol === 'NVDA' ? 450 : 100;
    
    const volatility = 0.02;
    
    for (let i = 0; i < 30; i++) {
      const change = basePrice * volatility * (Math.random() - 0.5);
      basePrice += change;
      
      mockData.push({
        date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        price: basePrice,
        volume: Math.floor(Math.random() * 10000000) + 1000000,
      });
    }
    
    // Random prediction (in real app, this would come from the quantum ML model)
    const randomPrediction = Math.random() > 0.5 ? 'up' : 'down';
    
    setTimeout(() => {
      setStockData(mockData);
      setPrediction(randomPrediction);
      setLoading(false);
    }, 1000); // Simulate API delay
  };

  // Load data when selected stock changes
  useEffect(() => {
    generateMockData(selectedStock);
  }, [selectedStock]);

  // Handle stock search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSelectedStock(searchQuery.toUpperCase());
      setSearchQuery('');
    }
  };

  // Handle stock selection
  const handleStockSelect = (symbol) => {
    setSelectedStock(symbol);
  };

  // Toggle between 2D and 3D view
  const toggleViewMode = () => {
    setViewMode(viewMode === '3d' ? '2d' : '3d');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Quantum ML Stock Predictions</h1>
        <p className="dashboard-subtitle">
          Advanced stock trend predictions using quantum machine learning algorithms
        </p>
      </div>

      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for a stock symbol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>

      <div className="popular-stocks">
        <h3>Popular Stocks</h3>
        <div className="stock-buttons">
          {popularStocks.map((stock) => (
            <button
              key={stock.symbol}
              className={`stock-button ${selectedStock === stock.symbol ? 'active' : ''}`}
              onClick={() => handleStockSelect(stock.symbol)}
            >
              <span className="stock-symbol">{stock.symbol}</span>
              <span className="stock-name">{stock.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="stock-display">
        <div className="stock-info-header">
          <div className="stock-info">
            <h2>{selectedStock}</h2>
            {!loading && stockData.length > 0 && (
              <div className="stock-price">
                <span className="current-price">${stockData[stockData.length - 1].price.toFixed(2)}</span>
                <span className={`prediction-tag ${prediction === 'up' ? 'up' : 'down'}`}>
                  {prediction === 'up' ? 'BUY' : 'SELL'}
                </span>
              </div>
            )}
          </div>
          <div className="view-toggle">
            <button onClick={toggleViewMode} className="toggle-button">
              <FaExchangeAlt />
              <span>{viewMode === '3d' ? 'Switch to 2D' : 'Switch to 3D'}</span>
            </button>
          </div>
        </div>

        <div className="chart-container">
          {loading ? (
            <div className="loading-spinner"></div>
          ) : (
            viewMode === '3d' ? (
              <StockChart3D stockData={stockData} prediction={prediction} />
            ) : (
              <div className="chart-2d">
                <h3>2D Chart View</h3>
                <p>2D chart implementation will go here</p>
                <div className="placeholder-chart">
                  <FaChartLine className="placeholder-icon" />
                </div>
              </div>
            )
          )}
        </div>

        <div className="prediction-details">
          <h3>Quantum ML Prediction</h3>
          <div className="prediction-card">
            <div className="prediction-header">
              <span className="prediction-label">Prediction:</span>
              <span className={`prediction-value ${prediction}`}>
                {prediction === 'up' ? 'Price Increase Expected' : 'Price Decrease Expected'}
              </span>
            </div>
            <div className="prediction-metrics">
              <div className="metric">
                <span className="metric-label">Confidence:</span>
                <span className="metric-value">{Math.floor(Math.random() * 20) + 80}%</span>
              </div>
              <div className="metric">
                <span className="metric-label">Time Horizon:</span>
                <span className="metric-value">7 Days</span>
              </div>
              <div className="metric">
                <span className="metric-label">Model:</span>
                <span className="metric-value">Quantum Neural Network</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-footer">
        <p>Data is simulated for demonstration purposes. In a production environment, real-time market data and quantum computing predictions would be used.</p>
      </div>
    </div>
  );
};

export default Dashboard;