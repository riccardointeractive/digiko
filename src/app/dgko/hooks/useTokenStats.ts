import { useState, useEffect } from 'react';
import { TokenStats } from '../types/dgko.types';
import { DGKO_ASSET_ID, DGKO_PRECISION } from '../config/dgko.config';

/**
 * Custom hook for fetching DGKO token statistics from Klever API
 */
export function useTokenStats(network: 'mainnet' | 'testnet' = 'mainnet') {
  const [stats, setStats] = useState<TokenStats>({
    totalSupply: '100,000,000,000',
    circulatingSupply: '—',
    stakingHolders: 0,
    totalStaked: '—',
    stakedPercent: 0,
    apr: 0,
    burned: '—',
    minted: '—',
  });
  const [loading, setLoading] = useState(true);

  const fetchTokenStats = async () => {
    try {
      setLoading(true);
      
      const apiUrl = network === 'mainnet' 
        ? `https://api.mainnet.klever.org/v1.0/assets/${DGKO_ASSET_ID}`
        : `https://api.testnet.klever.org/v1.0/assets/${DGKO_ASSET_ID}`;
      
      const response = await fetch(apiUrl);
      
      if (response.ok) {
        const data = await response.json();
        const asset = data.data?.asset;
        
        if (asset) {
          const maxSupply = parseFloat(asset.maxSupply || '0') / DGKO_PRECISION;
          const circulatingSupply = parseFloat(asset.circulatingSupply || '0') / DGKO_PRECISION;
          const totalStaked = parseFloat(asset.staking?.totalStaked || '0') / DGKO_PRECISION;
          const burned = parseFloat(asset.burnedValue || '0') / DGKO_PRECISION;
          const minted = parseFloat(asset.mintedValue || '0') / DGKO_PRECISION;
          
          // Get current APR (last entry in apr array)
          const aprArray = asset.staking?.apr || [];
          const currentApr = aprArray.length > 0 
            ? aprArray[aprArray.length - 1].value / 100 
            : 0;
          
          // Calculate staked percentage
          const stakedPercent = circulatingSupply > 0 
            ? (totalStaked / circulatingSupply) * 100 
            : 0;
          
          setStats({
            totalSupply: maxSupply.toLocaleString('en-US', { maximumFractionDigits: 0 }),
            circulatingSupply: circulatingSupply.toLocaleString('en-US', { maximumFractionDigits: 0 }),
            stakingHolders: asset.stakingHolders || 0,
            totalStaked: totalStaked.toLocaleString('en-US', { maximumFractionDigits: 0 }),
            stakedPercent: Math.round(stakedPercent),
            apr: currentApr,
            burned: burned.toLocaleString('en-US', { maximumFractionDigits: 0 }),
            minted: minted.toLocaleString('en-US', { maximumFractionDigits: 0 }),
          });
        }
      }
    } catch (error) {
      console.error('Error fetching DGKO token stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokenStats();
  }, [network]);

  return { stats, loading, refetch: fetchTokenStats };
}
