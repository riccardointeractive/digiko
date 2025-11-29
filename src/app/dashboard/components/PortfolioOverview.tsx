'use client';

import { usePortfolioStats } from '../hooks/usePortfolioStats';

export function PortfolioOverview() {
  const { stats, loading, refetch } = usePortfolioStats();

  if (loading) {
    return (
      <div className="glass rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 border border-white/5">
        <div className="animate-pulse">
          <div className="h-3 md:h-4 bg-white/10 rounded w-32 mb-3 md:mb-4"></div>
          <div className="h-8 md:h-10 bg-white/10 rounded w-48 mb-2"></div>
          <div className="h-3 md:h-4 bg-white/10 rounded w-24"></div>
        </div>
      </div>
    );
  }

  const isPositive = stats.change24h >= 0;

  return (
    <div className="glass rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 border border-white/5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-5 lg:mb-6">
        <h3 className="text-responsive-sm font-medium text-gray-400">Your DGKO and BABYDGKO worth</h3>
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-400">Live</span>
          </div>
          <button
            onClick={refetch}
            disabled={loading}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-digiko-primary/30 transition-all duration-300 group disabled:opacity-50"
            title="Refresh portfolio"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-digiko-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
      <div className="mb-3 md:mb-4">
        <div className="text-responsive-h2 font-mono text-white mb-2">
          ${stats.totalValueUSD.toFixed(2)}
        </div>
        {/* 24h change - Hidden, working on it next week */}
        {/* <div className="flex items-center gap-2">
          <span className={`text-sm font-mono ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '+' : ''}{stats.change24h.toFixed(2)} USD
          </span>
          <span className={`text-xs px-2 py-1 rounded ${isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
            {isPositive ? '+' : ''}{stats.change24hPercent.toFixed(2)}%
          </span>
          <span className="text-xs text-gray-500">24h</span>
        </div> */}
      </div>
      <div className="grid grid-cols-2 gap-3 md:gap-4 pt-3 md:pt-4 border-t border-white/5">
        <div>
          <div className="text-xs text-gray-400 mb-1">Assets</div>
          <div className="text-responsive-base font-mono font-semibold text-white">{stats.totalAssets}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">Network</div>
          <div className="text-responsive-base font-semibold text-white">Klever</div>
        </div>
      </div>
      <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/5">
        <div className="text-xs text-gray-500">Last updated: {new Date().toLocaleTimeString()}</div>
      </div>
    </div>
  );
}
