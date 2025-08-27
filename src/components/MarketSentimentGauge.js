import React, { useState, useEffect } from 'react';
import './MarketSentimentGauge.css';

const MarketSentimentGauge = () => {
  const [sentiment, setSentiment] = useState(50); // 0-100 scale: 0 = bearish, 100 = bullish
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get market sentiment
    const fetchSentiment = async () => {
      setLoading(true);
      // In a real app, this would be an API call
      setTimeout(() => {
        // Generate random sentiment between 20 and 80
        const randomSentiment = Math.floor(Math.random() * 60) + 20;
        setSentiment(randomSentiment);
        setLoading(false);
      }, 1500);
    };

    fetchSentiment();
    // Refresh every 5 minutes
    const intervalId = setInterval(fetchSentiment, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Calculate needle rotation based on sentiment
  const needleRotation = (sentiment - 50) * 1.8; // -90 to +90 degrees

  // Determine sentiment category
  const getSentimentCategory = () => {
    if (sentiment < 30) return { text: 'Bearish', color: '#e74c3c' };
    if (sentiment < 45) return { text: 'Slightly Bearish', color: '#e67e22' };
    if (sentiment < 55) return { text: 'Neutral', color: '#f1c40f' };
    if (sentiment < 70) return { text: 'Slightly Bullish', color: '#2ecc71' };
    return { text: 'Bullish', color: '#27ae60' };
  };

  const sentimentInfo = getSentimentCategory();

  return (
    <div className="market-sentiment-gauge">
      <h3 className="gauge-title">Market Sentiment</h3>
      
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <>
          <div className="gauge-container">
            <div className="gauge">
              <div className="gauge-scale">
                <div className="scale-label bearish">Bearish</div>
                <div className="scale-label neutral">Neutral</div>
                <div className="scale-label bullish">Bullish</div>
              </div>
              <div 
                className="gauge-needle" 
                style={{ transform: `rotate(${needleRotation}deg)` }}
              ></div>
              <div className="gauge-center"></div>
            </div>
          </div>
          
          <div className="sentiment-info" style={{ color: sentimentInfo.color }}>
            <div className="sentiment-value">{sentiment}</div>
            <div className="sentiment-category">{sentimentInfo.text}</div>
          </div>
          
          <div className="sentiment-details">
            <p>Based on analysis of market indicators, news sentiment, and trading patterns.</p>
            <p>Last updated: {new Date().toLocaleTimeString()}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default MarketSentimentGauge;