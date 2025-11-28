import { TokenStats } from '../types/babydgko.types';
import { Icons } from '../config/babydgko.config';

interface TokenActivityCardsProps {
  stats: TokenStats;
  loading: boolean;
}

/**
 * TokenActivityCards Component
 * Displays burned and minted token statistics
 */
export function TokenActivityCards({ stats, loading }: TokenActivityCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      {/* Minted Card */}
      <div className="glass rounded-2xl border border-white/10 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
            {Icons.sparkles}
          </div>
          <div>
            <div className="text-sm text-gray-400">Total Minted</div>
            <div className="text-xl font-mono text-white">{loading ? '—' : stats.minted}</div>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          New tokens created through minting mechanisms, expanding the circulating supply
        </p>
      </div>

      {/* Burned Card */}
      <div className="glass rounded-2xl border border-white/10 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
            {Icons.fire}
          </div>
          <div>
            <div className="text-sm text-gray-400">Total Burned</div>
            <div className="text-xl font-mono text-white">{loading ? '—' : stats.burned}</div>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Tokens permanently removed from circulation through burning mechanisms
        </p>
      </div>
    </div>
  );
}
