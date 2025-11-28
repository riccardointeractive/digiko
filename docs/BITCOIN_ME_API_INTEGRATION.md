# Bitcoin.me API Integration Guide

## Current Status
Bitcoin.me (https://cex.bitcoin.me) does not have public API documentation.

## Steps to Get API Access

1. **Contact Bitcoin.me Support**
   - Website: https://bitcoin.me
   - Exchange: https://cex.bitcoin.me/us
   - Look for support/help section
   - Request API access for DGKO/USDT pair

2. **Information to Request**
   - REST API endpoint for ticker data
   - WebSocket endpoint for real-time prices
   - Authentication method (API key, OAuth, etc.)
   - Rate limits
   - Response format

3. **What You Need**
   - DGKO/USDT current price
   - 24h volume
   - 24h price change %
   - 24h high/low prices
   - Historical price data (for chart)

## Expected API Endpoints

Once you get access, the API might look like:

### Get Current Price
```
GET https://api.bitcoin.me/v1/ticker/DGKO-USDT
```

### Get Historical Data
```
GET https://api.bitcoin.me/v1/klines?symbol=DGKO-USDT&interval=1h&limit=24
```

## Integration Steps

Once you have API access:

1. Add API credentials to `.env.local`:
```env
BITCOIN_ME_API_KEY=your_api_key_here
BITCOIN_ME_API_SECRET=your_secret_here
```

2. Update `/src/app/api/dgko-price/route.ts` with real endpoints

3. Update `/src/components/PriceChart.tsx` to fetch real historical data

4. Test thoroughly!

## Alternative Solutions (If No API Available)

If bitcoin.me doesn't provide API:

### Option 1: Use CoinGecko/CoinMarketCap
If DGKO is listed there, use their free API

### Option 2: Web Scraping (Last Resort)
Set up a backend service to scrape bitcoin.me prices
(Not recommended, may violate TOS)

### Option 3: Manual Updates
Admin panel to manually update prices from bitcoin.me