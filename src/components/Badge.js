import React from 'react';
import './Badge.css';

const Badge = ({ text, type = 'default', size = 'medium', icon }) => {
  const badgeClasses = `badge badge-${type} badge-${size}`;
  
  return (
    <span className={badgeClasses}>
      {icon && <span className="badge-icon">{icon}</span>}
      <span className="badge-text">{text}</span>
    </span>
  );
};

export default Badge;