import { DonutChart } from './DonutChart';
import { tokenomics } from '../config/dgko.config';

/**
 * TokenomicsSection Component
 * Complete tokenomics display with donut chart and distribution breakdown
 */
export function TokenomicsSection() {
  return (
    <div className="glass rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden mb-8 md:mb-10 lg:mb-12">
      <div className="p-4 md:p-5 lg:p-6 border-b border-white/10">
        <h2 className="text-responsive-h3 text-white">Tokenomics</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-6 md:p-8 lg:p-12 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10">
          <DonutChart />
        </div>
        
        <div className="p-4 md:p-6 lg:p-8">
          <div className="space-y-2 md:space-y-3">
            {tokenomics.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-responsive-base text-gray-300">{item.label}</span>
                </div>
                <span className="text-responsive-h5 font-mono text-white">{item.percent}%</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 md:mt-5 lg:mt-6 pt-4 md:pt-5 lg:pt-6 border-t border-white/10 grid grid-cols-2 gap-3 md:gap-4">
            <div>
              <div className="text-responsive-sm text-gray-500 mb-1">Decimals</div>
              <div className="text-responsive-base font-mono text-white">4</div>
            </div>
            <div>
              <div className="text-responsive-sm text-gray-500 mb-1">Vesting</div>
              <div className="text-responsive-base font-mono text-white">24 months</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
