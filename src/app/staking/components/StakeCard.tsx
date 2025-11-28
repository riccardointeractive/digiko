import { useState } from 'react';
import { TokenSymbol } from '../types/staking.types';
import { DEV_MODE } from '../config/staking.config';
import { NumberInput } from '@/components/NumberInput';

/**
 * StakeCard Component
 * Input form and button for staking tokens
 */

interface StakeCardProps {
  selectedToken: TokenSymbol;
  availableBalance: string;
  stakedBalance: string;
  isLoading: boolean;
  onStake: (stakeAmount: string, setStakeAmount: (amount: string) => void) => void;
  onRefresh: () => void;
}

export function StakeCard({ 
  selectedToken, 
  availableBalance, 
  stakedBalance, 
  isLoading, 
  onStake,
  onRefresh 
}: StakeCardProps) {
  const [stakeAmount, setStakeAmount] = useState('');

  const handleStakeClick = () => {
    onStake(stakeAmount, setStakeAmount);
  };

  return (
    <div className="glass rounded-3xl p-8 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium text-white">Stake</h2>
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
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center p-4 bg-klever-dark rounded-xl">
          <span className="text-gray-400">Available</span>
          <span className="text-xl font-mono font-medium text-white">
            {availableBalance} {selectedToken}
          </span>
        </div>
        
        <div className="flex justify-between items-center p-4 bg-klever-dark rounded-xl">
          <span className="text-gray-400">Staked</span>
          <span className="text-xl font-mono font-medium text-digiko-accent">
            {stakedBalance} {selectedToken}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-white font-medium mb-2">Amount to Stake</label>
        <NumberInput
          value={stakeAmount}
          onChange={setStakeAmount}
          placeholder="0.00"
          disabled={isLoading}
          step={100}
          min={0}
          maxButton={{
            show: true,
            label: 'MAX',
            onClick: () => setStakeAmount(availableBalance.replace(/,/g, ''))
          }}
        />
      </div>

      <button
        onClick={handleStakeClick}
        disabled={isLoading || !stakeAmount}
        className="w-full py-4 bg-digiko-primary hover:bg-digiko-secondary text-white font-medium rounded-2xl transition-all duration-500 shadow-[0_0_40px_rgba(0,102,255,0.3)] hover:shadow-[0_0_60px_rgba(0,102,255,0.5)] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
      >
        {isLoading ? 'Processing...' : DEV_MODE ? '🧪 Simulate Stake' : 'Stake Tokens'}
      </button>
    </div>
  );
}
