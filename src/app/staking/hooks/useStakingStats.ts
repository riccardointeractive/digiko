import { useState, useEffect } from 'react';
import { formatKLV } from '@/utils/constants';
import { DEV_MODE, TOKEN_IDS, TOKEN_PRECISIONS } from '../config/staking.config';
import { TokenSymbol } from '../types/staking.types';

/**
 * Custom hook for fetching total staked amounts from blockchain
 */
export function useStakingStats() {
  const [totalStakedDGKO, setTotalStakedDGKO] = useState('Loading...');
  const [totalStakedBABYDGKO, setTotalStakedBABYDGKO] = useState('Loading...');

  const fetchTotalStaked = async () => {
    if (DEV_MODE) {
      // Use mock data in dev mode
      setTotalStakedDGKO('10,000,000');
      setTotalStakedBABYDGKO('5,000,000');
      return;
    }

    // Fetch real data from Klever API
    const tokens = [
      { name: 'DGKO', id: TOKEN_IDS.DGKO, setter: setTotalStakedDGKO },
      { name: 'BABYDGKO', id: TOKEN_IDS.BABYDGKO, setter: setTotalStakedBABYDGKO }
    ];

    for (const token of tokens) {
      try {
        console.log(`🔍 Fetching total staked for: ${token.id}`);
        const response = await fetch(`https://api.mainnet.klever.org/v1.0/assets/${token.id}`);
        
        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();
        console.log(`📦 ${token.name} API response:`, data);

        if (data?.data?.asset?.staking?.totalStaked !== undefined) {
          const totalStaked = data.data.asset.staking.totalStaked;
          const precision = data.data.asset.precision || 6;
          
          // Format the number with commas
          const formatted = formatKLV(totalStaked, precision);
          console.log(`✅ ${token.name} Total staked: ${formatted}`);
          token.setter(formatted);
        } else {
          console.warn(`⚠️ ${token.name}: totalStaked not found in API response`);
          token.setter('N/A');
        }
      } catch (error) {
        console.error(`❌ Error fetching ${token.name} total staked:`, error);
        token.setter('N/A');
      }
    }
  };

  useEffect(() => {
    fetchTotalStaked();
  }, []);

  return {
    totalStakedDGKO,
    totalStakedBABYDGKO,
    refetchStats: fetchTotalStaked,
  };
}
