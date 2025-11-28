import { useState, useEffect, useCallback } from 'react';
import { useKlever } from '@/context/KleverContext';
import { TokenBalance } from '../types/dashboard.types';
import { APP_CONFIG } from '@/config/app';

/**
 * Custom hook to fetch all token balances from connected wallet
 * Returns formatted list of all assets with balances
 * Manual refresh only - no auto-refresh
 */
export function useTokenBalances() {
  const { address, isConnected } = useKlever();
  const [tokens, setTokens] = useState<TokenBalance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTokens = useCallback(async () => {
    if (!isConnected || !address) {
      setTokens([]);
      return;
    }

    console.log('🔄 [useTokenBalances] fetchTokens called at', new Date().toLocaleTimeString());
    setLoading(true);
    setError(null);

    try {
      // Use network from APP_CONFIG
      const network = APP_CONFIG.network.toLowerCase();
      const response = await fetch(`/api/account?address=${address}&network=${network}`);
      if (!response.ok) throw new Error('Failed to fetch account data');

      const data = await response.json();
      const assets = data.data?.account?.assets || {};

      // Convert assets to TokenBalance format
      const tokenList: TokenBalance[] = Object.entries(assets).map(([assetId, assetData]: [string, any]) => {
        const balance = assetData.balance || '0';
        
        // Format balance based on known decimals
        let balanceFormatted = balance;
        if (assetId === 'KLV') {
          balanceFormatted = (parseInt(balance) / 1000000).toFixed(2);
        } else if (assetId === 'DGKO-CXVJ') {
          balanceFormatted = (parseInt(balance) / 10000).toFixed(4);
        } else if (assetId === 'BABYDGKO-3S67') {
          balanceFormatted = (parseInt(balance) / 100000000).toFixed(8);
        } else if (assetId === 'USDT-ODW7') {
          balanceFormatted = (parseInt(balance) / 1000000).toFixed(2);
        } else {
          // Default to 6 decimals for unknown tokens
          balanceFormatted = (parseInt(balance) / 1000000).toFixed(6);
        }

        return {
          assetId,
          balance,
          balanceFormatted,
          valueUSD: undefined, // TODO: Fetch from price API
          change24h: undefined, // TODO: Calculate from price history
        };
      });

      // Sort by balance value (KLV first, then by amount)
      tokenList.sort((a, b) => {
        if (a.assetId === 'KLV') return -1;
        if (b.assetId === 'KLV') return 1;
        return parseFloat(b.balanceFormatted) - parseFloat(a.balanceFormatted);
      });

      setTokens(tokenList);
    } catch (err: any) {
      console.error('Error fetching token balances:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [address, isConnected]);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  return { tokens, loading, error, refetch: fetchTokens };
}
