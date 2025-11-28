# DGKO/USDT DEX Swap Contract

A decentralized exchange (DEX) smart contract for swapping DGKO and USDT tokens on the Klever Blockchain using an Automated Market Maker (AMM) model.

## 🎯 Overview

This contract implements a constant product AMM (x × y = k) similar to Uniswap V2, enabling trustless token swaps between DGKO and USDT.

### Key Features

- ✅ **Automated Market Maker** - Constant product formula (x × y = k)
- ✅ **Token Swaps** - Bidirectional DGKO ↔ USDT swapping
- ✅ **Liquidity Management** - Owner-controlled pool deposits/withdrawals
- ✅ **Price Discovery** - Real-time pricing based on reserves
- ✅ **Safety Limits** - Maximum 50% of liquidity per swap
- ✅ **Event Logging** - All swaps emit blockchain events
- ✅ **Upgradeable** - Future improvements possible

## 📊 How It Works

### Constant Product Formula

```
x × y = k (constant)

Where:
- x = DGKO reserve
- y = USDT reserve
- k = constant product
```

### Output Calculation

```
Output = (Input × Output_Reserve) / (Input_Reserve + Input)
```

### Example Swap

**Initial State:**
- DGKO Reserve: 100,000
- USDT Reserve: 40
- Price: 0.0004 USDT per DGKO

**User swaps 1,000 DGKO:**
```
USDT_out = (1,000 × 40) / (100,000 + 1,000)
USDT_out = 40,000 / 101,000
USDT_out ≈ 0.396 USDT
```

**After Swap:**
- DGKO Reserve: 101,000
- USDT Reserve: 39.604
- New Price: 0.000392 USDT per DGKO

## 🔧 Contract Functions

### User Functions

#### `swapDgkoToUsdt()`
Swap DGKO tokens for USDT.

**Payment:** DGKO-CXVJ tokens
**Returns:** USDT tokens to caller
**Gas:** ~10-15M

**Example:**
```rust
// User sends 1,000 DGKO (10,000,000 with 4 decimals)
// Contract calculates and sends back USDT
```

#### `swapUsdtToDgko()`
Swap USDT tokens for DGKO.

**Payment:** USDT tokens  
**Returns:** DGKO-CXVJ tokens to caller
**Gas:** ~10-15M

**Example:**
```rust
// User sends 1 USDT (1,000,000 with 6 decimals)
// Contract calculates and sends back DGKO
```

### Owner Functions

#### `addLiquidity()`
Add tokens to the liquidity pool (owner only).

**Payment:** DGKO-CXVJ and/or USDT tokens
**Permissions:** Owner only
**Gas:** ~5-10M

#### `removeLiquidity(dgko_amount, usdt_amount)`
Remove tokens from the liquidity pool (owner only).

**Parameters:**
- `dgko_amount`: Amount of DGKO to withdraw
- `usdt_amount`: Amount of USDT to withdraw

**Permissions:** Owner only
**Gas:** ~5-10M

#### `setFeeCollector(new_collector)`
Update the fee collector address.

**Parameters:**
- `new_collector`: New fee collector address

**Permissions:** Owner only
**Gas:** ~2-5M

### View Functions (FREE - No Gas)

#### `getDgkoReserve()`
Get current DGKO reserve in the pool.

**Returns:** BigUint - DGKO amount with 4 decimals

#### `getUsdtReserve()`
Get current USDT reserve in the pool.

**Returns:** BigUint - USDT amount with 6 decimals

#### `getPrice()`
Get current price of DGKO in USDT.

**Returns:** BigUint - Price with 6 decimal precision

#### `calculateOutput(input_amount, is_dgko_to_usdt)`
Calculate expected output for a given input amount.

**Parameters:**
- `input_amount`: Amount of input token
- `is_dgko_to_usdt`: true for DGKO→USDT, false for USDT→DGKO

**Returns:** BigUint - Expected output amount

## 🚀 Deployment

### Prerequisites

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install WASM target
rustup target add wasm32-unknown-unknown

# Install klever-sc-meta
cargo install klever-sc-meta
```

### Build Contract

```bash
cd contract
klever-sc-meta all build

# Output files:
# - output/digiko-swap.wasm (contract bytecode)
# - output/digiko-swap.abi.json (contract interface)
```

### Deploy to Testnet

```bash
# Using Klever CLI
klever-cli contract deploy \
  --wasm-path ./output/digiko-swap.wasm \
  --network testnet \
  --gas-limit 100000000 \
  --args "100000000000000" "40000000"
  # Args: initial_dgko_reserve (100k DGKO with 4 decimals)
  #       initial_usdt_reserve (40 USDT with 6 decimals)
```

### Initialize with Liquidity

After deployment, you need to add initial liquidity:

```bash
# Add 100,000 DGKO and 40 USDT to the pool
klever-cli contract call \
  --contract YOUR_CONTRACT_ADDRESS \
  --function addLiquidity \
  --transfers "DGKO-CXVJ:1000000000000,USDT:40000000" \
  --gas-limit 50000000
