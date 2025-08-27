import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaChartLine, FaInfoCircle, FaHistory } from 'react-icons/fa';
import StockChart3D from '../components/StockChart3D';
import './StockDetail.css';

const StockDetail = () => {
  const { symbol } = useParams();
  const [stockData, setStockData] = useState([]);
  const [stockInfo, setStockInfo] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data generation for demonstration
  useEffect(() => {
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
    
    for (let i = 0; i < 60; i++) {
      const change = basePrice * volatility * (Math.random() - 0.5);
      basePrice += change;
      
      mockData.push({
        date: new Date(Date.now() - (60 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        price: basePrice,
        volume: Math.floor(Math.random() * 10000000) + 1000000,
      });
    }
    
    // Mock stock info
    const mockStockInfo = {
      name: symbol === 'AAPL' ? 'Apple Inc.' : 
            symbol === 'MSFT' ? 'Microsoft Corporation' : 
            symbol === 'GOOGL' ? 'Alphabet Inc.' : 
            symbol === 'AMZN' ? 'Amazon.com Inc.' : 
            symbol === 'TSLA' ? 'Tesla, Inc.' : 
            symbol === 'NVDA' ? 'NVIDIA Corporation' : 
            'Unknown Company',
      sector: symbol === 'AAPL' || symbol === 'MSFT' || symbol === 'GOOGL' ? 'Technology' :
              symbol === 'AMZN' ? 'Consumer Cyclical' :
              symbol === 'TSLA' ? 'Automotive' :
              symbol === 'NVDA' ? 'Semiconductors' : 'Unknown',
      marketCap: symbol === 'AAPL' ? '2.8T' :
                symbol === 'MSFT' ? '2.7T' :
                symbol === 'GOOGL' ? '1.7T' :
                symbol === 'AMZN' ? '1.5T' :
                symbol === 'TSLA' ? '750B' :
                symbol === 'NVDA' ? '1.1T' : '10B',
      peRatio: (Math.random() * 30 + 10).toFixed(2),
      dividend: (Math.random() * 2).toFixed(2) + '%',
      yearHigh: (basePrice * 1.3).toFixed(2),
      yearLow: (basePrice * 0.7).toFixed(2),
      volume: (Math.random() * 10000000 + 1000000).toFixed(0),
    };
    
    // Mock prediction
    const direction = Math.random() > 0.5 ? 'up' : 'down';
    const mockPrediction = {
      direction: direction,
      confidence: (Math.random() * 20 + 80).toFixed(1) + '%',
      targetPrice: direction === 'up' ? 
                  (basePrice * (1 + Math.random() * 0.1)).toFixed(2) : 
                  (basePrice * (1 - Math.random() * 0.1)).toFixed(2),
      timeHorizon: '7 days',
      quantumAdvantage: (Math.random() * 15 + 5).toFixed(1) + '%',
      classicalComparison: (Math.random() * 10 + 60).toFixed(1) + '%',
      lastUpdated: new Date().toLocaleString(),
    };
    
    // Simulate API delay
    setTimeout(() => {
      setStockData(mockData);
      setStockInfo(mockStockInfo);
      
      // Create final prediction with updated direction
      const finalDirection = Math.random() > 0.5 ? 'up' : 'down';
      const finalPrice = mockData[mockData.length - 1].price;
      const targetPrice = finalDirection === 'up' ?
                        (finalPrice * (1 + Math.random() * 0.1)) :
                        (finalPrice * (1 - Math.random() * 0.1));
      
      setPrediction({
        ...mockPrediction,
        direction: finalDirection,
        targetPrice: targetPrice
      });
      
      setLoading(false);
    }, 1500);
  }, [symbol]);

  // Calculate price change
  const calculateChange = () => {
    if (stockData.length < 2) return { value: 0, percentage: 0 };
    
    const currentPrice = stockData[stockData.length - 1].price;
    const previousPrice = stockData[stockData.length - 2].price;
    const change = currentPrice - previousPrice;
    const percentage = (change / previousPrice) * 100;
    
    return {
      value: change.toFixed(2),
      percentage: percentage.toFixed(2)
    };
  };

  const priceChange = calculateChange();

  return (
    <div className="stock-detail">
      <div className="back-link">
        <Link to="/" className="back-button">
          <FaArrowLeft /> Back to Dashboard
        </Link>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading stock data...</p>
        </div>
      ) : (
        <>
          <div className="stock-header">
            <div className="stock-title">
              <h1>{symbol}</h1>
              <h2>{stockInfo?.name}</h2>
            </div>
            
            <div className="stock-price-container">
              <div className="current-price">
                ${stockData[stockData.length - 1].price.toFixed(2)}
              </div>
              <div className={`price-change ${parseFloat(priceChange.value) >= 0 ? 'positive' : 'negative'}`}>
                {parseFloat(priceChange.value) >= 0 ? '+' : ''}{priceChange.value} ({priceChange.percentage}%)
              </div>
            </div>
          </div>
          
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <FaInfoCircle /> Overview
            </button>
            <button 
              className={`tab ${activeTab === 'prediction' ? 'active' : ''}`}
              onClick={() => setActiveTab('prediction')}
            >
              <FaChartLine /> Quantum Prediction
            </button>
            <button 
              className={`tab ${activeTab === 'historical' ? 'active' : ''}`}
              onClick={() => setActiveTab('historical')}
            >
              <FaHistory /> Historical Data
            </button>
          </div>
          
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-tab">
                <div className="info-grid">
                  <div className="info-card">
                    <h3>Company Info</h3>
                    <div className="info-row">
                      <span className="info-label">Sector:</span>
                      <span className="info-value">{stockInfo?.sector}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Market Cap:</span>
                      <span className="info-value">{stockInfo?.marketCap}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">P/E Ratio:</span>
                      <span className="info-value">{stockInfo?.peRatio}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Dividend Yield:</span>
                      <span className="info-value">{stockInfo?.dividend}</span>
                    </div>
                  </div>
                  
                  <div className="info-card">
                    <h3>Trading Info</h3>
                    <div className="info-row">
                      <span className="info-label">52-Week High:</span>
                      <span className="info-value">${stockInfo?.yearHigh}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">52-Week Low:</span>
                      <span className="info-value">${stockInfo?.yearLow}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Volume:</span>
                      <span className="info-value">{parseInt(stockInfo?.volume).toLocaleString()}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Exchange:</span>
                      <span className="info-value">NASDAQ</span>
                    </div>
                  </div>
                </div>
                
                <div className="chart-section">
                  <h3>Price Chart</h3>
                  <StockChart3D stockData={stockData} prediction={prediction?.direction} />
                </div>
              </div>
            )}
            
            {activeTab === 'prediction' && (
              <div className="prediction-tab">
                <div className="prediction-header">
                  <h3>Quantum ML Prediction</h3>
                  <div className={`prediction-badge ${prediction?.direction}`}>
                    {prediction?.direction === 'up' ? 'BUY' : 'SELL'}
                  </div>
                </div>
                
                <div className="prediction-cards">
                  <div className="prediction-card">
                    <h4>Prediction Details</h4>
                    <div className="prediction-row">
                      <span className="prediction-label">Direction:</span>
                      <span className={`prediction-value ${prediction?.direction}`}>
                        {prediction?.direction === 'up' ? 'Upward ↑' : 'Downward ↓'}
                      </span>
                    </div>
                    <div className="prediction-row">
                      <span className="prediction-label">Target Price:</span>
                      <span className="prediction-value">
                        ${prediction?.targetPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="prediction-row">
                      <span className="prediction-label">Time Horizon:</span>
                      <span className="prediction-value">{prediction?.timeHorizon}</span>
                    </div>
                    <div className="prediction-row">
                      <span className="prediction-label">Confidence:</span>
                      <span className="prediction-value">{prediction?.confidence}</span>
                    </div>
                  </div>
                  
                  <div className="prediction-card">
                    <h4>Model Comparison</h4>
                    <div className="prediction-row">
                      <span className="prediction-label">Quantum Accuracy:</span>
                      <span className="prediction-value">{prediction?.confidence}</span>
                    </div>
                    <div className="prediction-row">
                      <span className="prediction-label">Classical Accuracy:</span>
                      <span className="prediction-value">{prediction?.classicalComparison}</span>
                    </div>
                    <div className="prediction-row">
                      <span className="prediction-label">Quantum Advantage:</span>
                      <span className="prediction-value highlight">{prediction?.quantumAdvantage}</span>
                    </div>
                    <div className="prediction-row">
                      <span className="prediction-label">Last Updated:</span>
                      <span className="prediction-value">{prediction?.lastUpdated}</span>
                    </div>
                  </div>
                </div>
                
                <div className="prediction-explanation">
                  <h4>How Quantum ML Improves Predictions</h4>
                  <p>
                    Our quantum machine learning model leverages quantum computing principles to analyze complex market patterns that classical algorithms might miss. By utilizing quantum superposition and entanglement, our model can process multiple market scenarios simultaneously, leading to more accurate predictions.
                  </p>
                  <p>
                    The model considers historical price movements, trading volumes, market sentiment, and macroeconomic indicators to generate predictions with higher confidence levels than traditional approaches.
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'historical' && (
              <div className="historical-tab">
                <h3>Historical Price Data</h3>
                <div className="table-container">
                  <table className="historical-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Open</th>
                        <th>Close</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Volume</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockData.slice().reverse().slice(0, 20).map((day, index) => {
                        return (
                          <tr key={day.date}>
                            <td>{day.date}</td>
                            <td>${(day.price - (Math.random() * 2 - 1)).toFixed(2)}</td>
                            <td>${day.price.toFixed(2)}</td>
                            <td>${(day.price + (Math.random() * 2)).toFixed(2)}</td>
                            <td>${(day.price - (Math.random() * 2)).toFixed(2)}</td>
                            <td>{day.volume.toLocaleString()}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StockDetail;