/**
 * Klever Backend Utilities
 * Server-side utilities for building smart contract transactions using Node SDK
 */

import { Contracts, utils, proto } from '@klever/sdk-node';

/**
 * Build an unsigned smart contract invoke transaction using Node SDK
 * Returns in format compatible with Klever Web SDK signing
 */
export async function buildSmartContractInvokeTx(params: {
  senderAddress: string;
  contractAddress: string;
  functionName: string;
  assetId: string;
  amount: number;
  nonce: number;
}) {
  const {
    senderAddress,
    contractAddress,
    functionName,
    assetId,
    amount,
    nonce,
  } = params;

  try {
    // Decode addresses
    const senderBytes = await utils.decodeAddress(senderAddress);
    const contractBytes = await utils.decodeAddress(contractAddress);
    
    // Create the call data JSON
    const callDataObj = {
      CallType: 'Invoke',
      Function: functionName,
      Transfers: [
        {
          AssetID: assetId,
          Amount: amount,
        },
      ],
    };
    
    // CallData should be base64-encoded JSON string
    const callDataBase64 = Buffer.from(JSON.stringify(callDataObj)).toString('base64');
    
    // Manually construct protobuf bytes for SmartContract
    // Based on successful transactions observed on Kleverscan
    
    const protobufParts: number[] = [];
    
    // Field 1: Type (varint field number 1, wire type 0)
    protobufParts.push(0x08); // field 1, wire type 0 (varint)
    protobufParts.push(0x00); // type = 0
    
    // Field 2: Address (bytes field number 2, wire type 2)
    protobufParts.push(0x12); // field 2, wire type 2 (length-delimited)
    protobufParts.push(contractBytes.length); // length
    protobufParts.push(...Array.from(contractBytes)); // address bytes
    
    // Field 3: CallData (string field number 3, wire type 2)
    // Store the base64 string directly - it's already the right format
    const callDataBytes = Buffer.from(callDataBase64);
    protobufParts.push(0x1a); // field 3, wire type 2 (length-delimited)
    
    // Length needs to be encoded as varint if > 127
    if (callDataBytes.length < 128) {
      protobufParts.push(callDataBytes.length);
    } else {
      // Encode length as varint (128+ requires 2 bytes)
      protobufParts.push((callDataBytes.length & 0x7f) | 0x80);
      protobufParts.push(callDataBytes.length >> 7);
    }
    
    protobufParts.push(...Array.from(callDataBytes)); // callData string bytes
    
    const protobufBytes = new Uint8Array(protobufParts);
    const protobufBase64 = Buffer.from(protobufBytes).toString('base64');
    
    console.log('✅ Manual protobuf encoding complete, length:', protobufBytes.length);
    
    // Build transaction in format compatible with web SDK signing
    const unsignedTx = {
      RawData: {
        Nonce: nonce,
        Sender: Buffer.from(senderBytes).toString('base64'),
        Contract: [
          {
            Type: 23, // SmartContract type
            Parameter: {
              type_url: 'type.googleapis.com/proto.SmartContract',
              value: protobufBase64, // Manual protobuf binary as base64
            },
          },
        ],
        KAppFee: 30000000, // 30 KLV
        BandwidthFee: 1000000, // 1 KLV
        Version: 1,
        ChainID: '100420', // Mainnet - plain string, not base64
      },
    };
    
    console.log('✅ Transaction built with manual protobuf encoding');

    return {
      success: true,
      unsignedTx,
      nonce,
    };
  } catch (error: any) {
    console.error('Error building smart contract transaction:', error);
    return {
      success: false,
      error: error.message || 'Failed to build transaction',
    };
  }
}

/**
 * Get account nonce from Klever API
 */
export async function getAccountNonce(address: string): Promise<number> {
  try {
    const response = await fetch(
      `https://api.mainnet.klever.org/v1.0/address/${address}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch account info');
    }

    const data = await response.json();
    return data.data?.account?.nonce || 0;
  } catch (error) {
    console.error('Error fetching account nonce:', error);
    return 0;
  }
}

/**
 * Broadcast a signed transaction
 */
export async function broadcastTransaction(signedTx: string) {
  try {
    const response = await fetch(
      'https://node.mainnet.klever.org/transaction/broadcast',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tx: signedTx }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Broadcast failed');
    }

    const result = await response.json();
    return {
      success: true,
      txHash: result.data?.hash || result.hash,
    };
  } catch (error: any) {
    console.error('Error broadcasting transaction:', error);
    return {
      success: false,
      error: error.message || 'Failed to broadcast transaction',
    };
  }
}
