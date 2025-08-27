import React, { useState, useEffect } from 'react';
import { FaInfoCircle, FaCalendarAlt } from 'react-icons/fa';
import './MarketMood.css';

const MarketMood = () => {
  const [moodData, setMoodData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('1W'); // 1D, 1W, 1M, 3M, 1Y

  // Mock data for market mood
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockMoodData = {
        currentValue: 65,
        previousValue: 58,
        change: 7,
        status: 'Greed',
        lastUpdated: '2023-07-28T16:30:00',
        indicators: [
          { name: 'Market Volatility', value: 72, status: 'Greed' },
          { name: 'Market Momentum', value: 68, status: 'Greed' },
          { name: 'Stock Price Breadth', value: 65, status: 'Greed' },
          { name: 'Put/Call Ratio', value: 55, status: 'Neutral' },
          { name: 'Junk Bond Demand', value: 60, status: 'Greed' },
          { name: 'Safe Haven Demand', value: 45, status: 'Neutral' },
        ]
      };

      // Generate mock historical data
      const generateHistoricalData = (days) => {
        const data = [];
        const today = new Date();
        
        for (let i = days; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          
          // Generate a value between 0 and 100 with some continuity
          let baseValue = 50;
          if (i === days) {
            baseValue = Math.floor(Math.random() * 30) + 40; // Start between 40-70
          } else {
            const prevValue = data[data.length - 1].value;
            const change = Math.floor(Math.random() * 11) - 5; // -5 to +5
            baseValue = Math.max(0, Math.min(100, prevValue + change));
          }
          
          data.push({
            date: date.toISOString().split('T')[0],
            value: baseValue,
            status: getStatusFromValue(baseValue)
          });
        }
        
        return data;
      };
      
      // Get status based on value
      const getStatusFromValue = (value) => {
        if (value <= 25) return 'Extreme Fear';
        if (value <= 40) return 'Fear';
        if (value <= 60) return 'Neutral';
        if (value <= 80) return 'Greed';
        return 'Extreme Greed';
      };
      
      // Generate historical data based on timeframe
      let days;
      switch(timeframe) {
        case '1D': days = 1; break;
        case '1W': days = 7; break;
        case '1M': days = 30; break;
        case '3M': days = 90; break;
        case '1Y': days = 365; break;
        default: days = 7;
      }
      
      const mockHistoricalData = generateHistoricalData(days);
      
      setMoodData(mockMoodData);
      setHistoricalData(mockHistoricalData);
      setLoading(false);
    }, 1000);
  }, [timeframe]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getMoodColor = (status) => {
    switch(status) {
      case 'Extreme Fear': return '#ff3547';
      case 'Fear': return '#ff9f1c';
      case 'Neutral': return '#ffdd00';
      case 'Greed': return '#70e000';
      case 'Extreme Greed': return '#00c853';
      default: return '#ffdd00';
    }
  };

  const getMoodGradient = (value) => {
    // Create a gradient based on the value (0-100)
    const hue = (value * 1.2); // 0 = red (0), 100 = green (120)
    return `hsl(${hue}, 100%, 45%)`;
  };

  return (
    <div className="market-mood-container">
      <section className="market-mood-header">
        <h1>Market Mood Index</h1>
        <p>Gauge market sentiment with our Fear & Greed analysis</p>
      </section>

      {loading ? (
        <div className="loading-spinner"></div>
      ) : moodData && (
        <>
          <section className="mood-meter-section">
            <div className="mood-meter-container">
              <div className="mood-meter">
                <div className="mood-meter-gauge">
                  <div 
                    className="mood-meter-needle" 
                    style={{ transform: `rotate(${(moodData.currentValue / 100) * 180 - 90}deg)` }}
                  ></div>
                  <div className="mood-meter-center">
                    <span className="mood-value">{moodData.currentValue}</span>
                    <span className="mood-label" style={{ color: getMoodColor(moodData.status) }}>
                      {moodData.status}
                    </span>
                    <span className="mood-change">
                      {moodData.change > 0 ? '+' : ''}{moodData.change} pts
                    </span>
                  </div>
                </div>
                <div className="mood-meter-scale">
                  <div className="scale-marker extreme-fear">Extreme Fear</div>
                  <div className="scale-marker fear">Fear</div>
                  <div className="scale-marker neutral">Neutral</div>
                  <div className="scale-marker greed">Greed</div>
                  <div className="scale-marker extreme-greed">Extreme Greed</div>
                </div>
              </div>
              <div className="mood-info">
                <div className="mood-update-time">
                  <FaCalendarAlt />
                  <span>Last updated: {formatDate(moodData.lastUpdated)} at {formatTime(moodData.lastUpdated)}</span>
                </div>
                <div className="mood-description">
                  <FaInfoCircle />
                  <p>
                    The Market Mood Index measures investor sentiment from 0 to 100, where 0 represents extreme fear and 100 represents extreme greed. 
                    Investors tend to be fearful when markets are falling and greedy when markets are rising.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mood-history-section">
            <div className="section-header">
              <h2>Historical Mood Data</h2>
              <div className="timeframe-selector">
                <button 
                  className={`timeframe-btn ${timeframe === '1D' ? 'active' : ''}`}
                  onClick={() => setTimeframe('1D')}
                >
                  1D
                </button>
                <button 
                  className={`timeframe-btn ${timeframe === '1W' ? 'active' : ''}`}
                  onClick={() => setTimeframe('1W')}
                >
                  1W
                </button>
                <button 
                  className={`timeframe-btn ${timeframe === '1M' ? 'active' : ''}`}
                  onClick={() => setTimeframe('1M')}
                >
                  1M
                </button>
                <button 
                  className={`timeframe-btn ${timeframe === '3M' ? 'active' : ''}`}
                  onClick={() => setTimeframe('3M')}
                >
                  3M
                </button>
                <button 
                  className={`timeframe-btn ${timeframe === '1Y' ? 'active' : ''}`}
                  onClick={() => setTimeframe('1Y')}
                >
                  1Y
                </button>
              </div>
            </div>

            <div className="mood-chart">
              <div className="chart-container">
                <div className="chart-y-axis">
                  <span>100</span>
                  <span>75</span>
                  <span>50</span>
                  <span>25</span>
                  <span>0</span>
                </div>
                <div className="chart-content">
                  {historicalData.map((data, index) => (
                    <div 
                      key={index} 
                      className="chart-bar"
                      data-date={data.date}
                      data-value={data.value}
                      data-status={data.status}
                    >
                      <div 
                        className="bar-fill" 
                        style={{ 
                          height: `${data.value}%`,
                          backgroundColor: getMoodGradient(data.value)
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="chart-x-axis">
                {historicalData.filter((_, i) => {
                  // Show fewer labels for longer timeframes
                  if (timeframe === '1D') return true;
                  if (timeframe === '1W') return i % 1 === 0;
                  if (timeframe === '1M') return i % 5 === 0;
                  if (timeframe === '3M') return i % 15 === 0;
                  if (timeframe === '1Y') return i % 30 === 0;
                  return true;
                }).map((data, index) => (
                  <span key={index} className="x-label">{data.date}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="mood-indicators-section">
            <h2>Mood Indicators</h2>
            <div className="indicators-grid">
              {moodData.indicators.map((indicator, index) => (
                <div key={index} className="indicator-card">
                  <h3>{indicator.name}</h3>
                  <div className="indicator-meter">
                    <div className="indicator-bar">
                      <div 
                        className="indicator-fill" 
                        style={{ 
                          width: `${indicator.value}%`,
                          backgroundColor: getMoodGradient(indicator.value)
                        }}
                      ></div>
                    </div>
                    <div className="indicator-value">{indicator.value}</div>
                  </div>
                  <div 
                    className="indicator-status" 
                    style={{ color: getMoodColor(indicator.status) }}
                  >
                    {indicator.status}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mood-explanation-section">
            <h2>Understanding the Market Mood Index</h2>
            <div className="explanation-content">
              <div className="explanation-item">
                <h3>What is the Market Mood Index?</h3>
                <p>
                  The Market Mood Index is a tool designed to measure investor sentiment by analyzing various market indicators. 
                  It provides a numerical representation of market sentiment on a scale from 0 to 100.
                </p>
              </div>
              
              <div className="explanation-item">
                <h3>How to Interpret the Index</h3>
                <div className="interpretation-levels">
                  <div className="level extreme-fear">
                    <h4>0-25: Extreme Fear</h4>
                    <p>Investors are extremely worried. This could represent a buying opportunity as markets may be oversold.</p>
                  </div>
                  <div className="level fear">
                    <h4>26-40: Fear</h4>
                    <p>Investors are concerned about market conditions. Caution is advised, but value opportunities may emerge.</p>
                  </div>
                  <div className="level neutral">
                    <h4>41-60: Neutral</h4>
                    <p>Market sentiment is balanced. Neither fear nor greed is dominating investor decisions.</p>
                  </div>
                  <div className="level greed">
                    <h4>61-80: Greed</h4>
                    <p>Investors are becoming optimistic. Markets may be approaching overvalued territory.</p>
                  </div>
                  <div className="level extreme-greed">
                    <h4>81-100: Extreme Greed</h4>
                    <p>Investors are extremely optimistic. This could indicate a market correction is coming soon.</p>
                  </div>
                </div>
              </div>
              
              <div className="explanation-item">
                <h3>Contrarian Investment Strategy</h3>
                <p>
                  The Market Mood Index can be used as a contrarian indicator. When investors are fearful, it may be a good time to buy. 
                  When investors are greedy, it may be a good time to sell. Remember Warren Buffett's advice: "Be fearful when others are greedy, and greedy when others are fearful."
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default MarketMood;