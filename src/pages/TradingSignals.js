import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FaFilter, FaSearch, FaArrowUp, FaArrowDown, FaInfoCircle } from 'react-icons/fa';
import './TradingSignals.css';

const TradingSignals = () => {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [timeframe, setTimeframe] = useState('daily');
  const [showInfo, setShowInfo] = useState(false);

  // Generate mock trading signals
  const generateMockSignals = useCallback((count) => {
    const sectors = ['Technology', 'Healthcare', 'Finance', 'Energy', 'Consumer Goods', 'Utilities', 'Real Estate', 'Materials', 'Industrials', 'Communication'];
    const signals = [];
    const today = new Date();

    for (let i = 0; i < count; i++) {
      const signalType = Math.random() > 0.5 ? 'buy' : 'sell';
      const strength = Math.floor(Math.random() * 5) + 1;
      const confidenceScore = Math.floor(Math.random() * 41) + 60; // 60-100
      const priceTarget = Math.floor(Math.random() * 500) + 50;
      const currentPrice = signalType === 'buy'
        ? priceTarget * (1 - Math.random() * 0.2)
        : priceTarget * (1 + Math.random() * 0.2);

      const potentialReturn = signalType === 'buy'
        ? ((priceTarget / currentPrice) - 1) * 100
        : ((currentPrice / priceTarget) - 1) * 100;

      const date = new Date(today);
      date.setDate(date.getDate() - Math.floor(Math.random() * 7));

      signals.push({
        id: i + 1,
        symbol: generateStockSymbol(),
        companyName: generateCompanyName(),
        signalType,
        strength,
        confidenceScore,
        currentPrice: parseFloat(currentPrice.toFixed(2)),
        priceTarget: parseFloat(priceTarget.toFixed(2)),
        potentialReturn: parseFloat(potentialReturn.toFixed(2)),
        sector: sectors[Math.floor(Math.random() * sectors.length)],
        date: date.toISOString(),
        timeframe,
        analysis: generateAnalysis(signalType),
        technicalIndicators: generateTechnicalIndicators(signalType),
        quantumProbability: Math.floor(Math.random() * 31) + 70
      });
    }

    return signals;
  }, [timeframe]);

  // useEffect to load mock signals on mount or timeframe change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const mockSignals = generateMockSignals(50);
      setSignals(mockSignals);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [generateMockSignals]);

  // Helper functions
  const generateStockSymbol = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let symbol = '';
    const length = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < length; i++) {
      symbol += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return symbol;
  };

  const generateCompanyName = () => {
    const prefixes = ['Advanced', 'Global', 'United', 'American', 'International', 'Pacific', 'National', 'Eastern', 'Western', 'Central'];
    const mids = ['Tech', 'Health', 'Financial', 'Energy', 'Consumer', 'Data', 'Micro', 'Quantum', 'Digital', 'Eco'];
    const suffixes = ['Systems', 'Solutions', 'Corporation', 'Inc.', 'Group', 'Technologies', 'Enterprises', 'Industries', 'Partners', 'Holdings'];
    return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${mids[Math.floor(Math.random() * mids.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
  };

  const generateAnalysis = (signalType) => {
    const buyReasons = [
      'Strong earnings growth potential with expanding profit margins.',
      'Recent product launches expected to drive revenue growth.',
      'Undervalued compared to industry peers with favorable P/E ratio.',
      'Strategic acquisitions positioning for market share gains.',
      'Positive technical breakout with increasing trading volume.',
      'Quantum algorithm detects favorable pattern in market sentiment data.',
      'Innovative technology provides competitive advantage in growing market.',
      'Management team executing well on strategic initiatives.',
      'Favorable industry trends and regulatory environment.',
      'Strong balance sheet with healthy cash reserves.'
    ];
    const sellReasons = [
      'Declining revenue growth with margin pressure.',
      'Increasing competition threatening market position.',
      'Overvalued compared to industry peers and historical metrics.',
      'Technical indicators suggest downward momentum.',
      'Quantum algorithm detects concerning pattern in trading activity.',
      'Regulatory challenges on the horizon.',
      'Weakening balance sheet with increasing debt levels.',
      'Management execution issues on key strategic initiatives.',
      'Industry headwinds expected to impact performance.',
      'Recent product launches underperforming expectations.'
    ];
    return signalType === 'buy' 
      ? buyReasons[Math.floor(Math.random() * buyReasons.length)] 
      : sellReasons[Math.floor(Math.random() * sellReasons.length)];
  };

  const generateTechnicalIndicators = (signalType) => {
    const indicators = [
      'Moving Average Convergence Divergence (MACD)',
      'Relative Strength Index (RSI)',
      'Bollinger Bands',
      'Stochastic Oscillator',
      'Fibonacci Retracement',
      'On-Balance Volume (OBV)',
      'Average Directional Index (ADX)',
      'Ichimoku Cloud',
      'Quantum Momentum Indicator',
      'Quantum Volatility Index'
    ];

    const count = Math.floor(Math.random() * 3) + 3;
    const selected = [];
    const used = new Set();
    while (selected.length < count) {
      const idx = Math.floor(Math.random() * indicators.length);
      if (!used.has(idx)) {
        used.add(idx);
        selected.push({ name: indicators[idx], status: signalType === 'buy' ? 'Bullish' : 'Bearish' });
      }
    }
    return selected;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Filtered signals
  const filteredSignals = useMemo(() => {
    return signals.filter(signal => {
      const matchesSearch = 
        signal.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        signal.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        signal.sector.toLowerCase().includes(searchTerm.toLowerCase());

      if (activeFilter === 'all') return matchesSearch;
      if (activeFilter === 'buy') return matchesSearch && signal.signalType === 'buy';
      if (activeFilter === 'sell') return matchesSearch && signal.signalType === 'sell';
      if (activeFilter === 'strong') return matchesSearch && signal.strength >= 4;
      if (activeFilter === 'recent') {
        const signalDate = new Date(signal.date);
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
        return matchesSearch && signalDate >= twoDaysAgo;
      }
      return matchesSearch;
    });
  }, [signals, searchTerm, activeFilter]);

  return (
    <div className="trading-signals-container">
      {/* Header */}
      <section className="trading-signals-header">
        <div className="header-content">
          <h1>Trading Signals</h1>
          <p>Quantum-powered buy and sell recommendations</p>
        </div>
        <button className="info-button" onClick={() => setShowInfo(!showInfo)}>
          <FaInfoCircle /> About Trading Signals
        </button>
      </section>

      {/* Info Panel */}
      {showInfo && (
        <section className="signals-info">
          <h2>About Our Trading Signals</h2>
          <p>
            Our trading signals are generated using quantum computing algorithms and technical analysis.
          </p>
          <div className="info-grid">
            <div className="info-item">
              <h3>Signal Strength (1-5)</h3>
              <p>Indicates the conviction level of the signal.</p>
            </div>
            <div className="info-item">
              <h3>Confidence Score</h3>
              <p>Statistical confidence based on historical accuracy.</p>
            </div>
            <div className="info-item">
              <h3>Quantum Probability</h3>
              <p>Prediction likelihood according to our quantum algorithm.</p>
            </div>
            <div className="info-item">
              <h3>Potential Return</h3>
              <p>Estimated gain if the price target is reached.</p>
            </div>
          </div>
          <p className="disclaimer">
            <strong>Disclaimer:</strong> Informational purposes only.
          </p>
          <button className="close-info-button" onClick={() => setShowInfo(false)}>Close</button>
        </section>
      )}

      {/* Controls */}
      <section className="signals-controls">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by symbol, company, or sector..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-container">
          <div className="filter-label"><FaFilter /> Filter:</div>
          <div className="filter-buttons">
            {['all','buy','sell','strong','recent'].map(f => (
              <button 
                key={f}
                className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)} {f==='all'?'Signals':'Signals'}
              </button>
            ))}
          </div>
        </div>

        <div className="timeframe-container">
          <div className="timeframe-label">Timeframe:</div>
          <div className="timeframe-buttons">
            {['daily','weekly','monthly'].map(tf => (
              <button 
                key={tf}
                className={`timeframe-btn ${timeframe === tf ? 'active' : ''}`}
                onClick={() => setTimeframe(tf)}
              >
                {tf.charAt(0).toUpperCase() + tf.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="signals-results">
        <div className="results-header">
          <h2>Trading Signals ({filteredSignals.length})</h2>
          <p className="results-summary">
            {filteredSignals.filter(s => s.signalType === 'buy').length} Buy • 
            {filteredSignals.filter(s => s.signalType === 'sell').length} Sell
          </p>
        </div>

        {loading ? (
          <div className="loading-spinner"></div>
        ) : filteredSignals.length > 0 ? (
          <div className="signals-grid">
            {filteredSignals.map(signal => (
              <div key={signal.id} className={`signal-card ${signal.signalType === 'buy' ? 'buy-signal' : 'sell-signal'}`}>
                <div className="signal-header">
                  <div className="signal-type-badge">
                    {signal.signalType === 'buy' ? <><FaArrowUp /> Buy</> : <><FaArrowDown /> Sell</>}
                  </div>
                  <div className="signal-date">{formatDate(signal.date)}</div>
                </div>

                <div className="signal-company">
                  <div className="signal-symbol">{signal.symbol}</div>
                  <div className="signal-name">{signal.companyName}</div>
                  <div className="signal-sector">{signal.sector}</div>
                </div>

                <div className="signal-metrics">
                  <div className="metric">
                    <div className="metric-label">Current</div>
                    <div className="metric-value">${signal.currentPrice}</div>
                  </div>
                  <div className="metric">
                    <div className="metric-label">Target</div>
                    <div className="metric-value">${signal.priceTarget}</div>
                  </div>
                  <div className="metric">
                    <div className="metric-label">Potential</div>
                    <div className="metric-value">{signal.potentialReturn}%</div>
                  </div>
                </div>

                <div className="signal-strength">
                  <div className="strength-label">Signal Strength</div>
                  <div className="strength-stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`strength-star ${i < signal.strength ? 'active' : ''}`}>★</span>
                    ))}
                  </div>
                </div>

                <div className="signal-confidence">
                  <div className="confidence-label">Confidence Score</div>
                  <div className="confidence-bar">
                    <div className="confidence-fill" style={{ width: `${signal.confidenceScore}%` }}></div>
                  </div>
                  <div className="confidence-value">{signal.confidenceScore}%</div>
                </div>

                <div className="signal-quantum">
                  <div className="quantum-label">Quantum Probability</div>
                  <div className="quantum-value">{signal.quantumProbability}%</div>
                </div>

                <div className="signal-analysis">
                  <div className="analysis-label">Analysis</div>
                  <div className="analysis-text">{signal.analysis}</div>
                </div>

                <div className="signal-indicators">
                  <div className="indicators-label">Technical Indicators</div>
                  <div className="indicators-list">
                    {signal.technicalIndicators.map((indicator, index) => (
                      <div key={index} className="indicator-item">
                        <span className="indicator-name">{indicator.name}</span>
                        <span className={`indicator-status ${indicator.status.toLowerCase()}`}>{indicator.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>No trading signals match your search criteria.</p>
            <button className="reset-search-btn" onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}>
              Reset Search
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default TradingSignals;
