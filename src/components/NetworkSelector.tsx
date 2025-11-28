'use client';

import React from 'react';
import { useKlever } from '@/context/KleverContext';
import { Network } from '@/types/klever';

export const NetworkSelector: React.FC = () => {
  const { network, switchNetwork } = useKlever();

  return (
    <div className="flex items-center gap-2 bg-klever-gray px-4 py-2 rounded-lg">
      <span className="text-gray-400 text-sm">Network:</span>
      <select
        value={network}
        onChange={(e) => switchNetwork(e.target.value as Network)}
        className="bg-transparent text-white font-semibold outline-none cursor-pointer"
      >
        <option value="mainnet">Mainnet</option>
        <option value="testnet">Testnet</option>
      </select>
      <div className={`w-2 h-2 rounded-full ${network === 'mainnet' ? 'bg-green-500' : 'bg-yellow-500'}`} />
    </div>
  );
};