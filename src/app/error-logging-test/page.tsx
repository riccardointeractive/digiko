'use client';

import { useState } from 'react';
import { TransactionModal } from '@/components/TransactionModal';
import { createErrorLog } from '@/utils/errorLogger';
import { ErrorLog } from '@/types/errorLog';
import { useKlever } from '@/context/KleverContext';

/**
 * Error Logging Test Page
 * 
 * This page lets you test all error logging features without integrating
 * into production code. Try different error scenarios and see the debug log!
 */
export default function ErrorLoggingTest() {
  const { address } = useKlever();
  const [modalOpen, setModalOpen] = useState(false);
  const [errorLog, setErrorLog] = useState<ErrorLog | undefined>();

  const testScenarios = [
    {
      id: 1,
      name: 'Staking Error (Full Context)',
      description: 'Simulates a staking transaction failure with all details',
      trigger: () => {
        const log = createErrorLog({
          title: 'Staking Failed',
          message: 'Insufficient DGKO balance in wallet. You need at least 1000 DGKO to stake.',
          error: new Error('Insufficient balance for staking operation'),
          userAddress: address || 'klv1abc123def456ghi789jkl012mno345pqr678stu901',
          component: 'StakingPage',
          action: 'Stake 1000 DGKO at 10% APR',
          transaction: {
            type: 'stake',
            tokenSymbol: 'DGKO',
            amount: '1000',
            rawError: 'contract: insufficient balance for operation (required: 1000.0000 DGKO, available: 500.2500 DGKO)',
          },
        });
        setErrorLog(log);
        setModalOpen(true);
      },
    },
    {
      id: 2,
      name: 'API Error (With Response)',
      description: 'Simulates an API failure with endpoint and response details',
      trigger: () => {
        const log = createErrorLog({
          title: 'Failed to Load Token Data',
          message: 'Unable to fetch DGKO statistics from Klever API. Please try again in a moment.',
          error: new Error('API request failed with status 503'),
          userAddress: address || undefined,
          component: 'DgkoPage',
          action: 'Load DGKO token statistics',
          api: {
            endpoint: 'https://api.klever.org/v1.0/assets/DGKO-V3QL',
            method: 'GET',
            statusCode: 503,
            responseBody: '{"error": "Service temporarily unavailable", "retry_after": 60}',
          },
        });
        setErrorLog(log);
        setModalOpen(true);
      },
    },
    {
      id: 3,
      name: 'Transaction Error (With TX Hash)',
      description: 'Simulates a failed blockchain transaction',
      trigger: () => {
        const log = createErrorLog({
          title: 'Transaction Failed',
          message: 'Your staking transaction was rejected by the blockchain network.',
          error: new Error('Transaction execution reverted'),
          userAddress: address || 'klv1abc123def456ghi789jkl012mno345pqr678stu901',
          component: 'StakingPage',
          action: 'Submit stake transaction to blockchain',
          transaction: {
            type: 'stake',
            tokenSymbol: 'DGKO',
            amount: '1000',
            txHash: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6',
            gasUsed: '250000',
            rawError: 'execution reverted: contract paused for maintenance',
          },
        });
        setErrorLog(log);
        setModalOpen(true);
      },
    },
    {
      id: 4,
      name: 'Swap Error (Price Impact)',
      description: 'Simulates a swap failure due to slippage',
      trigger: () => {
        const log = createErrorLog({
          title: 'Swap Failed',
          message: 'Price changed too much during transaction. Please increase slippage tolerance and try again.',
          error: new Error('Slippage tolerance exceeded'),
          userAddress: address || undefined,
          component: 'SwapPage',
          action: 'Swap 1000 DGKO for USDT (1% slippage)',
          transaction: {
            type: 'swap',
            tokenSymbol: 'DGKO → USDT',
            amount: '1000 DGKO',
            recipient: 'Swap Contract',
            rawError: 'Slippage tolerance exceeded: expected 100.00 USDT, would receive 98.50 USDT (1.50% slippage)',
          },
        });
        setErrorLog(log);
        setModalOpen(true);
      },
    },
    {
      id: 5,
      name: 'Wallet Connection Error',
      description: 'Simulates wallet extension not found or user rejection',
      trigger: () => {
        const log = createErrorLog({
          title: 'Wallet Connection Failed',
          message: 'Unable to connect to Klever Wallet. Please make sure the extension is installed and try again.',
          error: new Error('Wallet extension not detected'),
          component: 'Navigation',
          action: 'Connect Klever Wallet Extension',
        });
        setErrorLog(log);
        setModalOpen(true);
      },
    },
    {
      id: 6,
      name: 'Network Error (No Internet)',
      description: 'Simulates a network connectivity issue',
      trigger: () => {
        const log = createErrorLog({
          title: 'Network Error',
          message: 'Unable to connect to Klever blockchain. Please check your internet connection.',
          error: new Error('Network request failed'),
          userAddress: address || undefined,
          component: 'DashboardPage',
          action: 'Fetch wallet balance',
          api: {
            endpoint: 'https://api.klever.org/v1.0/address/klv1.../assets',
            method: 'GET',
          },
        });
        setErrorLog(log);
        setModalOpen(true);
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1E] via-[#0D1425] to-[#0A0F1E]">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Error Logging Test Page
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Click any scenario below to test the enhanced error modal with full debug logs
          </p>
        </div>

        {/* Info Box */}
        <div className="glass rounded-2xl border border-white/10 p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-3">
            🎯 What to Look For:
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• <strong className="text-digiko-primary">Error message</strong> - Clear, user-friendly explanation</li>
            <li>• <strong className="text-digiko-primary">"Copy Debug Log" button</strong> - One-click copy with visual feedback</li>
            <li>• <strong className="text-digiko-primary">"Show Technical Details"</strong> - Collapsible section with all debug info</li>
            <li>• <strong className="text-digiko-primary">Helper text</strong> - "Copy this log and send it to support"</li>
          </ul>
        </div>

        {/* Test Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testScenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={scenario.trigger}
              className="glass rounded-2xl border border-white/10 p-6 text-left hover:border-digiko-primary/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-digiko-primary to-digiko-accent flex items-center justify-center text-white font-bold text-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {scenario.id}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2 group-hover:text-digiko-primary transition-colors">
                    {scenario.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {scenario.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Instructions */}
        <div className="glass rounded-2xl border border-white/10 p-6 mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">
            📋 Testing Instructions:
          </h3>
          <ol className="space-y-3 text-gray-300 text-sm">
            <li className="flex gap-3">
              <span className="text-digiko-primary font-bold">1.</span>
              <span>Click any scenario above to trigger the error modal</span>
            </li>
            <li className="flex gap-3">
              <span className="text-digiko-primary font-bold">2.</span>
              <span>Read the error message (user-friendly)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-digiko-primary font-bold">3.</span>
              <span>Click <strong>"Copy Debug Log"</strong> to copy full debug information</span>
            </li>
            <li className="flex gap-3">
              <span className="text-digiko-primary font-bold">4.</span>
              <span>Click <strong>"Show Technical Details"</strong> to expand the debug info</span>
            </li>
            <li className="flex gap-3">
              <span className="text-digiko-primary font-bold">5.</span>
              <span>Paste the copied log in a text editor to see the formatted output</span>
            </li>
            <li className="flex gap-3">
              <span className="text-digiko-primary font-bold">6.</span>
              <span>Try different scenarios to see how different contexts are captured</span>
            </li>
          </ol>
        </div>

        {/* Browser Info Preview */}
        <div className="glass rounded-2xl border border-white/10 p-6 mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">
            🖥️ Your Current Environment:
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Browser:</span>
              <span className="text-white font-mono">{typeof navigator !== 'undefined' ? navigator.userAgent.match(/Chrome|Safari|Firefox|Edge/)?.[0] || 'Unknown' : 'Loading...'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">OS:</span>
              <span className="text-white font-mono">{typeof navigator !== 'undefined' ? navigator.userAgent.match(/Windows|Mac|Linux|Android|iOS/)?.[0] || 'Unknown' : 'Loading...'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Device:</span>
              <span className="text-white font-mono">{typeof window !== 'undefined' && /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry/.test(navigator.userAgent) ? 'Mobile' : 'Desktop'}</span>
            </div>
            {address && (
              <div className="flex justify-between">
                <span className="text-gray-400">Wallet:</span>
                <span className="text-white font-mono">{address.slice(0, 8)}...{address.slice(-6)}</span>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            ℹ️ This info is automatically captured in every error log
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-digiko-primary hover:text-digiko-accent transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>
        </div>
      </div>

      {/* Error Modal */}
      <TransactionModal
        isOpen={modalOpen}
        status="error"
        title="Test Error"
        message="This is a test error to demonstrate the enhanced logging system"
        errorLog={errorLog}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
