import { TokenImage, TOKEN_IDS } from '@/components/TokenImage';

/**
 * DGKOHeader Component
 * Page title with token logo and description
 */
export function DGKOHeader() {
  return (
    <div className="mb-8 md:mb-10 lg:mb-12">
      <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
        <TokenImage assetId={TOKEN_IDS.DGKO} size="xl" />
        <h1 className="text-responsive-h1 text-white">DGKO Token</h1>
      </div>
      <p className="text-responsive-xl text-gray-400">
        The native utility token powering the Digiko ecosystem on Klever Blockchain
      </p>
    </div>
  );
}
