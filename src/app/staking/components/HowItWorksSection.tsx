import { IconBox } from '@/components/IconBox';
import { TokenSymbol, StakingStats } from '../types/staking.types';

/**
 * HowItWorksSection Component
 * Three informational cards explaining how staking works
 */

interface HowItWorksSectionProps {
  selectedToken: TokenSymbol;
  currentStats: StakingStats;
}

export function HowItWorksSection({ selectedToken, currentStats }: HowItWorksSectionProps) {
  return (
    <div className="mt-6 md:mt-12 glass rounded-3xl p-5 md:p-8">
      <h2 className="text-2xl font-medium text-white mb-8 text-center">How Staking Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center md:text-left">
          <div className="mb-6 flex justify-center md:justify-start">
            <IconBox 
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              }
              size="md"
              variant="blue"
            />
          </div>
          <h3 className="font-medium text-white mb-2 text-lg">Stake Tokens</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Lock your {selectedToken} tokens to start earning rewards on the Klever Blockchain. No time limit!
          </p>
        </div>
        <div className="text-center md:text-left">
          <div className="mb-6 flex justify-center md:justify-start">
            <IconBox 
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              size="md"
              variant="blue"
            />
          </div>
          <h3 className="font-medium text-white mb-2 text-lg">Earn Rewards</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Receive {currentStats.apy}% APY on your staked tokens automatically. Stake as long as you want!
          </p>
        </div>
        <div className="text-center md:text-left">
          <div className="mb-6 flex justify-center md:justify-start">
            <IconBox 
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              size="md"
              variant="blue"
            />
          </div>
          <h3 className="font-medium text-white mb-2 text-lg">Unstake Anytime</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Unstake instantly whenever you want. After unstaking, simply withdraw your tokens to make them available again.
          </p>
        </div>
      </div>
    </div>
  );
}
