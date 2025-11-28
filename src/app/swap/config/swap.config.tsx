import { TOKEN_IDS } from '@/components/TokenImage';

/**
 * Swap Configuration
 * All constants, asset IDs, addresses, and configuration for the swap page
 */

// Smart Contract Configuration
export const DEX_CONTRACT_ADDRESS = 'klv1qqqqqqqqqqqqqpgq2jqc28xwmk82mng4kwpm3j9vkq3vyga8xw9qq85y6h';
export const DEX_CONTRACT_FUNCTIONS = {
  SWAP_DGKO_TO_KLV: 'swapDgkoToKlv',
  SWAP_KLV_TO_DGKO: 'swapKlvToDgko',
  GET_DGKO_RESERVE: 'getDgkoReserve',
  GET_KLV_RESERVE: 'getKlvReserve',
  GET_PRICE: 'getPrice',
  CALCULATE_OUTPUT: 'calculateOutput',
} as const;

// Asset IDs for Klever blockchain
// IMPORTANT: Use exact asset IDs, not symbols!
export const ASSET_IDS = {
  DGKO: TOKEN_IDS.DGKO, // 'DGKO-CXVJ'
  KLV: TOKEN_IDS.KLV, // 'KLV'
};

// Initial Liquidity (from contract deployment)
export const INITIAL_DGKO_RESERVE = 100000; // 100k DGKO
export const INITIAL_KLV_RESERVE = 20000; // 20k KLV
export const SLIPPAGE_TOLERANCE = 0.05; // 5%

// Token Precision
export const DGKO_PRECISION = 10000; // 4 decimals
export const KLV_PRECISION = 1000000; // 6 decimals

// Gas for contract calls
export const CONTRACT_CALL_GAS = 30 * 1000000; // 30 KLV with 6 decimals

// SVG Icons for swap page
export const Icons = {
  flip: (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
    </svg>
  ),
  swap: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  instant: (
    <svg className="w-5 h-5 text-digiko-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  secure: (
    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  fairPrice: (
    <svg className="w-5 h-5 text-digiko-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
};
