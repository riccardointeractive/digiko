'use client';

import Link from 'next/link';
import { useTokenBalances } from '../hooks/useTokenBalances';
import { TokenImage } from '@/components/TokenImage';
import { APP_CONFIG } from '@/config/app';

/**
 * All Token Balances Component
 * Displays complete list of tokens held in wallet with balances
 * - Real token images from Klever API
 * - Filters out zero balances
 * - Links to token pages where available
 */
export function AllTokenBalances() {
  const { tokens, loading, error } = useTokenBalances();

  // Determine network from app config (lowercase for TokenImage)
  const network = APP_CONFIG.network.toLowerCase() as 'mainnet' | 'testnet';

  if (loading) {
    return (
      <div className="glass rounded-3xl p-8 border border-white/10">
        <div className="animate-pulse">
          <div className="h-6 bg-white/10 rounded w-40 mb-6"></div>
          {[1, 2, 3].map(i => (
            <div key={i} className="mb-4">
              <div className="h-12 bg-white/10 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass rounded-3xl p-8 border border-white/10">
        <h3 className="text-2xl font-medium text-white mb-4">Token Balances</h3>
        <div className="text-red-500 text-sm">{error}</div>
      </div>
    );
  }

  // Helper function to get token display name
  const getTokenName = (assetId: string) => {
    if (assetId === 'KLV') return 'Klever';
    if (assetId === 'DGKO-CXVJ') return 'DGKO';
    if (assetId === 'BABYDGKO-3S67') return 'BABYDGKO';
    if (assetId === 'USDT-ODW7') return 'USDT';
    return assetId.split('-')[0]; // Return first part before dash
  };

  // Helper function to get token link
  const getTokenLink = (assetId: string) => {
    if (assetId === 'DGKO-CXVJ') return '/dgko';
    if (assetId === 'BABYDGKO-3S67') return '/babydgko';
    return null;
  };

  // Filter out zero balances
  const nonZeroTokens = tokens.filter(t => parseFloat(t.balanceFormatted) > 0);

  return (
    <div className="glass rounded-3xl p-8 border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-medium text-white">Token Balances</h3>
        <span className="text-sm text-gray-400">
          {nonZeroTokens.length} {nonZeroTokens.length === 1 ? 'token' : 'tokens'}
        </span>
      </div>

      {/* Token List */}
      {nonZeroTokens.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">No tokens found</div>
          <div className="text-sm text-gray-500">Your wallet is empty</div>
        </div>
      ) : (
        <div className="space-y-3">
          {nonZeroTokens.map((token) => {
            const tokenName = getTokenName(token.assetId);
            const tokenLink = getTokenLink(token.assetId);
            
            const TokenContent = (
              <>
                {/* Token Icon & Name */}
                <div className="flex items-center gap-3 flex-1">
                  {/* Real token image from Klever API */}
                  <TokenImage 
                    assetId={token.assetId} 
                    size="md"
                    network={network}
                  />
                  <div>
                    <div className="font-medium text-white">{tokenName}</div>
                    <div className="text-xs text-gray-500 font-mono">{token.assetId}</div>
                  </div>
                </div>

                {/* Balance */}
                <div className="text-right">
                  <div className="font-mono text-white">
                    {parseFloat(token.balanceFormatted).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">{tokenName}</div>
                </div>

                {/* Arrow if link */}
                {tokenLink && (
                  <div className="text-digiko-primary">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </>
            );

            return tokenLink ? (
              <Link
                key={token.assetId}
                href={tokenLink}
                className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-digiko-primary/40 transition-all duration-200 group"
              >
                {TokenContent}
              </Link>
            ) : (
              <div
                key={token.assetId}
                className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/5"
              >
                {TokenContent}
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Note */}
      <div className="mt-6 pt-4 border-t border-white/5">
        <div className="text-xs text-gray-500">
          Automatically synced from Klever blockchain • {network.charAt(0).toUpperCase() + network.slice(1)}
        </div>
      </div>
    </div>
  );
}
