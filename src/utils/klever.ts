import { KleverWindow, TransactionResponse, AccountInfo } from '@/types/klever';
import { NETWORKS, Network } from './constants';

declare let window: KleverWindow;

// Transaction types for Klever
export enum TransactionType {
  Transfer = 0,
  CreateAsset = 1,
  CreateValidator = 2,
  ValidatorConfig = 3,
  Freeze = 4,
  Unfreeze = 5,
  Delegate = 6,
  Undelegate = 7,
  Withdraw = 8,
  Claim = 9,
  Unjail = 10,
  AssetTrigger = 11,
  SetAccountName = 12,
  Proposal = 13,
  Vote = 14,
  ConfigITO = 15,
  SetITOPrices = 16,
  Buy = 17,
  Sell = 18,
  CancelMarketOrder = 19,
  CreateMarketplace = 20,
  ConfigMarketplace = 21,
  Deposit = 22,
  SmartContract = 23,
}

export interface ITransaction {
  type: TransactionType;
  sender: string;
  nonce: number;
  data?: string[];
  kda?: string;
  kdaFee?: string;
  contract?: string[];
  permID?: number;
  toAddress?: string;
  amount?: number;
}

export class KleverService {
  private static instance: KleverService;
  private network: Network = 'mainnet';

  private constructor() {}

  static getInstance(): KleverService {
    if (!KleverService.instance) {
      KleverService.instance = new KleverService();
    }
    return KleverService.instance;
  }

  setNetwork(network: Network) {
    this.network = network;
  }

  getNetwork(): Network {
    return this.network;
  }

  async checkKleverExtension(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    
    // Wait for extension to load
    for (let i = 0; i < 10; i++) {
      if (window.kleverWeb) {
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return false;
  }

  async connectWallet(): Promise<string> {
    if (!window.kleverWeb) {
      throw new Error('Klever Extension not found. Please install it.');
    }

    try {
      await window.kleverWeb.initialize();
      const address = await window.kleverWeb.getWalletAddress();
      return address;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  }

  async getAccountInfo(address: string): Promise<AccountInfo> {
    try {
      // Use Next.js API route to avoid CORS issues, pass current network
      const response = await fetch(`/api/account?address=${address}&network=${this.network}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch account info');
      }

      const data = await response.json();
      
      // Convert assets object to array format if needed
      let assetsArray = [];
      if (data.data.account.assets) {
        if (Array.isArray(data.data.account.assets)) {
          assetsArray = data.data.account.assets;
        } else {
          // Convert object to array: {KLV: {...}, DGKO: {...}} => [{assetId: 'KLV', ...}, {assetId: 'DGKO', ...}]
          assetsArray = Object.entries(data.data.account.assets).map(([assetId, assetData]: [string, any]) => ({
            assetId,
            ...assetData
          }));
        }
      }
      
      return {
        address: data.data.account.address,
        balance: data.data.account.balance || 0,
        nonce: data.data.account.nonce || 0,
        assets: assetsArray,
      };
    } catch (error) {
      console.error('Error fetching account info:', error);
      throw error;
    }
  }

  async sendKLV(from: string, to: string, amount: number): Promise<TransactionResponse> {
    if (!window.kleverWeb) {
      throw new Error('Klever Extension not found');
    }

    try {
      // Get account info for nonce
      const accountInfo = await this.getAccountInfo(from);

      // Build transaction payload
      const tx = {
        type: TransactionType.Transfer,
        sender: from,
        nonce: accountInfo.nonce,
        data: [],
        kdaFee: 'KLV',
        kda: 'KLV',
        toAddress: to,
        amount: amount,
      };

      // Use the extension's sendTransaction method
      // The extension handles building, signing, and broadcasting
      const result = await window.kleverWeb.sendTransaction(tx);
      
      return {
        hash: result.hash || '',
        success: true,
        data: result,
      };
    } catch (error: any) {
      console.error('Error sending KLV:', error);
      return {
        hash: '',
        success: false,
        error: error.message || 'Transaction failed',
      };
    }
  }

  async callContract(
    contractAddress: string,
    method: string,
    args: string[],
    from: string
  ): Promise<TransactionResponse> {
    if (!window.kleverWeb) {
      throw new Error('Klever Extension not found');
    }

    try {
      const accountInfo = await this.getAccountInfo(from);

      const tx = {
        type: TransactionType.SmartContract,
        sender: from,
        nonce: accountInfo.nonce,
        contract: [contractAddress],
        data: [method, ...args],
        kdaFee: 'KLV',
      };

      const result = await window.kleverWeb.sendTransaction(tx);

      return {
        hash: result.hash || '',
        success: true,
        data: result,
      };
    } catch (error: any) {
      console.error('Error calling contract:', error);
      return {
        hash: '',
        success: false,
        error: error.message || 'Contract call failed',
      };
    }
  }

  async queryContract(contractAddress: string, method: string, args: string[] = []): Promise<any> {
    try {
      // Use Next.js API route to avoid CORS issues
      const response = await fetch('/api/contract/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scAddress: contractAddress,
          funcName: method,
          args: args,
        }),
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      return result.data;
    } catch (error) {
      console.error('Error querying contract:', error);
      throw error;
    }
  }

  async getAssetInfo(assetId: string): Promise<any> {
    try {
      // Use Next.js API route to avoid CORS issues
      const response = await fetch(`/api/asset?assetId=${assetId}&network=${this.network}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch asset info');
      }

      const data = await response.json();
      
      console.log('🔍 Asset Info:', data);
      
      return data;
    } catch (error) {
      console.error('Error fetching asset info:', error);
      throw error;
    }
  }
}

export const kleverService = KleverService.getInstance();