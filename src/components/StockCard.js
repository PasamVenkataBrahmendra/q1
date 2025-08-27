import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowUp, FaArrowDown, FaChartLine } from 'react-icons/fa';
import './StockCard.css';

const StockCard = ({ stock }) => {
  const {
    symbol,
    name,
    price,
    change,
    changePercent,
    volume,
    marketCap,
    prediction
  } = stock;

  const isPositive = change >= 0;
  
  // Calculate confidence level class
  const getConfidenceClass = () => {
    const confidence = parseFloat(prediction?.confidence);
    if (confidence >= 85) return 'high-confidence';
    if (confidence >= 70) return 'medium-confidence';
    return 'low-confidence';
  };

  return (
    <div className="stock-card glass">
      <div className="stock-card-header">
        <div className="stock-symbol">{symbol}</div>
        <div className="stock-name">{name}</div>
      </div>
      
      <div className="stock-price-container">
        <div className="stock-price">${price.toFixed(2)}</div>
        <div className={`stock-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? <FaArrowUp /> : <FaArrowDown />}
          {isPositive ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
        </div>
      </div>
      
      <div className="stock-details">
        <div className="detail-item">
          <span className="detail-label">Volume</span>
          <span className="detail-value">{volume.toLocaleString()}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Market Cap</span>
          <span className="detail-value">{marketCap}</span>
        </div>
      </div>
      
      {prediction && (
        <div className="stock-prediction">
          <div className="prediction-header">Quantum Prediction</div>
          <div className={`prediction-direction ${prediction.direction}`}>
            {prediction.direction === 'up' ? 'Bullish ↑' : 'Bearish ↓'}
          </div>
          <div className={`prediction-confidence ${getConfidenceClass()}`}>
            {prediction.confidence} confidence
          </div>
        </div>
      )}
      
      <Link to={`/stock/${symbol}`} className="view-details-btn">
        <FaChartLine /> View Details
      </Link>
      
      <div className="card-background">
        <div className="bg-pattern"></div>
      </div>
    </div>
  );
};

export default StockCard;