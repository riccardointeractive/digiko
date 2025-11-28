import { useState, useEffect } from 'react';

/**
 * NumberInput Component
 * Custom number input with beautifully designed increment/decrement buttons
 * Following design guide: glass morphism, proper spacing, smooth interactions
 */

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  step?: number;
  min?: number;
  max?: number;
  maxButton?: {
    show: boolean;
    label?: string;
    onClick: () => void;
  };
}

export function NumberInput({
  value,
  onChange,
  placeholder = '0.00',
  disabled = false,
  className = '',
  step = 1,
  min = 0,
  max,
  maxButton,
}: NumberInputProps) {
  
  const handleIncrement = () => {
    const currentValue = parseFloat(value) || 0;
    const newValue = max !== undefined ? Math.min(currentValue + step, max) : currentValue + step;
    onChange(newValue.toString());
  };

  const handleDecrement = () => {
    const currentValue = parseFloat(value) || 0;
    const newValue = Math.max(currentValue - step, min);
    onChange(newValue.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Allow empty string for clearing
    if (newValue === '') {
      onChange('');
      return;
    }
    
    // Allow decimal numbers
    if (/^\d*\.?\d*$/.test(newValue)) {
      // Check max constraint
      if (max !== undefined) {
        const numValue = parseFloat(newValue);
        if (!isNaN(numValue) && numValue > max) {
          return; // Don't update if exceeds max
        }
      }
      onChange(newValue);
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      {/* Main Input Container */}
      <div className="flex-1 relative">
        <div className="flex items-center gap-2 px-4 py-3 bg-klever-dark rounded-xl border border-gray-700 focus-within:ring-2 focus-within:ring-digiko-primary transition-all duration-300">
          {/* Input Field - Hide default spinners */}
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1 bg-transparent text-white font-mono text-lg outline-none
                     /* Hide number input spinners */
                     [appearance:textfield] 
                     [&::-webkit-outer-spin-button]:appearance-none 
                     [&::-webkit-inner-spin-button]:appearance-none
                     disabled:opacity-50 disabled:cursor-not-allowed"
          />
          
          {/* Custom Increment/Decrement Buttons */}
          <div className="flex flex-col gap-1">
            {/* Increment Button */}
            <button
              type="button"
              onClick={handleIncrement}
              disabled={disabled || (max !== undefined && parseFloat(value) >= max)}
              className="group w-7 h-6 rounded-lg bg-white/5 hover:bg-digiko-primary/20 
                       border border-white/10 hover:border-digiko-primary/40
                       transition-all duration-300 flex items-center justify-center
                       disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:border-white/10"
              title="Increment"
            >
              <svg 
                className="w-3.5 h-3.5 text-gray-400 group-hover:text-digiko-primary transition-colors" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>
            
            {/* Decrement Button */}
            <button
              type="button"
              onClick={handleDecrement}
              disabled={disabled || parseFloat(value) <= min}
              className="group w-7 h-6 rounded-lg bg-white/5 hover:bg-digiko-primary/20 
                       border border-white/10 hover:border-digiko-primary/40
                       transition-all duration-300 flex items-center justify-center
                       disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:border-white/10"
              title="Decrement"
            >
              <svg 
                className="w-3.5 h-3.5 text-gray-400 group-hover:text-digiko-primary transition-colors" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Optional MAX Button */}
      {maxButton?.show && (
        <button
          type="button"
          onClick={maxButton.onClick}
          disabled={disabled}
          className="px-4 py-3 bg-digiko-primary/20 hover:bg-digiko-primary/30 
                   text-digiko-primary font-medium rounded-xl transition-all duration-300 
                   border border-digiko-primary/30 hover:border-digiko-primary/50
                   disabled:opacity-50 disabled:cursor-not-allowed
                   hover:scale-105"
        >
          {maxButton.label || 'MAX'}
        </button>
      )}
    </div>
  );
}
