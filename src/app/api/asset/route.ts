import { NextRequest, NextResponse } from 'next/server';

// Klever API endpoints for different networks
const KLEVER_APIS = {
  mainnet: 'https://api.mainnet.klever.org',
  testnet: 'https://api.testnet.klever.org'
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const assetId = searchParams.get('assetId');
    const network = (searchParams.get('network') || 'mainnet') as 'mainnet' | 'testnet';
    
    if (!assetId) {
      return NextResponse.json(
        { error: 'Asset ID is required' },
        { status: 400 }
      );
    }

    const apiUrl = KLEVER_APIS[network];
    
    // Try different possible endpoint structures
    const possibleEndpoints = [
      `${apiUrl}/v1.0/assets/${assetId}`,
      `${apiUrl}/v1.0/asset/${assetId}`,
      `${apiUrl}/assets/${assetId}`,
      `${apiUrl}/asset/${assetId}`,
    ];
    
    console.log('🔍 Trying to fetch asset info for:', assetId);
    
    let response;
    let successUrl = '';
    
    // Try each endpoint until one works
    for (const url of possibleEndpoints) {
      console.log('🔍 Attempting:', url);
      try {
        response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });
        
        if (response.ok) {
          successUrl = url;
          console.log('✅ Success with:', url);
          break;
        } else {
          console.log(`❌ Failed (${response.status}):`, url);
        }
      } catch (error) {
        console.log('❌ Error with:', url, error);
      }
    }

    if (!response || !response.ok) {
      console.error('❌ All asset API endpoints failed');
      return NextResponse.json(
        { error: `Failed to fetch asset info: No working endpoint found for ${assetId}` },
        { status: 404 }
      );
    }

    const data = await response.json();
    console.log('✅ Asset info fetched successfully from:', successUrl);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('❌ Error in asset API route:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}