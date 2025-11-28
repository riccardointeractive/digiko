import { StakingStats } from '../types/staking.types';

/**
 * StakingStatsGrid Component
 * Display APY, Total Staked, Minimum Stake, Unstaking Period
 */

interface StakingStatsGridProps {
  stats: StakingStats;
}

export function StakingStatsGrid({ stats }: StakingStatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="glass-hover rounded-3xl p-4 md:p-6">
        <div className="text-gray-400 text-sm mb-1">APY</div>
        <div className="text-3xl font-mono font-medium text-white">{stats.apy}%</div>
      </div>
      <div className="glass rounded-3xl p-4 md:p-6 border border-white/10">
        <div className="text-gray-400 text-sm mb-1">Total Staked</div>
        <div className="text-2xl font-mono font-medium text-white">{stats.totalStaked}</div>
      </div>
      <div className="glass rounded-3xl p-4 md:p-6 border border-white/10">
        <div className="text-gray-400 text-sm mb-1">Minimum Stake</div>
        <div className="text-2xl font-mono font-medium text-white">{stats.minimumStake}</div>
      </div>
      <div className="glass rounded-3xl p-4 md:p-6 border border-white/10">
        <div className="text-gray-400 text-sm mb-1">Unstaking Period</div>
        <div className="text-2xl font-mono font-medium text-white">{stats.unstakingPeriod} epochs</div>
      </div>
    </div>
  );
}
