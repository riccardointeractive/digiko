import { Icons } from '../config/swap.config';

/**
 * HowItWorksSection Component
 * Displays informational cards about how the swap works
 */
export function HowItWorksSection() {
  return (
    <div className="glass rounded-2xl border border-white/10 p-6">
      <h2 className="text-xl font-medium text-white mb-4">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="w-10 h-10 rounded-xl bg-digiko-primary/10 flex items-center justify-center mb-3">
            {Icons.instant}
          </div>
          <h3 className="text-white font-medium mb-2">Instant Swaps</h3>
          <p className="text-sm text-gray-400">
            Exchange tokens instantly using automated market maker (AMM) technology
          </p>
        </div>
        <div>
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mb-3">
            {Icons.secure}
          </div>
          <h3 className="text-white font-medium mb-2">Secure</h3>
          <p className="text-sm text-gray-400">
            Your tokens are safe with slippage protection and transparent pricing
          </p>
        </div>
        <div>
          <div className="w-10 h-10 rounded-xl bg-digiko-accent/10 flex items-center justify-center mb-3">
            {Icons.fairPrice}
          </div>
          <h3 className="text-white font-medium mb-2">Fair Pricing</h3>
          <p className="text-sm text-gray-400">
            Prices based on real liquidity with minimal fees
          </p>
        </div>
      </div>
    </div>
  );
}
