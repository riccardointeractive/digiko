'use client';

import { useState } from 'react';
import { useKlever } from '@/context/KleverContext';
import { TokenSelector } from '@/components/TokenSelector';
import { TransactionModal } from '@/components/TransactionModal';
import { ConnectWalletPrompt } from '@/components/ConnectWalletPrompt';

// Config & Types
import { DEV_MODE, TOKEN_CONFIG, getStakingStats } from './config/staking.config';
import { TokenSymbol } from './types/staking.types';

// Hooks
import { useModal } from './hooks/useModal';
import { useStakingStats } from './hooks/useStakingStats';
import { useStakingData } from './hooks/useStakingData';
import { useStakingActions } from './hooks/useStakingActions';
import { useTokenBalances } from './hooks/useTokenBalances';

// Components
import { DevModeBanner } from './components/DevModeBanner';
import { StakingHeader } from './components/StakingHeader';
import { StakingStatsGrid } from './components/StakingStatsGrid';
import { StakeCard } from './components/StakeCard';
import { RewardsCard } from './components/RewardsCard';
import { UnstakingCard } from './components/UnstakingCard';
import { HowItWorksSection } from './components/HowItWorksSection';

/**
 * Staking Page - Modular Architecture
 * 
 * This page orchestrates all staking functionality:
 * - Token selection
 * - Balance display
 * - Staking actions (stake, unstake, claim, withdraw)
 * - Unstaking queue management
 * - Transaction modals
 * 
 * All business logic is in hooks, all UI is in components.
 */
export default function Staking() {
  const { address, isConnected } = useKlever();
  const [selectedToken, setSelectedToken] = useState<TokenSymbol>('DGKO');

  // Modal state management
  const {
    modalOpen,
    modalStatus,
    modalTitle,
    modalMessage,
    modalTxHash,
    modalErrorLog,
    showSuccessModal,
    showErrorModal,
    showLoadingModal,
    closeModal,
  } = useModal();

  // Fetch total staked stats from blockchain
  const { totalStakedDGKO, totalStakedBABYDGKO, refetchStats } = useStakingStats();

  // Fetch balances for ALL tokens (for dropdown)
  const { balances: allTokenBalances } = useTokenBalances();

  // Fetch user balances and staking data
  const {
    availableBalance,
    stakedBalance,
    unstakingQueue,
    claimableRewards,
    buckets,
    isLoading,
    setIsLoading,
    mockBalances,
    setMockBalances,
    setUnstakingQueue,
    setClaimableRewards,
    fetchBalances,
  } = useStakingData(selectedToken, totalStakedDGKO, totalStakedBABYDGKO);

  // Transaction actions
  const { handleStake, handleUnstake, handleClaim, handleWithdraw } = useStakingActions(
    selectedToken,
    address,
    availableBalance,
    stakedBalance,
    claimableRewards,
    unstakingQueue,
    buckets,
    totalStakedDGKO,
    totalStakedBABYDGKO,
    setIsLoading,
    mockBalances,
    setMockBalances,
    setUnstakingQueue,
    setClaimableRewards,
    fetchBalances,
    refetchStats,
    showSuccessModal,
    showErrorModal,
    showLoadingModal
  );

  // Get current stats for selected token
  const currentStats = getStakingStats(selectedToken, totalStakedDGKO, totalStakedBABYDGKO);

  // Show connect wallet prompt if not connected
  if (!isConnected) {
    return <ConnectWalletPrompt />;
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
      {/* DEV MODE Banner */}
      {DEV_MODE && <DevModeBanner />}

      {/* Header */}
      <StakingHeader />

      {/* Token Selection */}
      <div className="mb-8">
        <TokenSelector
          tokens={TOKEN_CONFIG.map(token => ({
            ...token,
            balance: allTokenBalances[token.symbol as TokenSymbol],
          }))}
          selectedToken={selectedToken}
          onSelect={(symbol) => setSelectedToken(symbol as TokenSymbol)}
          showBalance={true}
          disabled={isLoading}
        />
      </div>

      {/* Stats Grid */}
      <StakingStatsGrid stats={currentStats} />

      {/* Main Content - Three Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mb-4 md:mb-8">
        {/* Stake Card */}
        <StakeCard
          selectedToken={selectedToken}
          availableBalance={availableBalance}
          stakedBalance={stakedBalance}
          isLoading={isLoading}
          onStake={handleStake}
          onRefresh={fetchBalances}
        />

        {/* Rewards Card */}
        <RewardsCard
          selectedToken={selectedToken}
          claimableRewards={claimableRewards}
          stakedBalance={stakedBalance}
          currentStats={currentStats}
          isLoading={isLoading}
          onClaim={handleClaim}
          onRefresh={fetchBalances}
        />

        {/* Unstaking Card */}
        <UnstakingCard
          selectedToken={selectedToken}
          stakedBalance={stakedBalance}
          unstakingQueue={unstakingQueue}
          currentStats={currentStats}
          isLoading={isLoading}
          onUnstake={handleUnstake}
          onWithdraw={handleWithdraw}
          onRefresh={fetchBalances}
        />
      </div>

      {/* How It Works Section */}
      <HowItWorksSection selectedToken={selectedToken} currentStats={currentStats} />

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={modalOpen}
        status={modalStatus}
        title={modalTitle}
        message={modalMessage}
        txHash={modalTxHash}
        errorLog={modalErrorLog}
        onClose={closeModal}
        autoDismiss={modalStatus === 'success'}
        autoDismissDelay={5000}
      />
    </div>
  );
}
