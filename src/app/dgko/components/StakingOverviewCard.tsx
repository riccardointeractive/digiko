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
    <div className="glass rounded-2xl md:rounded-3xl border border-white/10 p-5 md:p-6 lg:p-6 mb-8 md:mb-10 lg:mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-5 lg:mb-6">
        <h2 className="text-responsive-h3 text-white">Staking Overview</h2>
        <Link 
          href="/staking"
          className="text-responsive-sm text-digiko-primary hover:text-digiko-accent transition-colors"
        >
          Start Staking →
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white/5 rounded-xl md:rounded-2xl p-3 md:p-4">
          <div className="text-responsive-sm text-gray-400 mb-1">Total Staked</div>
          <div className="text-responsive-h4 font-mono text-white">{loading ? '—' : stats.totalStaked}</div>
          <div className="text-xs text-gray-500 mt-1">DGKO</div>
        </div>
        <div className="bg-white/5 rounded-xl md:rounded-2xl p-3 md:p-4">
          <div className="text-responsive-sm text-gray-400 mb-1">Staked Supply</div>
          <div className="text-responsive-h4 font-mono text-white">{loading ? '—' : `${stats.stakedPercent}%`}</div>
          <div className="text-xs text-gray-500 mt-1">of circulating</div>
        </div>
        <div className="bg-white/5 rounded-xl md:rounded-2xl p-3 md:p-4">
          <div className="text-responsive-sm text-gray-400 mb-1">APR</div>
          <div className="text-responsive-h4 font-mono text-green-400">{loading ? '—' : `${stats.apr}%`}</div>
          <div className="text-xs text-gray-500 mt-1">annual yield</div>
        </div>
        <div className="bg-white/5 rounded-xl md:rounded-2xl p-3 md:p-4">
          <div className="text-responsive-sm text-gray-400 mb-1">Stakers</div>
          <div className="text-responsive-h4 font-mono text-white">{loading ? '—' : stats.stakingHolders.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1">unique wallets</div>
        </div>
      </div>
    </div>
  );
}
