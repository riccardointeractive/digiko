import Link from 'next/link';

interface EcosystemCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: 'live' | 'coming';
  href: string | null;
}

/**
 * EcosystemCard Component
 * Individual card for ecosystem features with live/coming status
 */
export function EcosystemCard({ icon, title, description, status, href }: EcosystemCardProps) {
  const isLive = status === 'live';
  
  const CardContent = () => (
    <div className={`glass rounded-2xl border border-white/10 p-6 h-full transition-all duration-300 ${
      isLive ? 'hover:border-digiko-primary/50 cursor-pointer' : 'opacity-60'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-digiko-primary/10 flex items-center justify-center text-digiko-primary">
          {icon}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          isLive ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'
        }`}>
          {isLive ? 'Live' : 'Coming Soon'}
        </span>
      </div>
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );

  if (isLive && href) {
    return (
      <Link href={href}>
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
}
