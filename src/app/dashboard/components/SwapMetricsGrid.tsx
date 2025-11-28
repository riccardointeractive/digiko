import React from 'react';
import { SwapMetrics } from '../hooks/useSwapMetrics';

interface SwapMetricsGridProps {
  metrics: SwapMetrics;
}

export function SwapMetricsGrid({ metrics }: SwapMetricsGridProps) {
  return (
    <div className="glass rounded-3xl p-8 border border-white/10">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-medium text-white">Swap Performance</h3>
          <div className="text-xs text-gray-400">{metrics.totalSwaps} {metrics.totalSwaps === 1 ? 'swap' : 'swaps'} • 24h</div>
        </div>
        <div className="grid grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="text-xs text-gray-400 uppercase tracking-wide">Avg Price</div>
            <div className="text-2xl font-mono font-medium text-white tabular-nums">\${metrics.avgPrice.toFixed(6)}</div>
          </div>
          <div className="space-y-2">
            <div className="text-xs text-gray-400 uppercase tracking-wide">24h High</div>
            <div className="text-2xl font-mono font-medium text-green-400 tabular-nums">\${metrics.priceHigh.toFixed(6)}</div>
          </div>
          <div className="space-y-2">
            <div className="text-xs text-gray-400 uppercase tracking-wide">24h Low</div>
            <div className="text-2xl font-mono font-medium text-red-400 tabular-nums">\${metrics.priceLow.toFixed(6)}</div>
          </div>
          <div className="space-y-2">
            <div className="text-xs text-gray-400 uppercase tracking-wide">Volume</div>
            <div className="text-2xl font-mono font-medium text-digiko-accent tabular-nums">{metrics.volume24h.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
          </div>
        </div>
        <div className="text-xs text-gray-500 pt-4 border-t border-white/10">Real-time metrics from your DGKO/USDT swap transactions</div>
      </div>
    </div>
  );
}
