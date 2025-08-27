import React, { useState, useRef, useEffect } from 'react';
import './Tooltip.css';

const Tooltip = ({ children, content, position = 'top', delay = 300 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const targetRef = useRef(null);
  const tooltipRef = useRef(null);
  const timerRef = useRef(null);
  
  // Calculate tooltip position
  const calculatePosition = () => {
    if (!targetRef.current || !tooltipRef.current) return;
    
    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    let top, left;
    
    switch (position) {
      case 'top':
        top = -tooltipRect.height - 10;
        left = (targetRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = targetRect.height + 10;
        left = (targetRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = (targetRect.height - tooltipRect.height) / 2;
        left = -tooltipRect.width - 10;
        break;
      case 'right':
        top = (targetRect.height - tooltipRect.height) / 2;
        left = targetRect.width + 10;
        break;
      default:
        top = -tooltipRect.height - 10;
        left = (targetRect.width - tooltipRect.width) / 2;
    }
    
    // Ensure tooltip stays within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const tooltipGlobalLeft = targetRect.left + left;
    const tooltipGlobalTop = targetRect.top + top;
    
    // Adjust horizontal position if needed
    if (tooltipGlobalLeft < 10) {
      left = left - tooltipGlobalLeft + 10;
    } else if (tooltipGlobalLeft + tooltipRect.width > viewportWidth - 10) {
      left = left - (tooltipGlobalLeft + tooltipRect.width - viewportWidth + 10);
    }
    
    // Adjust vertical position if needed
    if (tooltipGlobalTop < 10) {
      top = top - tooltipGlobalTop + 10;
    } else if (tooltipGlobalTop + tooltipRect.height > viewportHeight - 10) {
      top = top - (tooltipGlobalTop + tooltipRect.height - viewportHeight + 10);
    }
    
    setTooltipStyle({ top, left });
  };
  
  // Show tooltip with delay
  const showTooltip = () => {
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
      // Calculate position after tooltip is visible
      setTimeout(calculatePosition, 0);
    }, delay);
  };
  
  // Hide tooltip and clear timer
  const hideTooltip = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsVisible(false);
  };
  
  // Recalculate position on window resize
  useEffect(() => {
    if (isVisible) {
      window.addEventListener('resize', calculatePosition);
      window.addEventListener('scroll', calculatePosition);
    }
    
    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition);
    };
  }, [isVisible]);
  
  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      className="tooltip-container" 
      ref={targetRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && (
        <div 
          className={`tooltip tooltip-${position}`} 
          ref={tooltipRef}
          style={tooltipStyle}
        >
          {content}
          <div className={`tooltip-arrow tooltip-arrow-${position}`}></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;