```

## 🔐 Security Features

### Slippage Protection
- Maximum swap size: 50% of liquidity reserve
- Prevents excessive price impact
- Protects pool stability

### Access Control
- Owner-only liquidity management
- Fee collector updates restricted
- Upgrade capability controlled

### Safety Checks
- Input validation (amount > 0)
- Token ID verification
- Reserve sufficiency checks
- Output amount validation

## 📖 Integration Guide

### Frontend Integration

```typescript
// 1. Get contract info
const contractAddress = 'klv1your_contract_address';
const web = window.kleverWeb;

// 2. Query reserves
const dgkoReserve = await web.query({
  contract: contractAddress,
  function: 'getDgkoReserve'
});

const usdtReserve = await web.query({
  contract: contractAddress,
  function: 'getUsdtReserve'
});

// 3. Calculate output before swap
const expectedOutput = await web.query({
  contract: contractAddress,
  function: 'calculateOutput',
  args: [inputAmount, true] // true for DGKO→USDT
});

// 4. Execute swap
const unsignedTx = await web.buildTransaction([{
  type: TransactionType.SmartContract,
  payload: {
    scType: 0, // Call
    contractAddress: contractAddress,
    functionName: 'swapDgkoToUsdt',
    amount: inputAmount,
    kda: 'DGKO-CXVJ'
  }
}]);

const signedTx = await web.signTransaction(unsignedTx);
const response = await web.broadcastTransactions([signedTx]);
```

## 📈 Economics

### Initial Setup
- **DGKO Reserve:** 100,000 DGKO
- **USDT Reserve:** 40 USDT  
- **Initial Price:** 1 DGKO = 0.0004 USDT
- **K Constant:** 4,000,000

### Fee Structure
- **Platform Fee:** 10 KLV (paid by frontend, not by contract)
- **Network Fee:** 3 KLV (Klever blockchain fee)
- **Total User Cost:** 13 KLV + gas

## 🧪 Testing

### Test Swap DGKO → USDT

```bash
# 1. Query current reserves
klever-cli contract query \
  --contract YOUR_CONTRACT_ADDRESS \
  --function getDgkoReserve

# 2. Calculate expected output
klever-cli contract query \
  --contract YOUR_CONTRACT_ADDRESS \
  --function calculateOutput \
  --args "10000000" "true"
  # 1,000 DGKO (with 4 decimals), DGKO→USDT

# 3. Execute swap
klever-cli contract call \
  --contract YOUR_CONTRACT_ADDRESS \
  --function swapDgkoToUsdt \
  --transfer "DGKO-CXVJ:10000000" \
  --gas-limit 15000000
```

### Test Swap USDT → DGKO

```bash
# Execute swap
klever-cli contract call \
  --contract YOUR_CONTRACT_ADDRESS \
  --function swapUsdtToDgko \
  --transfer "USDT:1000000" \
  --gas-limit 15000000
  # 1 USDT with 6 decimals
```

## 🐛 Troubleshooting

### "Must send DGKO tokens" Error
- Verify you're sending DGKO-CXVJ, not another token
- Check token ID matches exactly

### "Exceeds max swap size" Error
- Reduce swap amount to below 50% of reserve
- Check current reserves with `getDgkoReserve` / `getUsdtReserve`

### "Insufficient output amount" Error
- Pool has insufficient liquidity
- Try smaller swap amount
- Wait for liquidity to be added

### Build Errors
```bash
# Clean and rebuild
cargo clean
klever-sc-meta all clean
klever-sc-meta all build
```

## 🔄 Upgrade Path

The contract is upgradeable. To deploy a new version:

```bash
# 1. Build new version
klever-sc-meta all build

# 2. Upgrade contract
klever-cli contract upgrade \
  --contract YOUR_CONTRACT_ADDRESS \
  --wasm-path ./output/digiko-swap.wasm \
  --gas-limit 100000000
```

## 📚 Resources

- [Klever Documentation](https://docs.klever.finance)
- [Klever SC Framework](https://github.com/klever-io/klever-vm-sdk-rs)
- [AMM Explained](https://docs.uniswap.org/protocol/V2/concepts/protocol-overview/how-uniswap-works)
- [Testnet Explorer](https://testnet.kleverscan.org)
- [Mainnet Explorer](https://kleverscan.org)

## 🤝 Support

For issues or questions:
- Check documentation at `/documentation`
- View updates at `/updates`
- Submit issues on GitHub

## ⚠️ Disclaimer

This is a smart contract handling financial transactions. Users are responsible for:
- Understanding how AMMs work
- Checking prices before swapping
- Verifying transaction details
- Understanding smart contract risks

**Always test on testnet before mainnet deployment!**
