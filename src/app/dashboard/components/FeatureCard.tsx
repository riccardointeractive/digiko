import Link from 'next/link';
import { IconBox } from '@/components/IconBox';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant: 'blue' | 'cyan';
  href?: string;
}

/**
 * FeatureCard Component
 * Reusable card for features, guides, and documentation links
 */
export function FeatureCard({ icon, title, description, variant, href }: FeatureCardProps) {
  const content = (
    <>
      <IconBox icon={icon} size="sm" variant={variant} />
      <div className="flex-1">
        <h3 className="text-base font-medium text-white mb-1">
          {title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
      {href && (
        <svg className="w-5 h-5 text-gray-600 group-hover:text-digiko-primary transition-colors duration-200 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </>
  );

  if (href) {
    return (
      <Link 
        href={href}
        className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-digiko-primary/30 transition-all duration-300 cursor-pointer"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
      {content}
    </div>
  );
}
