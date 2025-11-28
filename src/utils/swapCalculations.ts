import { SwapPair, SwapQuote, SwapDirection } from '@/types/swap';

/**
 * Calculate output amount using constant product formula (x * y = k)
 * Output = (Input × Output_Reserve) / (Input_Reserve + Input)
 */
export function calculateSwapOutput(
  inputAmount: number,
  inputReserve: number,
  outputReserve: number,
  slippageTolerance: number = 0.05 // 5% default
): SwapQuote {
  // Validate inputs
  if (inputAmount <= 0 || inputReserve <= 0 || outputReserve <= 0) {
    throw new Error('Invalid input amounts or reserves');
  }

  // Calculate output using constant product formula
  const outputAmount = (inputAmount * outputReserve) / (inputReserve + inputAmount);

  // Check if output would exceed 50% of liquidity
  const maxOutputAmount = outputReserve * 0.5;
  if (outputAmount > maxOutputAmount) {
    throw new Error('Swap amount exceeds maximum allowed (50% of liquidity)');
  }

  // Calculate price impact
  const initialPrice = outputReserve / inputReserve;
  const newReserveInput = inputReserve + inputAmount;
  const newReserveOutput = outputReserve - outputAmount;
  const finalPrice = newReserveOutput / newReserveInput;
  const priceImpact = Math.abs((finalPrice - initialPrice) / initialPrice) * 100;

  // Calculate minimum received with slippage protection
  const minimumReceived = outputAmount * (1 - slippageTolerance);

  // Calculate exchange rate (how much output per 1 input)
  const exchangeRate = outputAmount / inputAmount;

  // Fee structure (only gas for smart contract call)
  const fees = {
    blockchain: 30, // KLV gas for contract call
    platform: 0, // No platform fee
    total: 30, // KLV
  };

  return {
    inputAmount,
    outputAmount,
    priceImpact,
    minimumReceived,
    exchangeRate,
    fees,
  };
}

/**
 * Get current price of DGKO in KLV
 */
export function getDGKOPrice(dgkoReserve: number, klvReserve: number): number {
  if (dgkoReserve <= 0) return 0;
  return klvReserve / dgkoReserve;
}

/**
 * Get current price of KLV in DGKO
 */
export function getKLVPrice(dgkoReserve: number, klvReserve: number): number {
  if (klvReserve <= 0) return 0;
  return dgkoReserve / klvReserve;
}

/**
 * Validate if swap is possible with current liquidity
 */
export function validateSwap(
  inputAmount: number,
  outputReserve: number,
  slippageTolerance: number = 0.05
): { valid: boolean; error?: string } {
  if (inputAmount <= 0) {
    return { valid: false, error: 'Input amount must be greater than 0' };
  }

  if (outputReserve <= 0) {
    return { valid: false, error: 'Insufficient liquidity' };
  }

  return { valid: true };
}

/**
 * Format number for display
 */
export function formatSwapAmount(amount: number, decimals: number = 4): string {
  // Handle invalid numbers
  if (!amount || isNaN(amount) || !isFinite(amount)) {
    return '0.00';
  }
  
  // Ensure decimals is within valid range (0-20)
  const safeDecimals = Math.min(Math.max(Math.floor(decimals), 0), 20);
  
  // minimumFractionDigits cannot exceed maximumFractionDigits
  const minDecimals = Math.min(2, safeDecimals);
  
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: safeDecimals,
  });
}

/**
 * Calculate price impact color
 */
export function getPriceImpactColor(priceImpact: number): string {
  if (priceImpact < 1) return 'text-green-400';
  if (priceImpact < 3) return 'text-yellow-400';
  if (priceImpact < 5) return 'text-orange-400';
  return 'text-red-400';
}

/**
 * Get swap direction details
 */
export function getSwapDirectionInfo(direction: SwapDirection) {
  if (direction === 'DGKO_TO_KLV') {
    return {
      inputToken: 'DGKO',
      outputToken: 'KLV',
      inputSymbol: 'DGKO',
      outputSymbol: 'KLV',
    };
  }
  return {
    inputToken: 'KLV',
    outputToken: 'DGKO',
    inputSymbol: 'KLV',
    outputSymbol: 'DGKO',
  };
}
