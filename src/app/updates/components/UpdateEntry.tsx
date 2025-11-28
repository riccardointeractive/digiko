import { UpdateEntry as UpdateEntryType, TypeStyles } from '../types/updates.types';

/**
 * UpdateEntry Component
 * Displays a single update entry with timeline styling
 */

interface UpdateEntryProps {
  update: UpdateEntryType;
  typeStyles: TypeStyles;
}

export function UpdateEntry({ update, typeStyles }: UpdateEntryProps) {
  const style = typeStyles[update.type];
  
  return (
    <div className="relative pl-8">
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-digiko-dark-300 border-2 border-digiko-primary" />
      
      {/* Content card */}
      <div className="glass rounded-2xl p-6 border border-white/10">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="font-mono text-lg text-white">
            v{update.version}
          </span>
          <span className={`px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase rounded ${style.bg} ${style.border} border ${style.text}`}>
            {style.label}
          </span>
          <span className="text-sm text-gray-500">
            {update.date}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-medium text-white mb-4">
          {update.title}
        </h2>

        {/* Changes list */}
        <ul className="space-y-2">
          {update.changes.map((change, changeIndex) => (
            <li key={changeIndex} className="flex items-start gap-3 text-sm text-gray-400">
              <svg 
                className="w-4 h-4 text-digiko-primary mt-0.5 flex-shrink-0" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
              <span>{change}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
