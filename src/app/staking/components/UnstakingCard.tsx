import { TokenSymbol, UnstakingItem, StakingStats } from '../types/staking.types';
import { UnstakingQueueItem } from './UnstakingQueueItem';
import { DEV_MODE, TOKEN_PRECISIONS } from '../config/staking.config';

/**
 * UnstakingCard Component
 * Display currently staked amount, unstake button, and unstaking queue
 */

interface UnstakingCardProps {
  selectedToken: TokenSymbol;
  stakedBalance: string;
  unstakingQueue: UnstakingItem[];
  currentStats: StakingStats;
  isLoading: boolean;
  onUnstake: () => void;
  onWithdraw: () => void;
  onRefresh: () => void;
}

export function UnstakingCard({ 
  selectedToken, 
  stakedBalance, 
  unstakingQueue,
  currentStats, 
  isLoading, 
  onUnstake,
  onWithdraw,
  onRefresh 
}: UnstakingCardProps) {
  return (
    <div className="glass rounded-3xl p-5 md:p-8 border border-white/10">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-responsive-h3 text-white">Unstake</h2>
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
      
      <div className="mb-4 md:mb-6 p-4 md:p-6 bg-klever-dark rounded-2xl border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400">Currently Staked</span>
          <span className="balance-display font-mono text-white tabular-nums">{stakedBalance}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Token</span>
          <span className="text-sm font-medium text-white">{selectedToken}</span>
        </div>
      </div>

      <div className="mb-4 md:mb-6 p-4 bg-digiko-primary/5 rounded-xl border border-digiko-primary/10">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            <svg className="w-5 h-5 text-digiko-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="text-sm text-gray-300 leading-relaxed">
              Klever blockchain requires unstaking your full staked amount. Clicking "Unstake All" will unstake all {stakedBalance} {selectedToken}.
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onUnstake}
        disabled={isLoading || parseFloat(stakedBalance.replace(/,/g, '')) <= 0}
        className="w-full py-4 bg-digiko-secondary hover:bg-digiko-blue-700 text-white font-medium rounded-2xl transition-all duration-500 shadow-[0_0_30px_rgba(0,82,204,0.3)] hover:shadow-[0_0_40px_rgba(0,82,204,0.4)] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] mb-4 md:mb-6"
      >
        {isLoading ? 'Processing...' : DEV_MODE ? '🧪 Simulate Unstake All' : 'Unstake All'}
      </button>

      {/* Unstaking Queue */}
      <div className="mt-8 pt-8 border-t border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-white">Unstaking Queue</h3>
          {unstakingQueue.length > 0 && (
            <span className="px-3 py-1 text-xs font-semibold bg-digiko-primary/20 text-digiko-accent rounded-full border border-digiko-primary/30">
              {unstakingQueue.length} {unstakingQueue.length === 1 ? 'item' : 'items'}
            </span>
          )}
        </div>

        {unstakingQueue.length > 0 ? (
          <div className="space-y-4">
            {unstakingQueue.map((item, index) => (
              <UnstakingQueueItem
                key={index}
                item={item}
                selectedToken={selectedToken}
                currentStats={currentStats}
                isLoading={isLoading}
                onWithdraw={onWithdraw}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-400 font-medium">No tokens unstaking</p>
            <p className="text-sm text-gray-600 mt-1">Unstake tokens to see them here</p>
          </div>
        )}
      </div>
    </div>
  );
}
