/**
 * BABYDGKO Token Page Types
 * All TypeScript interfaces for the BABYDGKO page
 */

import { Exchange } from '@/types/exchange';

export interface TokenStats {
  totalSupply: string;
  circulatingSupply: string;
  stakingHolders: number;
  totalStaked: string;
  stakedPercent: number;
  apr: number;
  burned: string;
  minted: string;
}

export interface TokenomicsItem {
  label: string;
  percent: number;
  color: string;
}

export interface RoadmapItem {
  title: string;
  status: 'live' | 'coming';
  quarter: string;
  description: string;
}

export interface EcosystemFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: 'live' | 'coming';
  href: string | null;
}

export interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
  color: string;
}

export interface TokenDetail {
  label: string;
  value: string;
  mono?: boolean;
}

export type { Exchange };
