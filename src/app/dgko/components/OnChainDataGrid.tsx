import { TokenStats } from '../types/dgko.types';
import { DGKO_ASSET_ID } from '../config/dgko.config';

/**
 * OnChainDataGrid Component
 * Displays total supply, circulating supply, and stakers count
 */

interface OnChainDataGridProps {
  stats: TokenStats;
  loading: boolean;
}

export function OnChainDataGrid({ stats, loading }: OnChainDataGridProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-medium text-white mb-6">On-Chain Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-6 border border-white/10">
          <div className="text-sm text-gray-400 mb-2">Total Supply</div>
          <div className="text-2xl font-mono text-white">
            {loading ? '—' : stats.totalSupply}
          </div>
        </div>
        <div className="glass rounded-2xl p-6 border border-white/10">
          <div className="text-sm text-gray-400 mb-2">Circulating Supply</div>
          <div className="text-2xl font-mono text-white">
            {loading ? '—' : stats.circulatingSupply}
          </div>
        </div>
        <div className="glass rounded-2xl p-6 border border-white/10">
          <div className="text-sm text-gray-400 mb-2">Stakers</div>
          <div className="text-2xl font-mono text-white mb-1">
            {loading ? '—' : stats.stakingHolders.toLocaleString()}
          </div>
          <a 
            href={`https://kleverscan.org/asset/${DGKO_ASSET_ID}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-digiko-primary hover:text-digiko-accent transition-colors"
          >
            View all holders →
          </a>
        </div>
      </div>
    </div>
  );
}
