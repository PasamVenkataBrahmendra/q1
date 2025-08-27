import React from 'react';
import { FaExternalLinkAlt, FaClock, FaNewspaper } from 'react-icons/fa';
import './NewsCard.css';

const NewsCard = ({ article }) => {
  const {
    title,
    source,
    summary,
    url,
    publishedAt,
    sentiment,
    relevance
  } = article;

  // Format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Determine sentiment class
  const getSentimentClass = () => {
    if (sentiment >= 0.5) return 'positive';
    if (sentiment <= -0.5) return 'negative';
    return 'neutral';
  };

  // Determine sentiment label
  const getSentimentLabel = () => {
    if (sentiment >= 0.5) return 'Bullish';
    if (sentiment <= -0.5) return 'Bearish';
    return 'Neutral';
  };

  // Calculate relevance class
  const getRelevanceClass = () => {
    if (relevance >= 0.8) return 'high';
    if (relevance >= 0.5) return 'medium';
    return 'low';
  };

  return (
    <div className="news-card glass">
      <div className="news-card-header">
        <div className="news-source">{source}</div>
        <div className={`news-sentiment ${getSentimentClass()}`}>
          {getSentimentLabel()}
        </div>
      </div>
      
      <h3 className="news-title">{title}</h3>
      
      <p className="news-summary">{summary}</p>
      
      <div className="news-meta">
        <div className="news-date">
          <FaClock /> {formatDate(publishedAt)}
        </div>
        <div className={`news-relevance ${getRelevanceClass()}`}>
          <FaNewspaper /> {Math.round(relevance * 100)}% Relevance
        </div>
      </div>
      
      <a href={url} target="_blank" rel="noopener noreferrer" className="news-link">
        Read Full Article <FaExternalLinkAlt />
      </a>
      
      <div className="card-background">
        <div className="bg-pattern"></div>
      </div>
    </div>
  );
};

export default NewsCard;