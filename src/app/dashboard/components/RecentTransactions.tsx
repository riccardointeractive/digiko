'use client';

import { useTransactionHistory } from '../hooks/useTransactionHistory';

/**
 * Recent Transactions Component
 * Displays last 10 transactions with type, amount, and status
 */
export function RecentTransactions() {
  const { transactions, loading, error } = useTransactionHistory(10);

  if (loading) {
    return (
      <div className="glass rounded-3xl p-6 lg:p-8 border border-white/5">
        <div className="animate-pulse">
          <div className="h-6 bg-white/10 rounded w-40 mb-6"></div>
          {[1, 2, 3].map(i => (
            <div key={i} className="mb-4">
              <div className="h-16 bg-white/10 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass rounded-3xl p-6 lg:p-8 border border-white/5">
        <h3 className="text-2xl font-medium text-white mb-4">Recent Activity</h3>
        <div className="text-red-500 text-sm">{error}</div>
      </div>
    );
  }

  // Helper to get transaction type icon and color
  const getTypeStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case 'send':
        return { icon: '↑', color: 'text-blue-500', bg: 'bg-blue-500/10' };
      case 'receive':
        return { icon: '↓', color: 'text-cyan-500', bg: 'bg-cyan-500/10' };
      case 'stake':
        return { icon: '🔒', color: 'text-green-500', bg: 'bg-green-500/10' };
      case 'unstake':
        return { icon: '🔓', color: 'text-orange-500', bg: 'bg-orange-500/10' };
      case 'claim':
        return { icon: '💰', color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
      default:
        return { icon: '•', color: 'text-gray-500', bg: 'bg-gray-500/10' };
    }
  };

  // Helper to format timestamp
  const formatTime = (timestamp: number) => {
    const now = Date.now() / 1000;
    const diff = now - timestamp;

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  // Helper to format address (show first 6 and last 4 characters)
  const formatAddress = (addr: string) => {
    if (addr.length < 12) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="glass rounded-3xl p-6 lg:p-8 border border-white/5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-medium text-white">Recent Activity</h3>
        {transactions.length > 0 && (
          <a
            href={`https://kleverscan.org/address/${transactions[0].from}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-digiko-primary hover:text-digiko-accent transition-colors"
          >
            View all →
          </a>
        )}
      </div>

      {/* Transaction List */}
      {transactions.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">No transactions yet</div>
          <div className="text-sm text-gray-500">Your transaction history will appear here</div>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx) => {
            const typeStyle = getTypeStyle(tx.type);
            
            return (
              <a
                key={tx.hash}
                href={`https://kleverscan.org/transaction/${tx.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-digiko-primary/40 transition-all duration-200 group"
              >
                {/* Type Icon */}
                <div className={`w-10 h-10 rounded-full ${typeStyle.bg} flex items-center justify-center text-xl`}>
                  <span className={typeStyle.color}>{typeStyle.icon}</span>
                </div>

                {/* Transaction Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-semibold ${typeStyle.color}`}>
                      {tx.type}
                    </span>
                    {tx.status === 'confirmed' && (
                      <span className="text-xs px-2 py-0.5 rounded bg-green-500/10 text-green-500">
                        ✓
                      </span>
                    )}
                    {tx.status === 'pending' && (
                      <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-500">
                        Pending
                      </span>
                    )}
                    {tx.status === 'failed' && (
                      <span className="text-xs px-2 py-0.5 rounded bg-red-500/10 text-red-500">
                        Failed
                      </span>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-400 font-mono truncate">
                    {tx.to ? (tx.type.toLowerCase() === 'send' ? `To ${formatAddress(tx.to)}` : `From ${formatAddress(tx.from)}`) : 'Contract interaction'}
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-1">
                    {formatTime(tx.timestamp)}
                  </div>
                </div>

                {/* Amount */}
                {tx.amount !== '0' && (
                  <div className="text-right">
                    <div className="font-mono font-semibold text-white">
                      {parseFloat(tx.amount).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {tx.assetId.split('-')[0]}
                    </div>
                  </div>
                )}

                {/* External link icon */}
                <div className="text-gray-400 group-hover:text-digiko-primary transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-white/5">
        <div className="text-xs text-gray-500">
          Updated every 60 seconds • Powered by Klever blockchain
        </div>
      </div>
    </div>
  );
}
