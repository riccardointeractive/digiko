import Link from 'next/link';
import { TokenStats } from '../types/dgko.types';

/**
 * StakingOverviewCard Component
 * Displays live staking statistics
 */

interface StakingOverviewCardProps {
  stats: TokenStats;
  loading: boolean;
}

export function StakingOverviewCard({ stats, loading }: StakingOverviewCardProps) {
  return (
    <div className="glass rounded-3xl border border-white/10 p-6 mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium text-white">Staking Overview</h2>
        <Link 
          href="/staking"
          className="text-sm text-digiko-primary hover:text-digiko-accent transition-colors"
        >
          Start Staking →
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-2xl p-4">
          <div className="text-sm text-gray-400 mb-1">Total Staked</div>
          <div className="text-2xl font-mono text-white">{loading ? '—' : stats.totalStaked}</div>
          <div className="text-xs text-gray-500 mt-1">DGKO</div>
        </div>
        <div className="bg-white/5 rounded-2xl p-4">
          <div className="text-sm text-gray-400 mb-1">Staked Supply</div>
          <div className="text-2xl font-mono text-white">{loading ? '—' : `${stats.stakedPercent}%`}</div>
          <div className="text-xs text-gray-500 mt-1">of circulating</div>
        </div>
        <div className="bg-white/5 rounded-2xl p-4">
          <div className="text-sm text-gray-400 mb-1">APR</div>
          <div className="text-2xl font-mono text-green-400">{loading ? '—' : `${stats.apr}%`}</div>
          <div className="text-xs text-gray-500 mt-1">annual yield</div>
        </div>
        <div className="bg-white/5 rounded-2xl p-4">
          <div className="text-sm text-gray-400 mb-1">Stakers</div>
          <div className="text-2xl font-mono text-white">{loading ? '—' : stats.stakingHolders.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">unique wallets</div>
        </div>
      </div>
    </div>
  );
}
