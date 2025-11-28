import Link from 'next/link';

/**
 * HelpFooter Component
 * Footer section with helpful links
 */
export function HelpFooter() {
  return (
    <div className="mt-20 p-6 glass rounded-2xl border border-white/10">
      <h3 className="text-white font-medium mb-4">Need More Help?</h3>
      <div className="flex flex-wrap gap-4">
        <Link 
          href="/updates" 
          className="text-sm text-digiko-primary hover:text-digiko-accent transition-colors"
        >
          View Updates →
        </Link>
        <a 
          href="https://klever.io" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-digiko-primary hover:text-digiko-accent transition-colors"
        >
          Klever Blockchain →
        </a>
        <a 
          href="https://docs.klever.org" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-digiko-primary hover:text-digiko-accent transition-colors"
        >
          Klever Docs →
        </a>
      </div>
    </div>
  );
}
