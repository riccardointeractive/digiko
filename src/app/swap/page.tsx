'use client';

import { useKlever } from '@/context/KleverContext';
import { ConnectWalletPrompt } from '@/components/ConnectWalletPrompt';
import { TransactionModal } from '@/components/TransactionModal';

// Hooks
import { useSwapState } from './hooks/useSwapState';
import { useSwapHistory } from './hooks/useSwapHistory';
import { useSwapModal } from './hooks/useSwapModal';
import { useSwapExecution } from './hooks/useSwapExecution';

// Components
import { SwapHeader } from './components/SwapHeader';
import { SwapInterface } from './components/SwapInterface';
import { PoolLiquidityCard } from './components/PoolLiquidityCard';
import { UserStatsCard } from './components/UserStatsCard';
import { TransactionHistoryTable } from './components/TransactionHistoryTable';
import { HowItWorksSection } from './components/HowItWorksSection';

/**
 * Swap Page - Modular Architecture
 * 
 * This page provides decentralized token swapping functionality:
 * - DGKO ↔ USDT instant swaps
 * - Real-time AMM pricing with slippage protection
 * - Transaction history tracking
 * - Pool liquidity display
 * - User statistics
 * 
 * All business logic is in hooks, all UI is in components.
 */
export default function SwapPage() {
  const { address, isConnected } = useKlever();
  
  // Swap state management
  const {
    direction,
    inputAmount,
    outputAmount,
    quote,
    swapError,
    dgkoReserve,
    klvReserve,
    currentPrice,
    setInputAmount,
    handleFlipDirection,
    resetSwapForm,
    updateReserves,
  } = useSwapState();
  
  // Transaction history
  const {
    history,
    showHistory,
    stats,
    refreshHistory,
    handleClearHistory,
    toggleHistory,
  } = useSwapHistory();
  
  // Transaction modal
  const {
    modalOpen,
    modalStatus,
    modalTitle,
    modalMessage,
    modalTxHash,
    showSuccessModal,
    showErrorModal,
    showLoadingModal,
    closeModal,
  } = useSwapModal();
  
  // Swap execution
  const { isSwapping, executeSwap } = useSwapExecution(
    address,
    isConnected,
    direction,
    quote,
    showSuccessModal,
    showErrorModal,
    showLoadingModal,
    resetSwapForm,
    updateReserves,
    refreshHistory
  );
  
  if (!isConnected) {
    return <ConnectWalletPrompt />;
  }

  return (
    <main className="min-h-screen py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        
        {/* Page Header */}
        <SwapHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Swap Interface */}
          <div className="lg:col-span-2">
            <SwapInterface
              direction={direction}
              inputAmount={inputAmount}
              outputAmount={outputAmount}
              quote={quote}
              swapError={swapError}
              isSwapping={isSwapping}
              currentPrice={currentPrice}
              totalVolume={stats.totalVolumeDGKO}
              onInputChange={setInputAmount}
              onFlipDirection={handleFlipDirection}
              onSwap={executeSwap}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pool Liquidity */}
            <PoolLiquidityCard 
              dgkoReserve={dgkoReserve}
              klvReserve={klvReserve}
            />

            {/* User Stats */}
            <UserStatsCard stats={stats} />

            {/* View History Button */}
            <button
              onClick={toggleHistory}
              className="w-full glass rounded-2xl p-4 border border-white/10 hover:border-digiko-primary/40 transition-all duration-300 text-white font-medium"
            >
              {showHistory ? 'Hide' : 'Show'} Transaction History
            </button>
          </div>
        </div>

        {/* Transaction History */}
        {showHistory && (
          <TransactionHistoryTable
            history={history}
            onClearHistory={handleClearHistory}
          />
        )}

        {/* How It Works */}
        <HowItWorksSection />

      </div>

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={modalOpen}
        status={modalStatus}
        title={modalTitle}
        message={modalMessage}
        txHash={modalTxHash}
        onClose={closeModal}
        autoDismiss={modalStatus === 'success'}
        autoDismissDelay={5000}
      />
    </main>
  );
}
