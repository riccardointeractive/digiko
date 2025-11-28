/**
 * Staking Types
 * All TypeScript interfaces and types for the staking page
 */

export interface StakingStats {
  apy: number;
  totalStaked: string;
  minimumStake: string;
  unstakingPeriod: number; // Epochs to wait after unstaking before withdrawal (0 = instant)
}

export interface UnstakingItem {
  amount: number;
  unlockTime: number; // ⚠️ This is in SECONDS (Klever epoch time)
}

export interface ClaimableRewards {
  amount: number;
  formatted: string;
}

export interface StakingBalances {
  available: string;
  staked: string;
  claimableRewards: ClaimableRewards;
  unstakingQueue: UnstakingItem[];
  buckets: any[]; // Klever buckets for unstaking
}

export type TokenSymbol = 'DGKO' | 'BABYDGKO';

export interface MockBalances {
  DGKO: { available: string; staked: string };
  BABYDGKO: { available: string; staked: string };
}
