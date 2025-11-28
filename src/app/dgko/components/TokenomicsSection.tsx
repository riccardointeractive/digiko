import { DonutChart } from './DonutChart';
import { tokenomics } from '../config/dgko.config';

/**
 * TokenomicsSection Component
 * Complete tokenomics display with donut chart and distribution breakdown
 */
export function TokenomicsSection() {
  return (
    <div className="glass rounded-3xl border border-white/10 overflow-hidden mb-12">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-medium text-white">Tokenomics</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-8 md:p-12 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10">
          <DonutChart />
        </div>
        
        <div className="p-6 md:p-8">
          <div className="space-y-3">
            {tokenomics.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-300">{item.label}</span>
                </div>
                <span className="text-xl font-mono text-white">{item.percent}%</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">Decimals</div>
              <div className="font-mono text-white">4</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Vesting</div>
              <div className="font-mono text-white">24 months</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
