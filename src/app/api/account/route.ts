import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const address = searchParams.get('address');
    const network = searchParams.get('network') || 'mainnet';

    if (!address) {
      return NextResponse.json(
        { error: 'Address parameter is required' },
        { status: 400 }
      );
    }

    // Klever API endpoints - mainnet uses .org NOT .finance
    const baseUrl = network === 'testnet' 
      ? 'https://api.testnet.klever.org'
      : 'https://api.mainnet.klever.org';  // ✅ Fixed: .org not .finance
    
    const apiUrl = `${baseUrl}/v1.0/address/${address}`;
    
    console.log(`🔍 Fetching from ${network}:`, apiUrl);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    console.log(`📡 Response status: ${response.status}`);

    // Handle 404 - new address with no balance
    if (response.status === 404) {
      console.log('⚠️ Address not found (404), returning empty data');
      return NextResponse.json({
        data: {
          account: {
            address: address,
            balance: 0,
            nonce: 0,
            assets: {},
          },
        },
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Klever API error:', response.status, errorText);
      return NextResponse.json(
        { error: `Klever API error: ${response.status} - ${errorText}` },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log('✅ Got data from Klever API');
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('❌ Error in account API route:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}