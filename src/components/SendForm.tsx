'use client';

import React, { useState } from 'react';
import { useKlever } from '@/context/KleverContext';
import { TokenSelector, Token } from './TokenSelector';
import { parseKLV } from '@/utils/constants';

const SEND_TOKENS: Token[] = [
  { id: 'klv', symbol: 'KLV', name: 'Klever', assetId: 'KLV' },
  { id: 'dgko', symbol: 'DGKO', name: 'Digiko', assetId: 'DGKO-CXVJ' },
  { id: 'babydgko', symbol: 'BABYDGKO', name: 'Baby Digiko', assetId: 'BABYDGKO-3S67' },
];

export const SendForm: React.FC = () => {
  const { isConnected, sendKLV } = useKlever();
  const [selectedToken, setSelectedToken] = useState('KLV');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setTxHash('');

    if (!recipient || !amount) {
      setError('Please fill in all fields');
      return;
    }

    if (!recipient.startsWith('klv1')) {
      setError('Invalid Klever address. Must start with klv1');
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Invalid amount');
      return;
    }

    // Currently only KLV sending is implemented
    if (selectedToken !== 'KLV') {
      setError(`Sending ${selectedToken} is coming soon`);
      return;
    }

    setIsLoading(true);

    try {
      const amountInUnits = parseKLV(amountNum);
      const result = await sendKLV(recipient, amountInUnits);

      if (result.success) {
        setTxHash(result.hash);
        setRecipient('');
        setAmount('');
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
      <div className="glass rounded-3xl p-12 text-center border border-white/10">
        <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <p className="text-gray-400 text-lg">Please connect your wallet to send crypto</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-3xl p-8 border border-white/10">
      <h2 className="text-2xl font-medium text-white mb-6">Send Crypto</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Token Selector */}
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-3">Select Token</label>
          <TokenSelector
            tokens={SEND_TOKENS}
            selectedToken={selectedToken}
            onSelect={setSelectedToken}
            showBalance={false}
          />
        </div>

        {/* Recipient Address */}
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-3">Recipient Address</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="klv1..."
            className="w-full glass text-white px-4 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-digiko-primary transition-all placeholder:text-gray-600"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-3">Amount ({selectedToken})</label>
          <input
            type="number"
            step="0.000001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full glass text-white px-4 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-digiko-primary transition-all placeholder:text-gray-600
                     /* Hide number input spinners */
                     [appearance:textfield] 
                     [&::-webkit-outer-spin-button]:appearance-none 
                     [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-4 rounded-2xl flex items-start gap-3">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {txHash && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-4 rounded-2xl">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium mb-1">Transaction Successful!</p>
                <p className="text-sm break-all opacity-80">Hash: {txHash}</p>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full bg-digiko-primary hover:bg-digiko-secondary text-white font-medium py-4 px-6 rounded-2xl transition-all duration-500 shadow-[0_0_30px_rgba(0,102,255,0.3)] hover:shadow-[0_0_40px_rgba(0,102,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] overflow-hidden"
        >
          {isLoading ? (
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </span>
          ) : (
            <span className="relative z-10">Send Transaction</span>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-digiko-accent/0 via-digiko-accent/30 to-digiko-accent/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        </button>
      </form>
    </div>
  );
};