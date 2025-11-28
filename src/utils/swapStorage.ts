import { SwapTransaction } from '@/types/swap';

const STORAGE_KEY = 'digiko_swap_history';
const MAX_HISTORY_ITEMS = 100;

/**
 * Save swap transaction to local storage
 */
export function saveSwapTransaction(transaction: SwapTransaction): void {
  try {
    const history = getSwapHistory();
    
    // Add new transaction at the beginning
    history.unshift(transaction);
    
    // Keep only last MAX_HISTORY_ITEMS
    const trimmedHistory = history.slice(0, MAX_HISTORY_ITEMS);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error('Error saving swap transaction:', error);
  }
}

/**
 * Get all swap transactions from local storage
 */
export function getSwapHistory(): SwapTransaction[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const history = JSON.parse(stored);
    return Array.isArray(history) ? history : [];
  } catch (error) {
    console.error('Error loading swap history:', error);
    return [];
  }
}

/**
 * Update transaction status
 */
export function updateSwapTransactionStatus(
  txId: string,
  status: 'pending' | 'success' | 'failed',
  txHash?: string
): void {
  try {
    const history = getSwapHistory();
    const index = history.findIndex(tx => tx.id === txId);
    
    if (index !== -1) {
      history[index].status = status;
      if (txHash) {
        history[index].txHash = txHash;
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
  } catch (error) {
    console.error('Error updating transaction status:', error);
  }
}

/**
 * Clear all swap history
 */
export function clearSwapHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing swap history:', error);
  }
}

/**
 * Get swap statistics
 */
export function getSwapStats(): {
  totalSwaps: number;
  successfulSwaps: number;
  failedSwaps: number;
  totalVolumeDGKO: number;
  totalVolumeUSDT: number;
} {
  try {
    const history = getSwapHistory();
    
    const stats = {
      totalSwaps: history.length,
      successfulSwaps: history.filter(tx => tx.status === 'success').length,
      failedSwaps: history.filter(tx => tx.status === 'failed').length,
      totalVolumeDGKO: 0,
      totalVolumeUSDT: 0,
    };
    
    history.forEach(tx => {
      if (tx.status === 'success') {
        if (tx.inputToken === 'DGKO') {
          stats.totalVolumeDGKO += tx.inputAmount;
        } else {
          stats.totalVolumeUSDT += tx.inputAmount;
        }
        
        if (tx.outputToken === 'DGKO') {
          stats.totalVolumeDGKO += tx.outputAmount;
        } else {
          stats.totalVolumeUSDT += tx.outputAmount;
        }
      }
    });
    
    return stats;
  } catch (error) {
    console.error('Error calculating swap stats:', error);
    return {
      totalSwaps: 0,
      successfulSwaps: 0,
      failedSwaps: 0,
      totalVolumeDGKO: 0,
      totalVolumeUSDT: 0,
    };
  }
}

/**
 * Generate unique transaction ID
 */
export function generateSwapId(): string {
  return `swap_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
