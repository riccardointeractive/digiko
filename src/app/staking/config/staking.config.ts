import { StakingStats, TokenSymbol } from '../types/staking.types';

/**
 * Staking Configuration
 * All constants and configuration for the staking page
 */

// 🔧 DEVELOPMENT MODE - Set to false for production
export const DEV_MODE = false; // ✅ PRODUCTION MODE - Real transactions enabled!

// 🎯 MAINNET TOKEN IDS - Update these to match your deployed tokens
export const TOKEN_IDS = {
  DGKO: 'DGKO-CXVJ',
  BABYDGKO: 'BABYDGKO-3S67'
} as const;

// 🔢 TOKEN PRECISIONS - CRITICAL for correct amount calculations
export const TOKEN_PRECISIONS = {
  DGKO: 4,        // DGKO uses 4 decimals
  BABYDGKO: 8     // BABYDGKO uses 8 decimals (50 billion supply)
} as const;

/**
 * Get staking stats for a token
 * @param token - Token symbol
 * @param totalStakedDGKO - Dynamic total staked for DGKO
 * @param totalStakedBABYDGKO - Dynamic total staked for BABYDGKO
 */
export const getStakingStats = (
  token: TokenSymbol,
  totalStakedDGKO: string,
  totalStakedBABYDGKO: string
): StakingStats => {
  const stakingStats: Record<TokenSymbol, StakingStats> = {
    DGKO: {
      apy: 10,
      totalStaked: totalStakedDGKO,
      minimumStake: '100',
      unstakingPeriod: 0 // Instant unstaking - no wait time
    },
    BABYDGKO: {
      apy: 10,
      totalStaked: totalStakedBABYDGKO,
      minimumStake: '1000',
      unstakingPeriod: 0 // Instant unstaking - no wait time
    }
  };

  return stakingStats[token];
};

/**
 * Token selector configuration
 */
export const TOKEN_CONFIG = [
  {
    id: TOKEN_IDS.DGKO,
    symbol: 'DGKO' as TokenSymbol,
    name: 'Digiko Token',
    assetId: TOKEN_IDS.DGKO,
  },
  {
    id: TOKEN_IDS.BABYDGKO,
    symbol: 'BABYDGKO' as TokenSymbol,
    name: 'Baby Digiko',
    assetId: TOKEN_IDS.BABYDGKO,
  }
];
