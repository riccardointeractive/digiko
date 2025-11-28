import Link from 'next/link';
import { TokenStats } from '../types/babydgko.types';

interface StakingOverviewCardProps {
  stats: TokenStats;
  loading: boolean;
}

/**
 * StakingOverviewCard Component
 * Displays live staking statistics with link to staking page
 */
export function StakingOverviewCard({ stats, loading }: StakingOverviewCardProps) {
  return (
    <div className="glass rounded-2xl border border-white/10 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium text-white">Live Staking Stats</h2>
        <Link 
          href="/staking" 
          className="text-sm text-digiko-primary hover:text-digiko-accent transition-colors"
        >
          Go to Staking →
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <div className="text-sm text-gray-400">Total Staked</div>
          <div className="text-2xl font-mono text-white">
            {loading ? '—' : stats.totalStaked}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Staked %</div>
          <div className="text-2xl font-mono text-white">
            {loading ? '—' : `${stats.stakedPercent}%`}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-400">APR</div>
          <div className="text-2xl font-mono text-white">
            {loading ? '—' : `${stats.apr}%`}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-400">Holders</div>
          <div className="text-2xl font-mono text-white">
            {loading ? '—' : stats.stakingHolders.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
