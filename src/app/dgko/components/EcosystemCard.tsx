import Link from 'next/link';
import { IconBox } from '@/components/IconBox';

/**
 * EcosystemCard Component
 * Individual ecosystem feature card (live or coming soon)
 */

interface EcosystemCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: 'live' | 'coming';
  href: string | null;
}

export function EcosystemCard({ icon, title, description, status, href }: EcosystemCardProps) {
  const isLive = status === 'live';
  const cardContent = (
    <>
      <div className="flex items-center justify-between mb-4">
        <IconBox icon={icon} size="sm" />
        {isLive ? (
          <span className="px-2 py-1 text-xs font-medium bg-green-500/10 text-green-400 rounded-full">
            Live
          </span>
        ) : (
          <span className="px-2 py-1 text-xs font-medium bg-white/5 text-gray-500 rounded-full">
            Soon
          </span>
        )}
      </div>
      <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      <div className={`text-sm ${isLive ? 'text-digiko-primary' : 'text-gray-600'}`}>
        {isLive ? 'Open →' : 'Coming soon'}
      </div>
    </>
  );

  const baseClasses = `glass rounded-2xl p-6 border transition-all duration-300 block ${
    isLive 
      ? 'border-green-500/20 hover:border-green-500/40 hover:scale-[1.02] cursor-pointer' 
      : 'border-white/10 opacity-70 cursor-not-allowed'
  }`;

  if (href && isLive) {
    return (
      <Link href={href} className={baseClasses}>
        {cardContent}
      </Link>
    );
  }

  return (
    <div className={baseClasses}>
      {cardContent}
    </div>
  );
}
