'use client';

import React, { useState } from 'react';
import { kleverService } from '@/utils/klever';
import { CONTRACT_ADDRESS } from '@/utils/constants';
import { useKlever } from '@/context/KleverContext';

export const ContractWriter: React.FC = () => {
  const { isConnected, address } = useKlever();
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');

  const increment = async () => {
    if (!address) return;

    setIsLoading(true);
    setError('');
    setTxHash('');

    try {
      const result = await kleverService.callContract(
        CONTRACT_ADDRESS,
        'increment',
        [],
        address
      );

      if (result.success) {
        setTxHash(result.hash);
      } else {
        setError(result.error || 'Transaction failed');
      }
    } catch (err: any) {
      setError(err.message || 'Transaction failed');
    } finally {
      setIsLoading(false);
    }
  };

  const decrement = async () => {
    if (!address) return;

    setIsLoading(true);
    setError('');
    setTxHash('');

    try {
      const result = await kleverService.callContract(
        CONTRACT_ADDRESS,
        'decrement',
        [],
        address
      );

      if (result.success) {
        setTxHash(result.hash);
      } else {
        setError(result.error || 'Transaction failed');
      }
    } catch (err: any) {
      setError(err.message || 'Transaction failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-klever-gray p-6 rounded-xl text-center">
        <p className="text-gray-400">Connect wallet to interact with contract via Digiko</p>
      </div>
    );
  }

  return (
    <div className="bg-klever-gray p-6 rounded-xl shadow-lg border border-digiko-accent/20">
      <h3 className="text-xl font-bold text-white mb-4">Modify Counter</h3>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {txHash && (
        <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg mb-4">
          <p className="font-semibold mb-1">✓ Transaction Sent!</p>
          <p className="text-sm break-all">Hash: {txHash}</p>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={increment}
          disabled={isLoading}
          className="flex-1 bg-digiko-accent hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Increment (+1)'}
        </button>
        <button
          onClick={decrement}
          disabled={isLoading}
          className="flex-1 bg-digiko-secondary hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Decrement (-1)'}
        </button>
      </div>
    </div>
  );
};