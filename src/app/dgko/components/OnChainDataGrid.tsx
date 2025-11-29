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
    <div className="mb-8 md:mb-10 lg:mb-12">
      <h2 className="text-responsive-h3 text-white mb-4 md:mb-5 lg:mb-6">On-Chain Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        <div className="glass rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 border border-white/10">
          <div className="text-responsive-sm text-gray-400 mb-2">Total Supply</div>
          <div className="text-responsive-h4 font-mono text-white">
            {loading ? '—' : stats.totalSupply}
          </div>
        </div>
        <div className="glass rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 border border-white/10">
          <div className="text-responsive-sm text-gray-400 mb-2">Circulating Supply</div>
          <div className="text-responsive-h4 font-mono text-white">
            {loading ? '—' : stats.circulatingSupply}
          </div>
        </div>
        <div className="glass rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 border border-white/10">
          <div className="text-responsive-sm text-gray-400 mb-2">Stakers</div>
          <div className="text-responsive-h4 font-mono text-white mb-1">
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
