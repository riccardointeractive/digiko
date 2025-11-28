import { TokenSymbol, ClaimableRewards, StakingStats } from '../types/staking.types';

/**
 * RewardsCard Component
 * Display claimable rewards and claim button
 */

interface RewardsCardProps {
  selectedToken: TokenSymbol;
  claimableRewards: ClaimableRewards;
  stakedBalance: string;
  currentStats: StakingStats;
  isLoading: boolean;
  onClaim: () => void;
  onRefresh: () => void;
}

export function RewardsCard({ 
  selectedToken, 
  claimableRewards, 
  stakedBalance,
  currentStats, 
  isLoading, 
  onClaim,
  onRefresh 
}: RewardsCardProps) {
  return (
    <div className="glass rounded-3xl p-8 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium text-white">Rewards</h2>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-digiko-primary/30 transition-all duration-300 group disabled:opacity-50"
          title="Refresh balances"
        >
          <svg className="w-5 h-5 text-gray-400 group-hover:text-digiko-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      
      <div className="mb-6">
        <div className="p-6 bg-gradient-to-br from-digiko-primary/10 to-digiko-accent/5 rounded-2xl border border-digiko-primary/20">
          <div className="text-gray-400 text-sm mb-2">Claimable Rewards (Estimated)</div>
          <div className="text-3xl font-mono font-medium text-white mb-1 tabular-nums">
            {claimableRewards.formatted} {selectedToken}
          </div>
          <div className="text-xs text-gray-500 font-mono">
            Earn {currentStats.apy}% APY automatically • Actual amount shown after claim
          </div>
        </div>
      </div>

      <button
        onClick={onClaim}
        disabled={isLoading || parseFloat(stakedBalance.replace(/,/g, '')) <= 0}
        className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium rounded-2xl transition-all duration-500 shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
      >
        {isLoading ? 'Processing...' : parseFloat(stakedBalance.replace(/,/g, '')) > 0 ? 'Claim Rewards' : 'No Staked Tokens'}
      </button>

      <div className="mt-6 p-4 bg-digiko-primary/5 rounded-xl border border-digiko-primary/10">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            <svg className="w-5 h-5 text-digiko-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="text-sm text-gray-300 leading-relaxed">
              Rewards accumulate automatically while staking. Claim anytime with a small network fee.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
