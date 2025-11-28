import { TokenImage, TOKEN_IDS } from '@/components/TokenImage';

/**
 * DGKOHeader Component
 * Page title with token logo and description
 */
export function DGKOHeader() {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-3">
        <TokenImage assetId={TOKEN_IDS.DGKO} size="xl" />
        <h1 className="text-5xl font-medium text-white">DGKO Token</h1>
      </div>
      <p className="text-xl text-gray-400">
        The native utility token powering the Digiko ecosystem on Klever Blockchain
      </p>
    </div>
  );
}
