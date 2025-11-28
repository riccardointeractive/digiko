import { useState } from 'react';
import { web } from '@klever/sdk-web';
import { SwapDirection, SwapQuote } from '../types/swap.types';
import {
  ASSET_IDS,
  DEX_CONTRACT_ADDRESS,
  DEX_CONTRACT_FUNCTIONS,
  DGKO_PRECISION,
  KLV_PRECISION,
  CONTRACT_CALL_GAS,
} from '../config/swap.config';
import {
  saveSwapTransaction,
  generateSwapId,
  updateSwapTransactionStatus,
} from '@/utils/swapStorage';
import { formatSwapAmount, getSwapDirectionInfo } from '@/utils/swapCalculations';
import { TransactionType } from '@/utils/klever';

/**
 * useSwapExecution Hook
 * Handles swap transaction execution via DEX smart contract
 */
export function useSwapExecution(
  address: string | null,
  isConnected: boolean,
  direction: SwapDirection,
  quote: SwapQuote | null,
  showSuccessModal: (title: string, message?: string, txHash?: string) => void,
  showErrorModal: (title: string, message: string) => void,
  showLoadingModal: (title: string, message?: string) => void,
  resetSwapForm: () => void,
  updateReserves: (inputAmt: number, outputAmt: number) => void,
  refreshHistory: () => void
) {
  const [isSwapping, setIsSwapping] = useState(false);
  
  const executeSwap = async () => {
    if (!isConnected || !address || !quote) return;
    
    setIsSwapping(true);
    
    const txId = generateSwapId();
    const directionInfo = getSwapDirectionInfo(direction);
    
    // Get formatted amounts for display
    const inputFormatted = formatSwapAmount(quote.inputAmount, direction === 'DGKO_TO_KLV' ? 4 : 2);
    const outputFormatted = formatSwapAmount(quote.outputAmount, direction === 'DGKO_TO_KLV' ? 2 : 4);
    
    showLoadingModal(
      'Processing Swap',
      `Swapping ${inputFormatted} ${directionInfo.inputToken} for ${outputFormatted} ${directionInfo.outputToken}...`
    );
    
    try {
      // Create transaction record
      const transaction = {
        id: txId,
        timestamp: Date.now(),
        direction,
        inputToken: directionInfo.inputToken,
        outputToken: directionInfo.outputToken,
        inputAmount: quote.inputAmount,
        outputAmount: quote.outputAmount,
        exchangeRate: quote.exchangeRate,
        fees: quote.fees.total,
        txHash: '',
        status: 'pending' as const,
      };
      
      // Save to history
      saveSwapTransaction(transaction);
      refreshHistory();
      
      // Calculate amounts with precision
      const inputPrecision = direction === 'DGKO_TO_KLV' ? DGKO_PRECISION : KLV_PRECISION;
      const amountInUnits = Math.floor(quote.inputAmount * inputPrecision);
      
      // Get asset ID and function name
      const inputAssetId = direction === 'DGKO_TO_KLV' ? ASSET_IDS.DGKO : ASSET_IDS.KLV;
      const functionName = direction === 'DGKO_TO_KLV' 
        ? DEX_CONTRACT_FUNCTIONS.SWAP_DGKO_TO_KLV 
        : DEX_CONTRACT_FUNCTIONS.SWAP_KLV_TO_DGKO;
      
      // Use backend API to build transaction (Node SDK supports smart contracts)
      console.log('🔍 Building smart contract transaction via backend...');
      
      // EXPERIMENTAL: Try using web.buildTransaction directly
      // The Web SDK might support SmartContract type even if undocumented
      console.log('🧪 Attempting web.buildTransaction with SmartContract type...');
      
      try {
        const experimentalTx = await web.buildTransaction([
          {
            type: 23, // SmartContract type
            payload: {
              address: DEX_CONTRACT_ADDRESS,
              callFunction: functionName,
              callValue: [{
                assetID: inputAssetId,
                amount: amountInUnits
              }]
            }
          }
        ]);
        
        console.log('✅ Built with web.buildTransaction!');
        console.log('📋 TX:', JSON.stringify(experimentalTx, null, 2));
        
        // Try signing it
        const signedTx = await web.signTransaction(experimentalTx);
        console.log('✅ Transaction signed!');
        
        // Broadcast
        const response = await web.broadcastTransactions([signedTx]);
        console.log('✅ Broadcast response:', response);
        
        if (response?.data?.txsHashes?.[0]) {
          return response.data.txsHashes[0];
        }
        throw new Error('No transaction hash returned');
        
      } catch (webSdkError: any) {
        console.log('❌ web.buildTransaction approach failed:', webSdkError.message);
        console.log('📡 Falling back to backend approach...');
      }

      // FALLBACK: Backend approach
      const buildResponse = await fetch('/api/swap/build', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: address,
          contractAddress: DEX_CONTRACT_ADDRESS,
          functionName,
          assetId: inputAssetId,
          amount: amountInUnits,
        }),
      });

      if (!buildResponse.ok) {
        const error = await buildResponse.json();
        throw new Error(error.error || 'Failed to build transaction');
      }

      const { unsignedTx } = await buildResponse.json();
      console.log('✅ Transaction built by backend');
      console.log('📋 Unsigned TX:', JSON.stringify(unsignedTx, null, 2));

      // Step 2: Sign transaction with Klever Extension directly via window object
      console.log('🔍 Checking Klever Extension...');
      console.log('window.kleverWeb exists:', !!window.kleverWeb);
      
      if (!window.kleverWeb) {
        throw new Error('Klever Extension not found');
      }
      
      console.log('window.kleverWeb.signTransaction exists:', !!window.kleverWeb.signTransaction);
      console.log('window.kleverWeb type:', typeof window.kleverWeb.signTransaction);
      
      console.log('📝 Attempting to sign with Klever Extension...');
      
      let signedTx;
      try {
        // Use the SDK's signTransaction method, not window.kleverWeb
        signedTx = await web.signTransaction(unsignedTx);
        console.log('✅ Transaction signed by user');
        console.log('📋 Signed TX:', signedTx);
      } catch (signError: any) {
        console.error('❌ Signing failed:', signError);
        throw new Error('Failed to sign transaction: ' + signError.message);
      }

      // Step 3: Broadcast transaction using web SDK (same as staking)
      console.log('📡 Broadcasting transaction...');
      const response = await web.broadcastTransactions([signedTx]);
      console.log('✅ Broadcast response:', response);

      if (!response || !response.data || !response.data.txsHashes || response.data.txsHashes.length === 0) {
        throw new Error('No transaction hash returned from broadcast');
      }

      const txHash = response.data.txsHashes[0];
      console.log('✅ Transaction successful! Hash:', txHash);
      
      // Update transaction status with hash
      if (txHash) {
        
        // Update transaction status
        updateSwapTransactionStatus(txId, 'success', txHash);
        refreshHistory();
        
        // Update reserves
        updateReserves(quote.inputAmount, quote.outputAmount);
        
        // Reset form
        resetSwapForm();
        
        showSuccessModal(
          'Swap Successful',
          `Successfully swapped ${inputFormatted} ${directionInfo.inputToken} for ${outputFormatted} ${directionInfo.outputToken}!`,
          txHash
        );
      } else {
        throw new Error('Transaction failed - no hash returned');
      }
    } catch (error: any) {
      console.error('Swap error:', error);
      showErrorModal('Swap Failed', error.message || 'Failed to complete swap transaction');
      updateSwapTransactionStatus(txId, 'failed');
      refreshHistory();
    } finally {
      setIsSwapping(false);
    }
  };
  
  return {
    isSwapping,
    executeSwap,
  };
}
