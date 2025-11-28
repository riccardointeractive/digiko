import { useState, useEffect } from 'react';
import { SwapDirection, SwapQuote } from '../types/swap.types';
import { INITIAL_DGKO_RESERVE, INITIAL_KLV_RESERVE, SLIPPAGE_TOLERANCE } from '../config/swap.config';
import { calculateSwapOutput, validateSwap, getDGKOPrice } from '@/utils/swapCalculations';

/**
 * useSwapState Hook
 * Manages swap direction, amounts, quotes, and liquidity reserves
 */
export function useSwapState() {
  const [direction, setDirection] = useState<SwapDirection>('DGKO_TO_KLV');
  const [inputAmount, setInputAmount] = useState<string>('');
  const [outputAmount, setOutputAmount] = useState<string>('');
  const [quote, setQuote] = useState<SwapQuote | null>(null);
  const [swapError, setSwapError] = useState<string>('');
  
  // Liquidity reserves (can be updated with real contract data)
  const [dgkoReserve, setDgkoReserve] = useState(INITIAL_DGKO_RESERVE);
  const [klvReserve, setKlvReserve] = useState(INITIAL_KLV_RESERVE);
  
  // Calculate output when input changes
  useEffect(() => {
    if (!inputAmount || parseFloat(inputAmount) <= 0) {
      setOutputAmount('');
      setQuote(null);
      setSwapError('');
      return;
    }
    
    try {
      const input = parseFloat(inputAmount);
      
      // Determine reserves based on direction
      const inputReserve = direction === 'DGKO_TO_KLV' ? dgkoReserve : klvReserve;
      const outputReserve = direction === 'DGKO_TO_KLV' ? klvReserve : dgkoReserve;
      
      // Validate swap
      const validation = validateSwap(input, outputReserve, SLIPPAGE_TOLERANCE);
      if (!validation.valid) {
        setSwapError(validation.error || 'Invalid swap');
        setQuote(null);
        setOutputAmount('');
        return;
      }
      
      // Calculate quote
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
  }, [inputAmount, direction, dgkoReserve, klvReserve]);
  
  // Flip swap direction
  const handleFlipDirection = () => {
    setDirection(direction === 'DGKO_TO_KLV' ? 'KLV_TO_DGKO' : 'DGKO_TO_KLV');
    setInputAmount('');
    setOutputAmount('');
    setQuote(null);
    setSwapError('');
  };
  
  // Reset form
  const resetSwapForm = () => {
    setInputAmount('');
    setOutputAmount('');
    setQuote(null);
    setSwapError('');
  };
  
  // Update reserves after successful swap
  const updateReserves = (inputAmt: number, outputAmt: number) => {
    if (direction === 'DGKO_TO_KLV') {
      setDgkoReserve(prev => prev + inputAmt);
      setKlvReserve(prev => prev - outputAmt);
    } else {
      setKlvReserve(prev => prev + inputAmt);
      setDgkoReserve(prev => prev - outputAmt);
    }
  };
  
  // Get current price
  const currentPrice = getDGKOPrice(dgkoReserve, klvReserve);
  
  return {
    // State
    direction,
    inputAmount,
    outputAmount,
    quote,
    swapError,
    dgkoReserve,
    klvReserve,
    currentPrice,
    
    // Actions
    setInputAmount,
    handleFlipDirection,
    resetSwapForm,
    updateReserves,
  };
}
