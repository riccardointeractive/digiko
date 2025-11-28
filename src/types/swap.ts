export type SwapDirection = 'DGKO_TO_KLV' | 'KLV_TO_DGKO';

export interface SwapPair {
  token0: {
    symbol: string;
    assetId: string;
    address: string;
    precision: number; // 10000 for DGKO (4 decimals)
    reserve: number;
  };
  token1: {
    symbol: string;
    assetId: string;
    address: string;
    precision: number; // 1000000 for KLV (6 decimals)
    reserve: number;
  };
}

export interface SwapQuote {
  inputAmount: number;
  outputAmount: number;
  priceImpact: number;
  minimumReceived: number;
  exchangeRate: number;
  fees: {
    blockchain: number; // Gas fee in KLV
    platform: number; // No platform fee for contract swaps
    total: number; // Total fees
  };
}

export interface SwapTransaction {
  id: string;
  timestamp: number;
  direction: SwapDirection;
  inputToken: string;
  outputToken: string;
  inputAmount: number;
  outputAmount: number;
  exchangeRate: number;
  fees: number;
  txHash: string;
  status: 'pending' | 'success' | 'failed';
}

export interface LiquidityPool {
  pairName: string;
  token0Reserve: number;
  token1Reserve: number;
  totalLiquidity: number;
  lastUpdate: number;
}

export interface SwapStats {
  totalSwaps: number;
  successfulSwaps: number;
  failedSwaps: number;
  totalVolumeDGKO: number;
  totalVolumeUSDT: number;
}

export interface SwapFees {
  blockchain: number;
  platform: number;
  total: number;
}
