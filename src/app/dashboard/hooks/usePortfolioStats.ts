import { useState, useEffect, useCallback } from 'react';
import { useTokenBalances } from './useTokenBalances';
import { PortfolioStats } from '../types/dashboard.types';

/**
 * Custom hook to calculate overall portfolio statistics
 * Aggregates all token values and calculates totals
 * Manual refresh only - no auto-refresh
 */
export function usePortfolioStats() {
  const { tokens, loading: tokensLoading, refetch: refetchTokens } = useTokenBalances();
  const [stats, setStats] = useState<PortfolioStats>({
    totalValueUSD: 0,
    change24h: 0,
    change24hPercent: 0,
    totalAssets: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tokensLoading) {
      setLoading(true);
      return;
    }

    // Calculate portfolio stats
    const calculateStats = () => {
      // Count non-zero balance tokens
      const nonZeroTokens = tokens.filter(t => parseFloat(t.balanceFormatted) > 0);
      
      // TODO: Fetch actual USD prices from API
      // For now, use mock data
      let totalUSD = 0;
      let total24hChange = 0;

      nonZeroTokens.forEach(token => {
        // Mock price calculations (replace with real API)
        let priceUSD = 0;
        if (token.assetId === 'KLV') {
          priceUSD = 0.05; // Mock KLV price
        } else if (token.assetId === 'DGKO-CXVJ') {
          priceUSD = 0.004; // DGKO price
        } else if (token.assetId === 'BABYDGKO-3S67') {
          priceUSD = 0.0000005; // BABYDGKO price
        } else if (token.assetId === 'USDT-ODW7') {
          priceUSD = 1.0; // USDT stable
        }

        const tokenValueUSD = parseFloat(token.balanceFormatted) * priceUSD;
        totalUSD += tokenValueUSD;

        // Mock 24h change (replace with real data)
        const mock24hChange = tokenValueUSD * (Math.random() * 0.1 - 0.05); // ±5%
        total24hChange += mock24hChange;
      });

      const change24hPercent = totalUSD > 0 ? (total24hChange / totalUSD) * 100 : 0;

      setStats({
        totalValueUSD: totalUSD,
        change24h: total24hChange,
        change24hPercent: change24hPercent,
        totalAssets: nonZeroTokens.length,
      });

      setLoading(false);
    };

    calculateStats();
  }, [tokens, tokensLoading]);

  // Manual refetch function
  const refetch = useCallback(() => {
    refetchTokens();
  }, [refetchTokens]);

  return { stats, loading, refetch };
}
