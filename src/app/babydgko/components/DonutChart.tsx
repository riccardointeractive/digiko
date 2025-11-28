import { useState, useEffect } from 'react';
import { tokenomics } from '../config/babydgko.config';

/**
 * DonutChart Component
 * Animated donut chart displaying tokenomics distribution
 */
export function DonutChart() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const size = 280;
  const strokeWidth = 16; // Thin, modern design
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const gapPercent = 2; // Gap between segments
  
  let accumulatedPercent = 0;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
        />
        
        {/* Segments */}
        {tokenomics.map((item, index) => {
          const segmentPercent = item.percent - gapPercent;
          const segmentLength = (segmentPercent / 100) * circumference;
          const segmentOffset = -(accumulatedPercent + gapPercent / 2) / 100 * circumference;
          accumulatedPercent += item.percent;
          
          return (
            <circle
              key={item.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${segmentLength} ${circumference}`}
              strokeDashoffset={segmentOffset}
              strokeLinecap="round"
              style={{
                transition: mounted ? 'stroke-dasharray 1s ease-in-out, stroke-dashoffset 1s ease-in-out' : 'none',
                opacity: mounted ? 1 : 0,
                transitionDelay: `${index * 100}ms`,
              }}
            />
          );
        })}
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-mono font-medium text-white">50B</div>
          <div className="text-sm text-gray-500">Max Supply</div>
        </div>
      </div>
    </div>
  );
}
