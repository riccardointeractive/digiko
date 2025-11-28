import { useState, useEffect } from 'react';
import { SwapTransaction } from '../types/swap.types';
import { getSwapHistory, clearSwapHistory, getSwapStats } from '@/utils/swapStorage';

/**
 * useSwapHistory Hook
 * Manages transaction history and statistics
 */
export function useSwapHistory() {
  const [history, setHistory] = useState<SwapTransaction[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  
  // Load history on mount
  useEffect(() => {
    setHistory(getSwapHistory());
  }, []);
  
  // Refresh history
  const refreshHistory = () => {
    setHistory(getSwapHistory());
  };
  
  // Clear history
  const handleClearHistory = () => {
    if (confirm('Clear all transaction history?')) {
      clearSwapHistory();
      setHistory([]);
    }
  };
  
  // Toggle history visibility
  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };
  
  // Get statistics
  const stats = getSwapStats();
  
  return {
    history,
    showHistory,
    stats,
    refreshHistory,
    handleClearHistory,
    toggleHistory,
  };
}
