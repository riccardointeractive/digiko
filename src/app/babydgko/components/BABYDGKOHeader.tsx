import { TokenImage, TOKEN_IDS } from '@/components/TokenImage';
import { Icons } from '../config/babydgko.config';

/**
 * BABYDGKOHeader Component
 * Page header with token image, title, and sparkles icon
 */
export function BABYDGKOHeader() {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-3">
        <TokenImage assetId={TOKEN_IDS.BABYDGKO} size="xl" />
        <h1 className="text-5xl font-medium text-white flex items-center gap-3">
          BABYDGKO
          <span className="text-purple-400">
            {Icons.sparkles}
          </span>
        </h1>
      </div>
      <p className="text-xl text-gray-400">
        The fun side of the Digiko ecosystem
      </p>
    </div>
  );
}
