import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaNewspaper, FaBalanceScale, FaSignal, FaInfoCircle, 
  FaUsers, FaRobot, FaChartBar, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import StockCard from '../components/StockCard';
import NewsCard from '../components/NewsCard';
import DataCard from '../components/DataCard';
import './Home.css';

const Home = () => {
  // Mock trending stocks data
  const [trendingStocks, setTrendingStocks] = useState([]);
  
  // Mock recent news data
  const [recentNews, setRecentNews] = useState([]);

  // Load mock data
  useEffect(() => {
    // Mock trending stocks
    setTrendingStocks([
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 182.63,
        change: 3.42,
        changePercent: 1.91,
        volume: 58432100,
        marketCap: '$2.85T',
        prediction: {
          direction: 'up',
          confidence: '92%'
        }
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        price: 338.47,
        change: 2.15,
        changePercent: 0.64,
        volume: 22541300,
        marketCap: '$2.52T',
        prediction: {
          direction: 'up',
          confidence: '87%'
        }
      },
      {
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        price: 437.53,
        change: 12.86,
        changePercent: 3.03,
        volume: 42683200,
        marketCap: '$1.08T',
        prediction: {
          direction: 'up',
          confidence: '94%'
        }
      },
      {
        symbol: 'TSLA',
        name: 'Tesla, Inc.',
        price: 248.42,
        change: -3.76,
        changePercent: -1.49,
        volume: 35721600,
        marketCap: '$789.2B',
        prediction: {
          direction: 'down',
          confidence: '78%'
        }
      }
    ]);
    
    // Mock recent news
    setRecentNews([
      {
        title: 'Fed Signals Potential Rate Cut in September',
        source: 'Financial Times',
        summary: 'Federal Reserve officials have indicated they may be ready to cut interest rates at their September meeting if inflation continues to cool, according to minutes from their latest policy meeting.',
        url: '#',
        publishedAt: '2023-08-16T14:30:00Z',
        sentiment: 0.7,
        relevance: 0.9
      },
      {
        title: 'Tech Stocks Rally as Inflation Fears Ease',
        source: 'Wall Street Journal',
        summary: 'Technology stocks led a market rally on Wednesday as new data showed inflation pressures continuing to moderate, potentially giving the Federal Reserve more room to ease monetary policy.',
        url: '#',
        publishedAt: '2023-08-16T12:15:00Z',
        sentiment: 0.8,
        relevance: 0.85
      }
    ]);
  }, []);

  // Mock statistics data
  const statistics = [
    { label: 'Companies Analyzed', value: '5,000+' },
    { label: 'Daily Predictions', value: '10,000+' },
    { label: 'Prediction Accuracy', value: '87.5%' },
    { label: 'Active Users', value: '25,000+' }
  ];

  // Features data
  const features = [
    {
      icon: <FaChartLine />,
      title: 'Company Analysis',
      description: 'Detailed stock analysis with advanced charts and quantum predictions',
      link: '/companies'
    },
    {
      icon: <FaNewspaper />,
      title: 'Market News',
      description: 'Latest market news with smart filtering and sentiment analysis',
      link: '/news'
    },
    {
      icon: <FaBalanceScale />,
      title: 'Market Mood',
      description: 'Fear & Greed index analysis to gauge market sentiment',
      link: '/market-mood'
    },
    {
      icon: <FaSignal />,
      title: 'Trading Signals',
      description: 'AI-powered buy/sell recommendations with filtering options',
      link: '/trading-signals'
    },
    {
      icon: <FaInfoCircle />,
      title: 'Quantum Technology',
      description: 'Learn about our quantum machine learning technology',
      link: '/about'
    }
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Quantum-Powered Stock Predictions</h1>
          <p>Harness the power of quantum computing and machine learning for accurate stock market predictions</p>
          <div className="hero-buttons">
            <Link to="/companies" className="btn btn-primary">Explore Companies</Link>
            <Link to="/about" className="btn btn-secondary">Learn More</Link>
          </div>
        </div>
        <div className="hero-image">
          {/* 3D visualization or image would go here */}
          <div className="hero-visualization-placeholder"></div>
        </div>
      </section>

      <section className="statistics-section">
        <h2 className="section-title">Platform Statistics</h2>
        <div className="statistics-grid">
          {statistics.map((stat, index) => (
            <DataCard
              key={index}
              title={stat.label}
              value={stat.value}
              icon={index === 0 ? <FaUsers /> : 
                    index === 1 ? <FaRobot /> : 
                    index === 2 ? <FaChartBar /> : 
                    <FaUsers />}
              color={index === 0 ? '138, 43, 226' : 
                     index === 1 ? '0, 191, 255' : 
                     index === 2 ? '0, 230, 118' : 
                     '255, 204, 0'}
            />
          ))}
        </div>
      </section>
      
      <section className="trending-stocks-section">
        <h2 className="section-title">Trending Stocks</h2>
        <div className="stocks-grid">
          {trendingStocks.map((stock, index) => (
            <StockCard key={index} stock={stock} />
          ))}
        </div>
        <div className="section-action">
          <Link to="/companies" className="btn btn-secondary">View All Stocks</Link>
        </div>
      </section>
      
      <section className="recent-news-section">
        <h2 className="section-title">Recent Market News</h2>
        <div className="news-grid">
          {recentNews.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
        <div className="section-action">
          <Link to="/news" className="btn btn-secondary">View All News</Link>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Our Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card glass" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <Link to={feature.link} className="feature-link">Explore</Link>
              <div className="card-background">
                <div className="bg-pattern"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section glass">
        <div className="cta-content">
          <h2>Ready to make smarter investment decisions?</h2>
          <p>Start exploring our quantum-powered stock predictions today</p>
          <Link to="/companies" className="btn btn-primary">Get Started</Link>
        </div>
        <div className="card-background">
          <div className="bg-pattern"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;