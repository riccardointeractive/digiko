import { formatSwapAmount } from '@/utils/swapCalculations';

interface PoolLiquidityCardProps {
  dgkoReserve: number;
  klvReserve: number;
}

/**
 * PoolLiquidityCard Component
 * Displays current liquidity pool reserves for DGKO/KLV pair
 */
export function PoolLiquidityCard({ dgkoReserve, klvReserve }: PoolLiquidityCardProps) {
  // Calculate approximate USD value (KLV price ~$0.002)
  const klvPrice = 0.002;
  const totalLiquidityUSD = (klvReserve * 2) * klvPrice;
  
  return (
    <div className="glass rounded-2xl p-6 border border-white/10">
      <h3 className="text-lg font-medium text-white mb-4">Pool Liquidity</h3>
      <div className="space-y-3">
        <div>
          <div className="text-sm text-gray-400 mb-1">DGKO Reserve</div>
          <div className="text-xl font-mono text-white">
            {formatSwapAmount(dgkoReserve, 0)}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-400 mb-1">KLV Reserve</div>
          <div className="text-xl font-mono text-white">
            {formatSwapAmount(klvReserve, 2)}
          </div>
        </div>
        <div className="pt-3 border-t border-white/10">
          <div className="text-sm text-gray-400 mb-1">Total Liquidity</div>
          <div className="text-xl font-mono text-digiko-accent">
            ${formatSwapAmount(totalLiquidityUSD, 2)}
          </div>
        </div>
      </div>
    </div>
  );
}
