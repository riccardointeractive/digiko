import { useState, useEffect, useCallback } from 'react';
import { useKlever } from '@/context/KleverContext';
import { formatKLV } from '@/utils/constants';
import { DEV_MODE, TOKEN_IDS, TOKEN_PRECISIONS } from '../config/staking.config';
import { TokenSymbol } from '../types/staking.types';

/**
 * Custom hook for fetching balances of ALL tokens
 * Used by TokenSelector to show accurate balances in dropdown
 */
export function useTokenBalances() {
  const { address, isConnected } = useKlever();
  
  const [balances, setBalances] = useState<Record<TokenSymbol, string>>({
    DGKO: '0',
    BABYDGKO: '0',
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllBalances = useCallback(async () => {
    if (!address) return;

    setIsLoading(true);

    try {
      // 🧪 DEV MODE: Use mock balances
      if (DEV_MODE) {
        setBalances({
          DGKO: '10000.0000',
          BABYDGKO: '50000.00000000',
        });
        setIsLoading(false);
        return;
      }

      // 🚀 PRODUCTION MODE: Real API call
      const response = await fetch(`https://api.mainnet.klever.org/v1.0/address/${address}`);
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const accountInfo = await response.json();

      // Check if assets exist
      if (!accountInfo?.data?.account?.assets) {
        throw new Error('Invalid account data received');
      }

      // Convert assets object to array
      const assetsObject = accountInfo.data.account.assets;
      const assetsArray = Object.keys(assetsObject).map(key => ({
        assetId: key,
        ...assetsObject[key]
      }));

      // Fetch balance for each token
      const newBalances: Record<TokenSymbol, string> = {
        DGKO: '0',
        BABYDGKO: '0',
      };

      // Check DGKO
      const dgkoAsset = assetsArray.find((asset: any) => asset.assetId === TOKEN_IDS.DGKO);
      if (dgkoAsset) {
        newBalances.DGKO = formatKLV(dgkoAsset.balance || 0, TOKEN_PRECISIONS.DGKO);
      }

      // Check BABYDGKO
      const babydgkoAsset = assetsArray.find((asset: any) => asset.assetId === TOKEN_IDS.BABYDGKO);
      if (babydgkoAsset) {
        newBalances.BABYDGKO = formatKLV(babydgkoAsset.balance || 0, TOKEN_PRECISIONS.BABYDGKO);
      }

      setBalances(newBalances);
    } catch (error) {
      console.error('Error fetching all token balances:', error);
      // Keep showing 0 balances on error
    } finally {
      setIsLoading(false);
    }
  }, [address]);

  useEffect(() => {
    if (isConnected && address) {
      fetchAllBalances();
    }
  }, [isConnected, address, fetchAllBalances]);

  return {
    balances,
    isLoading,
    refetch: fetchAllBalances,
  };
}
