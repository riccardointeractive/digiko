'use client';

import React from 'react';
import { useKlever } from '@/context/KleverContext';

export const WalletConnect: React.FC = () => {
  const { address, isConnected, isConnecting, connect, disconnect } = useKlever();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatAddressShort = (addr: string) => {
    return `${addr.slice(0, 4)}...${addr.slice(-3)}`;
  };

  return (
    <div className="flex items-center gap-2 md:gap-3">
      {!isConnected ? (
        <button
          onClick={connect}
          disabled={isConnecting}
          className="group relative px-3 py-2 md:px-6 md:py-2.5 bg-digiko-primary/10 hover:bg-digiko-primary/20 text-white rounded-xl transition-all duration-300 border border-digiko-primary/30 hover:border-digiko-primary/50 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2 font-medium">
            <svg 
              className="w-4 h-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9" 
              />
            </svg>
            {/* Full text on desktop, "Connect" on mobile */}
            <span className="hidden md:inline">
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </span>
            <span className="md:hidden text-sm">
              {isConnecting ? '...' : 'Connect'}
            </span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-digiko-primary/0 via-digiko-primary/20 to-digiko-primary/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
        </button>
      ) : (
        <div className="flex items-center gap-2">
          {/* Address display - compact on mobile */}
          <div className="glass px-3 py-2 md:px-4 md:py-2.5 rounded-xl flex items-center gap-2 md:gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
            {/* Short address on mobile, longer on desktop */}
            <span className="text-white font-mono text-xs md:text-sm stat-number hidden md:inline">
              {formatAddress(address!)}
            </span>
            <span className="text-white font-mono text-xs stat-number md:hidden">
              {formatAddressShort(address!)}
            </span>
          </div>
          {/* Disconnect button */}
          <button
            onClick={disconnect}
            className="group p-2 md:px-4 md:py-2.5 glass-hover rounded-xl transition-all duration-300 text-gray-400 hover:text-white"
            title="Disconnect"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};