'use client';

import { ConnectWalletPrompt } from '@/components/ConnectWalletPrompt';
import { useKlever } from '@/context/KleverContext';
import { AccountInfoCard } from './components/AccountInfoCard';
import { QuickGuideSection } from './components/QuickGuideSection';
import { PortfolioOverview } from './components/PortfolioOverview';
import { AllTokenBalances } from './components/AllTokenBalances';

export default function Dashboard() {
  const { isConnected } = useKlever();

  if (!isConnected) {
    return <ConnectWalletPrompt />;
  }

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-12">
      <div className="mb-8">
        <PortfolioOverview />
      </div>
      {/* Performance Chart - Hidden, working on it next week */}
      {/* <div className="mb-8">
        <PerformanceChart />
      </div> */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <AllTokenBalances />
        <AccountInfoCard />
      </div>
      {/* Send Crypto - Hidden, working on it next week */}
      {/* <div className="mb-8">
        <SendForm />
      </div> */}
      {/* Recent Activity - Hidden, working on it next week */}
      {/* <div className="mb-8">
        <RecentTransactions />
      </div> */}
      <QuickGuideSection />
    </div>
  );
}
