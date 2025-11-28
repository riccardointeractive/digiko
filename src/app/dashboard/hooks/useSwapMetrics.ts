import { useMemo } from 'react';
import { getSwapHistory } from '@/utils/swapStorage';

export interface SwapMetrics {
  totalSwaps: number;
  volume24h: number;
  avgPrice: number;
  priceHigh: number;
  priceLow: number;
  hasData: boolean;
}

export interface PricePoint {
  timestamp: number;
  price: number;
}

export function useSwapMetrics() {
  return useMemo(() => {
    const history = getSwapHistory();
    const dgkoSwaps = history.filter(tx => 
      tx.status === 'success' && 
      (tx.direction === 'DGKO_TO_KLV' || tx.direction === 'KLV_TO_DGKO')
    );

    if (dgkoSwaps.length === 0) {
      return {
        metrics: { totalSwaps: 0, volume24h: 0, avgPrice: 0, priceHigh: 0, priceLow: 0, hasData: false },
        priceHistory: []
      };
    }

    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000);
    const swaps24h = dgkoSwaps.filter(tx => tx.timestamp >= oneDayAgo);

    const prices: PricePoint[] = [];
    let totalVolume = 0;

    swaps24h.forEach(tx => {
      let dgkoPrice = 0;
      if (tx.direction === 'DGKO_TO_KLV') {
        dgkoPrice = tx.outputAmount / tx.inputAmount;
        totalVolume += tx.inputAmount;
      } else {
        dgkoPrice = tx.inputAmount / tx.outputAmount;
        totalVolume += tx.outputAmount;
      }
      prices.push({ timestamp: tx.timestamp, price: dgkoPrice });
    });

    prices.sort((a, b) => a.timestamp - b.timestamp);
    const priceValues = prices.map(p => p.price);
    const avgPrice = priceValues.length > 0 ? priceValues.reduce((a, b) => a + b, 0) / priceValues.length : 0;

    return {
      metrics: {
        totalSwaps: swaps24h.length,
        volume24h: totalVolume,
        avgPrice,
        priceHigh: priceValues.length > 0 ? Math.max(...priceValues) : 0,
        priceLow: priceValues.length > 0 ? Math.min(...priceValues) : 0,
        hasData: swaps24h.length > 0
      },
      priceHistory: prices
    };
  }, []);
}
