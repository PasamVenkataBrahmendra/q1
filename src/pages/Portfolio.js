import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaTrash, FaChartLine, FaExclamationTriangle } from 'react-icons/fa';
import './Portfolio.css';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStock, setNewStock] = useState({
    symbol: '',
    shares: '',
    purchasePrice: ''
  });
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [totalGainLoss, setTotalGainLoss] = useState(0);
  const [gainLossPercentage, setGainLossPercentage] = useState(0);

  // Mock stock data for demonstration
  const mockStockPrices = {
    AAPL: 180.25,
    MSFT: 350.12,
    GOOGL: 140.75,
    AMZN: 130.50,
    TSLA: 240.30,
    NVDA: 450.80,
    META: 320.45,
    NFLX: 550.20,
    DIS: 95.60,
    INTC: 35.75
  };

  // Load portfolio from localStorage on component mount
  useEffect(() => {
    setLoading(true);
    
    // Simulate loading from API/localStorage
    setTimeout(() => {
      const savedPortfolio = localStorage.getItem('quantumStockPortfolio');
      
      if (savedPortfolio) {
        setPortfolio(JSON.parse(savedPortfolio));
      } else {
        // Demo portfolio for first-time users
        const demoPortfolio = [
          { id: 1, symbol: 'AAPL', shares: 10, purchasePrice: 170.50 },
          { id: 2, symbol: 'MSFT', shares: 5, purchasePrice: 330.25 },
          { id: 3, symbol: 'GOOGL', shares: 8, purchasePrice: 135.75 }
        ];
        setPortfolio(demoPortfolio);
        localStorage.setItem('quantumStockPortfolio', JSON.stringify(demoPortfolio));
      }
      
      setLoading(false);
    }, 1000);
  }, []);

  // Calculate portfolio metrics whenever portfolio changes
  useEffect(() => {
    if (portfolio.length > 0) {
      let totalValue = 0;
      let totalCost = 0;
      
      portfolio.forEach(stock => {
        const currentPrice = mockStockPrices[stock.symbol] || stock.purchasePrice;
        totalValue += currentPrice * stock.shares;
        totalCost += stock.purchasePrice * stock.shares;
      });
      
      setPortfolioValue(totalValue);
      setTotalGainLoss(totalValue - totalCost);
      setGainLossPercentage((totalValue - totalCost) / totalCost * 100);
    }
  }, [portfolio]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStock({
      ...newStock,
      [name]: name === 'symbol' ? value.toUpperCase() : value
    });
  };

  // Add new stock to portfolio
  const handleAddStock = (e) => {
    e.preventDefault();
    
    if (!newStock.symbol || !newStock.shares || !newStock.purchasePrice) {
      alert('Please fill in all fields');
      return;
    }
    
    const newPortfolio = [
      ...portfolio,
      {
        id: Date.now(),
        symbol: newStock.symbol,
        shares: parseFloat(newStock.shares),
        purchasePrice: parseFloat(newStock.purchasePrice)
      }
    ];
    
    setPortfolio(newPortfolio);
    localStorage.setItem('quantumStockPortfolio', JSON.stringify(newPortfolio));
    
    // Reset form
    setNewStock({
      symbol: '',
      shares: '',
      purchasePrice: ''
    });
    setShowAddForm(false);
  };

  // Remove stock from portfolio
  const handleRemoveStock = (id) => {
    const newPortfolio = portfolio.filter(stock => stock.id !== id);
    setPortfolio(newPortfolio);
    localStorage.setItem('quantumStockPortfolio', JSON.stringify(newPortfolio));
  };

  // Calculate current value, gain/loss for a stock
  const calculateStockMetrics = (stock) => {
    const currentPrice = mockStockPrices[stock.symbol] || stock.purchasePrice;
    const currentValue = currentPrice * stock.shares;
    const gainLoss = currentValue - (stock.purchasePrice * stock.shares);
    const gainLossPercentage = (gainLoss / (stock.purchasePrice * stock.shares)) * 100;
    
    return {
      currentPrice,
      currentValue,
      gainLoss,
      gainLossPercentage
    };
  };

  // Get quantum prediction for a stock
  const getQuantumPrediction = (symbol) => {
    // In a real app, this would call the backend API
    // For demo, we'll return random predictions
    const random = Math.random();
    if (random > 0.7) return 'up';
    if (random > 0.4) return 'neutral';
    return 'down';
  };

  return (
    <div className="portfolio-page">
      <div className="portfolio-header">
        <h1>Your Portfolio</h1>
        <p className="portfolio-subtitle">Track your investments and view quantum predictions</p>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your portfolio...</p>
        </div>
      ) : (
        <>
          <div className="portfolio-summary">
            <div className="summary-card">
              <h3>Total Value</h3>
              <div className="summary-value">${portfolioValue.toFixed(2)}</div>
            </div>
            
            <div className="summary-card">
              <h3>Total Gain/Loss</h3>
              <div className={`summary-value ${totalGainLoss >= 0 ? 'positive' : 'negative'}`}>
                {totalGainLoss >= 0 ? '+' : ''}{totalGainLoss.toFixed(2)} ({gainLossPercentage.toFixed(2)}%)
              </div>
            </div>
            
            <div className="summary-card">
              <h3>Holdings</h3>
              <div className="summary-value">{portfolio.length}</div>
            </div>
          </div>
          
          <div className="portfolio-actions">
            <button 
              className="add-stock-btn"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              <FaPlus /> {showAddForm ? 'Cancel' : 'Add Stock'}
            </button>
          </div>
          
          {showAddForm && (
            <div className="add-stock-form">
              <h3>Add New Stock</h3>
              <form onSubmit={handleAddStock}>
                <div className="form-group">
                  <label htmlFor="symbol">Stock Symbol</label>
                  <input
                    type="text"
                    id="symbol"
                    name="symbol"
                    placeholder="e.g. AAPL"
                    value={newStock.symbol}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="shares">Number of Shares</label>
                  <input
                    type="number"
                    id="shares"
                    name="shares"
                    placeholder="e.g. 10"
                    min="0.01"
                    step="0.01"
                    value={newStock.shares}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="purchasePrice">Purchase Price ($)</label>
                  <input
                    type="number"
                    id="purchasePrice"
                    name="purchasePrice"
                    placeholder="e.g. 150.75"
                    min="0.01"
                    step="0.01"
                    value={newStock.purchasePrice}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <button type="submit" className="submit-btn">Add to Portfolio</button>
              </form>
            </div>
          )}
          
          {portfolio.length > 0 ? (
            <div className="portfolio-table-container">
              <table className="portfolio-table">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Shares</th>
                    <th>Purchase Price</th>
                    <th>Current Price</th>
                    <th>Current Value</th>
                    <th>Gain/Loss</th>
                    <th>Quantum Prediction</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map(stock => {
                    const metrics = calculateStockMetrics(stock);
                    const prediction = getQuantumPrediction(stock.symbol);
                    
                    return (
                      <tr key={stock.id}>
                        <td>
                          <Link to={`/stock/${stock.symbol}`} className="stock-link">
                            {stock.symbol}
                          </Link>
                        </td>
                        <td>{stock.shares}</td>
                        <td>${stock.purchasePrice.toFixed(2)}</td>
                        <td>${metrics.currentPrice.toFixed(2)}</td>
                        <td>${metrics.currentValue.toFixed(2)}</td>
                        <td className={metrics.gainLoss >= 0 ? 'positive' : 'negative'}>
                          {metrics.gainLoss >= 0 ? '+' : ''}{metrics.gainLoss.toFixed(2)} ({metrics.gainLossPercentage.toFixed(2)}%)
                        </td>
                        <td>
                          <div className={`prediction-indicator ${prediction}`}>
                            {prediction === 'up' && 'Buy'}
                            {prediction === 'neutral' && 'Hold'}
                            {prediction === 'down' && 'Sell'}
                          </div>
                        </td>
                        <td>
                          <button 
                            className="remove-btn"
                            onClick={() => handleRemoveStock(stock.id)}
                            title="Remove from portfolio"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-portfolio">
              <FaExclamationTriangle className="empty-icon" />
              <h3>Your portfolio is empty</h3>
              <p>Add stocks to your portfolio to track their performance and get quantum predictions</p>
              <button 
                className="add-stock-btn"
                onClick={() => setShowAddForm(true)}
              >
                <FaPlus /> Add Your First Stock
              </button>
            </div>
          )}
          
          <div className="portfolio-disclaimer">
            <FaChartLine className="disclaimer-icon" />
            <p>
              Note: Current prices are simulated for demonstration purposes. In a production environment, 
              real-time market data would be used. Quantum predictions are generated using our quantum 
              machine learning model based on historical patterns and market indicators.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Portfolio;