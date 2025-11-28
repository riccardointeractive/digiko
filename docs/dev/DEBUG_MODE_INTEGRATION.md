/**
 * EXAMPLE: How to Integrate Debug Mode into Staking Actions
 * 
 * This shows you exactly how to add forced error checks to your
 * existing staking code so you can test error logging!
 */

import { kleverService, TransactionType } from '@/utils/klever';
import { formatKLV, parseKLV } from '@/utils/constants';
import { web } from '@klever/sdk-web';
import { createErrorLog } from '@/utils/errorLogger';
import { checkForForcedError, debugLog } from '@/utils/debugMode'; // ADD THIS

/**
 * EXAMPLE 1: Add to handleStake function
 * 
 * Add this right at the start of your handleStake function,
 * AFTER validation but BEFORE the actual operation
 */
const handleStake = async (stakeAmount: string, setStakeAmount: (amount: string) => void) => {
  if (!address) {
    showErrorModal('Wallet Not Connected', 'Please connect your wallet to stake tokens');
    return;
  }

  // ... your validation code ...

  // 🐛 DEBUG MODE: Check for forced errors
  try {
    checkForForcedError('insufficient_balance');
    checkForForcedError('wallet_rejected');
  } catch (error) {
    debugLog('Forced error triggered', { scenario: error.scenario });
    
    const errorLog = createErrorLog({
      title: 'Staking Failed (Debug Mode)',
      message: error.message,
      error: error as Error,
      userAddress: address,
      component: 'StakingPage',
      action: `Stake ${stakeAmount} ${selectedToken}`,
      transaction: {
        type: 'stake',
        tokenSymbol: selectedToken,
        amount: stakeAmount,
        rawError: `Debug Mode: ${error.scenario}`,
      },
    });
    
    showErrorModal('Staking Failed (Debug Mode)', error.message, errorLog);
    setIsLoading(false);
    return;
  }

  // ... rest of your staking code ...
};

/**
 * EXAMPLE 2: Add to API calls
 */
async function fetchTokenStats() {
  try {
    // 🐛 DEBUG MODE: Check for API errors
    checkForForcedError('api_timeout');
    checkForForcedError('api_error');
    checkForForcedError('network_error');
    
    const response = await fetch('https://api.klever.org/v1.0/assets/DGKO-V3QL');
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    
    // ... rest of your code ...
  } catch (error) {
    debugLog('API error (could be forced)', error);
    
    const errorLog = createErrorLog({
      title: 'Failed to Load Token Data',
      message: 'Unable to fetch token statistics',
      error: error as Error,
      userAddress: address,
      component: 'DgkoPage',
      action: 'Load token statistics',
      api: {
        endpoint: 'https://api.klever.org/v1.0/assets/DGKO-V3QL',
        method: 'GET',
      },
    });
    
    showErrorModal('Failed to Load Token Data', 'Unable to fetch token statistics', errorLog);
  }
}

/**
 * EXAMPLE 3: Add to transaction broadcast
 */
async function broadcastTransaction(signedTx: any) {
  try {
    // 🐛 DEBUG MODE: Check for transaction errors
    checkForForcedError('transaction_failed');
    
    const txHash = await web.broadcastTransactions([signedTx]);
    
    // ... success handling ...
  } catch (error) {
    debugLog('Transaction failed (could be forced)', error);
    
    const errorLog = createErrorLog({
      title: 'Transaction Failed',
      message: 'Unable to submit transaction to blockchain',
      error: error as Error,
      userAddress: address,
      component: 'StakingPage',
      action: `Stake ${stakeAmount} ${selectedToken}`,
      transaction: {
        type: 'stake',
        tokenSymbol: selectedToken,
        amount: stakeAmount,
        rawError: error.message,
      },
    });
    
    showErrorModal('Transaction Failed', 'Unable to submit transaction', errorLog);
  }
}

/**
 * WHERE TO ADD DEBUG CHECKS:
 * 
 * 1. Staking operations:
 *    - checkForForcedError('insufficient_balance')
 *    - checkForForcedError('wallet_rejected')
 *    - checkForForcedError('transaction_failed')
 * 
 * 2. Unstaking operations:
 *    - checkForForcedError('insufficient_balance')
 *    - checkForForcedError('transaction_failed')
 * 
 * 3. Swap operations:
 *    - checkForForcedError('slippage_exceeded')
 *    - checkForForcedError('insufficient_balance')
 *    - checkForForcedError('transaction_failed')
 * 
 * 4. API calls:
 *    - checkForForcedError('api_timeout')
 *    - checkForForcedError('api_error')
 *    - checkForForcedError('network_error')
 * 
 * 5. Wallet connection:
 *    - checkForForcedError('wallet_rejected')
 * 
 * 6. Address validation:
 *    - checkForForcedError('invalid_address')
 */

export {};
