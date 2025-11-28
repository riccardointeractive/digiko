# Frontend Integration Guide

This guide explains how to update the Digiko frontend to work with the new smart contract.

## 🎯 Overview

The new swap contract replaces the current "send tokens to address" approach with actual smart contract calls. This provides:
- ✅ Automatic token swaps
- ✅ Real-time pricing from blockchain
- ✅ Guaranteed execution
- ✅ On-chain event logs

## 📋 Required Changes

### 1. Update Swap Configuration

**File:** `src/app/swap/config/swap.config.tsx`

```typescript
// Add contract address
export const SWAP_CONTRACT_ADDRESS = 'klv1your_deployed_contract_address';

// Update pool addresses (these are now managed by contract)
// These can be removed or kept for reference
export const DGKO_POOL_ADDRESS = SWAP_CONTRACT_ADDRESS;
export const USDT_POOL_ADDRESS = SWAP_CONTRACT_ADDRESS;
```

### 2. Update Swap Execution Hook

**File:** `src/app/swap/hooks/useSwapExecution.ts`

Replace the current transaction building logic with smart contract calls:

```typescript
import { SWAP_CONTRACT_ADDRESS } from '../config/swap.config';

export function useSwapExecution(/* ... params */) {
  const [isSwapping, setIsSwapping] = useState(false);
  
  const executeSwap = async () => {
    if (!isConnected || !address || !quote) return;
    
    setIsSwapping(true);
    
    const txId = generateSwapId();
    const directionInfo = getSwapDirectionInfo(direction);
    
    const inputFormatted = formatSwapAmount(quote.inputAmount, direction === 'DGKO_TO_USDT' ? 4 : 2);
    const outputFormatted = formatSwapAmount(quote.outputAmount, direction === 'DGKO_TO_USDT' ? 2 : 4);
    
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
      
      saveSwapTransaction(transaction);
      refreshHistory();
      
      // Calculate amounts with precision
      const inputPrecision = direction === 'DGKO_TO_USDT' ? DGKO_PRECISION : USDT_PRECISION;
      const amountInUnits = Math.floor(quote.inputAmount * inputPrecision);
      const inputAssetId = direction === 'DGKO_TO_USDT' ? ASSET_IDS.DGKO : ASSET_IDS.USDT;
      
      const web = window.kleverWeb;
      if (!web) {
        throw new Error('Klever Extension not found');
      }
      
      // ========== NEW: Smart Contract Call ==========
      const functionName = direction === 'DGKO_TO_USDT' 
        ? 'swapDgkoToUsdt' 
        : 'swapUsdtToDgko';
      
      // Build smart contract transaction
      const unsignedTx = await web.buildTransaction([
        {
          type: TransactionType.SmartContract,
          payload: {
            scType: 0, // Call existing contract
            contractAddress: SWAP_CONTRACT_ADDRESS,
            functionName: functionName,
            amount: amountInUnits,
            kda: inputAssetId,
          }
        }
      ]);
      
      console.log('✅ Smart contract transaction built');
      
      // Sign transaction
      const signedTx = await web.signTransaction(unsignedTx);
      console.log('✅ Transaction signed');
      
      // Broadcast transaction
      const response = await web.broadcastTransactions([signedTx]);
      console.log('✅ Transaction broadcast:', response);
      
      // Check if successful
      if (response?.data?.txsHashes?.length > 0) {
        const txHash = response.data.txsHashes[0];
        
        updateSwapTransactionStatus(txId, 'success', txHash);
        refreshHistory();
        
        // Update reserves (fetch from contract)
        await updateReservesFromContract();
        
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
```

### 3. Add Contract Data Fetching Hook

**File:** `src/app/swap/hooks/useContractReserves.ts` (NEW FILE)

