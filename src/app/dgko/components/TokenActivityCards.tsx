import { TokenStats } from '../types/dgko.types';
import { Icons } from '../config/dgko.config';

/**
 * TokenActivityCards Component
 * Displays burned and minted token statistics
 */

interface TokenActivityCardsProps {
  stats: TokenStats;
  loading: boolean;
}

export function TokenActivityCards({ stats, loading }: TokenActivityCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
      <div className="glass rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
            {Icons.fire}
          </div>
          <div>
            <div className="text-sm text-gray-400">Total Burned</div>
            <div className="text-xl font-mono text-white">{loading ? '—' : stats.burned}</div>
          </div>
        </div>
        <p className="text-sm text-gray-500">DGKO tokens permanently removed from circulation</p>
      </div>
      <div className="glass rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-digiko-primary/10 flex items-center justify-center text-digiko-primary">
            {Icons.plus}
          </div>
          <div>
            <div className="text-sm text-gray-400">Total Minted</div>
            <div className="text-xl font-mono text-white">{loading ? '—' : stats.minted}</div>
          </div>
        </div>
        <p className="text-sm text-gray-500">DGKO tokens created since launch</p>
      </div>
    </div>
  );
}
