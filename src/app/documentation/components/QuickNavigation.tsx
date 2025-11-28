import { DocSection } from '../types/documentation.types';

/**
 * QuickNavigation Component
 * Table of contents navigation for documentation sections
 */

interface QuickNavigationProps {
  sections: DocSection[];
}

export function QuickNavigation({ sections }: QuickNavigationProps) {
  return (
    <div className="mb-12 p-6 glass rounded-2xl border border-white/10">
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
        Quick Navigation
      </h3>
      <div className="flex flex-wrap gap-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            {section.title}
          </a>
        ))}
      </div>
    </div>
  );
}
