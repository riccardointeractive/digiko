import { kleverService, TransactionType } from '@/utils/klever';
import { formatKLV, parseKLV } from '@/utils/constants';
import { web } from '@klever/sdk-web';
import { DEV_MODE, TOKEN_IDS, TOKEN_PRECISIONS, getStakingStats } from '../config/staking.config';
import { TokenSymbol, UnstakingItem, MockBalances } from '../types/staking.types';
import { createErrorLog } from '@/utils/errorLogger';
import { checkForForcedError, debugLog } from '@/utils/debugMode';
import { ErrorLog } from '@/types/errorLog';

/**
 * Custom hook for staking transaction actions
 */
export function useStakingActions(
  selectedToken: TokenSymbol,
  address: string | null,
  availableBalance: string,
  stakedBalance: string,
  claimableRewards: { amount: number; formatted: string },
  unstakingQueue: UnstakingItem[],
  buckets: any[],
  totalStakedDGKO: string,
  totalStakedBABYDGKO: string,
  setIsLoading: (loading: boolean) => void,
  mockBalances: MockBalances,
  setMockBalances: (balances: MockBalances) => void,
  setUnstakingQueue: (queue: UnstakingItem[]) => void,
  setClaimableRewards: (rewards: { amount: number; formatted: string }) => void,
  fetchBalances: () => void,
  fetchTotalStaked: () => void,
  showSuccessModal: (title: string, message?: string, txHash?: string) => void,
  showErrorModal: (title: string, message: string, errorLog?: ErrorLog) => void,
  showLoadingModal: (title: string, message?: string) => void,
) {
  const currentStats = getStakingStats(selectedToken, totalStakedDGKO, totalStakedBABYDGKO);

  const handleStake = async (stakeAmount: string, setStakeAmount: (amount: string) => void) => {
    if (!address) {
      showErrorModal('Wallet Not Connected', 'Please connect your wallet to stake tokens');
      return;
    }

    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      showErrorModal('Invalid Amount', 'Please enter a valid amount to stake');
      return;
    }

    // Remove commas from balance strings before parsing
    const availableBalanceNum = parseFloat(availableBalance.replace(/,/g, ''));
    const stakeAmountNum = parseFloat(stakeAmount);

    if (stakeAmountNum > availableBalanceNum) {
      const errorLog = createErrorLog({
        title: 'Insufficient Balance',
        message: `You don't have enough ${selectedToken} to stake this amount`,
        userAddress: address,
        component: 'StakingPage',
        action: `Attempt to stake ${stakeAmount} ${selectedToken}`,
        transaction: {
          type: 'stake',
          tokenSymbol: selectedToken,
          amount: stakeAmount,
          rawError: `Required: ${stakeAmount} ${selectedToken}, Available: ${availableBalance} ${selectedToken}`,
        },
      });
      
      showErrorModal(
        'Insufficient Balance',
        `You don't have enough ${selectedToken} to stake this amount`,
        errorLog
      );
      return;
    }

    if (stakeAmountNum < parseFloat(currentStats.minimumStake.replace(/,/g, ''))) {
      showErrorModal('Below Minimum', `Minimum stake is ${currentStats.minimumStake} ${selectedToken}`);
      return;
    }

    // 🧪 DEV MODE: Simulate staking
    if (DEV_MODE) {
      console.log('🧪 DEV MODE: Simulating stake transaction');
      showLoadingModal('Processing Stake', `Staking ${stakeAmount} ${selectedToken}...`);
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update mock balances
      const amount = parseFloat(stakeAmount);
      const currentMock = mockBalances[selectedToken];
      setMockBalances({
        ...mockBalances,
        [selectedToken]: {
          available: (parseFloat(currentMock.available) - amount).toFixed(2),
          staked: (parseFloat(currentMock.staked) + amount).toFixed(2)
        }
      });
      
      showSuccessModal(
        'Stake Successful',
        `Successfully staked ${stakeAmount} ${selectedToken}!`,
        'mock-tx-hash-' + Date.now()
      );
      setStakeAmount('');
      setIsLoading(false);
      
      // Refresh balances
      setTimeout(() => fetchBalances(), 500);
      return;
    }

    // 🚀 PRODUCTION MODE: Real transaction
    try {
      showLoadingModal('Processing Stake', `Staking ${stakeAmount} ${selectedToken}...`);
      setIsLoading(true);

      // 🐛 DEBUG MODE: Check for forced errors
      try {
        checkForForcedError('insufficient_balance');
        checkForForcedError('wallet_rejected');
        checkForForcedError('transaction_failed');
      } catch (error: any) {
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

      const accountInfo = await kleverService.getAccountInfo(address);
      
      // Use the correct precision for this token (4 decimals, not 6!)
      const precision = TOKEN_PRECISIONS[selectedToken];
      const amountInUnits = parseKLV(parseFloat(stakeAmount), precision);

      // Use the correct mainnet token ID
      const tokenId = TOKEN_IDS[selectedToken];

      const tx = {
        type: TransactionType.Freeze as number,
        sender: address,
        nonce: accountInfo.nonce,
        kda: tokenId,
        amount: amountInUnits,
        kdaFee: 'KLV',
      };

      // Use the Klever SDK web.buildTransaction method instead of window.kleverWeb
      // The extension injects this through the SDK, not directly on window
      try {
        // Build unsigned transaction
        const unsignedTx = await web.buildTransaction([
          {
            payload: {
              amount: amountInUnits,
              kda: tokenId,
            },
            type: TransactionType.Freeze as number,
          }
        ]);
        
        console.log('✅ Unsigned transaction built');
        console.log('🔍 WORKING TX FORMAT:', JSON.stringify(unsignedTx, null, 2));
        console.log('🔍 TX KEYS:', Object.keys(unsignedTx));
        console.log('🔍 TX TYPE:', typeof unsignedTx);
        
        // Sign transaction (will show Klever extension popup)
        const signedTx = await web.signTransaction(unsignedTx);
        
        console.log('✅ Transaction signed');
        
        // Broadcast transaction
        const response = await web.broadcastTransactions([signedTx]);
        
        console.log('✅ Transaction broadcast:', response);
        
        if (response && response.data && response.data.txsHashes && response.data.txsHashes.length > 0) {
          const txHash = response.data.txsHashes[0];
          showSuccessModal(
            'Stake Successful',
            `Successfully staked ${stakeAmount} ${selectedToken}!`,
            txHash
          );
          setStakeAmount('');
          
          setTimeout(() => {
            fetchBalances();
            fetchTotalStaked(); // Refresh global total staked
          }, 3000);
        } else {
          throw new Error('Transaction failed - no hash returned');
        }
      } catch (sdkError: any) {
        console.error('SDK Error:', sdkError);
        const errorMessage = sdkError?.message || sdkError?.error || sdkError?.toString() || 'Unknown error occurred';
        throw new Error(`Failed to execute transaction: ${errorMessage}`);
      }
    } catch (err: any) {
      console.error('Staking error:', err);
      
      // Create comprehensive error log
      const errorLog = createErrorLog({
        title: 'Staking Failed',
        message: 'Unable to complete staking transaction. Please try again.',
        error: err as Error,
        userAddress: address,
        component: 'StakingPage',
        action: `Stake ${stakeAmount} ${selectedToken}`,
        transaction: {
          type: 'stake',
          tokenSymbol: selectedToken,
          amount: stakeAmount,
          rawError: err.message || err.toString(),
        },
      });
      
      showErrorModal(
        'Stake Failed',
        'Unable to complete staking transaction. Please try again.',
        errorLog
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnstake = async () => {
    if (!address) {
      showErrorModal('Wallet Not Connected', 'Please connect your wallet to unstake tokens');
      return;
    }

    // Remove commas from balance strings before parsing
    const stakedBalanceNum = parseFloat(stakedBalance.replace(/,/g, ''));

    if (stakedBalanceNum <= 0) {
      showErrorModal('Nothing to Unstake', 'You don\'t have any staked tokens to unstake');
      return;
    }

    // 🧪 DEV MODE: Simulate unstaking
    if (DEV_MODE) {
      console.log('🧪 DEV MODE: Simulating unstake transaction (FULL AMOUNT)');
      showLoadingModal('Processing Unstake', `Unstaking ${stakedBalance} ${selectedToken}...`);
      setIsLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update mock balances - unstake FULL amount
      const fullAmount = stakedBalanceNum;
      const currentMock = mockBalances[selectedToken];
      setMockBalances({
        ...mockBalances,
        [selectedToken]: {
          available: currentMock.available, // Doesn't go to available immediately
          staked: '0' // All unstaked
        }
      });
      
      // Add to unstaking queue with epoch time in SECONDS
      const nowInSeconds = Math.floor(Date.now() / 1000);
      const precision = TOKEN_PRECISIONS[selectedToken];
      const newUnstakingItem: UnstakingItem = {
        amount: Math.floor(fullAmount * Math.pow(10, precision)), // Convert to smallest units
        unlockTime: nowInSeconds + (currentStats.unstakingPeriod * 24 * 60 * 60) // SECONDS
      };
      setUnstakingQueue([...unstakingQueue, newUnstakingItem]);
      
      showSuccessModal(
        'Unstake Request Submitted',
        `Your ${stakedBalance} ${selectedToken} will be available after ${currentStats.unstakingPeriod} epochs`,
        'mock-tx-hash-' + Date.now()
      );
      setIsLoading(false);
      
      setTimeout(() => fetchBalances(), 500);
      return;
    }

    // 🚀 PRODUCTION MODE: Real transaction
    try {
      showLoadingModal('Processing Unstake', `Unstaking ${stakedBalance} ${selectedToken}...`);
      setIsLoading(true);
      
      // ⚠️ CRITICAL: Klever requires a bucketID to unstake
      if (!buckets || buckets.length === 0) {
        throw new Error('No staking buckets found. Please refresh and try again.');
      }
      
      console.log(`📋 Found ${buckets.length} bucket(s) to unstake`);
      
      // Use the correct mainnet token ID
      const tokenId = TOKEN_IDS[selectedToken];
      const precision = TOKEN_PRECISIONS[selectedToken];
      
      // Build transactions for ALL buckets (Klever unstakes full bucket per bucketID)
      const transactions = buckets.map((bucket, index) => {
        const bucketAmount = formatKLV(bucket.delegatedAmount || 0, precision);
        console.log(`📝 Bucket ${index} - ID: ${bucket.id}, Amount: ${bucketAmount} ${selectedToken}`);
        
        return {
          payload: {
            bucketID: bucket.id, // ⚠️ REQUIRED: Specify which bucket to unstake from
            kda: tokenId,
          },
          type: TransactionType.Unfreeze as number,
        };
      });
      
      console.log(`📝 Building ${transactions.length} unstake transaction(s)...`);
      
      // Build unsigned transaction(s)
      const unsignedTx = await web.buildTransaction(transactions);
      
      console.log('✅ Unsigned unstake transaction(s) built');
      
      // Sign transaction (will show Klever extension popup)
      const signedTx = await web.signTransaction(unsignedTx);
      
      console.log('✅ Unstake transaction(s) signed');
      
      // Broadcast transaction
      const response = await web.broadcastTransactions([signedTx]);
      
      console.log('✅ Unstake transaction(s) broadcast:', response);
      
      if (response && response.data && response.data.txsHashes && response.data.txsHashes.length > 0) {
        const txHash = response.data.txsHashes[0];
        showSuccessModal(
          'Unstake Request Submitted',
          `Your ${stakedBalance} ${selectedToken} from ${buckets.length} bucket(s) will be available instantly`,
          txHash
        );
        
        // Refresh balances after a delay to allow blockchain to update
        setTimeout(() => {
          fetchBalances();
          fetchTotalStaked();
        }, 3000);
      } else {
        throw new Error('Transaction failed - no hash returned');
      }
    } catch (err: any) {
      console.error('❌ Unstaking error:', err);
      showErrorModal('Unstake Failed', err.message || 'Failed to unstake tokens');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaim = async () => {
    if (!address) {
      showErrorModal('Wallet Not Connected', 'Please connect your wallet to claim rewards');
      return;
    }

    if (claimableRewards.amount <= 0) {
      showErrorModal('No Rewards', 'You don\'t have any rewards to claim yet');
      return;
    }

    // 🧪 DEV MODE: Simulate claiming
    if (DEV_MODE) {
      console.log('🧪 DEV MODE: Simulating claim transaction');
      showLoadingModal('Claiming Rewards', `Claiming ${claimableRewards.formatted} ${selectedToken}...`);
      setIsLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update mock: Add claimed rewards to available balance
      const claimed = parseFloat(claimableRewards.formatted);
      const currentMock = mockBalances[selectedToken];
      setMockBalances({
        ...mockBalances,
        [selectedToken]: {
          available: (parseFloat(currentMock.available) + claimed).toFixed(4),
          staked: currentMock.staked
        }
      });
      
      setClaimableRewards({ amount: 0, formatted: '0' });
      showSuccessModal(
        'Rewards Claimed',
        `Successfully claimed ${claimableRewards.formatted} ${selectedToken}!`,
        'mock-tx-hash-' + Date.now()
      );
      setIsLoading(false);
      
      setTimeout(() => fetchBalances(), 500);
      return;
    }

    // 🚀 PRODUCTION MODE: Real transaction
    try {
      showLoadingModal('Claiming Rewards', `Claiming ${claimableRewards.formatted} ${selectedToken}...`);
      setIsLoading(true);

      console.log('📝 Building claim transaction...');
      
      // Use the correct mainnet token ID
      const tokenId = TOKEN_IDS[selectedToken];

      // Build unsigned transaction for claiming staking rewards
      // claimType: 0 = StakingClaim, 1 = AllowanceClaim, 2 = MarketClaim
      const unsignedTx = await web.buildTransaction([
        {
          payload: {
            claimType: 0, // StakingClaim
            id: tokenId,  // Asset ID to be claimed
          },
          type: TransactionType.Claim as number,
        }
      ]);
      
      console.log('✅ Unsigned claim transaction built');
      
      // Sign transaction (will show Klever extension popup)
      const signedTx = await web.signTransaction(unsignedTx);
      
      console.log('✅ Claim transaction signed');
      
      // Broadcast transaction
      const response = await web.broadcastTransactions([signedTx]);
      
      console.log('✅ Claim transaction broadcast:', response);
      
      if (response && response.data && response.data.txsHashes && response.data.txsHashes.length > 0) {
        const txHash = response.data.txsHashes[0];
        showSuccessModal(
          'Rewards Claimed',
          `Successfully claimed ${claimableRewards.formatted} ${selectedToken}!`,
          txHash
        );
        
        // Refresh balances after a delay to allow blockchain to update
        setTimeout(() => {
          fetchBalances();
          fetchTotalStaked();
        }, 3000);
      } else {
        throw new Error('Transaction failed - no hash returned');
      }
    } catch (error: any) {
      console.error('❌ Error claiming rewards:', error);
      showErrorModal('Claim Failed', error.message || 'Failed to claim rewards');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!address) {
      showErrorModal('Wallet Not Connected', 'Please connect your wallet to withdraw tokens');
      return;
    }

    if (unstakingQueue.length === 0) {
      showErrorModal('Nothing to Withdraw', 'You don\'t have any unstaked tokens to withdraw');
      return;
    }

    // Check if any tokens are ready to withdraw (unlockTime has passed)
    const nowInSeconds = Math.floor(Date.now() / 1000);
    const readyToWithdraw = unstakingQueue.filter(item => item.unlockTime <= nowInSeconds);
    
    if (readyToWithdraw.length === 0) {
      showErrorModal('Tokens Not Ready', 'No tokens are ready to withdraw yet. Please wait for the unstaking period to complete.');
      return;
    }

    // 🧪 DEV MODE: Simulate withdrawing
    if (DEV_MODE) {
      console.log('🧪 DEV MODE: Simulating withdraw transaction');
      
      // Calculate total amount ready to withdraw
      const totalToWithdraw = readyToWithdraw.reduce((sum, item) => sum + item.amount, 0);
      const precision = TOKEN_PRECISIONS[selectedToken];
      const formattedAmount = formatKLV(totalToWithdraw, precision);
      
      showLoadingModal('Processing Withdrawal', `Withdrawing ${formattedAmount} ${selectedToken}...`);
      setIsLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update mock: Add withdrawn amount to available balance and remove from queue
      const currentMock = mockBalances[selectedToken];
      setMockBalances({
        ...mockBalances,
        [selectedToken]: {
          available: (parseFloat(currentMock.available) + parseFloat(formattedAmount)).toFixed(4),
          staked: currentMock.staked
        }
      });
      
      // Remove withdrawn items from queue
      setUnstakingQueue(unstakingQueue.filter(item => item.unlockTime > nowInSeconds));
      
      showSuccessModal(
        'Withdrawal Successful',
        `Successfully withdrawn ${formattedAmount} ${selectedToken}!`,
        'mock-tx-hash-' + Date.now()
      );
      setIsLoading(false);
      
      setTimeout(() => fetchBalances(), 500);
      return;
    }

    // 🚀 PRODUCTION MODE: Real transaction
    try {
      // Calculate total for display before showing modal
      const totalWithdrawn = readyToWithdraw.reduce((sum, item) => sum + item.amount, 0);
      const precision = TOKEN_PRECISIONS[selectedToken];
      const formattedAmount = formatKLV(totalWithdrawn, precision);
      
      showLoadingModal('Processing Withdrawal', `Withdrawing ${formattedAmount} ${selectedToken}...`);
      setIsLoading(true);

      console.log('📝 Building withdraw transaction...');
      
      // Use the correct mainnet token ID
      const tokenId = TOKEN_IDS[selectedToken];

      // Build unsigned transaction for withdrawing unstaked tokens
      // withdrawType: 0 = Staking (withdraw all unstaked buckets), 1 = KDAPool
      const unsignedTx = await web.buildTransaction([
        {
          payload: {
            kda: tokenId,        // Asset ID to be withdrawn
            withdrawType: 0,     // Staking withdrawal
          },
          type: TransactionType.Withdraw as number,
        }
      ]);
      
      console.log('✅ Unsigned withdraw transaction built');
      console.log('🔍 Transaction to sign:', unsignedTx);
      
      // Sign transaction (will show Klever extension popup)
      let signedTx;
      try {
        signedTx = await web.signTransaction(unsignedTx);
        console.log('✅ Withdraw transaction signed');
      } catch (signError: any) {
        console.error('❌ Error signing transaction:', signError);
        throw new Error(`Failed to sign transaction: ${signError.message || 'User rejected or extension error'}`);
      }
      
      // Broadcast transaction
      const response = await web.broadcastTransactions([signedTx]);
      
      console.log('✅ Withdraw transaction broadcast:', response);
      
      if (response && response.data && response.data.txsHashes && response.data.txsHashes.length > 0) {
        const txHash = response.data.txsHashes[0];
        
        showSuccessModal(
          'Withdrawal Successful',
          `Successfully withdrawn ${formattedAmount} ${selectedToken}!`,
          txHash
        );
        
        // Refresh balances after a delay to allow blockchain to update
        setTimeout(() => {
          fetchBalances();
          fetchTotalStaked();
        }, 3000);
      } else {
        throw new Error('Transaction failed - no hash returned');
      }
    } catch (error: any) {
      console.error('❌ Error withdrawing tokens:', error);
      showErrorModal('Withdrawal Failed', error.message || 'Failed to withdraw tokens');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleStake,
    handleUnstake,
    handleClaim,
    handleWithdraw,
  };
}
