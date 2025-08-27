import React from 'react';
import './DataCard.css';

const DataCard = ({ title, value, change, icon, color, description }) => {
  // Determine if change is positive, negative or neutral
  const getChangeType = () => {
    if (!change) return 'neutral';
    return parseFloat(change) > 0 ? 'positive' : parseFloat(change) < 0 ? 'negative' : 'neutral';
  };
  
  // Format change value with + or - sign
  const formatChange = () => {
    if (!change) return '0%';
    const changeValue = parseFloat(change);
    return `${changeValue > 0 ? '+' : ''}${changeValue}%`;
  };

  return (
    <div className="data-card glass">
      <div className="data-card-icon" style={{ backgroundColor: `rgba(${color}, 0.15)` }}>
        {icon}
      </div>
      
      <div className="data-card-content">
        <h3 className="data-card-title">{title}</h3>
        
        <div className="data-card-value">{value}</div>
        
        {change !== undefined && (
          <div className={`data-card-change ${getChangeType()}`}>
            {formatChange()}
          </div>
        )}
        
        {description && (
          <div className="data-card-description">{description}</div>
        )}
      </div>
      
      <div className="data-card-background">
        <div className="bg-pattern" style={{ background: `radial-gradient(circle, rgba(${color}, 0.1) 0%, transparent 70%)` }}></div>
      </div>
    </div>
  );
};

export default DataCard;