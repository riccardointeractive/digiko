import { SwapQuote } from '../types/swap.types';
import { getSwapDirectionInfo, formatSwapAmount, getPriceImpactColor } from '@/utils/swapCalculations';
import { SLIPPAGE_TOLERANCE } from '../config/swap.config';
import { Icons } from '../config/swap.config';
import { NumberInput } from '@/components/NumberInput';

interface SwapInterfaceProps {
  direction: any;
  inputAmount: string;
  outputAmount: string;
  quote: SwapQuote | null;
  swapError: string;
  isSwapping: boolean;
  currentPrice: number;
  totalVolume: number;
  onInputChange: (value: string) => void;
  onFlipDirection: () => void;
  onSwap: () => void;
}

/**
 * SwapInterface Component
 * Main swap card with token inputs, outputs, quote details, and swap button
 */
export function SwapInterface({
  direction,
  inputAmount,
  outputAmount,
  quote,
  swapError,
  isSwapping,
  currentPrice,
  totalVolume,
  onInputChange,
  onFlipDirection,
  onSwap,
}: SwapInterfaceProps) {
  const directionInfo = getSwapDirectionInfo(direction);

  return (
    <div className="glass rounded-2xl p-8 border border-white/10">
      {/* Current Price */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
        <div>
          <div className="text-sm text-gray-400 mb-1">Current Price</div>
          <div className="text-2xl font-mono text-white">
            1 DGKO = {currentPrice.toFixed(6)} KLV
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400 mb-1">24h Volume</div>
          <div className="text-lg font-mono text-white">
            {formatSwapAmount(totalVolume)} DGKO
          </div>
        </div>
      </div>

      {/* Input Token */}
      <div className="mb-4">
        <label className="text-sm text-gray-400 mb-2 block">You Pay</label>
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <input
              type="number"
              value={inputAmount}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="0.00"
              className="bg-transparent text-2xl font-mono text-white outline-none w-full
                       /* Hide number input spinners */
                       [appearance:textfield] 
                       [&::-webkit-outer-spin-button]:appearance-none 
                       [&::-webkit-inner-spin-button]:appearance-none"
              disabled={isSwapping}
            />
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-digiko-primary flex items-center justify-center text-xs font-medium">
                {directionInfo.inputSymbol === 'DGKO' ? '💎' : '💵'}
              </div>
              <span className="font-medium text-white">{directionInfo.inputSymbol}</span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Balance: —
          </div>
        </div>
      </div>

      {/* Flip Button */}
      <div className="flex justify-center -my-2 relative z-10">
        <button
          onClick={onFlipDirection}
          disabled={isSwapping}
          className="w-10 h-10 rounded-xl bg-digiko-primary hover:bg-digiko-secondary transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
        >
          {Icons.flip}
        </button>
      </div>

      {/* Output Token */}
      <div className="mb-6">
        <label className="text-sm text-gray-400 mb-2 block">You Receive</label>
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <input
              type="text"
              value={outputAmount}
              readOnly
              placeholder="0.00"
              className="bg-transparent text-2xl font-mono text-white outline-none w-full"
            />
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-digiko-accent flex items-center justify-center text-xs font-medium">
                {directionInfo.outputSymbol === 'DGKO' ? '💎' : '💵'}
              </div>
              <span className="font-medium text-white">{directionInfo.outputSymbol}</span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Balance: —
          </div>
        </div>
      </div>

      {/* Quote Details */}
      {quote && (
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-6 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Exchange Rate</span>
            <span className="font-mono text-white">
              1 {directionInfo.inputSymbol} = {quote.exchangeRate.toFixed(6)} {directionInfo.outputSymbol}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Price Impact</span>
            <span className={`font-mono ${getPriceImpactColor(quote.priceImpact)}`}>
              {quote.priceImpact.toFixed(2)}%
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Minimum Received</span>
            <span className="font-mono text-white">
              {formatSwapAmount(quote.minimumReceived)} {directionInfo.outputSymbol}
            </span>
          </div>
          <div className="border-t border-white/10 pt-3 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Blockchain Fee</span>
              <span className="font-mono text-white">{quote.fees.blockchain} KLV</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Platform Fee</span>
              <span className="font-mono text-white">{quote.fees.platform} KLV</span>
            </div>
            <div className="flex items-center justify-between text-sm font-medium">
              <span className="text-white">Total Fees</span>
              <span className="font-mono text-digiko-primary">{quote.fees.total} KLV</span>
            </div>
          </div>
        </div>
      )}

      {/* Swap Button */}
      <button
        onClick={onSwap}
        disabled={isSwapping || !quote || !!swapError || !inputAmount}
        className="w-full group relative px-10 py-5 bg-digiko-primary text-white font-medium rounded-2xl transition-all duration-500 shadow-[0_0_40px_rgba(0,102,255,0.3)] hover:shadow-[0_0_60px_rgba(0,102,255,0.5)] hover:scale-105 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isSwapping ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Swapping...
            </>
          ) : (
            <>
              {Icons.swap}
              Swap Tokens
            </>
          )}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-digiko-accent/0 via-digiko-accent/30 to-digiko-accent/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
      </button>

      {/* Slippage Info */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Slippage tolerance: {(SLIPPAGE_TOLERANCE * 100).toFixed(0)}% • Minimum received protected
        </p>
      </div>
    </div>
  );
}
