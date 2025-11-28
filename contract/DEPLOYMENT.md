# Counter Contract Deployment Guide

This guide explains how to deploy the Counter smart contract to Klever Blockchain.

## Prerequisites

- Rust and Cargo installed
- klever-sc-meta tool installed
- Klever CLI (optional but recommended)
- Wallet with KLV for gas fees

## Step 1: Install Rust and Klever Tools
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install klever-sc-meta
cargo install klever-sc-meta

# Set target for WASM
rustup target add wasm32-unknown-unknown
```

## Step 2: Build the Contract
```bash
cd contract

# Build the contract
klever-sc-meta build

# This creates:
# - output/counter.wasm (the contract bytecode)
# - output/counter.abi.json (the contract interface)
```

## Step 3: Deploy Using Klever CLI

### Option A: Using Klever CLI (Recommended)
```bash
# Install Klever CLI
npm install -g @klever/cli

# Login with your wallet
klever-cli login

# Deploy contract
klever-cli contract deploy \
  --wasm-path ./output/counter.wasm \
  --network testnet \
  --gas-limit 50000000

# Save the returned contract address
```

### Option B: Using Klever Web Interface

1. Go to [Klever Testnet](https://testnet.kleverscan.org)
2. Connect your wallet
3. Navigate to "Deploy Contract"
4. Upload `output/counter.wasm`
5. Set gas limit to 50,000,000
6. Click "Deploy"
7. Approve transaction in wallet
8. Save the contract address from transaction receipt

### Option C: Using JavaScript/SDK
```javascript
const { web, Transaction, TransactionType } = require('@klever/sdk');

async function deployContract() {
  // Set network
  web.setProvider('https://api.testnet.klever.finance');

  // Read WASM file
  const fs = require('fs');
  const wasmCode = fs.readFileSync('./output/counter.wasm');
  const base64Code = wasmCode.toString('base64');

  // Get account info for nonce
  const address = 'YOUR_WALLET_ADDRESS';
  const accountInfo = await web.getAccount(address);

  // Create deploy transaction
  const tx = {
    type: TransactionType.SmartContract,
    sender: address,
    nonce: accountInfo.nonce,
    contract: [],
    data: ['deploy', base64Code],
    kdaFee: 'KLV',
  };

  const transaction = new Transaction(tx);
  
  // Sign with your wallet/private key
  // ... signing logic ...
  
  // Broadcast
  const result = await web.broadcastTransaction(signedTx);
  console.log('Contract deployed at:', result.data.contract);
}
```

## Step 4: Verify Deployment
```bash
# Query the contract to test it
klever-cli contract query \
  --contract YOUR_CONTRACT_ADDRESS \
  --function getCounter \
  --network testnet

# Should return: 0 (initial value)
```

## Step 5: Update Frontend

1. Copy the deployed contract address
2. Open `src/utils/constants.ts`
3. Update the CONTRACT_ADDRESS constant:
```typescript
export const CONTRACT_ADDRESS = 'klv1your_actual_contract_address_here';
```

## Step 6: Test Contract Functions

### Read Counter (View Function - No Gas)
```bash
klever-cli contract query \
  --contract YOUR_CONTRACT_ADDRESS \
  --function getCounter \
  --network testnet
```

### Increment Counter
```bash
klever-cli contract call \
  --contract YOUR_CONTRACT_ADDRESS \
  --function increment \
  --gas-limit 5000000 \
  --network testnet
```

### Decrement Counter
```bash
klever-cli contract call \
  --contract YOUR_CONTRACT_ADDRESS \
  --function decrement \
  --gas-limit 5000000 \
  --network testnet
```

### Set Specific Value
```bash
klever-cli contract call \
  --contract YOUR_CONTRACT_ADDRESS \
  --function setCounter \
  --args 42 \
  --gas-limit 5000000 \
  --network testnet
```

## Gas Costs

- Deploy: ~50,000,000 gas
- Increment/Decrement: ~5,000,000 gas
- Set Counter: ~5,000,000 gas
- Get Counter (View): FREE (no transaction)

## Troubleshooting

**Build fails:**
- Ensure Rust is installed: `rustc --version`
- Ensure wasm32 target is added: `rustup target list --installed`
- Clean and rebuild: `cargo clean && klever-sc-meta build`

**Deployment fails:**
- Check you have enough KLV for gas
- Verify network is correct (testnet vs mainnet)
- Increase gas limit if needed
- Check wallet is unlocked

**Contract doesn't respond:**
- Verify contract address is correct
- Ensure contract was successfully deployed (check transaction receipt)
- Check you're querying the correct network

## Next Steps

1. Deploy to testnet first
2. Test all functions thoroughly
3. Once satisfied, deploy to mainnet
4. Update frontend with mainnet contract address
5. Monitor contract usage and behavior

## Security Notes

- This is a simple example contract for learning
- For production contracts:
  - Add access controls
  - Implement proper error handling
  - Add events for state changes
  - Consider upgradeability patterns
  - Get security audit

## Mainnet Deployment

When ready for mainnet:

1. Switch network to mainnet
2. Ensure wallet has enough KLV
3. Deploy using same process
4. Update CONTRACT_ADDRESS in constants.ts
5. Update NEXT_PUBLIC_DEFAULT_NETWORK in .env to 'mainnet'

## Resources

- [Klever Documentation](https://docs.klever.finance)
- [Klever SC Framework](https://github.com/klever-io/klever-vm-sdk-rs)
- [Testnet Explorer](https://testnet.kleverscan.org)
- [Mainnet Explorer](https://kleverscan.org)