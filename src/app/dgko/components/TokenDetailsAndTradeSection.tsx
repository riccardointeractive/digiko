import { tokenDetails, exchanges } from '../config/dgko.config';
import { ExchangeList } from '@/components/ExchangeList';

/**
 * TokenDetailsAndTradeSection Component
 * Two-column layout: Token details and where to trade
 */
export function TokenDetailsAndTradeSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
      {/* Token Details */}
      <div className="glass rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-medium text-white">Token Details</h3>
        </div>
        <div className="divide-y divide-white/5">
          {tokenDetails.map((item) => (
            <div key={item.label} className="flex justify-between items-center px-6 py-4">
              <span className="text-gray-400">{item.label}</span>
              <span className={`text-white ${item.mono ? 'font-mono text-sm' : ''}`}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Where to Trade - Using reusable ExchangeList */}
      <ExchangeList exchanges={exchanges} title="Where to Trade" />
    </div>
  );
}
