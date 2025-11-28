'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { kleverService } from '@/utils/klever';
import { KleverContextType, Network, TransactionResponse, AccountInfo } from '@/types/klever';
import { formatKLV } from '@/utils/constants';

const KleverContext = createContext<KleverContextType | undefined>(undefined);

export const KleverProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [network, setNetwork] = useState<Network>('mainnet');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const getAccountInfo = useCallback(async (): Promise<AccountInfo | null> => {
    if (!address) return null;

    try {
      const info = await kleverService.getAccountInfo(address);
      setBalance(formatKLV(info.balance));
      return info;
    } catch (error) {
      console.error('Error fetching account info:', error);
      return null;
    }
  }, [address]);

  const connect = async () => {
    setIsConnecting(true);
    try {
      const hasExtension = await kleverService.checkKleverExtension();
      if (!hasExtension) {
        throw new Error('Klever Extension not found. Please install it from the Chrome Web Store.');
      }

      const walletAddress = await kleverService.connectWallet();
      setAddress(walletAddress);
      setIsConnected(true);

      // Fetch initial balance
      const info = await kleverService.getAccountInfo(walletAddress);
      setBalance(formatKLV(info.balance));
    } catch (error: any) {
      console.error('Connection error:', error);
      alert(error.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setBalance('0');
    setIsConnected(false);
  };

  const switchNetwork = (newNetwork: Network) => {
    setNetwork(newNetwork);
    kleverService.setNetwork(newNetwork);
    
    // Refresh balance if connected
    if (address) {
      getAccountInfo();
    }
  };

  const sendKLV = async (to: string, amount: number): Promise<TransactionResponse> => {
    if (!address) {
      throw new Error('Wallet not connected');
    }

    const result = await kleverService.sendKLV(address, to, amount);
    
    // Refresh balance after transaction
    if (result.success) {
      setTimeout(() => {
        getAccountInfo();
      }, 2000);
    }

    return result;
  };

  // Initialize network on mount
  useEffect(() => {
    const defaultNetwork = (process.env.NEXT_PUBLIC_DEFAULT_NETWORK as Network) || 'mainnet';
    switchNetwork(defaultNetwork);
  }, []);

  // Manual refresh function for balance
  const refreshBalance = useCallback(() => {
    if (address) {
      getAccountInfo();
    }
  }, [address, getAccountInfo]);

  const value: KleverContextType = {
    address,
    balance,
    network,
    isConnected,
    isConnecting,
    connect,
    disconnect,
    switchNetwork,
    sendKLV,
    getAccountInfo,
    refreshBalance,
  };

  return <KleverContext.Provider value={value}>{children}</KleverContext.Provider>;
};

export const useKlever = (): KleverContextType => {
  const context = useContext(KleverContext);
  if (context === undefined) {
    throw new Error('useKlever must be used within a KleverProvider');
  }
  return context;
};