'use client';

import React, { useState, useEffect } from 'react';
import { useKlever } from '@/context/KleverContext';

export const Balance: React.FC = () => {
  const { balance, isConnected, getAccountInfo } = useKlever();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Mock USD price - TODO: Replace with real API
  const klvPriceUSD = 0.05;
  const balanceUSD = (parseFloat(balance) * klvPriceUSD).toFixed(2);

  // Manual refresh updates timestamp
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await getAccountInfo();
    setLastUpdate(new Date());
    setTimeout(() => setIsRefreshing(false), 500);
  };

  if (!isConnected) {
    return null;
  }

  // Format time ago
  const getTimeAgo = () => {
    const seconds = Math.floor((new Date().getTime() - lastUpdate.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  };

  return (
    <div className="glass rounded-3xl border border-white/10 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-medium text-white">KLV Balance</h2>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="w-10 h-10 rounded-xl bg-white/5 hover:bg-digiko-primary/20 border border-white/10 hover:border-digiko-primary/40 text-gray-400 hover:text-digiko-primary transition-all duration-300 flex items-center justify-center group disabled:opacity-50"
          title="Refresh balance"
        >
          <svg
            className={`w-5 h-5 transition-transform duration-500 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      {/* Main Balance Display */}
      <div className="bg-white/5 rounded-2xl p-6 mb-6">
        <div className="flex items-baseline gap-3 mb-2">
          <div className="text-5xl font-mono text-white">{balance}</div>
          <div className="text-xl text-digiko-primary font-medium">KLV</div>
        </div>
        <div className="text-sm text-gray-400">Klever</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-2xl p-4">
          <div className="text-sm text-gray-400 mb-1">USD Value</div>
          <div className="text-2xl font-mono text-white">${balanceUSD}</div>
          <div className="text-xs text-gray-500 mt-1">@ ${klvPriceUSD} per KLV</div>
        </div>
        <div className="bg-white/5 rounded-2xl p-4">
          <div className="text-sm text-gray-400 mb-1">Last Update</div>
          <div className="text-2xl font-mono text-white">{getTimeAgo()}</div>
          <div className="text-xs text-gray-500 mt-1">Manual refresh</div>
        </div>
      </div>
    </div>
  );
};