import React from 'react';
import { PricePoint } from '../hooks/useSwapMetrics';

interface PriceChartProps {
  priceHistory: PricePoint[];
  priceHigh: number;
  priceLow: number;
}

export function PriceChart({ priceHistory, priceHigh, priceLow }: PriceChartProps) {
  if (priceHistory.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-3">📊</div>
        <div className="text-sm text-gray-400 mb-1">No swap data yet</div>
        <div className="text-xs text-gray-500">Make your first DGKO/USDT swap to see your price chart</div>
      </div>
    );
  }

  const height = 200;
  const padding = 10;
  const priceRange = priceHigh - priceLow || 0.000001;

  const points = priceHistory.map((point, index) => {
    const x = (index / (priceHistory.length - 1)) * 100;
    const y = ((priceHigh - point.price) / priceRange) * (height - padding * 2) + padding;
    return `${x},${y}`;
  }).join(' ');

  const pathData = priceHistory.map((point, index) => {
    const x = (index / (priceHistory.length - 1)) * 100;
    const y = ((priceHigh - point.price) / priceRange) * (height - padding * 2) + padding;
    return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
  }).join(' ');

  const areaPath = pathData + ` L 100 ${height} L 0 ${height} Z`;

  return (
    <div className="space-y-4">
      <div className="relative rounded-xl bg-gradient-to-br from-digiko-primary/5 via-digiko-accent/5 to-transparent border border-digiko-primary/10 p-6" style={{ height: `${height + 40}px` }}>
        <svg viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(0, 212, 255)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(0, 212, 255)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#priceGradient)" />
          <polyline points={points} fill="none" stroke="rgb(0, 212, 255)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
          {priceHistory.map((point, index) => {
            const x = (index / (priceHistory.length - 1)) * 100;
            const y = ((priceHigh - point.price) / priceRange) * (height - padding * 2) + padding;
            return <circle key={index} cx={x} cy={y} r="0.8" fill="rgb(0, 212, 255)" vectorEffect="non-scaling-stroke" />;
          })}
        </svg>
        <div className="absolute top-4 left-6 text-xs font-mono text-green-400">${priceHigh.toFixed(6)}</div>
        <div className="absolute bottom-4 left-6 text-xs font-mono text-red-400">${priceLow.toFixed(6)}</div>
      </div>
      <div className="text-xs text-gray-500">{priceHistory.length} price {priceHistory.length === 1 ? 'point' : 'points'} from your swap transactions</div>
    </div>
  );
}
