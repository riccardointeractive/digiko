import { SwapTransaction } from '../types/swap.types';
import { formatSwapAmount } from '@/utils/swapCalculations';

interface TransactionHistoryTableProps {
  history: SwapTransaction[];
  onClearHistory: () => void;
}

/**
 * TransactionHistoryTable Component
 * Displays transaction history in a table format
 */
export function TransactionHistoryTable({ history, onClearHistory }: TransactionHistoryTableProps) {
  if (history.length === 0) return null;

  return (
    <div className="glass rounded-2xl border border-white/10 p-6 mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium text-white">Transaction History</h2>
        <button
          onClick={onClearHistory}
          className="text-sm text-red-400 hover:text-red-300 transition-colors"
        >
          Clear History
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-sm text-gray-400 font-normal pb-3">Time</th>
              <th className="text-left text-sm text-gray-400 font-normal pb-3">Type</th>
              <th className="text-right text-sm text-gray-400 font-normal pb-3">Input</th>
              <th className="text-right text-sm text-gray-400 font-normal pb-3">Output</th>
              <th className="text-right text-sm text-gray-400 font-normal pb-3">Rate</th>
              <th className="text-center text-sm text-gray-400 font-normal pb-3">Status</th>
              <th className="text-center text-sm text-gray-400 font-normal pb-3">TX</th>
            </tr>
          </thead>
          <tbody>
            {history.map((tx) => (
              <tr key={tx.id} className="border-b border-white/5">
                <td className="py-4 text-sm text-gray-400">
                  {new Date(tx.timestamp).toLocaleString()}
                </td>
                <td className="py-4">
                  <span className="text-sm text-white">
                    {tx.inputToken} → {tx.outputToken}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <span className="font-mono text-white text-sm">
                    {formatSwapAmount(tx.inputAmount)} {tx.inputToken}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <span className="font-mono text-white text-sm">
                    {formatSwapAmount(tx.outputAmount)} {tx.outputToken}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <span className="font-mono text-gray-400 text-sm">
                    {tx.exchangeRate.toFixed(6)}
                  </span>
                </td>
                <td className="py-4 text-center">
                  <span className={`text-xs px-2 py-1 rounded ${
                    tx.status === 'success' 
                      ? 'bg-green-500/10 text-green-400'
                      : tx.status === 'failed'
                      ? 'bg-red-500/10 text-red-400'
                      : 'bg-yellow-500/10 text-yellow-400'
                  }`}>
                    {tx.status}
                  </span>
                </td>
                <td className="py-4 text-center">
                  {tx.txHash && (
                    <a
                      href={`https://kleverscan.org/transaction/${tx.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-digiko-primary hover:text-digiko-accent transition-colors text-sm"
                    >
                      View
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
