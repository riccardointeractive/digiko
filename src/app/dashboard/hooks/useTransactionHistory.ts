import { useState, useEffect, useCallback } from 'react';
import { useKlever } from '@/context/KleverContext';
import { Transaction } from '../types/dashboard.types';
import { APP_CONFIG } from '@/config/app';

/**
 * Custom hook to fetch recent transactions for connected wallet
 * Returns last 10 transactions with formatted data
 * Manual refresh only - no auto-refresh
 */
export function useTransactionHistory(limit: number = 10) {
  const { address, isConnected } = useKlever();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    if (!isConnected || !address) {
      setTransactions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Use network from APP_CONFIG (Testnet or Mainnet)
      const network = APP_CONFIG.network.toLowerCase();
      const baseUrl = `https://api.${network}.klever.org`;
      const apiUrl = `${baseUrl}/v1.0/transaction/list/${address}?limit=${limit}`;

      console.log('🔍 Fetching transactions from:', apiUrl);
      const response = await fetch(apiUrl);
      
      console.log('📡 Transaction API response status:', response.status);
      
      // 404 means no transactions yet - this is normal for new/inactive wallets
      if (response.status === 404) {
        console.log('ℹ️  No transactions found (404) - wallet may be new or inactive');
        setTransactions([]);
        setLoading(false);
        return;
      }
      
      if (!response.ok) {
        throw new Error(`Failed to fetch transactions: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('📦 Transaction API full response:', data);
      
      const txList = data.data?.transactions || [];
      console.log('📋 Transaction list length:', txList.length);
      console.log('📋 First transaction (if any):', txList[0]);

      // Map to Transaction format
      const formattedTxs: Transaction[] = txList.map((tx: any) => {
        // Determine transaction type
        let type = 'Unknown';
        let amount = '0';
        let assetId = 'KLV';
        let to = tx.toAddress || '';

        if (tx.contract && tx.contract.length > 0) {
          const contract = tx.contract[0];
          
          // Map contract types
          switch (contract.type) {
            case 0: // Transfer
              type = tx.sender === address ? 'Send' : 'Receive';
              amount = contract.parameter?.amount || '0';
              assetId = contract.parameter?.assetId || 'KLV';
              to = contract.parameter?.toAddress || '';
              break;
            case 6: // Delegate (Stake)
              type = 'Stake';
              amount = contract.parameter?.bucketID || '0';
              assetId = contract.parameter?.assetId || 'KLV';
              break;
            case 7: // Undelegate (Unstake)
              type = 'Unstake';
              amount = contract.parameter?.bucketID || '0';
              assetId = contract.parameter?.assetId || 'KLV';
              break;
            case 9: // Claim
              type = 'Claim';
              assetId = contract.parameter?.assetId || 'KLV';
              break;
            default:
              type = `Type ${contract.type}`;
          }
        }

        return {
          hash: tx.hash || '',
          type,
          from: tx.sender || '',
          to,
          amount: amount.toString(),
          assetId,
          timestamp: tx.timestamp || Date.now() / 1000,
          status: tx.status === 'success' ? 'confirmed' : 
                 tx.status === 'pending' ? 'pending' : 'failed',
          fee: tx.kdaFee || '0',
        };
      });

      console.log('✅ Formatted transactions count:', formattedTxs.length);
      setTransactions(formattedTxs);
    } catch (err: any) {
      console.error('❌ Error fetching transactions:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [address, isConnected, limit]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, loading, error, refetch: fetchTransactions };
}
