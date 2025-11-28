import React from 'react';
import { useSwapMetrics } from '../hooks/useSwapMetrics';
import { PriceChart } from './PriceChart';

/**
 * PerformanceChart Component
 * Displays DGKO price chart ONLY
 * SwapMetricsGrid moved to /swap page
 */
export function PerformanceChart() {
  const { metrics, priceHistory } = useSwapMetrics();

  if (!metrics.hasData) {
    return (
      <div className="glass rounded-3xl p-8 border border-white/10">
        <h3 className="text-2xl font-medium text-white mb-6">Performance</h3>
        <div className="text-center py-12">
          <div className="text-4xl mb-3">📊</div>
          <div className="text-sm text-gray-400 mb-1">No swap data yet</div>
          <div className="text-xs text-gray-500">Make your first DGKO/USDT swap to see your price chart</div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-3xl p-8 border border-white/10">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-medium text-white">DGKO Price Chart</h3>
          <div className="text-xs text-gray-400">Last 24 hours</div>
        </div>
        <PriceChart 
          priceHistory={priceHistory} 
          priceHigh={metrics.priceHigh} 
          priceLow={metrics.priceLow} 
        />
      </div>
    </div>
  );
}