```typescript
import { useState, useEffect } from 'react';
import { SWAP_CONTRACT_ADDRESS } from '../config/swap.config';

/**
 * Fetch real-time reserves from smart contract
 */
export function useContractReserves() {
  const [dgkoReserve, setDgkoReserve] = useState<number>(0);
  const [usdtReserve, setUsdtReserve] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchReserves = async () => {
    try {
      setIsLoading(true);
      const web = window.kleverWeb;
      
      if (!web) {
        throw new Error('Klever Extension not found');
      }

      // Query DGKO reserve
      const dgkoResponse = await web.query({
        contract: SWAP_CONTRACT_ADDRESS,
        function: 'getDgkoReserve',
      });

      // Query USDT reserve
      const usdtResponse = await web.query({
        contract: SWAP_CONTRACT_ADDRESS,
        function: 'getUsdtReserve',
      });

      // Parse BigUint responses and convert to regular numbers
      // DGKO has 4 decimals, USDT has 6 decimals
      const dgkoValue = parseInt(dgkoResponse.data.value) / 10000;
      const usdtValue = parseInt(usdtResponse.data.value) / 1000000;

      setDgkoReserve(dgkoValue);
      setUsdtReserve(usdtValue);
      setError('');
    } catch (err: any) {
      console.error('Failed to fetch reserves:', err);
      setError(err.message || 'Failed to fetch reserves');
      // Fallback to default values
      setDgkoReserve(100000);
      setUsdtReserve(40);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch on mount and every 30 seconds
  useEffect(() => {
    fetchReserves();
    const interval = setInterval(fetchReserves, 30000);
    return () => clearInterval(interval);
  }, []);

  return {
    dgkoReserve,
    usdtReserve,
    isLoading,
    error,
    refetch: fetchReserves,
  };
}
```

### 4. Update Swap State Hook

**File:** `src/app/swap/hooks/useSwapState.ts`

Replace the local reserve state with contract data:

```typescript
import { useContractReserves } from './useContractReserves';

export function useSwapState() {
  const [direction, setDirection] = useState<SwapDirection>('DGKO_TO_USDT');
  const [inputAmount, setInputAmount] = useState<string>('');
  const [outputAmount, setOutputAmount] = useState<string>('');
  const [quote, setQuote] = useState<SwapQuote | null>(null);
  const [swapError, setSwapError] = useState<string>('');
  
  // ========== NEW: Fetch reserves from contract ==========
  const { 
    dgkoReserve, 
    usdtReserve, 
    isLoading: reservesLoading,
    refetch: refetchReserves 
  } = useContractReserves();
  
  // Calculate output when input changes
  useEffect(() => {
    if (!inputAmount || parseFloat(inputAmount) <= 0) {
      setOutputAmount('');
      setQuote(null);
      setSwapError('');
      return;
    }
    
    if (reservesLoading) {
      return; // Wait for reserves to load
    }
    
    try {
      const input = parseFloat(inputAmount);
      
      const inputReserve = direction === 'DGKO_TO_USDT' ? dgkoReserve : usdtReserve;
      const outputReserve = direction === 'DGKO_TO_USDT' ? usdtReserve : dgkoReserve;
      
      const validation = validateSwap(input, outputReserve, SLIPPAGE_TOLERANCE);
      if (!validation.valid) {
        setSwapError(validation.error || 'Invalid swap');
        setQuote(null);
        setOutputAmount('');
        return;
      }
      
      const calculatedQuote = calculateSwapOutput(
        input,
        inputReserve,
        outputReserve,
        SLIPPAGE_TOLERANCE
      );
      
      setQuote(calculatedQuote);
      setOutputAmount(calculatedQuote.outputAmount.toFixed(6));
      setSwapError('');
    } catch (error: any) {
      setSwapError(error.message || 'Calculation error');
      setQuote(null);
      setOutputAmount('');
    }
  }, [inputAmount, direction, dgkoReserve, usdtReserve, reservesLoading]);
  
  const handleFlipDirection = () => {
    setDirection(direction === 'DGKO_TO_USDT' ? 'USDT_TO_DGKO' : 'DGKO_TO_USDT');
    setInputAmount('');
    setOutputAmount('');
    setQuote(null);
    setSwapError('');
  };
  
  const resetSwapForm = () => {
    setInputAmount('');
    setOutputAmount('');
    setQuote(null);
    setSwapError('');
  };
  
  const updateReserves = () => {
    // Refetch from contract instead of updating locally
    refetchReserves();
  };
  
  const currentPrice = getDGKOPrice(dgkoReserve, usdtReserve);
  
  return {
    direction,
    inputAmount,
    outputAmount,
    quote,
    swapError,
    dgkoReserve,
    usdtReserve,
    currentPrice,
    reservesLoading,
    
    setInputAmount,
    handleFlipDirection,
    resetSwapForm,
    updateReserves,
  };
}
```

