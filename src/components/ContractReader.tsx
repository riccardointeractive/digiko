'use client';

import React, { useState, useEffect } from 'react';
import { kleverService } from '@/utils/klever';
import { CONTRACT_ADDRESS } from '@/utils/constants';
import { useKlever } from '@/context/KleverContext';

export const ContractReader: React.FC = () => {
  const { isConnected } = useKlever();
  const [counter, setCounter] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const readCounter = async () => {
    setIsLoading(true);
    setError('');

    try {
      const result = await kleverService.queryContract(CONTRACT_ADDRESS, 'getCounter', []);
      
      if (result && result.returnData && result.returnData.length > 0) {
        // Decode base64 result to number
        const base64Data = result.returnData[0];
        const decoded = Buffer.from(base64Data, 'base64').toString('hex');
        const counterValue = parseInt(decoded, 16);
        setCounter(counterValue);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to read contract');
      console.error('Contract read error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
      readCounter();
    }
  }, [isConnected]);

  if (!isConnected) {
    return (
      <div className="bg-klever-gray p-6 rounded-xl text-center">
        <p className="text-gray-400">Connect wallet to read contract via Digiko</p>
      </div>
    );
  }

  return (
    <div className="bg-klever-gray p-6 rounded-xl shadow-lg border border-digiko-primary/20">
      <h3 className="text-xl font-bold text-white mb-4">Counter Value</h3>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">Current Counter</p>
          <p className="text-white text-4xl font-bold">
            {counter !== null ? counter : '---'}
          </p>
        </div>
        <button
          onClick={readCounter}
          disabled={isLoading}
          className="bg-digiko-primary hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50"
        >
          {isLoading ? 'Reading...' : 'Refresh'}
        </button>
      </div>
    </div>
  );
};