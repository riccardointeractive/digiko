import { EcosystemCard } from './EcosystemCard';
import { EcosystemFeature } from '../types/babydgko.types';
import { Icons } from '../config/babydgko.config';

/**
 * EcosystemGrid Component
 * Grid of ecosystem features with their current status
 */
export function EcosystemGrid() {
  const ecosystemFeatures: EcosystemFeature[] = [
    {
      icon: Icons.gift,
      title: 'ITO Gift',
      description: 'Free BABYDGKO tokens distributed to DGKO ITO participants',
      status: 'live',
      href: null,
    },
    {
      icon: Icons.staking,
      title: 'Staking',
      description: 'Stake BABYDGKO to earn rewards with attractive APR',
      status: 'live',
      href: '/staking',
    },
    {
      icon: Icons.community,
      title: 'Community Events',
      description: 'Participate in fun community activities and earn tokens',
      status: 'coming',
      href: null,
    },
    {
      icon: Icons.trophy,
      title: 'Meme Contests',
      description: 'Create memes, win prizes, and spread the BABYDGKO love',
      status: 'coming',
      href: null,
    },
  ];

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-medium text-white mb-6">Community Features</h2>
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
