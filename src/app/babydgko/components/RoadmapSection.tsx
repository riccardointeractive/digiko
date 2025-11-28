import { roadmap, Icons } from '../config/babydgko.config';

/**
 * RoadmapSection Component
 * Vertical timeline of roadmap items with status indicators
 */
export function RoadmapSection() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-medium text-white mb-6">BABYDGKO Roadmap</h2>
      <div className="glass rounded-2xl border border-white/10 p-8">
        <div className="relative space-y-6">
          {roadmap.map((item, index) => (
            <div key={item.title} className="relative">
              {/* Timeline connector line */}
              {index < roadmap.length - 1 && (
                <div className="absolute left-[19px] top-12 bottom-[-24px] w-px bg-gradient-to-b from-white/20 via-white/10 to-white/5" />
              )}
              
              {/* Timeline item card */}
              <div className={`relative rounded-xl border backdrop-blur-xl transition-all duration-500 ${
                item.status === 'live'
                  ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/30 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]'
                  : 'bg-gradient-to-br from-white/[0.03] to-white/[0.01] border-white/10 hover:border-digiko-primary/30 hover:shadow-[0_0_30px_rgba(0,102,255,0.1)]'
              } hover:scale-[1.01]`}>
                <div className="p-5 flex items-start gap-4">
                  {/* Status indicator icon */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                    item.status === 'live'
                      ? 'bg-gradient-to-br from-green-500 to-emerald-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                      : 'bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20'
                  }`}>
                    {item.status === 'live' ? (
                      <span className="text-white">{Icons.check}</span>
                    ) : (
                      <span className="w-3 h-3 rounded-full border-2 border-white/40" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h3 className={`text-lg font-medium transition-colors ${
                        item.status === 'live' ? 'text-green-400' : 'text-white'
                      }`}>
                        {item.title}
                      </h3>
                      
                      {/* Status badge */}
                      <div className={`flex-shrink-0 px-3 py-1.5 rounded-lg font-semibold text-xs tracking-wide backdrop-blur-xl border transition-all ${
                        item.status === 'live'
                          ? 'bg-green-500/15 border-green-500/30 text-green-400'
                          : 'bg-digiko-accent/10 border-digiko-accent/30 text-digiko-accent'
                      }`}>
                        {item.status === 'live' ? 'Live' : 'Coming Soon'}
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-400 mb-2">
                      {item.description}
                    </p>
                    
                    {/* Quarter info */}
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-gray-400 font-mono">{item.quarter}</span>
                    </div>
                  </div>
                </div>

                {/* Shimmer effect on live items */}
                {item.status === 'live' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 animate-shimmer rounded-xl pointer-events-none" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
