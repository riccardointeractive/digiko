/**
 * ENHANCED ERROR LOGGING - USAGE EXAMPLES
 * 
 * This file demonstrates how to use the comprehensive error logging system
 * to capture detailed debugging information when errors occur.
 */

import { createErrorLog } from '@/utils/errorLogger';
import { useWallet } from '@/context/WalletContext';
import { useModal } from './hooks/useModal';

// =============================================================================
// EXAMPLE 1: STAKING ERROR WITH FULL CONTEXT
// =============================================================================

async function handleStakeError() {
  const { address } = useWallet();
  const { showErrorModal } = useModal();
  
  try {
    // Your staking logic here...
    throw new Error('Insufficient balance');
  } catch (error) {
    // Create comprehensive error log
    const errorLog = createErrorLog({
      title: 'Staking Failed',
      message: 'Unable to stake tokens. Please check your balance and try again.',
      error: error as Error,
      userAddress: address,
      component: 'StakingPage',
      action: 'Stake 1000 DGKO',
      transaction: {
        type: 'stake',
        tokenSymbol: 'DGKO',
        amount: '1000',
      },
    });
    
    // Show error modal with full debug log
    showErrorModal(
      'Staking Failed',
      'Unable to stake tokens. Please check your balance and try again.',
      errorLog
    );
  }
}

// =============================================================================
// EXAMPLE 2: API ERROR WITH REQUEST/RESPONSE DETAILS
// =============================================================================

async function handleApiError() {
  const { address } = useWallet();
  const { showErrorModal } = useModal();
  
  try {
    const response = await fetch('https://api.klever.org/v1.0/assets/DGKO-V3QL');
    
    if (!response.ok) {
      const responseBody = await response.text();
      
      // Create error log with API details
      const errorLog = createErrorLog({
        title: 'Failed to Load Token Data',
        message: 'Unable to fetch token information from the blockchain.',
        error: new Error(`API returned ${response.status}`),
        userAddress: address,
        component: 'DgkoPage',
        action: 'Load DGKO stats',
        api: {
          endpoint: 'https://api.klever.org/v1.0/assets/DGKO-V3QL',
          method: 'GET',
          statusCode: response.status,
          responseBody: responseBody,
        },
      });
      
      showErrorModal(
        'Failed to Load Token Data',
        'Unable to fetch token information from the blockchain.',
        errorLog
      );
    }
  } catch (error) {
    // Network error (no response)
    const errorLog = createErrorLog({
      title: 'Network Error',
      message: 'Unable to connect to Klever API. Please check your internet connection.',
      error: error as Error,
      userAddress: address,
      component: 'DgkoPage',
      action: 'Load DGKO stats',
      api: {
        endpoint: 'https://api.klever.org/v1.0/assets/DGKO-V3QL',
        method: 'GET',
      },
    });
    
    showErrorModal(
      'Network Error',
      'Unable to connect to Klever API. Please check your internet connection.',
      errorLog
    );
  }
}

// =============================================================================
// EXAMPLE 3: TRANSACTION ERROR WITH TX HASH
// =============================================================================

async function handleTransactionError(txHash: string) {
  const { address } = useWallet();
  const { showErrorModal } = useModal();
  
  try {
    // Transaction failed on blockchain
    const errorLog = createErrorLog({
      title: 'Transaction Failed',
      message: 'Your transaction was rejected by the network.',
      error: new Error('Transaction reverted'),
      userAddress: address,
      component: 'StakingPage',
      action: 'Submit stake transaction',
      transaction: {
        type: 'stake',
        tokenSymbol: 'DGKO',
        amount: '1000',
        txHash: txHash,
        rawError: 'contract: insufficient allowance',
      },
    });
    
    showErrorModal(
      'Transaction Failed',
      'Your transaction was rejected by the network.',
      errorLog
    );
  } catch (error) {
    console.error('Error handling transaction error:', error);
  }
}

// =============================================================================
// EXAMPLE 4: SWAP ERROR WITH BOTH TOKENS
// =============================================================================

async function handleSwapError() {
  const { address } = useWallet();
  const { showErrorModal } = useModal();
  
  try {
    // Swap logic...
    throw new Error('Slippage tolerance exceeded');
  } catch (error) {
    const errorLog = createErrorLog({
      title: 'Swap Failed',
      message: 'Price changed too much. Please adjust slippage tolerance and try again.',
      error: error as Error,
      userAddress: address,
      component: 'SwapPage',
      action: 'Swap 1000 DGKO for USDT',
      transaction: {
        type: 'swap',
        tokenSymbol: 'DGKO → USDT',
        amount: '1000 DGKO',
        rawError: 'Slippage tolerance exceeded: expected 100 USDT, would receive 95 USDT',
      },
    });
    
    showErrorModal(
      'Swap Failed',
      'Price changed too much. Please adjust slippage tolerance and try again.',
      errorLog
    );
  }
}

// =============================================================================
// EXAMPLE 5: WALLET CONNECTION ERROR
// =============================================================================

async function handleWalletConnectionError() {
  const { showErrorModal } = useModal();
  
  try {
    // Wallet connection logic...
    throw new Error('User rejected connection');
  } catch (error) {
    const errorLog = createErrorLog({
      title: 'Wallet Connection Failed',
      message: 'Unable to connect to Klever Wallet. Please make sure the extension is installed.',
      error: error as Error,
      component: 'Navigation',
      action: 'Connect Klever Wallet',
    });
    
    showErrorModal(
      'Wallet Connection Failed',
      'Unable to connect to Klever Wallet. Please make sure the extension is installed.',
      errorLog
    );
  }
}

// =============================================================================
// HOW IT WORKS
// =============================================================================

/**
 * When a user encounters an error:
 * 
 * 1. The error modal shows the error message clearly
 * 2. Below the message, there's a "Copy Debug Log" button
 * 3. Clicking this copies a formatted log with ALL debugging info
 * 4. The user can also click "Show Technical Details" to see the info
 * 5. The user sends you the copied log
 * 6. You get EVERYTHING you need to debug:
 *    - Exact error message and stack trace
 *    - User's wallet address (truncated)
 *    - Timestamp
 *    - Browser, OS, device
 *    - Page they were on
 *    - What action they tried
 *    - Transaction details
 *    - API request/response
 *    - App version
 *    - Network (mainnet/testnet)
 * 
 * No more back-and-forth asking for details! 🎯
 */

// =============================================================================
// UPDATING EXISTING ERROR HANDLERS
// =============================================================================

/**
 * To update existing error handlers:
 * 
 * BEFORE:
 * showErrorModal('Error Title', 'Error message');
 * 
 * AFTER:
 * const errorLog = createErrorLog({
 *   title: 'Error Title',
 *   message: 'Error message',
 *   error: error as Error, // The caught error
 *   userAddress: address, // From wallet context
 *   component: 'ComponentName',
 *   action: 'What they were trying to do',
 *   // Add transaction or api details if applicable
 * });
 * showErrorModal('Error Title', 'Error message', errorLog);
 */

export {};
