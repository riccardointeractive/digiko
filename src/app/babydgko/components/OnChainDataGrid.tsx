import { TokenStats } from '../types/babydgko.types';

interface OnChainDataGridProps {
  stats: TokenStats;
  loading: boolean;
}

/**
 * OnChainDataGrid Component
 * Displays on-chain token data in a grid layout
 */
export function OnChainDataGrid({ stats, loading }: OnChainDataGridProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-medium text-white mb-6">On-Chain Data</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass rounded-2xl border border-white/10 p-6">
          <div className="text-sm text-gray-400 mb-2">Max Supply</div>
          <div className="text-2xl font-mono text-white">
            {loading ? '—' : stats.totalSupply}
          </div>
        </div>
        <div className="glass rounded-2xl border border-white/10 p-6">
          <div className="text-sm text-gray-400 mb-2">Circulating</div>
          <div className="text-2xl font-mono text-white">
            {loading ? '—' : stats.circulatingSupply}
          </div>
        </div>
        <div className="glass rounded-2xl border border-white/10 p-6">
          <div className="text-sm text-gray-400 mb-2">Total Staked</div>
          <div className="text-2xl font-mono text-white">
            {loading ? '—' : stats.totalStaked}
          </div>
        </div>
        <div className="glass rounded-2xl border border-white/10 p-6">
          <div className="text-sm text-gray-400 mb-2">Staked %</div>
          <div className="text-2xl font-mono text-white">
            {loading ? '—' : `${stats.stakedPercent}%`}
          </div>
        </div>
      </div>
    </div>
  );
}
