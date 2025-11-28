import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const address = searchParams.get('address');
    
    if (!address) {
      return NextResponse.json(
        { error: 'Address parameter required' },
        { status: 400 }
      );
    }

    if (!address.startsWith('klv1')) {
      return NextResponse.json(
        { error: 'Invalid Klever address format' },
        { status: 400 }
      );
    }

    const network = process.env.NEXT_PUBLIC_DEFAULT_NETWORK || 'testnet';
    const baseUrl = network === 'mainnet' 
      ? 'https://api.mainnet.klever.finance'
      : 'https://api.testnet.klever.finance';

    const url = `${baseUrl}/v1.0/address/${address}`;

    console.log('Fetching balance from:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (response.status === 404) {
      return NextResponse.json({
        data: {
          account: {
            address: address,
            balance: 0,
          }
        }
      });
    }

    if (!response.ok) {
      console.error('API error:', response.status, response.statusText);
      return NextResponse.json(
        { error: `API returned ${response.status}: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch balance' },
      { status: 500 }
    );
  }
}