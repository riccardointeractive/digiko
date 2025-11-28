import { SwapStats } from '../types/swap.types';

interface UserStatsCardProps {
  stats: SwapStats;
}

/**
 * UserStatsCard Component
 * Displays user's swap statistics
 */
export function UserStatsCard({ stats }: UserStatsCardProps) {
  return (
    <div className="glass rounded-2xl p-6 border border-white/10">
      <h3 className="text-lg font-medium text-white mb-4">Your Stats</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Total Swaps</span>
          <span className="font-mono text-white">{stats.totalSwaps}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Successful</span>
          <span className="font-mono text-green-400">{stats.successfulSwaps}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Failed</span>
          <span className="font-mono text-red-400">{stats.failedSwaps}</span>
        </div>
      </div>
    </div>
  );
}
