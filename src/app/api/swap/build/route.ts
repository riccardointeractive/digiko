/**
 * API Route: /api/swap/build
 * Builds unsigned smart contract invoke transactions
 * User will sign this transaction with Klever Extension
 */

import { NextRequest, NextResponse } from 'next/server';
import { buildSmartContractInvokeTx, getAccountNonce } from '@/lib/klever-node';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      walletAddress,
      contractAddress,
      functionName,
      assetId,
      amount,
    } = body;

    // Validate required fields
    if (!walletAddress || !contractAddress || !functionName || !assetId || !amount) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields' 
        },
        { status: 400 }
      );
    }

    // Get current nonce for the user's wallet
    const nonce = await getAccountNonce(walletAddress);

    // Build the unsigned transaction
    const result = await buildSmartContractInvokeTx({
      senderAddress: walletAddress,
      contractAddress,
      functionName,
      assetId,
      amount,
      nonce,
    });

    if (!result.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: result.error 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      unsignedTx: result.unsignedTx,
      nonce: result.nonce,
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
