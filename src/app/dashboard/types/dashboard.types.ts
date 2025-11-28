/**
 * Dashboard Types
 */

export interface GuideItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant: 'blue' | 'cyan';
}

export interface TokenBalance {
  assetId: string;
  balance: string;
  balanceFormatted: string;
  valueUSD?: number;
  change24h?: number;
  logo?: string;
}

export interface Transaction {
  hash: string;
  type: string;
  from: string;
  to?: string;
  amount: string;
  assetId: string;
  timestamp: number;
  status: 'confirmed' | 'pending' | 'failed';
  fee?: string;
}

export interface StakingPosition {
  assetId: string;
  amount: string;
  rewards: string;
  apy: number;
  epochsRemaining?: number;
  bucketId?: string;
}

export interface PortfolioStats {
  totalValueUSD: number;
  change24h: number;
  change24hPercent: number;
  totalAssets: number;
}
