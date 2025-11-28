import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Simple file-based storage for manual price entries
const PRICE_FILE = path.join(process.cwd(), 'dgko-price-data.json');

interface PriceData {
  price: number;
  volume24h: number;
  priceChange24h: number;
  lastUpdate: string;
  source: string;
}

function getStoredPrice(): PriceData | null {
  try {
    if (fs.existsSync(PRICE_FILE)) {
      const data = fs.readFileSync(PRICE_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading price file:', error);
  }
  return null;
}

function savePrice(data: PriceData): void {
  try {
    fs.writeFileSync(PRICE_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving price file:', error);
  }
}

export async function GET() {
  try {
    const storedPrice = getStoredPrice();
    
    if (storedPrice) {
      return NextResponse.json(storedPrice);
    }
    
    // No price data yet
    return NextResponse.json({
      price: 0,
      volume24h: 0,
      priceChange24h: 0,
      lastUpdate: null,
      source: 'No data - update via /admin'
    });
    
  } catch (error) {
    console.error('Error in price API:', error);
    
    return NextResponse.json({
      price: 0,
      volume24h: 0,
      priceChange24h: 0,
      lastUpdate: null,
      source: 'Error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Manual price update endpoint (for admin use)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.price || typeof body.price !== 'number') {
      return NextResponse.json(
        { error: 'Invalid price data' },
        { status: 400 }
      );
    }
    
    const priceData: PriceData = {
      price: body.price,
      volume24h: body.volume24h || 0,
      priceChange24h: body.priceChange24h || 0,
      lastUpdate: new Date().toISOString(),
      source: 'Manual Entry'
    };
    
    savePrice(priceData);
    
    return NextResponse.json({
      success: true,
      message: 'Price updated successfully',
      data: priceData
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update price' },
      { status: 500 }
    );
  }
}
