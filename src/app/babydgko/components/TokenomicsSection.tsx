import { DonutChart } from './DonutChart';
import { tokenomics } from '../config/babydgko.config';

/**
 * TokenomicsSection Component
 * Displays tokenomics with donut chart and legend
 */
export function TokenomicsSection() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-medium text-white mb-6">Tokenomics</h2>
      <div className="glass rounded-2xl border border-white/10 p-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Donut Chart */}
          <div className="flex-shrink-0">
            <DonutChart />
          </div>
          
          {/* Legend */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tokenomics.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1">
                    <div className="text-white font-medium">{item.label}</div>
                    <div className="text-sm text-gray-400">{item.percent}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
