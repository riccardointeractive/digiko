import { EcosystemCard } from './EcosystemCard';
import { Icons } from '../config/dgko.config';

/**
 * EcosystemGrid Component
 * Grid display of all ecosystem features
 */
export function EcosystemGrid() {
  const ecosystemFeatures = [
    { icon: Icons.staking, title: 'Staking', description: 'Earn rewards by staking DGKO', status: 'live' as const, href: '/staking' },
    { icon: Icons.swap, title: 'Swap', description: 'Instant token swaps', status: 'coming' as const, href: '/swap' },
    { icon: Icons.nft, title: 'NFTs', description: 'Digital collectibles', status: 'coming' as const, href: '/nfts' },
    { icon: Icons.games, title: 'Games', description: 'Play-to-earn gaming', status: 'coming' as const, href: '/games' },
  ];

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-medium text-white mb-6">Ecosystem</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ecosystemFeatures.map((feature) => (
          <EcosystemCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            status={feature.status}
            href={feature.href}
          />
        ))}
      </div>
    </div>
  );
}
