import { formatKLV } from '@/utils/constants';
import { TokenSymbol, UnstakingItem, StakingStats } from '../types/staking.types';
import { TOKEN_PRECISIONS } from '../config/staking.config';

/**
 * UnstakingQueueItem Component
 * Individual item in the unstaking queue with progress bar and timer
 */

interface UnstakingQueueItemProps {
  item: UnstakingItem;
  selectedToken: TokenSymbol;
  currentStats: StakingStats;
  isLoading: boolean;
  onWithdraw: () => void;
}

export function UnstakingQueueItem({ 
  item, 
  selectedToken, 
  currentStats, 
  isLoading, 
  onWithdraw 
}: UnstakingQueueItemProps) {
  const precision = TOKEN_PRECISIONS[selectedToken];
  const formattedAmount = formatKLV(item.amount, precision);

  /**
   * Format time remaining for unstaking
   * @param unlockTime - Klever epoch time in SECONDS (not milliseconds!)
   * @returns Formatted string like "3d 5h remaining" or "Ready to claim"
   */
  const formatTimeRemaining = (unlockTime: number) => {
    // ⚠️ CRITICAL: Klever uses epoch time in SECONDS, JavaScript uses MILLISECONDS
    const nowInSeconds = Math.floor(Date.now() / 1000); // Convert JS time to seconds
    const diffInSeconds = unlockTime - nowInSeconds;
    
    if (diffInSeconds <= 0) return 'Ready to claim';
    
    // Calculate days and hours from seconds
    const days = Math.floor(diffInSeconds / (60 * 60 * 24));
    const hours = Math.floor((diffInSeconds % (60 * 60 * 24)) / (60 * 60));
    
    return `${days}d ${hours}h remaining`;
  };

  /**
   * Calculate progress percentage for unstaking countdown
   * @param unlockTime - Klever epoch time in SECONDS
   * @returns Progress percentage (0-100)
   */
  const calculateProgress = (unlockTime: number) => {
    // Total unstaking period in seconds
    const totalPeriodInSeconds = currentStats.unstakingPeriod * 24 * 60 * 60;
    
    // Calculate when unstaking started (in seconds)
    const startTimeInSeconds = unlockTime - totalPeriodInSeconds;
    
    // Current time in seconds
    const nowInSeconds = Math.floor(Date.now() / 1000);
    
    // Calculate elapsed time in seconds
    const elapsedSeconds = nowInSeconds - startTimeInSeconds;
    
    // Calculate progress percentage
    const progress = (elapsedSeconds / totalPeriodInSeconds) * 100;
    
    return Math.min(100, Math.max(0, progress));
  };

  const nowInSeconds = Math.floor(Date.now() / 1000);
  const isReady = item.unlockTime <= nowInSeconds;
  const progress = calculateProgress(item.unlockTime);

  return (
    <div className={`relative overflow-hidden rounded-2xl border ${isReady ? 'border-green-500/40 bg-gradient-to-br from-green-500/10 to-emerald-500/5' : 'border-white/10 bg-white/5'} backdrop-blur-sm`}>
      {/* Animated gradient background for ready items */}
      {isReady && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 bg-[length:200%_100%] animate-gradient-flow pointer-events-none" />
      )}
      
      <div className="relative z-10 p-6">
        {/* Amount and Status */}
        <div className="flex items-start justify-between mb-4">
          {/* Amount */}
          <div>
            <div className="text-xs text-gray-500 font-medium tracking-wide uppercase mb-1.5">Amount</div>
            <div className="text-2xl font-mono font-semibold text-white tabular-nums flex items-baseline gap-2">
              {formattedAmount}
              <span className="text-sm font-medium text-gray-400">{selectedToken}</span>
            </div>
          </div>

          {/* Status Badge */}
          <div className={`px-4 py-2 rounded-xl font-bold text-xs tracking-wider uppercase ${isReady ? 'bg-green-500/20 text-green-400 border border-green-500/40 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-digiko-primary/10 text-digiko-accent border border-digiko-primary/30'}`}>
            {isReady ? '✓ Ready' : formatTimeRemaining(item.unlockTime)}
          </div>
        </div>
        
        {/* Premium Progress Bar */}
        {!isReady && currentStats.unstakingPeriod > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-gray-400">Progress</span>
              <span className="text-digiko-accent">{Math.round(progress)}%</span>
            </div>
            <div className="relative h-2.5 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-xl border border-white/5">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-digiko-primary via-digiko-accent to-digiko-primary bg-[length:200%_100%] rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(0,102,255,0.5)] animate-gradient-flow"
                style={{ width: `${progress}%` }}
              />
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-slow" />
            </div>
          </div>
        )}

        {/* Ready to Withdraw - CTA + Button */}
        {isReady && (
          <div className="mt-4 space-y-3">
            {/* Call-to-Action Text */}
            <div className="flex items-center gap-2 text-sm font-semibold text-green-400">
              <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Click "Withdraw" to claim your tokens
            </div>
            
            {/* Withdraw Button */}
            <button
              onClick={onWithdraw}
              disabled={isLoading}
              className="w-full group relative py-3.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold text-sm tracking-[-0.01em] rounded-xl transition-all duration-500 shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] disabled:hover:scale-100 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                Withdraw
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
