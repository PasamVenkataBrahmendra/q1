import React, { useState, useEffect, useRef } from 'react';
import './AnimatedNumber.css';

const AnimatedNumber = ({ value, duration = 1000, decimals = 0, prefix = '', suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTimeRef = useRef(null);
  const frameRef = useRef(null);
  const startValueRef = useRef(0);
  const endValueRef = useRef(parseFloat(value));
  
  // Parse the target value
  const targetValue = parseFloat(value);
  
  // Animation function
  const animate = (timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
      startValueRef.current = displayValue;
      endValueRef.current = targetValue;
    }
    
    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (easeOutExpo)
    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    
    // Calculate current value
    const currentValue = startValueRef.current + (endValueRef.current - startValueRef.current) * easeProgress;
    
    // Update state with formatted value
    setDisplayValue(currentValue);
    
    // Continue animation if not complete
    if (progress < 1) {
      frameRef.current = requestAnimationFrame(animate);
    }
  };
  
  // Format the display value
  const formattedValue = () => {
    let formatted;
    
    if (decimals > 0) {
      formatted = displayValue.toFixed(decimals);
    } else {
      formatted = Math.round(displayValue).toString();
    }
    
    // Add commas for thousands
    formatted = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    return `${prefix}${formatted}${suffix}`;
  };
  
  // Start animation when value changes
  useEffect(() => {
    // Skip animation for initial render or if value is the same
    if (displayValue === targetValue) return;
    
    // Reset animation references
    startTimeRef.current = null;
    
    // Start animation
    frameRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value]);
  
  return (
    <span className="animated-number">{formattedValue()}</span>
  );
};

export default AnimatedNumber;