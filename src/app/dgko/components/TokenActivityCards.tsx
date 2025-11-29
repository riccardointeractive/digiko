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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10 lg:mb-12">
      <div className="glass rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 border border-white/10">
        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
            {Icons.fire}
          </div>
          <div>
            <div className="text-responsive-sm text-gray-400">Total Burned</div>
            <div className="text-responsive-h5 font-mono text-white">{loading ? '—' : stats.burned}</div>
          </div>
        </div>
        <p className="text-responsive-sm text-gray-500">DGKO tokens permanently removed from circulation</p>
      </div>
      <div className="glass rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 border border-white/10">
        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-digiko-primary/10 flex items-center justify-center text-digiko-primary">
            {Icons.plus}
          </div>
          <div>
            <div className="text-responsive-sm text-gray-400">Total Minted</div>
            <div className="text-responsive-h5 font-mono text-white">{loading ? '—' : stats.minted}</div>
          </div>
        </div>
        <p className="text-responsive-sm text-gray-500">DGKO tokens created since launch</p>
      </div>
    </div>
  );
}
