import { useState, useEffect, useCallback } from 'react';
import { useKlever } from '@/context/KleverContext';
import { formatKLV } from '@/utils/constants';
import { DEV_MODE, TOKEN_IDS, TOKEN_PRECISIONS, getStakingStats } from '../config/staking.config';
import { TokenSymbol, UnstakingItem, ClaimableRewards, MockBalances } from '../types/staking.types';

/**
 * Custom hook for fetching and managing staking data
 */
export function useStakingData(selectedToken: TokenSymbol, totalStakedDGKO: string, totalStakedBABYDGKO: string) {
  const { address, isConnected } = useKlever();
  
  const [availableBalance, setAvailableBalance] = useState('0');
  const [stakedBalance, setStakedBalance] = useState('0');
  const [unstakingQueue, setUnstakingQueue] = useState<UnstakingItem[]>([]);
  const [claimableRewards, setClaimableRewards] = useState<ClaimableRewards>({ amount: 0, formatted: '0' });
  const [buckets, setBuckets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock balances for development
  const [mockBalances, setMockBalances] = useState<MockBalances>({
    DGKO: { available: '10000', staked: '5000' },
    BABYDGKO: { available: '50000', staked: '25000' }
  });

  const currentStats = getStakingStats(selectedToken, totalStakedDGKO, totalStakedBABYDGKO);

  // Debug: Log whenever unstakingQueue changes
  useEffect(() => {
    console.log('🔄 unstakingQueue state changed:', unstakingQueue);
    console.log('🔄 Queue length:', unstakingQueue.length);
  }, [unstakingQueue]);

  const fetchBalances = useCallback(async () => {
    const callId = Math.random().toString(36).substring(7);
    console.log(`🚀 [${callId}] fetchBalances STARTED`);
    console.log(`🔍 [${callId}] address:`, address);
    console.log(`🔍 [${callId}] selectedToken:`, selectedToken);
    console.log(`🔍 [${callId}] DEV_MODE:`, DEV_MODE);

    if (!address) {
      console.log(`⏹️ [${callId}] No address, skipping`);
      return;
    }

    setIsLoading(true);

    try {
      // 🧪 DEV MODE: Use mock balances
      if (DEV_MODE) {
        console.log(`🧪 [${callId}] DEV MODE: Using mock balances`);
        setAvailableBalance(mockBalances[selectedToken].available);
        setStakedBalance(mockBalances[selectedToken].staked);
        
        // Mock claimable rewards
        setClaimableRewards({
          amount: 70634000, // 70.634 DGKO in smallest units (precision 4)
          formatted: '70.6340'
        });
        
        // Mock unstaking queue with sample data using SECONDS (Klever format)
        const nowInSeconds = Math.floor(Date.now() / 1000);
        console.log('🕐 Current time (seconds):', nowInSeconds);
        
        const mockQueue: UnstakingItem[] = [
          {
            amount: 1000000000, // 1000 DGKO in smallest units
            unlockTime: nowInSeconds + (3 * 24 * 60 * 60) // 3 days from now in SECONDS
          }
        ];
        setUnstakingQueue(mockQueue);
        setIsLoading(false);
        return;
      }

      // 🚀 PRODUCTION MODE: Real API call
      console.log(`🌐 [${callId}] Fetching account info from Klever API...`);
      const response = await fetch(`https://api.mainnet.klever.org/v1.0/address/${address}`);
      
      if (!response.ok) {
        console.error(`❌ [${callId}] API error: ${response.status}`);
        throw new Error(`API returned ${response.status}`);
      }

      const accountInfo = await response.json();
      console.log(`📦 [${callId}] Account info received:`, accountInfo);

      // Check if assets exist and is an array
      if (!accountInfo?.data?.account?.assets || typeof accountInfo.data.account.assets !== 'object') {
        console.error(`❌ [${callId}] Assets not found or invalid format`);
        throw new Error('Invalid account data received');
      }

      // ⚠️ CRITICAL: Klever API returns assets as an OBJECT, not an array!
      // Convert the assets object to an array
      const assetsObject = accountInfo.data.account.assets;
      const assetsArray = Object.keys(assetsObject).map(key => ({
        assetId: key,
        ...assetsObject[key]
      }));
      console.log(`🔍 [${callId}] Converted assets to array:`, assetsArray.length, 'assets');

      // Use the correct mainnet token ID
      const tokenId = TOKEN_IDS[selectedToken];
      console.log(`🔍 [${callId}] Looking for token:`, tokenId);

      // Find the selected token in the wallet
      const tokenAsset = assetsArray.find((asset: any) => asset.assetId === tokenId);

      if (tokenAsset) {
        console.log(`✅ [${callId}] Found token ${tokenId}:`, tokenAsset);
        
        // Get precision for this token
        const precision = TOKEN_PRECISIONS[selectedToken];
        console.log(`🔢 [${callId}] Using precision: ${precision} decimals`);
        
        // Log raw API data to understand what we're getting
        console.log(`📊 [${callId}] Raw balance:`, tokenAsset.balance);
        console.log(`📊 [${callId}] Raw frozenBalance:`, tokenAsset.frozenBalance);
        console.log(`📊 [${callId}] Raw unfrozenBalance:`, tokenAsset.unfrozenBalance);
        console.log(`📊 [${callId}] Raw buckets:`, tokenAsset.buckets);
        console.log(`📊 [${callId}] Raw lastClaim:`, tokenAsset.lastClaim);
        
        // Parse available balance using correct precision
        const availableBalanceFormatted = formatKLV(tokenAsset.balance || 0, precision);
        
        // ✅ FIXED: Use frozenBalance directly for staked amount
        // frozenBalance contains the total staked amount
        const stakedBalanceFormatted = formatKLV(tokenAsset.frozenBalance || 0, precision);
        
        console.log(`💰 [${callId}] Available: ${availableBalanceFormatted} ${selectedToken}`);
        console.log(`🔒 [${callId}] Staked (frozen): ${stakedBalanceFormatted} ${selectedToken}`);
        
        setAvailableBalance(availableBalanceFormatted);
        setStakedBalance(stakedBalanceFormatted);
        
        // ✨ Calculate claimable rewards
        // CRITICAL DISCOVERY: Klever API doesn't return unclaimed rewards in the account response!
        // Rewards are calculated on-chain when you claim based on:
        // - Staked amount
        // - Time since last claim
        // - APY rate
        // We need to ESTIMATE rewards based on this information
        
        let totalClaimableRewards = 0;
        
        console.log('🎁 Checking for claimable rewards...');
        console.log('📦 Full tokenAsset structure:', JSON.stringify(tokenAsset, null, 2));
        
        // Check buckets (store them but they don't have claimable field)
        if (tokenAsset.buckets && Array.isArray(tokenAsset.buckets)) {
          console.log('🪣 Found buckets:', tokenAsset.buckets.length);
          setBuckets(tokenAsset.buckets);
          
          // Log bucket structure for debugging
          if (tokenAsset.buckets.length > 0) {
            console.log('🪣 Sample bucket structure:', Object.keys(tokenAsset.buckets[0]));
            console.log('🪣 Bucket 0 full details:', JSON.stringify(tokenAsset.buckets[0], null, 2));
          }
        } else {
          console.log('⚠️ No buckets array found');
          setBuckets([]);
        }
        
        // ⭐ CALCULATE ESTIMATED REWARDS
        // Since API doesn't provide unclaimed rewards, we calculate an estimate
        if (tokenAsset.lastClaim && tokenAsset.frozenBalance > 0) {
          const lastClaimEpoch = tokenAsset.lastClaim.epoch;
          const lastClaimTimestamp = tokenAsset.lastClaim.timestamp;
          
          // Get current time and calculate elapsed epochs
          const nowInSeconds = Math.floor(Date.now() / 1000);
          const secondsSinceLastClaim = nowInSeconds - lastClaimTimestamp;
          const epochsSinceLastClaim = Math.floor(secondsSinceLastClaim / (6 * 60 * 60)); // 1 epoch = 6 hours
          
          console.log('⏰ Last claim:', {
            epoch: lastClaimEpoch,
            timestamp: lastClaimTimestamp,
            date: new Date(lastClaimTimestamp * 1000).toLocaleString()
          });
          console.log('⏰ Time since last claim:', {
            seconds: secondsSinceLastClaim,
            hours: (secondsSinceLastClaim / 3600).toFixed(2),
            epochs: epochsSinceLastClaim
          });
          
          // Calculate rewards even for partial epochs
          // The blockchain accumulates rewards continuously, not just at epoch boundaries
          if (secondsSinceLastClaim > 0) {
            // Calculate estimated rewards based on APY
            // Formula: (stakedAmount * APY * timeInYears)
            const apy = currentStats.apy / 100; // Convert percentage to decimal
            const stakedAmount = tokenAsset.frozenBalance / Math.pow(10, precision); // Convert to human-readable
            const yearInSeconds = 365 * 24 * 60 * 60;
            const timeInYears = secondsSinceLastClaim / yearInSeconds;
            
            const estimatedRewards = stakedAmount * apy * timeInYears;
            const estimatedRewardsRaw = Math.floor(estimatedRewards * Math.pow(10, precision));
            
            console.log('💰 Rewards calculation:', {
              stakedAmount: stakedAmount,
              apy: `${currentStats.apy}%`,
              secondsSinceLastClaim: secondsSinceLastClaim,
              timeInYears: timeInYears.toFixed(8),
              estimatedRewards: estimatedRewards.toFixed(precision),
              estimatedRewardsRaw: estimatedRewardsRaw
            });
            
            totalClaimableRewards = estimatedRewardsRaw;
            console.log('🎁 ✅ ESTIMATED REWARDS:', estimatedRewards.toFixed(precision), selectedToken);
            
            // Important note about blockchain explorer discrepancy
            if (epochsSinceLastClaim < 1) {
              console.log('⚠️ Note: Less than 1 epoch since last claim.');
              console.log('   If blockchain shows higher rewards, they may be from before last claim.');
            }
          } else {
            console.log('⏰ No time elapsed since last claim');
          }
        } else {
          console.log('⚠️ No lastClaim data or no frozen balance');
        }
        
        console.log('📋 Available asset fields:', Object.keys(tokenAsset));
        
        const formattedClaimable = formatKLV(totalClaimableRewards, precision);
        console.log('🎁 Total claimable rewards (ESTIMATED):', formattedClaimable, '(raw:', totalClaimableRewards, ')');
        console.log('💡 Note: This is an estimate. Actual amount will be shown after claiming.');
        setClaimableRewards({
          amount: totalClaimableRewards,
          formatted: formattedClaimable
        });

        // Parse unstaking queue (unfrozenBalance)
        // ⚠️ unfrozenBalance can be either a number (total) or an array (items)
        console.log('🔍 unfrozenBalance type:', typeof tokenAsset.unfrozenBalance);
        console.log('🔍 unfrozenBalance value:', tokenAsset.unfrozenBalance);
        
        if (tokenAsset.unfrozenBalance && Array.isArray(tokenAsset.unfrozenBalance)) {
          console.log('📦 Unstaking queue (array):', tokenAsset.unfrozenBalance);
          setUnstakingQueue(tokenAsset.unfrozenBalance);
        } else if (tokenAsset.unfrozenBalance && typeof tokenAsset.unfrozenBalance === 'number' && tokenAsset.unfrozenBalance > 0) {
          // If unfrozenBalance is a number, check buckets for unfrozen items
          console.log('📦 Unstaking queue is a number:', tokenAsset.unfrozenBalance);
          
          // Check if buckets have unfrozen information
          const unfrozenItems: UnstakingItem[] = [];
          if (tokenAsset.buckets && Array.isArray(tokenAsset.buckets)) {
            tokenAsset.buckets.forEach((bucket: any, index: number) => {
              console.log(`🔍 Checking bucket ${index} for unfrozen data:`, bucket);
              
              // Check various possible fields for unfrozen data
              if (bucket.unstakedAmount || bucket.withdrawAvailable || bucket.unfrozenBalance) {
                console.log(`📦 Bucket ${index} has unfrozen data!`, {
                  unstakedAmount: bucket.unstakedAmount,
                  withdrawAvailable: bucket.withdrawAvailable,
                  unfrozenBalance: bucket.unfrozenBalance,
                  unlockTime: bucket.unlockTime
                });
              }
            });
          }
          
          // If we found unfrozen items, set them; otherwise create a single item from the total
          if (unfrozenItems.length > 0) {
            setUnstakingQueue(unfrozenItems);
            console.log('✅ Unstaking queue set from bucket items:', unfrozenItems.length);
          } else {
            // Create a single unstaking item from the total unfrozenBalance
            // Assume instant withdrawal (unlockTime = 0 means ready now)
            const nowInSeconds = Math.floor(Date.now() / 1000);
            const queueItem = {
              amount: tokenAsset.unfrozenBalance,
              unlockTime: nowInSeconds - 1 // Set to past so it shows as "Ready"
            };
            setUnstakingQueue([queueItem]);
            console.log('📦 Created single unstaking item from total:', {
              amount: tokenAsset.unfrozenBalance,
              formatted: formatKLV(tokenAsset.unfrozenBalance, precision)
            });
            console.log('✅ Unstaking queue set with 1 item - should now display in UI!');
            console.log('🔍 Queue item details:', queueItem);
            console.log('🔍 Current unstakingQueue state after set:', [queueItem]);
          }
        } else {
          console.log('⚠️ No unfrozenBalance found, queue set to empty');
          setUnstakingQueue([]);
        }
      } else {
        console.log(`⚠️ Token ${tokenId} not found in wallet assets`);
        console.log('💡 Available assets:', assetsArray.map((a: any) => a.assetId).join(', '));
        setAvailableBalance('0');
        setStakedBalance('0');
        setUnstakingQueue([]);
        setClaimableRewards({ amount: 0, formatted: '0' });
        setBuckets([]);
      }
    } catch (error) {
      console.error(`❌ [${callId}] Error fetching balances:`, error);
      // Don't show error modal for balance fetch failures - just reset state
    } finally {
      setIsLoading(false);
      console.log(`🏁 [${callId}] fetchBalances COMPLETED`);
    }
  }, [address, selectedToken, currentStats.apy]);

  useEffect(() => {
    console.log('🔍 useEffect triggered - isConnected:', isConnected, ', address:', address);
    if (isConnected && address) {
      console.log('✅ Calling fetchBalances with address:', address);
      fetchBalances();
    } else {
      console.log('⏳ Waiting for address... isConnected:', isConnected, ', address:', address);
    }
  }, [isConnected, address, selectedToken, fetchBalances]);

  return {
    availableBalance,
    stakedBalance,
    unstakingQueue,
    claimableRewards,
    buckets,
    isLoading,
    setIsLoading,
    mockBalances,
    setMockBalances,
    setAvailableBalance,
    setStakedBalance,
    setUnstakingQueue,
    setClaimableRewards,
    fetchBalances,
  };
}
