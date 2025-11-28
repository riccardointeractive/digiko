'use client';

import { useKlever } from '@/context/KleverContext';

// Hooks
import { useTokenStats } from './hooks/useTokenStats';

// Components
import { DGKOHeader } from './components/DGKOHeader';
import { StakingOverviewCard } from './components/StakingOverviewCard';
import { TokenActivityCards } from './components/TokenActivityCards';
import { TokenomicsSection } from './components/TokenomicsSection';
import { OnChainDataGrid } from './components/OnChainDataGrid';
import { EcosystemGrid } from './components/EcosystemGrid';
import { RoadmapSection } from './components/RoadmapSection';
import { TokenDetailsAndTradeSection } from './components/TokenDetailsAndTradeSection';
import { CommunitySection } from './components/CommunitySection';
import { CTASection } from './components/CTASection';

/**
 * DGKO Token Page - Modular Architecture
 * 
 * This page displays comprehensive information about the DGKO token:
 * - Live staking statistics
 * - Token activity (burned/minted)
 * - Tokenomics with donut chart
 * - On-chain data
 * - Ecosystem features
 * - Roadmap
 * - Token details and exchanges
 * - Community links
 * - Call-to-action
 * 
 * All business logic is in hooks, all UI is in components.
 */
export default function DGKOPage() {
  const { network } = useKlever();
  const { stats, loading } = useTokenStats(network);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        
        {/* Page Header */}
        <DGKOHeader />

        {/* Live Staking Stats */}
        <StakingOverviewCard stats={stats} loading={loading} />

        {/* Token Activity (Burned/Minted) */}
        <TokenActivityCards stats={stats} loading={loading} />

        {/* Tokenomics with Donut Chart */}
        <TokenomicsSection />

        {/* On-Chain Data */}
        <OnChainDataGrid stats={stats} loading={loading} />

        {/* Ecosystem Features */}
        <EcosystemGrid />

        {/* Roadmap */}
        <RoadmapSection />

        {/* Token Details + Where to Trade */}
        <TokenDetailsAndTradeSection />

        {/* Community / Social */}
        <CommunitySection />

        {/* CTA */}
        <CTASection />

      </div>
    </div>
  );
}
