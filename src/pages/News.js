import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaRegClock, FaRegNewspaper, FaChartLine, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import './News.css';

const News = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for news
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockNews = [
        {
          id: 1,
          title: 'Federal Reserve Holds Interest Rates Steady',
          summary: 'The Federal Reserve announced today that it will maintain current interest rates, citing economic stability and controlled inflation.',
          source: 'Financial Times',
          date: '2023-07-28T14:30:00',
          url: '#',
          image: 'https://via.placeholder.com/300x200',
          category: 'economy',
          sentiment: 'neutral',
          relatedSymbols: ['SPY', 'DIA', 'QQQ']
        },
        {
          id: 2,
          title: 'Apple Reports Record Q3 Earnings, Stock Surges',
          summary: 'Apple Inc. reported record-breaking third-quarter earnings, exceeding analyst expectations with strong iPhone and services revenue.',
          source: 'CNBC',
          date: '2023-07-27T18:45:00',
          url: '#',
          image: 'https://via.placeholder.com/300x200',
          category: 'earnings',
          sentiment: 'positive',
          relatedSymbols: ['AAPL']
        },
        {
          id: 3,
          title: 'Tesla Faces Production Challenges in Berlin Factory',
          summary: 'Tesla is experiencing production delays at its Berlin Gigafactory due to supply chain issues and regulatory hurdles.',
          source: 'Reuters',
          date: '2023-07-27T10:15:00',
          url: '#',
          image: 'https://via.placeholder.com/300x200',
          category: 'company',
          sentiment: 'negative',
          relatedSymbols: ['TSLA']
        },
        {
          id: 4,
          title: 'Quantum Computing Breakthrough Could Revolutionize Financial Modeling',
          summary: 'Scientists have achieved a significant breakthrough in quantum computing that could transform financial modeling and market predictions.',
          source: 'Bloomberg',
          date: '2023-07-26T09:30:00',
          url: '#',
          image: 'https://via.placeholder.com/300x200',
          category: 'technology',
          sentiment: 'positive',
          relatedSymbols: ['IBM', 'GOOGL', 'MSFT']
        },
        {
          id: 5,
          title: 'Global Markets React to China s Stimulus Package',
          summary: "Global markets are responding positively to China's announcement of a comprehensive economic stimulus package aimed at boosting growth.",
          source: 'Wall Street Journal',
          date: '2023-07-25T16:20:00',
          url: '#',
          image: 'https://via.placeholder.com/300x200',
          category: 'global',
          sentiment: 'positive',
          relatedSymbols: ['FXI', 'MCHI', 'BABA']
        },
        {
          id: 6,
          title: 'Cryptocurrency Market Faces Regulatory Scrutiny',
          summary: 'Major cryptocurrencies are experiencing volatility as governments worldwide announce plans for stricter regulatory frameworks.',
          source: 'CoinDesk',
          date: '2023-07-24T11:45:00',
          url: '#',
          image: 'https://via.placeholder.com/300x200',
          category: 'crypto',
          sentiment: 'negative',
          relatedSymbols: ['BTC-USD', 'ETH-USD']
        },
        {
          id: 7,
          title: 'Amazon Expands Healthcare Initiative with New Acquisitions',
          summary: 'Amazon is expanding its healthcare presence through strategic acquisitions, signaling a major push into the medical services sector.',
          source: 'Business Insider',
          date: '2023-07-23T14:10:00',
          url: '#',
          image: 'https://via.placeholder.com/300x200',
          category: 'company',
          sentiment: 'positive',
          relatedSymbols: ['AMZN']
        },
        {
          id: 8,
          title: 'Oil Prices Drop Amid Concerns of Global Economic Slowdown',
          summary: 'Crude oil prices have fallen sharply as investors worry about potential economic slowdown and reduced demand forecasts.',
          source: 'Energy News',
          date: '2023-07-22T09:50:00',
          url: '#',
          image: 'https://via.placeholder.com/300x200',
          category: 'commodities',
          sentiment: 'negative',
          relatedSymbols: ['USO', 'XOM', 'CVX']
        }
      ];
      
      setNews(mockNews);
      setFilteredNews(mockNews);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter news based on search query and active filter
  useEffect(() => {
    let filtered = news;
    
    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(item => item.category === activeFilter);
    }
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.relatedSymbols.some(symbol => symbol.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredNews(filtered);
  }, [searchQuery, activeFilter, news]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getSentimentIcon = (sentiment) => {
    switch(sentiment) {
      case 'positive':
        return <FaRegThumbsUp className="sentiment-icon positive" />;
      case 'negative':
        return <FaRegThumbsDown className="sentiment-icon negative" />;
      default:
        return null;
    }
  };

  return (
    <div className="news-container">
      <section className="news-header">
        <h1>Market News</h1>
        <p>Stay updated with the latest market news and analysis</p>
      </section>

      <section className="news-search-section">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search news by title, content, or stock symbol..." 
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button 
            className="filter-toggle" 
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter />
            <span>Filter</span>
          </button>
        </div>
        
        {showFilters && (
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All News
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'economy' ? 'active' : ''}`}
              onClick={() => setActiveFilter('economy')}
            >
              Economy
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'earnings' ? 'active' : ''}`}
              onClick={() => setActiveFilter('earnings')}
            >
              Earnings
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'company' ? 'active' : ''}`}
              onClick={() => setActiveFilter('company')}
            >
              Company News
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'technology' ? 'active' : ''}`}
              onClick={() => setActiveFilter('technology')}
            >
              Technology
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'global' ? 'active' : ''}`}
              onClick={() => setActiveFilter('global')}
            >
              Global Markets
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'crypto' ? 'active' : ''}`}
              onClick={() => setActiveFilter('crypto')}
            >
              Crypto
            </button>
            <button 
              className={`filter-tab ${activeFilter === 'commodities' ? 'active' : ''}`}
              onClick={() => setActiveFilter('commodities')}
            >
              Commodities
            </button>
          </div>
        )}
      </section>

      <section className="news-list-section">
        {loading ? (
          <div className="loading-spinner"></div>
        ) : filteredNews.length > 0 ? (
          <div className="news-grid">
            {filteredNews.map((item) => (
              <article key={item.id} className="news-card">
                <div className="news-image">
                  <img src={item.image} alt={item.title} />
                  <div className="news-source">{item.source}</div>
                </div>
                
                <div className="news-content">
                  <h3 className="news-title">
                    {item.title}
                    {getSentimentIcon(item.sentiment)}
                  </h3>
                  
                  <p className="news-summary">{item.summary}</p>
                  
                  <div className="news-meta">
                    <div className="news-time">
                      <FaRegClock />
                      <span>{formatDate(item.date)} at {formatTime(item.date)}</span>
                    </div>
                    
                    {item.relatedSymbols.length > 0 && (
                      <div className="news-symbols">
                        <FaChartLine />
                        <div className="symbol-tags">
                          {item.relatedSymbols.map((symbol, index) => (
                            <span key={index} className="symbol-tag">{symbol}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <a href={item.url} className="read-more" target="_blank" rel="noopener noreferrer">
                    Read Full Story <FaRegNewspaper />
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No news found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default News;