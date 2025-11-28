'use client';

import React, { useState, useRef, useEffect } from 'react';
import { TokenImage } from './TokenImage';

export interface Token {
  id: string;
  symbol: string;
  name: string;
  balance?: string;
  assetId: string;
}

interface TokenSelectorProps {
  tokens: Token[];
  selectedToken: string;
  onSelect: (symbol: string) => void;
  showBalance?: boolean;
  disabled?: boolean;
}

export function TokenSelector({
  tokens,
  selectedToken,
  onSelect,
  showBalance = true,
  disabled = false,
}: TokenSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const selected = tokens.find(t => t.symbol === selectedToken);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (symbol: string) => {
    onSelect(symbol);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selected Token Button */}
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between gap-4 px-5 py-4 
          rounded-2xl border transition-all duration-300
          ${isOpen 
            ? 'bg-digiko-primary/10 border-digiko-primary/40 shadow-[0_0_30px_rgba(0,102,255,0.15)]' 
            : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <div className="flex items-center gap-4">
          {selected && (
            <>
              <TokenImage assetId={selected.assetId} size="md" />
              <div className="text-left">
                <div className="text-lg font-medium text-white">{selected.symbol}</div>
                <div className="text-sm text-gray-500">{selected.name}</div>
              </div>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {showBalance && selected?.balance && (
            <div className="text-right mr-2">
              <div className="text-xs text-gray-500 uppercase tracking-wider">Balance</div>
              <div className="text-sm font-mono text-gray-400 tabular-nums">{selected.balance}</div>
            </div>
          )}
          
          {/* Chevron */}
          <svg 
            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-[#141416] rounded-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="px-5 py-3 border-b border-white/5">
            <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Select Token</span>
          </div>
          
          {/* Token List */}
          <div className="py-2 max-h-[300px] overflow-y-auto">
            {tokens.map((token) => {
              const isSelected = token.symbol === selectedToken;
              return (
                <button
                  key={token.symbol}
                  onClick={() => handleSelect(token.symbol)}
                  className={`
                    w-full flex items-center justify-between gap-4 px-5 py-3.5
                    transition-all duration-300
                    ${isSelected 
                      ? 'bg-digiko-primary/15' 
                      : 'hover:bg-white/5'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <TokenImage assetId={token.assetId} size="md" />
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-medium text-white">{token.symbol}</span>
                        {isSelected && (
                          <svg className="w-4 h-4 text-digiko-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{token.name}</span>
                    </div>
                  </div>
                  
                  {showBalance && token.balance && (
                    <div className="text-right">
                      <div className="text-sm font-mono text-gray-400 tabular-nums">{token.balance}</div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Footer hint */}
          <div className="px-5 py-2.5 border-t border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>More tokens coming soon</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