### 5. Update Klever Types

**File:** `src/types/klever.ts`

Add smart contract transaction type:

```typescript
export enum TransactionType {
  Transfer = 0,
  CreateAssetType = 1,
  CreateValidatorType = 2,
  ValidatorConfigType = 3,
  FreezeType = 4,
  UnfreezeType = 5,
  DelegateType = 6,
  UndelegateType = 7,
  WithdrawType = 8,
  ClaimType = 9,
  UnjailType = 10,
  AssetTriggerType = 11,
  SetAccountNameType = 12,
  ProposalType = 13,
  VoteType = 14,
  ConfigITOType = 15,
  SetITOPricesType = 16,
  BuyType = 17,
  SellType = 18,
  CancelMarketOrderType = 19,
  CreateMarketplaceType = 20,
  ConfigMarketplaceType = 21,
  UpdateAccountPermissionType = 22,
  DepositType = 23,
  ITOTriggerType = 24,
  SmartContract = 25, // <-- ADD THIS
}

export interface SmartContractPayload {
  scType: number; // 0 = call, 1 = deploy, 2 = vm
  contractAddress?: string; // For calls
  functionName?: string; // Function to call
  amount?: number; // Amount to send with call
  kda?: string; // Token ID to send
  vmType?: number; // VM type for deploys
  initParams?: any[]; // Init params for deploys
  code?: string; // Contract code for deploys
}
```

## 🧪 Testing Checklist

Before deploying to production:

### 1. Contract Deployment
- [ ] Contract builds successfully
- [ ] Contract deploys to testnet
- [ ] Initial liquidity added
- [ ] Contract address saved

### 2. Frontend Updates
- [ ] Contract address updated in config
- [ ] Swap execution uses smart contract
- [ ] Reserves fetch from contract
- [ ] Calculations match contract logic

### 3. Functionality Tests
- [ ] DGKO → USDT swap works
- [ ] USDT → DGKO swap works
- [ ] Reserves update after swap
- [ ] Transaction history saves
- [ ] Error handling works
- [ ] Loading states display correctly

### 4. Edge Cases
- [ ] Handle contract not deployed
- [ ] Handle insufficient liquidity
- [ ] Handle swap exceeding 50% limit
- [ ] Handle wallet disconnection
- [ ] Handle transaction rejection

## 🔄 Migration Steps

### Step 1: Deploy Contract
```bash
cd contract
klever-sc-meta all build
# Deploy to testnet first
# Save contract address
```

### Step 2: Add Initial Liquidity
```bash
# Add 100k DGKO and 40 USDT
klever-cli contract call \
  --contract YOUR_CONTRACT \
  --function addLiquidity \
  --transfers "DGKO-CXVJ:1000000000000,USDT:40000000"
```

### Step 3: Update Frontend
```bash
# Update contract address
# Update swap execution logic
# Add contract data hooks
# Test thoroughly
```

### Step 4: Test on Testnet
```bash
npm run dev
# Test all swap scenarios
# Verify reserves update
# Check transaction history
```

### Step 5: Deploy to Mainnet
```bash
# Deploy contract to mainnet
# Add real liquidity
# Update frontend config
# Deploy frontend
```

## 🐛 Common Issues

### "Contract not found"
- Verify contract address is correct
- Check you're on correct network (testnet vs mainnet)
- Ensure contract was deployed successfully

### "Function not found"
- Verify function name matches contract (case-sensitive)
- Check contract ABI is up to date
- Ensure contract built successfully

### Reserves not updating
- Check web.query() is working
- Verify response parsing
- Check decimal precision (DGKO=4, USDT=6)

### Transaction fails
- Check user has enough tokens
- Verify amount doesn't exceed 50% limit
- Ensure sufficient gas

## 📚 Next Steps

1. **Deploy contract to testnet**
2. **Update frontend hooks**
3. **Test swap functionality**
4. **Add contract address to config**
5. **Deploy to mainnet**
6. **Update documentation**

## 🔗 Resources

- Contract README: `contract/README.md`
- Klever SC Docs: https://docs.klever.finance
- Frontend Integration: See updated hooks above
