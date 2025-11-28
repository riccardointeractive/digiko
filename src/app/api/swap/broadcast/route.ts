/**
 * API Route: /api/swap/broadcast
 * Broadcasts signed transactions to Klever blockchain
 */

import { NextRequest, NextResponse } from 'next/server';
import { broadcastTransaction } from '@/lib/klever-node';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { signedTx } = body;

    // Validate
    if (!signedTx) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing signed transaction' 
        },
        { status: 400 }
      );
    }

    // Broadcast the transaction
    const result = await broadcastTransaction(signedTx);

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
      txHash: result.txHash,
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
