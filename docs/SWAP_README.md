# Swap Implementation Guide

## 🔄 Overview

The Digiko Swap is a decentralized token exchange built on the Klever Blockchain using an Automated Market Maker (AMM) model. Currently supports DGKO/USDT trading pair with plans to expand to more pairs.

## 📊 AMM Model (Constant Product)

### Formula
```
x × y = k (constant)
```

Where:
- `x` = DGKO reserve
- `y` = USDT reserve
- `k` = constant product

### Output Calculation
```
Output = (Input × Output_Reserve) / (Input_Reserve + Input)
```

### Price Impact
```
Price Impact = |((New_Price - Old_Price) / Old_Price)| × 100
```

## 🏦 Liquidity Configuration

### DGKO/USDT Pool
- **DGKO Pool Address:** `klv1pvckvh3yshmjulq4ntnkd0rmf94la6c37ykswvrcm5sy03neh3lq8dnv2h`
- **USDT Pool Address:** `0x2D94860736e09b08FF9Ea2a6E760748598A9f8FF`
- **Initial DGKO Reserve:** 100,000 DGKO
- **Initial USDT Reserve:** 40 USDT
- **Initial Price:** 1 DGKO = 0.0004 USDT

### Token Precision
- **DGKO:** 4 decimals (10,000 precision)
- **USDT:** 6 decimals (1,000,000 precision)
- **KLV:** 6 decimals (1,000,000 precision)

## 💰 Fee Structure

### Transaction Fees
- **Blockchain Fee:** 3 KLV (Klever network fee)
- **Platform Fee:** 10 KLV (Digiko revenue)
- **Total Fee:** 13 KLV per swap

### Fee Distribution
1. Blockchain fee automatically handled by Klever network
2. Platform fee sent to designated collection address

## 🛡️ Security Features

### Slippage Protection
- **Default Slippage:** 5%
- **Minimum Received:** `Output × (1 - 0.05)`
- Transaction fails if output falls below minimum

### Liquidity Limits
- Maximum swap size: 50% of reserve
- Prevents excessive price impact
- Protects pool stability

### Validation
- Input amount > 0 check
- Reserve sufficiency check
- Price impact monitoring
- Transaction status tracking

## 🔧 Technical Implementation

### File Structure
```
src/
├── app/
│   └── swap/
│       └── page.tsx           # Main swap interface
├── types/
│   └── swap.ts                # TypeScript types
└── utils/
    ├── swapCalculations.ts    # AMM calculations
    └── swapStorage.ts         # Transaction history
```

### Key Components

#### 1. Swap Calculations (`swapCalculations.ts`)
- `calculateSwapOutput()` - AMM formula implementation
- `getDGKOPrice()` - Current DGKO price calculation
- `validateSwap()` - Input validation
- `getPriceImpactColor()` - Visual feedback helper

#### 2. Storage Management (`swapStorage.ts`)
- `saveSwapTransaction()` - Save to localStorage
- `getSwapHistory()` - Retrieve transaction history
- `updateSwapTransactionStatus()` - Update transaction state
- `getSwapStats()` - Calculate swap statistics

#### 3. Main Interface (`page.tsx`)
- Token input/output fields
- Real-time quote calculation
- Direction flip functionality
- Transaction execution
- History display

## 📝 Transaction Flow

### User Journey
1. **Input Amount:** User enters swap amount
2. **Calculate Quote:** System calculates output using AMM
3. **Display Quote:**
   - Exchange rate
   - Price impact
   - Minimum received
   - Fee breakdown
4. **Execute Swap:** User confirms transaction
5. **Process:**
   - Create transaction record (pending)
   - Transfer input token to pool
   - Pool sends output token to user
   - Update transaction status (success/failed)
6. **Update Reserves:** Adjust pool reserves

### Transaction States
- `pending` - Transaction initiated
- `success` - Transaction confirmed on blockchain
- `failed` - Transaction rejected/failed

## 📈 Future Enhancements

### Planned Features
1. **BABYDGKO/USDT Pair** - Additional trading pair
2. **Multi-Pair Support** - Scalable architecture
3. **Liquidity Pools** - User-provided liquidity
4. **LP Tokens** - Liquidity provider rewards
5. **Advanced Charts** - Price history visualization
6. **Limit Orders** - Non-instant swaps
7. **Multi-Hop Swaps** - Indirect pair trading

### Architecture Considerations

#### Multiple Pairs
Each pair needs:
- Separate liquidity pool addresses
- Independent reserve tracking
- Isolated price calculations
- Dedicated transaction routing

Example:
```typescript
const pools = {
  'DGKO/USDT': {
    token0: { address: '...', reserve: 100000 },
    token1: { address: '...', reserve: 40 }
  },
  'BABYDGKO/USDT': {
    token0: { address: '...', reserve: 1000000 },
    token1: { address: '...', reserve: 100 }
  }
};
```

## 🧪 Testing Checklist

### Pre-Production Tests
- [ ] Small swap (1-10 DGKO)
- [ ] Medium swap (100-1000 DGKO)
- [ ] Large swap (5000+ DGKO)
- [ ] Direction flip (DGKO→USDT, USDT→DGKO)
- [ ] Slippage validation
- [ ] Fee calculation
- [ ] History persistence
- [ ] Failed transaction handling
- [ ] Insufficient balance handling

### Production Monitoring
- Transaction success rate
- Average price impact
- Pool reserve levels
- Fee collection
- User experience metrics

## 🔗 Integration Points

### Klever Blockchain
- Transaction building via `TransactionType.Transfer`
- Account nonce management
- Asset precision handling
- Transaction signing via extension

### Frontend State
- React hooks for swap state
- Real-time quote updates
- LocalStorage for history
- Optimistic UI updates

## 📚 References

- [Klever Blockchain Documentation](https://docs.klever.org/)
- [Automated Market Makers (AMM)](https://docs.uniswap.org/protocol/V2/concepts/protocol-overview/how-uniswap-works)
- [Constant Product Formula](https://docs.uniswap.org/protocol/V2/concepts/protocol-overview/glossary#constant-product-formula)

## 🆘 Troubleshooting

### Common Issues

**"Swap amount exceeds maximum allowed"**
- Reduce swap size below 50% of reserve
- Check current pool liquidity

**"Transaction failed"**
- Verify wallet has sufficient KLV for fees (13 KLV)
- Check input token balance
- Ensure network connectivity

**"Price impact too high"**
- Reduce swap amount
- Wait for liquidity to improve
- Consider multiple smaller swaps

**History not saving**
- Check browser localStorage availability
- Clear localStorage if corrupted
- Verify browser privacy settings

## 🔐 Security Best Practices

1. **Never share private keys**
2. **Verify pool addresses** before swapping
3. **Check minimum received** before confirming
4. **Monitor transaction status** on KleverScan
5. **Report suspicious activity** immediately

## 📞 Support

For issues or questions:
- Check documentation: `/documentation`
- View updates: `/updates`
- Contact: [Your support channel]
