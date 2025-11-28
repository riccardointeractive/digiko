# Digiko Internal Development Documentation
## 🔒 CONFIDENTIAL - For Development Use Only

**Project:** Digiko Web3 DApp  
**Blockchain:** Klever  
**Framework:** Next.js 14 + TypeScript + Tailwind CSS  
**Last Updated:** November 26, 2025  
**Version:** 0.18.0

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Critical Addresses & IDs](#critical-addresses--ids)
3. [Token Configuration](#token-configuration)
4. [Klever SDK Integration](#klever-sdk-integration)
5. [Transaction Patterns](#transaction-patterns)
6. [API Routes & CORS](#api-routes--cors)
7. [Design System](#design-system)
8. [Common Bugs & Solutions](#common-bugs--solutions)
9. [Code Patterns](#code-patterns)
10. [Development Workflow](#development-workflow)
11. [File Reference](#file-reference)
12. [Testing Checklist](#testing-checklist)
13. [Admin Panel System](#admin-panel-system)
14. [Modular Architecture Pattern](#modular-architecture-pattern)

---

## Project Structure

```
digiko-web3-app/
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── admin/              # 🔒 Admin panel (630 lines, password-protected)
│   │   ├── api/                # API routes (CORS proxy)
│   │   │   ├── account/        # GET /api/account?address=...
│   │   │   ├── asset/          # GET /api/asset?assetId=...
│   │   │   ├── balance/        # GET /api/balance?address=...
│   │   │   └── dgko-price/     # GET /api/dgko-price
│   │   ├── babydgko/           # BABYDGKO token page (642 lines)
│   │   ├── dashboard/          # Dashboard page (107 lines)
│   │   ├── design-system/      # Design system reference page (650 lines)
│   │   ├── dgko/               # DGKO token page (MODULAR - 16 files, 852 lines total)
│   │   │   ├── page.tsx        # Main orchestrator (77 lines)
│   │   │   ├── types/          # TypeScript interfaces
│   │   │   ├── config/         # Constants & static data (.tsx for JSX icons)
│   │   │   ├── hooks/          # Business logic & API calls
│   │   │   └── components/     # UI components (12 files)
│   │   ├── documentation/      # User documentation (861+ lines)
│   │   ├── staking/            # Staking page (MODULAR - 15 files, ~1850 lines total)
│   │   │   ├── page.tsx        # Main orchestrator (184 lines)
│   │   │   ├── types/          # TypeScript interfaces
│   │   │   ├── config/         # Constants & configuration
│   │   │   ├── hooks/          # Business logic (4 hooks)
│   │   │   └── components/     # UI components (8 files)
│   │   ├── swap/               # Swap page (599 lines)
│   │   ├── updates/            # Changelog page (360+ lines)
│   │   ├── globals.css         # Global styles + glass classes
│   │   ├── layout.tsx          # Root layout + navigation
│   │   └── page.tsx            # Landing page
│   ├── components/             # Reusable components
│   │   ├── ConnectWalletPrompt.tsx  # Wallet connection UI
│   │   ├── DesktopMoreMenu.tsx      # Burger menu (version display)
│   │   ├── MobileMenu.tsx           # Mobile navigation
│   │   ├── TokenImage.tsx           # Token logo fetcher + TOKEN_IDS
│   │   ├── TokenSelector.tsx        # Token dropdown for staking
│   │   └── TokensDropdown.tsx       # Tokens nav dropdown
│   ├── context/
│   │   └── KleverContext.tsx   # Wallet state management
│   ├── types/
│   │   ├── klever.ts           # Klever type definitions
│   │   └── swap.ts             # Swap type definitions
│   └── utils/
│       ├── constants.ts        # Network configs, TX types
│       ├── klever.ts           # KleverService class
│       ├── swapCalculations.ts # AMM formulas
│       └── swapStorage.ts      # LocalStorage for swap history
├── design_guide.md             # Design system reference (v1.7)
├── kleverSDK/                  # WASM SDK files (DO NOT MODIFY)
└── package.json                # Dependencies
```

---

## Critical Addresses & IDs

### 🔑 Pool Addresses

```typescript
// DGKO Liquidity Pool
const DGKO_POOL_ADDRESS = 'klv1pvckvh3yshmjulq4ntnkd0rmf94la6c37ykswvrcm5sy03neh3lq8dnv2h';

// USDT Pool (ETH ERC20 bridged)
const USDT_POOL_ADDRESS = '0x2D94860736e09b08FF9Ea2a6E760748598A9f8FF';
```

### 💰 Fee Collection Address

```typescript
// Platform fee receiver (Riccardo's address)
const PLATFORM_FEE_ADDRESS = 'klv1slqck0vnxuj9uk0dp6rcv00xv2exnv3wcpf3286jquu79czyxw9qccyyrn';

// ⚠️ IMPORTANT: When testing FROM this address, use pool address instead
// to avoid SameAccountError. Change back for production!
```

### 🪙 Asset IDs (CRITICAL!)

```typescript
// ALWAYS use asset IDs, NEVER symbols!
export const TOKEN_IDS = {
  DGKO: 'DGKO-CXVJ',        // ✅ Correct - NOT 'DGKO'
  BABYDGKO: 'BABYDGKO-3S67', // ✅ Correct - NOT 'BABYDGKO'
  KLV: 'KLV',                // Native token
  KFI: 'KFI',
} as const;

// USDT on Klever (ETH ERC20 bridged)
const USDT_ASSET_ID = 'USDT';  // ⚠️ Verify on KleverScan if issues
```

**🚨 CRITICAL BUG AVOIDED:** Using `'DGKO'` instead of `'DGKO-CXVJ'` causes transaction failures!

---

## Token Configuration

### Token Precision (Decimals)

```typescript
// DGKO: 4 decimals
const DGKO_PRECISION = 10000;  // 10^4
// Example: 500 DGKO = 500 * 10000 = 5,000,000 units

// BABYDGKO: 8 decimals
const BABYDGKO_PRECISION = 100000000;  // 10^8
// Example: 1000 BABYDGKO = 1000 * 100000000 = 100,000,000,000 units

// KLV: 6 decimals
const KLV_PRECISION = 1000000;  // 10^6
// Example: 10 KLV = 10 * 1000000 = 10,000,000 units

// USDT: 6 decimals
const USDT_PRECISION = 1000000;  // 10^6
```

### Token Stats (Live from API)

**DGKO:**
- Precision: 4 decimals
- Max Supply: ~10 billion
- APR: 10%
- Minimum Stake: 100 DGKO

**BABYDGKO:**
- Precision: 8 decimals
- Max Supply: 50 billion
- APR: 10%
- Minimum Stake: 1,000 BABYDGKO

---

## Klever SDK Integration

### 🚨 CRITICAL: The Right Way vs Wrong Way

#### ❌ WRONG - These Methods DON'T EXIST:

```typescript
// These are in klever.ts types but DON'T WORK!
await window.kleverWeb.sendTransaction(tx);      // ❌ NOT A FUNCTION
await window.kleverWeb.getAccountInfo(address);  // ❌ NOT A FUNCTION
```

#### ✅ CORRECT - Use the SDK's 3-Step Flow:

```typescript
// Import the SDK
import { web } from '@klever/sdk-web';
// OR dynamic import:
const { web } = await import('@klever/sdk-web');

// Step 1: Build transaction
const unsignedTx = await web.buildTransaction([
  {
    payload: {
      amount: amountInUnits,
      kda: 'DGKO-CXVJ',  // Asset ID, NOT symbol!
      receiver: receiverAddress,  // For transfers
    },
    type: TransactionType.Transfer,  // or Freeze, Unfreeze, etc.
  }
]);

// Step 2: Sign transaction (shows Klever extension popup)
const signedTx = await web.signTransaction(unsignedTx);

// Step 3: Broadcast transaction
const response = await web.broadcastTransactions([signedTx]);

// Get transaction hash
if (response?.data?.txsHashes?.length > 0) {
  const txHash = response.data.txsHashes[0];
}
```

### Transaction Types

```typescript
export enum TransactionType {
  Transfer = 0,       // Send tokens
  Freeze = 4,         // Stake tokens
  Unfreeze = 5,       // Unstake tokens
  Withdraw = 8,       // Withdraw unstaked
  Claim = 9,          // Claim rewards
  SmartContract = 23, // Contract calls
}
```

### Getting Account Info (The Right Way)

```typescript
// DON'T use window.kleverWeb.getAccountInfo()
// USE kleverService which uses API routes:

import { kleverService } from '@/utils/klever';

const accountInfo = await kleverService.getAccountInfo(address);
// Returns: { address, balance, nonce, assets[] }
```

### Wallet Connection Flow

```typescript
// 1. Check extension exists
const hasExtension = await kleverService.checkKleverExtension();

// 2. Initialize and get address
await window.kleverWeb.initialize();
const address = await window.kleverWeb.getWalletAddress();

// These two methods DO work on window.kleverWeb:
// - initialize()
// - getWalletAddress()
```

---

## Transaction Patterns

### Staking (Freeze)

```typescript
const unsignedTx = await web.buildTransaction([
  {
    payload: {
      amount: amountInUnits,  // e.g., 500 * 10000 for 500 DGKO
      kda: 'DGKO-CXVJ',       // Asset ID
    },
    type: TransactionType.Freeze,
  }
]);
```

### Unstaking (Unfreeze)

```typescript
const unsignedTx = await web.buildTransaction([
  {
    payload: {
      amount: amountInUnits,
      kda: 'DGKO-CXVJ',
    },
    type: TransactionType.Unfreeze,
  }
]);
```

### Withdraw (After Unstake)

```typescript
const unsignedTx = await web.buildTransaction([
  {
    payload: {
      kda: 'DGKO-CXVJ',
    },
    type: TransactionType.Withdraw,
  }
]);
```

### Claim Rewards

```typescript
const unsignedTx = await web.buildTransaction([
  {
    payload: {
      claimType: 0,  // 0 for staking rewards
      id: 'DGKO-CXVJ',
    },
    type: TransactionType.Claim,
  }
]);
```

### Transfer (Swap / Send)

```typescript
const unsignedTx = await web.buildTransaction([
  {
    payload: {
      amount: amountInUnits,
      receiver: destinationAddress,
      kda: 'DGKO-CXVJ',
    },
    type: TransactionType.Transfer,
  }
]);
```

### Multi-Transaction (Swap with Fee)

```typescript
// Build multiple transactions at once
const unsignedTx = await web.buildTransaction([
  // Transaction 1: Swap
  {
    payload: {
      amount: swapAmountInUnits,
      receiver: poolAddress,
      kda: 'DGKO-CXVJ',
    },
    type: TransactionType.Transfer,
  },
  // Transaction 2: Platform fee
  {
    payload: {
      amount: 10000000,  // 10 KLV
      receiver: feeAddress,
      kda: 'KLV',
    },
    type: TransactionType.Transfer,
  }
]);
// Both show in ONE extension popup, user approves together
```

---

## API Routes & CORS

### Why API Routes?

Klever API has CORS restrictions. We proxy through Next.js API routes.

### API Endpoints

```typescript
// Klever Mainnet
https://api.mainnet.klever.org  // ✅ Correct (.org NOT .finance)

// Klever Testnet
https://api.testnet.klever.org

// Common endpoints:
GET /v1.0/address/{address}       // Account info
GET /v1.0/assets/{assetId}        // Asset info
POST /v1.0/transaction/broadcast  // Broadcast TX
```

### Our API Routes

```typescript
// Account info (with assets conversion)
GET /api/account?address={addr}&network=mainnet

// Asset info
GET /api/asset?assetId={id}&network=mainnet

// Balance
GET /api/balance?address={addr}

// DGKO price (manual)
GET /api/dgko-price
```

### Assets Object → Array Conversion

**🚨 IMPORTANT:** Klever API returns assets as OBJECT, not array!

```typescript
// API returns:
{
  assets: {
    "KLV": { balance: 1000000, ... },
    "DGKO-CXVJ": { balance: 5000000, ... }
  }
}

// We convert to array:
const assetsArray = Object.entries(data.data.account.assets)
  .map(([assetId, assetData]) => ({
    assetId,
    ...assetData
  }));

// Result:
[
  { assetId: "KLV", balance: 1000000, ... },
  { assetId: "DGKO-CXVJ", balance: 5000000, ... }
]
```

---

## Design System

### 📏 Page Container Pattern (CRITICAL!)

```tsx
// ✅ CORRECT structure for ALL internal pages
<div className="min-h-screen py-16">  {/* 64px top/bottom */}
  <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
    {/* Page content */}
  </div>
</div>
```

### ❌ Anti-Patterns

```tsx
// ❌ WRONG - Different container width
<div className="container mx-auto max-w-6xl">  // 1152px instead of 1400px!

// ❌ WRONG - Too narrow padding
<div className="max-w-[1400px] mx-auto px-4">  // 16px instead of 24px!

// ❌ WRONG - py on inner container
<div className="max-w-[1400px] mx-auto py-16">  // py should be on OUTER wrapper
```

### Glass Effects

```css
/* In globals.css - these are the ONLY valid glass classes */
.glass {
  background: rgba(18, 18, 20, 0.5);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.glass-hover {
  /* Same as .glass + hover effects */
}
```

**🚨 NO `glass-light` CLASS EXISTS!** Use `bg-white/5` for lighter backgrounds.

### Card Styling

```tsx
// Main cards
<div className="glass rounded-2xl p-8 border border-white/10">

// Nested/inner cards
<div className="bg-white/5 rounded-2xl p-6">

// Interactive cards
<div className="glass-hover rounded-2xl p-6 cursor-pointer">
```

### Border Radius

```
rounded-3xl (24px) - Hero sections, feature cards
rounded-2xl (16px) - Content cards, main sections ← MOST COMMON
rounded-xl (12px)  - Buttons, small elements
rounded-lg (8px)   - Tags, badges
```

### Spacing Hierarchy

```
py-16 (64px) - Page wrapper ONLY
mb-12 (48px) - Major sections, page title
mb-8 (32px)  - Subsections
gap-6 (24px) - Card grids, related items
mb-4 (16px)  - Related elements
mb-3 (12px)  - Title to description
mb-2 (8px)   - Label to input
```

### Typography

```tsx
// Page titles
<h1 className="text-5xl font-medium text-white mb-3">

// Page descriptions
<p className="text-xl text-gray-400">

// Card titles
<h2 className="text-2xl font-medium text-white mb-4">

// Numbers (ALWAYS use font-mono!)
<span className="font-mono tabular-nums">1,234.56</span>
```

### Colors

```typescript
// Primary brand
digiko-primary: '#0066FF'
digiko-accent: '#00D4FF'

// States
Success: 'text-green-400', 'bg-green-500/10'
Error: 'text-red-400', 'bg-red-500/10'
Warning: 'text-yellow-400', 'bg-yellow-500/10'
Info: 'text-blue-400', 'bg-blue-500/10'

// Backgrounds
Dark: '#121214' (digiko-dark-300)
```

---

## Common Bugs & Solutions

### 1. "SameAccountError"

**Cause:** Sending tokens to yourself (sender = receiver)

**When it happens:** Testing swap with platform fee when user wallet = fee address

**Solution:** Use different address for testing, or temporarily set fee address to pool

```typescript
// Testing mode
const PLATFORM_FEE_ADDRESS = DGKO_POOL_ADDRESS;

// Production mode
const PLATFORM_FEE_ADDRESS = 'klv1slqck0vnxuj9uk0dp6rcv00xv2exnv3wcpf3286jquu79czyxw9qccyyrn';
```

### 2. "window.kleverWeb.sendTransaction is not a function"

**Cause:** Using deprecated/non-existent method

**Solution:** Use SDK 3-step flow

```typescript
// ❌ Wrong
await window.kleverWeb.sendTransaction(tx);

// ✅ Correct
const { web } = await import('@klever/sdk-web');
const unsigned = await web.buildTransaction([...]);
const signed = await web.signTransaction(unsigned);
await web.broadcastTransactions([signed]);
```

### 3. "window.kleverWeb.getAccountInfo is not a function"

**Cause:** Method doesn't exist on extension

**Solution:** Use kleverService

```typescript
// ❌ Wrong
await window.kleverWeb.getAccountInfo(address);

// ✅ Correct
import { kleverService } from '@/utils/klever';
await kleverService.getAccountInfo(address);
```

### 4. Transaction fails with no clear error

**Cause:** Using symbol instead of asset ID

**Solution:** Always use full asset ID

```typescript
// ❌ Wrong
kda: 'DGKO'

// ✅ Correct
kda: 'DGKO-CXVJ'
```

### 5. "Swap amount exceeds maximum"

**Original bug:** Validation comparing input amount (DGKO) with output reserve (USDT)

**Solution:** Compare calculated OUTPUT amount with 50% of output reserve

```typescript
// ✅ Correct validation
const outputAmount = (input * outputReserve) / (inputReserve + input);
const maxOutputAmount = outputReserve * 0.5;
if (outputAmount > maxOutputAmount) {
  throw new Error('Exceeds 50% of liquidity');
}
```

### 6. "RangeError: maximumFractionDigits out of range"

**Cause:** toLocaleString with minimumFractionDigits > maximumFractionDigits

**Solution:** Safe number formatting

```typescript
export function formatSwapAmount(amount: number, decimals: number = 4): string {
  if (!amount || isNaN(amount) || !isFinite(amount)) return '0.00';
  
  const safeDecimals = Math.min(Math.max(Math.floor(decimals), 0), 20);
  const minDecimals = Math.min(2, safeDecimals);  // min cannot exceed max!
  
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: safeDecimals,
  });
}
```

### 7. Page looks narrower than others

**Cause:** Using `max-w-6xl` (1152px) instead of `max-w-[1400px]`

**Solution:** Standardize all pages

```tsx
// ✅ Correct - matches all pages
<div className="max-w-[1400px] mx-auto px-6 lg:px-8">
```

### 8. Glass class doesn't exist

**Cause:** Using `glass-light` or other non-existent classes

**Valid classes:** Only `.glass` and `.glass-hover` exist

**Solution:** Use `bg-white/5` for lighter backgrounds

---

## Code Patterns

### Named Export for Components

```typescript
// ✅ Correct - ConnectWalletPrompt uses NAMED export
export function ConnectWalletPrompt({ ... }) { }

// Import:
import { ConnectWalletPrompt } from '@/components/ConnectWalletPrompt';

// ❌ Wrong - Don't use default import
import ConnectWalletPrompt from '...';  // Will fail!
```

### Window Type Declaration

```typescript
// Add at top of files using window.kleverWeb
declare global {
  interface Window {
    kleverWeb?: {
      initialize: () => Promise<void>;
      getWalletAddress: () => Promise<string>;
      // ... other methods
    };
  }
}
```

### useKlever Hook

```typescript
import { useKlever } from '@/context/KleverContext';

const { 
  address,       // string | null
  isConnected,   // boolean
  isConnecting,  // boolean
  balance,       // string (formatted KLV)
  connect,       // () => Promise<void>
  disconnect,    // () => void
  getAccountInfo // () => Promise<AccountInfo | null>
} = useKlever();
```

### Fetching Token Balance

```typescript
const fetchBalances = async () => {
  const accountInfo = await kleverService.getAccountInfo(address);
  
  // Find specific token
  const dgkoAsset = accountInfo.assets?.find(
    a => a.assetId === TOKEN_IDS.DGKO
  );
  
  if (dgkoAsset) {
    const available = (dgkoAsset.balance || 0) / DGKO_PRECISION;
    const staked = (dgkoAsset.frozenBalance || 0) / DGKO_PRECISION;
  }
};
```

---

## Development Workflow

### Git Commit Convention

When user says "let's git it":

1. **Determine version bump:**
   - MAJOR (1.0.0 → 2.0.0): Breaking changes, major features
   - MINOR (0.14.0 → 0.15.0): New features, non-breaking
   - PATCH (0.15.0 → 0.15.1): Bug fixes, small tweaks

2. **Update version displays:**
   - `src/components/DesktopMoreMenu.tsx` - Line ~103
   - `src/app/layout.tsx` - Footer version

3. **Add Updates page entry:**
   - `src/app/updates/page.tsx` - Add new entry at TOP of array

4. **Generate git commands:**
   ```bash
   git add .
   git commit -m "v0.15.0: Brief summary
   
   Detailed changes...
   - Feature 1
   - Fix 1
   - etc."
   git push
   ```

### Documentation Updates

When user says "let's document it":
- Update `src/app/documentation/page.tsx` (webapp user docs)
- Preserve existing sections
- Only modify relevant sections

### Project Rules (Summary)

1. Never truncate code
2. Work from latest ZIP
3. Don't modify node_modules/klever-sdk
4. Reference Klever docs for blockchain features
5. Follow design guide strictly
6. Return full files (not diffs)
7. Ask before assumptions
8. No unnecessary boilerplate
9. Follow naming conventions
10. Specify dev/staging/prod for commands
11. Clean, copy-paste ready commands
12. No speculative features
13. Request console logs when needed

---

## File Reference

### Key Files & Line Counts

| File | Lines | Purpose |
|------|-------|---------|
| staking/page.tsx | 1,310 | Staking interface (most complex) |
| documentation/page.tsx | 861+ | User documentation |
| dgko/page.tsx | 602 | DGKO token page |
| babydgko/page.tsx | 642 | BABYDGKO token page |
| swap/page.tsx | 599 | Swap interface |
| updates/page.tsx | 360+ | Version changelog |
| layout.tsx | ~150 | Root layout + nav |
| dashboard/page.tsx | 107 | Simple dashboard |

### Component Files

| Component | Purpose | Key Exports |
|-----------|---------|-------------|
| TokenImage.tsx | Token logo fetcher | `TokenImage`, `TOKEN_IDS` |
| ConnectWalletPrompt.tsx | Connection UI | `ConnectWalletPrompt` (named!) |
| TokenSelector.tsx | Token dropdown | For staking token selection |
| MobileMenu.tsx | Mobile nav | Hamburger menu |
| DesktopMoreMenu.tsx | Burger menu | Version display |
| TokensDropdown.tsx | Tokens nav | DGKO/BABYDGKO links |

### Utility Files

| Utility | Purpose | Key Exports |
|---------|---------|-------------|
| klever.ts | Klever service | `kleverService`, `TransactionType` |
| constants.ts | Config | `NETWORKS`, `TX_TYPES`, `formatKLV` |
| swapCalculations.ts | AMM math | `calculateSwapOutput`, `formatSwapAmount` |
| swapStorage.ts | LocalStorage | Swap history management |

---

## Testing Checklist

### Before Any Transaction Feature

- [ ] Using correct asset IDs (DGKO-CXVJ, not DGKO)
- [ ] Using SDK 3-step flow (not deprecated methods)
- [ ] Proper precision (4 for DGKO, 8 for BABYDGKO, 6 for KLV/USDT)
- [ ] Error handling with user-friendly messages
- [ ] Loading states during transactions
- [ ] Console logs for debugging

### Before Commit

- [ ] Page loads without errors
- [ ] No console errors
- [ ] Design matches other pages (width, spacing)
- [ ] Mobile responsive
- [ ] Version numbers updated
- [ ] Updates page entry added
- [ ] Documentation updated if relevant

### Swap Feature Specific

- [ ] Quote calculates correctly
- [ ] Price impact shows correct colors
- [ ] Minimum received calculated
- [ ] Two transactions in one approval
- [ ] Platform fee goes to correct address
- [ ] Transaction history updates
- [ ] Error handling for all failure cases

### Production Checklist

- [ ] Platform fee address set correctly (not pool!)
- [ ] All asset IDs verified
- [ ] Pool addresses verified
- [ ] Test from different wallet (not fee address)
- [ ] Small amount test first
- [ ] Monitor first transactions

---

## Quick Reference Card

### Must Remember

```typescript
// Asset IDs (NEVER symbols!)
DGKO: 'DGKO-CXVJ'
BABYDGKO: 'BABYDGKO-3S67'
KLV: 'KLV'
USDT: 'USDT'

// Precision
DGKO: 10000 (4 decimals)
BABYDGKO: 100000000 (8 decimals)
KLV: 1000000 (6 decimals)
USDT: 1000000 (6 decimals)

// SDK Flow
1. web.buildTransaction([...])
2. web.signTransaction(unsigned)
3. web.broadcastTransactions([signed])

// Container
max-w-[1400px] mx-auto px-6 lg:px-8

// Page wrapper
min-h-screen py-16

// Glass classes
.glass, .glass-hover (NO glass-light!)

// API
https://api.mainnet.klever.org (NOT .finance)
```

### Addresses

```
DGKO Pool: klv1pvckvh3yshmjulq4ntnkd0rmf94la6c37ykswvrcm5sy03neh3lq8dnv2h
USDT Pool: 0x2D94860736e09b08FF9Ea2a6E760748598A9f8FF
Fee Address: klv1slqck0vnxuj9uk0dp6rcv00xv2exnv3wcpf3286jquu79czyxw9qccyyrn
```

### Fees

```
Blockchain: 3 KLV per transaction
Platform (Swap): 10 KLV
Total Swap Fee: ~16 KLV (2 transactions + 10 KLV)
```

---

## TransactionModal Component System

### Overview
Supreme transaction feedback system created November 25, 2025 to replace basic alert() popups and inline error messages with premium, animated modals.

### Component Location
```
src/components/TransactionModal.tsx (335 lines)
```

### Integration Points
- **Staking Page:** All 4 transaction types (Stake, Unstake, Claim, Withdraw)
- **Swap Page:** Swap transactions with formatted amounts

### Key Design Decisions

#### 1. No Backdrop Blur (Performance)
**Problem:** backdrop-blur-md on 70% black overlay barely visible but causes 40-50 FPS on budget phones  
**Solution:** Removed backdrop-blur, kept 70% black overlay  
**Result:** 55-60 FPS on all devices, no visual difference

#### 2. Supreme Typography
**Decision:** Use negative letter spacing and precise rem sizes for premium feel  
**Pattern:**
```tsx
Title: text-[2rem] font-bold tracking-[-0.02em] antialiased
Message: text-base font-medium tracking-[-0.01em] antialiased
TX Hash Label: text-[0.6875rem] font-semibold tracking-[0.08em] uppercase
```
**Reason:** Creates fintech-grade polish, distinct from generic modals

#### 3. Celebration Particles
**Count:** 24 particles (doubled from initial 12)  
**Colors:** 7-color palette (green, emerald, digiko blue/cyan, amber, yellow)  
**Animation:** Pure CSS with CSS variables for position  
**Key Code:**
```tsx
style={{
  '--particle-x': `${particle.x}px`,
  '--particle-y': `${particle.y}px`,
} as React.CSSProperties}
```
**Performance:** 60 FPS because CSS animations are GPU-accelerated

#### 4. Font Weight Exception
**Design Guide Rule:** "NEVER use font-bold (700)"  
**Exception for Modals:** Allowed in TransactionModal for emphasis  
**Reason:** Modals are temporary, high-attention moments where bold is appropriate  
**Everywhere Else:** Stick to font-semibold (600)

### Status-Based Theming

#### Success State
```tsx
gradient: 'from-green-500/20 via-emerald-500/20 to-green-500/20'
buttonGradient: 'from-green-500 to-emerald-500'
glow: 'shadow-[0_0_80px_rgba(16,185,129,0.4)]'
```
- 24 celebration particles
- Pulsing animated rings
- Checkmark with bounce animation
- Auto-dismiss after 5s

#### Error State
```tsx
gradient: 'from-red-500/20 via-rose-500/20 to-red-500/20'
buttonGradient: 'from-red-500 to-rose-500'
glow: 'shadow-[0_0_80px_rgba(239,68,68,0.4)]'
```
- Shake animation
- Pulsing warning rings
- X icon with red gradient

#### Loading State
```tsx
gradient: 'from-digiko-primary/20 via-digiko-accent/20 to-digiko-primary/20'
buttonGradient: 'from-digiko-primary to-digiko-accent'
glow: 'shadow-[0_0_80px_rgba(0,102,255,0.4)]'
```
- Dual spinning rings (opposite directions)
- Pulsing glow effect
- Modal cannot be closed (prevents accidental dismissal)

### Modal State Management Pattern

**Standard Pattern for All Pages:**
```tsx
// State
const [modalOpen, setModalOpen] = useState(false);
const [modalStatus, setModalStatus] = useState<TransactionStatus>('loading');
const [modalTitle, setModalTitle] = useState('');
const [modalMessage, setModalMessage] = useState('');
const [modalTxHash, setModalTxHash] = useState<string | undefined>(undefined);

// Helper Functions
const showSuccessModal = (title: string, message?: string, txHash?: string) => {
  setModalStatus('success');
  setModalTitle(title);
  setModalMessage(message || '');
  setModalTxHash(txHash);
  setModalOpen(true);
};

const showErrorModal = (title: string, message: string) => {
  setModalStatus('error');
  setModalTitle(title);
  setModalMessage(message);
  setModalTxHash(undefined);
  setModalOpen(true);
};

const showLoadingModal = (title: string, message?: string) => {
  setModalStatus('loading');
  setModalTitle(title);
  setModalMessage(message || '');
  setModalTxHash(undefined);
  setModalOpen(true);
};

const closeModal = () => {
  setModalOpen(false);
  setModalTxHash(undefined);
};
```

### Transaction Handler Pattern

**Before (Old Way):**
```tsx
try {
  // transaction logic
  alert(`Success! TX: ${txHash}`);
} catch (error) {
  setErrorMessage(error.message);
}
```

**After (With Modal):**
```tsx
showLoadingModal('Processing Transaction', 'Please wait...');
try {
  // transaction logic
  showSuccessModal(
    'Transaction Successful',
    'Your tokens have been staked!',
    txHash
  );
} catch (error) {
  showErrorModal('Transaction Failed', error.message);
}
```

---

## Legendary Unstaking Queue Design

### Overview
Complete redesign of unstaking queue cards (November 25, 2025) with premium animations, status visualization, and embedded action buttons.

### Key Visual Elements

#### 1. Ready-to-Claim Cards
**Features:**
- Pulsing green checkmark icon (w-10 h-10) with glow animation
- Shimmer overlay sweeping left-to-right (2s infinite)
- Top highlight line: `bg-gradient-to-r from-transparent via-green-400/50 to-transparent`
- Small status badge: `px-3 py-1.5 rounded-lg text-xs`
- Full-width withdraw button with down arrow at bottom
- Bouncing arrow CTA text above button

**Background:**
```tsx
bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-green-500/10
border-green-500/40
shadow-[0_0_40px_rgba(34,197,94,0.15)]
hover:shadow-[0_0_60px_rgba(34,197,94,0.25)]
```

#### 2. Unstaking-in-Progress Cards
**Features:**
- Premium progress bar with gradient-flow animation (3s)
- Shimmer overlay on progress bar (3s slow)
- Percentage display with Digiko accent color
- Status badge showing time remaining (e.g., "3d 5h remaining")
- No action button (not ready yet)

**Progress Bar:**
```tsx
bg-gradient-to-r from-digiko-primary via-digiko-accent to-digiko-primary
bg-[length:200%_100%]
animate-gradient-flow
shadow-[0_0_15px_rgba(0,102,255,0.5)]
```

### Design Decisions

#### 1. Small Badges Instead of Large
**Problem:** Initial badge was too prominent (px-4 py-2, text-sm, font-bold)  
**Solution:** Reduced to px-3 py-1.5, text-xs, font-semibold  
**Reason:** Maintains hierarchy - amount should be primary focus, badge is secondary status indicator

#### 2. Button Inside Card at Bottom
**Problem:** Initial design had "Withdraw All" button in header, CTA text in card  
**Solution:** Removed header button, added full-width button at bottom of each ready card  
**Reason:** 
- Per-card action is more intuitive than bulk action
- Down arrow metaphor matches "withdraw" concept
- Cleaner header without competing elements
- Better mobile UX (larger tap target)

#### 3. Font Weight Corrections
**Violations Found:** 3 instances of font-bold (700)  
**Fixed To:** font-semibold (600)  
**Locations:**
- Unstaking Queue title
- Card amount display
- Withdraw button

**Critical:** Design guide explicitly prohibits font-bold except in modals

### Premium Animations

#### Shimmer (Fast - 2s)
```css
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```
**Usage:** Success card overlays, ready state indicators

#### Shimmer Slow (3s)
**Usage:** Progress bar shine, subtle overlays

#### Gradient Flow (3s)
```css
@keyframes gradient-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```
**Usage:** Progress bars - MUST use `bg-[length:200%_100%]`

#### Pulse Glow (2s)
```css
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.4); }
  50% { box-shadow: 0 0 30px rgba(34, 197, 94, 0.6); }
}
```
**Usage:** Success icons, checkmarks

### Code Architecture

**Key Pattern:** Calculate progress and ready state per card
```tsx
unstakingQueue.map((item, index) => {
  const nowInSeconds = Math.floor(Date.now() / 1000);
  const isReady = item.unlockTime <= nowInSeconds;
  const progress = isReady ? 100 : calculateProgress(item.unlockTime);
  
  return (
    <div className={isReady ? readyStyles : unstakingStyles}>
      {/* Conditional rendering based on isReady */}
    </div>
  );
})
```

**Helper Functions:**
```tsx
formatTimeRemaining(unlockTime: number): string
calculateProgress(unlockTime: number): number
```

---

## Design Guide v1.7 Updates

### New Sections Added

1. **TransactionModal Component** (Complete specifications)
2. **Legendary Card Design** (Ready vs Unstaking patterns)
3. **Premium Animation System** (4 animations with code)
4. **Button Inside Card Pattern** (Full-width with icon examples)
5. **Design Checklists** (TransactionModal, Legendary Card, Animation)

### Critical Rule Clarifications

#### Font-Bold Exception
**Old Rule:** "NEVER use font-bold (700)"  
**Clarification:** Allowed ONLY in TransactionModal for emphasis  
**Everywhere Else:** Use font-semibold (600) maximum

#### Negative Letter Spacing
**New Pattern:** tracking-[-0.02em], tracking-[-0.01em]  
**Usage:** Premium typography in modals, large amounts, titles  
**Reason:** Creates modern, refined fintech aesthetic

#### Badge Sizing
**Standard Badge:** px-3 py-1.5 rounded-lg text-xs  
**Usage:** Status indicators (Ready, Pending, etc.)  
**Anti-Pattern:** px-4 py-2 text-sm (too large)

### Design Audit Results

**Violations Found:**
- 3 instances of font-bold in staking page (FIXED)
- No backdrop blur in TransactionModal (CORRECT - performance)
- Custom tracking values not documented (ADDED TO v1.7)

**Compliance Verified:**
- Glass morphism patterns ✓
- Color system usage ✓
- Spacing consistency ✓
- Rounded corners ✓
- Transition timings ✓

---

## Lessons Learned

### 1. Performance Over Aesthetics
**Learning:** backdrop-blur on 70% black overlay barely visible but costs 10-20 FPS  
**Application:** Remove when visual benefit is minimal  
**Result:** Butter-smooth animations on all devices

### 2. Celebration Details Matter
**Learning:** Doubling particles from 12 to 24 made huge UX difference  
**Application:** Don't be conservative with success celebration  
**Result:** Users feel rewarded for completing transactions

### 3. Hierarchy Through Size
**Learning:** Large badge competed with amount for attention  
**Application:** Status badges should be small, subtle  
**Result:** Clear visual hierarchy, amount is primary focus

### 4. Per-Item Actions Beat Bulk Actions
**Learning:** "Withdraw All" button in header was confusing  
**Application:** Put action button inside each ready card  
**Result:** More intuitive, better mobile UX

### 5. CSS Animations Scale Better
**Learning:** Pure CSS animations handle 24 particles at 60 FPS  
**Application:** Avoid JavaScript animation loops when possible  
**Result:** Performant on all devices

### 6. Design Guide Evolution
**Learning:** New patterns emerged that weren't documented  
**Application:** Update design guide immediately when establishing new patterns  
**Result:** v1.7 with comprehensive new sections

---

## Admin Panel System

### Overview
Password-protected admin panel with SHA-256 hashing, brute force protection, session management, and premium login UI. Admin panel accessible at `/admin` route, contains design system access and framework for future admin tools.

**Location:** `/src/app/admin/page.tsx` (~630 lines)  
**Default Password:** `Digiko2025!` (MUST be changed)  
**Access:** http://localhost:3000/admin  
**Status:** 🔒 CONFIDENTIAL - Not documented publicly

### Security Architecture

#### Authentication Flow
```
User visits /admin
    ↓
Check localStorage for session
    ↓
Session valid (< 24h)? → Show dashboard
    ↓
No session → Show login form
    ↓
User enters password → Hash with SHA-256 → Compare
    ↓
Match → Create session → Dashboard
No match → Increment attempts → Error (max 5 attempts)
    ↓
5 failed attempts → Lockout for 5 minutes
```

#### Password Hashing
- **Algorithm:** SHA-256 (client-side using Web Crypto API)
- **Storage:** Hash stored as constant in code
- **Method:** `crypto.subtle.digest('SHA-256', encodedPassword)`
- **Output:** 64-character hexadecimal string

**Example:**
```typescript
// Password: "Digiko2025!"
// Hash: "cb50185bb0b68ea1a90d1611f59161b95fbd6434c6db21f102054c9c55220958"

const ADMIN_PASSWORD_HASH = 'cb50185bb0b68ea1a90d1611f59161b95fbd6434c6db21f102054c9c55220958';
```

#### Session Management
- **Storage:** localStorage (`digiko_admin_auth`, `digiko_admin_auth_time`)
- **Duration:** 24 hours
- **Check:** On component mount via useEffect
- **Calculation:** `timeDiff < 24 * 60 * 60 * 1000`
- **Manual logout:** Clears localStorage, sets `isAuthenticated = false`

#### Brute Force Protection
- **Max attempts:** 5
- **Lockout duration:** 5 minutes
- **Implementation:** State tracking (`attempts`, `isLocked`)
- **Reset:** `setTimeout(() => { setIsLocked(false); setAttempts(0); }, 5 * 60 * 1000)`

### Design Decisions

#### Login UI Design
**Decision:** Premium glass morphism login form with gradient lock icon, matching app aesthetic.

**Justification:** NECESSARY
- Admin panel is part of the Digiko brand
- Should feel cohesive with main app
- Premium look reinforces security/professionalism

**Implementation:**
- Glass morphism card (`.glass` utility)
- Gradient lock icon (`from-digiko-primary to-digiko-accent`)
- Password visibility toggle (eye icon)
- Error alerts with icons
- Security notice with bullet points
- Premium button with shine effect

**Design Guide Impact:** No new patterns - used existing glass morphism, gradients, and button styles from design guide v1.7

#### Dashboard Header
**Decision:** Added logout button in top-right of admin dashboard header.

**Justification:** NECESSARY
- Users need ability to manually end session
- Standard UX pattern for authenticated areas
- Security best practice

**Design Guide Impact:** No new patterns - used existing button styling (white/5 background, border patterns, hover states)

### Component State Management

```typescript
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [isLoading, setIsLoading] = useState(true);
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [showPassword, setShowPassword] = useState(false);
const [attempts, setAttempts] = useState(0);
const [isLocked, setIsLocked] = useState(false);
const [copiedItem, setCopiedItem] = useState<string | null>(null);
```

**Key States:**
- `isAuthenticated`: Controls login form vs dashboard display
- `isLoading`: Shows loading spinner during auth check
- `attempts`: Tracks failed login attempts
- `isLocked`: Disables form after 5 failed attempts

### Password Management

#### Changing Admin Password

**Method 1: Online Tool (Recommended)**
1. Visit: https://emn178.github.io/online-tools/sha256.html
2. Enter new password
3. Copy SHA-256 hash
4. Update `ADMIN_PASSWORD_HASH` constant (line ~11 in admin/page.tsx)
5. Save and restart server

**Method 2: Generator Script**
```bash
node generate-admin-password.js "NewPassword123!"
# Outputs hash with strength analysis
```

**Method 3: Browser Console**
```javascript
const password = 'NewPassword123!';
const encoder = new TextEncoder();
const data = encoder.encode(password);
crypto.subtle.digest('SHA-256', data).then(hashBuffer => {
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  console.log('Hash:', hashHex);
});
```

### Common Issues & Solutions

#### Issue: Next.js 404 Errors After Installing Admin Page
**Symptoms:** `layout.css: 404`, `main-app.js: 404`, `app-pages-internals.js: 404`

**Cause:** Next.js build cache confusion after adding new pages

**Solution:**
```bash
cd /path/to/project
rm -rf .next
rm -rf node_modules/.cache
npm run dev
```

**Prevention:** Always clear `.next` after major structural changes

#### Issue: Can't Login with Correct Password
**Symptoms:** Correct password rejected

**Solutions:**
```javascript
// Clear localStorage
localStorage.clear();
location.reload();

// Regenerate hash and verify
node generate-admin-password.js "YourPassword"
```

#### Issue: Locked Out (5 Failed Attempts)
**Solutions:**
```javascript
// Option 1: Wait 5 minutes (automatic unlock)

// Option 2: Clear lockout manually
localStorage.removeItem('digiko_admin_lockout');
location.reload();
```

### Security Considerations

#### Current Implementation (Development)
✅ Client-side SHA-256 hashing  
✅ Brute force protection (5 attempts)  
✅ Session management (24h expiration)  
✅ Manual logout functionality  
✅ Password visibility toggle  
✅ Loading states and error handling  

#### Production Recommendations
⚠️ Server-side authentication (API routes)  
⚠️ Use bcrypt for password hashing  
⚠️ Environment variables for secrets  
⚠️ Rate limiting on server  
⚠️ Two-factor authentication (2FA)  
⚠️ IP whitelisting  
⚠️ HTTPS only  
⚠️ Logging and monitoring  
⚠️ Session tokens instead of localStorage  

#### Why Client-Side is OK for Development
- No sensitive user data exposed
- Admin controls non-critical features (design system, etc.)
- Quick to implement and test
- Easy password changes without backend
- Session management sufficient for single admin

#### Why Production Needs Server-Side
- Attackers can view client-side code
- localStorage can be manipulated
- No audit trail of access attempts
- Cannot enforce IP restrictions
- Cannot implement true rate limiting

### Admin Tools Architecture

#### Current Structure
```typescript
const tools = [
  {
    category: 'Design & Development',
    items: [
      { id: 'design-system', status: 'active', href: '/design-system', ... }
    ]
  },
  {
    category: 'Analytics & Monitoring',
    items: [
      { id: 'analytics', status: 'coming', href: '#', ... },
      { id: 'logs', status: 'coming', href: '#', ... }
    ]
  },
  // ... more categories
];
```

#### Adding New Tools
1. Locate tools array (line ~231 in admin/page.tsx)
2. Choose appropriate category
3. Add tool object:
```typescript
{
  id: 'new-tool',
  title: 'New Tool',
  description: 'Tool description',
  icon: <SVGIcon />,
  href: '/new-tool',
  status: 'active', // or 'coming'
  badge: 'Live', // or 'Coming Soon'
  badgeColor: 'green' // or 'blue'
}
```
4. Stats auto-calculate from tools array

#### Tool Status Types
- `active`: Clickable, links to actual page, green badge
- `coming`: Disabled, cursor-not-allowed, blue badge, onClick preventDefault

### File Locations

**Main Files:**
- `/src/app/admin/page.tsx` - Secured admin panel (~630 lines)
- `/generate-admin-password.js` - Password hash generator (optional, in project root)

**Documentation (Internal Only):**
- `INTERNAL_DEV_DOCS.md` - This file
- `ADMIN_SECURITY_GUIDE.md` - Complete security documentation
- `FIX_404_ERRORS.md` - Next.js troubleshooting

**NOT in Public Docs:**
- Admin panel not mentioned in `/documentation` page
- Admin features not listed in `/updates` page
- Admin is strictly confidential, accessed only by direct URL

### Admin Panel Lessons Learned

#### 1. Next.js Build Cache is Fragile
**Problem:** Adding new pages causes 404 errors for chunks  
**Solution:** Always `rm -rf .next` after structural changes  
**Prevention:** Consider npm script: `"dev:fresh": "rm -rf .next && next dev"`

#### 2. Client-Side Auth Has Limits
**Good for:** Development, non-sensitive admin tools  
**Bad for:** Production, user data, financial operations  
**Decision:** Client-side OK for design system access, plan server-side for future

#### 3. Password Changes Need Clear Documentation
**Problem:** Users don't know how to generate SHA-256 hashes  
**Solution:** Multiple methods (online tool, script, console)  
**Best:** Online tool (no installation, instant, visual)

#### 4. Security UX Matters
**Problem:** Users frustrated by lockouts without feedback  
**Solution:** Clear error messages with remaining attempts  
**Result:** Users understand security measures, not annoyed

#### 5. Session Duration is Configurable
**Default:** 24 hours (good balance)  
**Adjustable:** Easy to change (single line of code)  
**Consider:** User preference setting in future

### Design Guide Compliance

**Patterns Used (All from existing design guide v1.7):**
- Glass morphism (`.glass`, backdrop-blur, bg-white/5)
- Color scheme (digiko-primary, digiko-accent)
- Border styling (border-white/10, hover:border-white/20)
- Typography (font-semibold, tracking-tight)
- Spacing (px-6 py-4, mb-12, gap-4)
- Hover states (hover:bg-white/10, hover:scale-105)
- Transitions (transition-all, duration-500)
- Icons (heroicons SVG, w-5 h-5)

**No New Patterns Introduced:**
All design decisions matched existing patterns. No design guide updates needed for admin panel.

### Configuration Variables

**Easily Adjustable:**
```typescript
// Session duration (line ~42)
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Max login attempts (line ~66)
const MAX_ATTEMPTS = 5;

// Lockout duration (line ~71)
const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes

// Password hash (line ~11)
const ADMIN_PASSWORD_HASH = 'your-hash-here';
```

**Consider:** Moving to environment variables for production

---

## Modular Architecture Pattern

**Added:** November 26, 2025 (v0.18.0)  
**Impact:** Staking page (1,442 → 184 lines main file), DGKO page (601 → 77 lines main file)  
**Status:** ✅ Proven pattern, ready for BABYDGKO and Swap refactors

### The Problem: Monolithic Page Files

**Before Refactor:**
- Single files with 600-1,400+ lines
- Mixed concerns (UI, logic, config, types, data fetching)
- Hard to find specific features
- Difficult for AI assistants to process
- Updates risked breaking unrelated code
- No code reusability between pages

**Examples:**
- `staking/page.tsx`: 1,442 lines (UI + logic + config + types + API calls)
- `dgko/page.tsx`: 601 lines (inline components, constants, fetching, rendering)

### The Solution: Modular Architecture

**After Refactor:**
- Main page as clean orchestrator (77-184 lines)
- Separated by responsibility into focused files
- Each file has ONE clear purpose
- Easy to navigate and find code
- AI can see complete files
- Reusable components and hooks

### Directory Structure Pattern

```
src/app/[page-name]/
├── page.tsx                    # Main orchestrator (77-184 lines)
│                               # - Imports components
│                               # - Uses hooks for data
│                               # - Clean JSX structure
│                               # - NO business logic
│
├── types/
│   └── [page].types.ts         # ALL TypeScript interfaces
│                               # - One file for all types
│                               # - Export all interfaces
│                               # - Clean, focused definitions
│
├── config/
│   └── [page].config.tsx       # Constants & static data
│                               # - ⚠️ MUST be .tsx if contains JSX (icons)
│                               # - Token IDs, precisions
│                               # - Static arrays (tokenomics, roadmap)
│                               # - SVG icons
│                               # - NO logic, just data
│
├── hooks/
│   ├── useModal.ts             # Modal state management
│   ├── useData.ts              # Data fetching & processing
│   ├── useActions.ts           # Transaction handlers
│   └── useStats.ts             # Statistics fetching
│                               # - Business logic only
│                               # - API calls
│                               # - State management
│                               # - NO UI components
│
└── components/
    ├── Header.tsx              # Page title
    ├── StatsGrid.tsx           # Statistics display
    ├── Card.tsx                # Feature cards
    └── Section.tsx             # Major sections
                                # - UI components only
                                # - Receive props
                                # - Render UI
                                # - NO business logic
```

### File Naming Conventions

**Types:**
- Format: `[page].types.ts` (singular)
- Example: `staking.types.ts`, `dgko.types.ts`
- Contains: All TypeScript interfaces for the page

**Config:**
- Format: `[page].config.tsx` (⚠️ .tsx if contains JSX!)
- Example: `staking.config.ts`, `dgko.config.tsx`
- Contains: Constants, static data, icons

**Hooks:**
- Format: `use[Purpose].ts` (camelCase)
- Example: `useModal.ts`, `useStakingData.ts`, `useTokenStats.ts`
- Contains: Business logic, data fetching, state management

**Components:**
- Format: `[ComponentName].tsx` (PascalCase)
- Example: `StakingHeader.tsx`, `DonutChart.tsx`
- Contains: UI only, receives props, renders JSX

### Critical File Extension Rule

**⚠️ ABSOLUTELY CRITICAL:**

```
Config files with JSX icons MUST use .tsx extension!
```

**Problem:**
```typescript
// ❌ WRONG: dgko.config.ts
export const Icons = {
  fire: (
    <svg>...</svg>  // ← JSX in .ts file = BUILD ERROR
  )
};
```

**Solution:**
```typescript
// ✅ CORRECT: dgko.config.tsx
export const Icons = {
  fire: (
    <svg>...</svg>  // ← JSX in .tsx file = Works!
  )
};
```

**Error if wrong:**
```
Error: Expected '>', got 'className'
× Syntax Error
```

**Fix:**
```bash
mv config/file.config.ts config/file.config.tsx
```

### Separation of Concerns

**Main page.tsx:**
```typescript
// ✅ GOOD
import { useData } from './hooks/useData';
import { Header } from './components/Header';

export default function Page() {
  const { stats, loading } = useData();
  
  return (
    <>
      <Header />
      <StatsGrid stats={stats} loading={loading} />
    </>
  );
}
```

**NOT this:**
```typescript
// ❌ BAD
export default function Page() {
  const [stats, setStats] = useState();
  
  useEffect(() => {
    fetch('api...').then(r => r.json()).then(data => {
      // 50 lines of processing...
      setStats(processedData);
    });
  }, []);
  
  return (
    <>
      <div className="glass...">
        {/* Inline components everywhere */}
      </div>
    </>
  );
}
```

### Benefits Achieved

**Maintainability:**
- ✅ Find features in seconds (not minutes)
- ✅ Update one file without breaking others
- ✅ Clear file purposes
- ✅ Easy onboarding for new developers

**Scalability:**
- ✅ Add new features easily
- ✅ Reuse components across pages
- ✅ Share hooks between similar pages
- ✅ Established patterns to follow

**Developer Experience:**
- ✅ 87% smaller main files
- ✅ Faster navigation
- ✅ Better IDE performance
- ✅ AI can process complete files
- ✅ Faster debugging

**Code Quality:**
- ✅ Single Responsibility Principle
- ✅ DRY (Don't Repeat Yourself)
- ✅ Clear dependencies
- ✅ Testable units

### Real Results

**Staking Page Refactor:**
```
BEFORE: 1 file, 1,442 lines
AFTER:  15 files, ~1,850 lines total
        Main file: 184 lines (87% reduction!)

Files:
- page.tsx (184 lines) - Orchestrator
- types/staking.types.ts (36 lines)
- config/staking.config.ts (68 lines)
- hooks/ (4 files, 980 lines)
  - useModal.ts
  - useStakingStats.ts
  - useStakingData.ts
  - useStakingActions.ts
- components/ (8 files, 579 lines)
  - DevModeBanner.tsx
  - StakingHeader.tsx
  - StakingStatsGrid.tsx
  - StakeCard.tsx
  - RewardsCard.tsx
  - UnstakingCard.tsx
  - UnstakingQueueItem.tsx
  - HowItWorksSection.tsx
```

**DGKO Page Refactor:**
```
BEFORE: 1 file, 601 lines
AFTER:  16 files, 852 lines total
        Main file: 77 lines (87% reduction!)

Files:
- page.tsx (77 lines) - Orchestrator
- types/dgko.types.ts (54 lines)
- config/dgko.config.tsx (105 lines) ← .tsx for icons!
- hooks/useTokenStats.ts (77 lines)
- components/ (12 files, 539 lines)
  - DGKOHeader.tsx
  - StakingOverviewCard.tsx
  - TokenActivityCards.tsx
  - DonutChart.tsx
  - TokenomicsSection.tsx
  - OnChainDataGrid.tsx
  - EcosystemCard.tsx
  - EcosystemGrid.tsx
  - RoadmapSection.tsx
  - TokenDetailsAndTradeSection.tsx
  - CommunitySection.tsx
  - CTASection.tsx
```

### Reusability Wins

**Between DGKO and BABYDGKO:**
- `DonutChart.tsx` - Same component
- `useTokenStats.ts` - Same API pattern
- `EcosystemCard.tsx` - Reusable
- `TokenomicsSection.tsx` - Same structure

**Estimated BABYDGKO refactor time:** 30 minutes (vs 2+ hours from scratch)

### Common Patterns

**Hook Structure:**
```typescript
// hooks/useData.ts
export function useData() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  
  const fetchData = async () => {
    // API logic
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  return { data, loading, refetch: fetchData };
}
```

**Component Structure:**
```typescript
// components/Card.tsx
interface CardProps {
  title: string;
  value: number;
  loading: boolean;
}

export function Card({ title, value, loading }: CardProps) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="text-sm text-gray-400">{title}</div>
      <div className="text-2xl text-white">
        {loading ? '—' : value}
      </div>
    </div>
  );
}
```

**Config Structure:**
```typescript
// config/page.config.tsx
export const ASSET_ID = 'DGKO-CXVJ';
export const PRECISION = 10000;

export const staticData = [
  { label: 'Item 1', value: 40 },
  { label: 'Item 2', value: 25 },
];

export const Icons = {
  fire: (
    <svg className="w-5 h-5">...</svg>
  ),
};
```

### Refactoring Workflow

**Step 1: Create Structure**
```bash
mkdir -p src/app/[page]/{types,config,hooks,components}
```

**Step 2: Extract Types**
- Create `types/[page].types.ts`
- Move all interfaces
- Export everything

**Step 3: Extract Config**
- Create `config/[page].config.tsx` (or .ts)
- Move constants, static arrays
- Move icons (requires .tsx!)
- NO logic, just data

**Step 4: Extract Hooks**
- Create hooks for each concern:
  - Data fetching → `useData.ts`
  - Actions → `useActions.ts`
  - Stats → `useStats.ts`
  - Modal → `useModal.ts`
- One hook per file
- Business logic only

**Step 5: Extract Components**
- Identify UI sections
- Create one component per section
- Props for data, not business logic
- Keep focused and small

**Step 6: Create Main Page**
- Import all components
- Import all hooks
- Clean JSX structure
- No inline components
- No business logic

**Step 7: Test Everything**
- Verify all functionality works
- Check TypeScript compiles
- Test all user flows
- Verify API calls work

### Lessons Learned (November 26, 2025)

#### 1. Always Use .tsx for Config Files with JSX

**Problem:** Created `dgko.config.ts` with JSX icons  
**Error:** "Expected '>', got 'className'"  
**Solution:** Rename to `dgko.config.tsx`  
**Lesson:** If it has `<svg>` tags, it MUST be `.tsx`

#### 2. Preserve All Improvements When Refactoring

**Problem:** Used old DGKO version when refactoring (before v0.13.0 improvements)  
**Error:** Donut chart was fat (40px stroke) instead of thin (16px)  
**Solution:** Always check git history for latest version before refactoring  
**Lesson:** Verify you're working from the LATEST version, not an old one

**Improvements that were almost lost:**
- Thin donut chart (16px stroke)
- Segment gaps (2% spacing)
- Modern tech blue colors
- Better center text

#### 3. Clear .next Cache After Major Changes

**Problem:** Build errors even after fixing code  
**Solution:** `rm -rf .next` before rebuilding  
**Lesson:** Next.js caches aggressively, clear it for structural changes

#### 4. Modular = More Total Lines, But Better Quality

**Staking:** 1,442 → 1,850 lines (+408 lines)  
**DGKO:** 601 → 852 lines (+251 lines)

**Why this is good:**
- Separation of concerns
- Clear file purposes
- Reusable code
- Better documentation
- Easier maintenance

**Bad metric:** Total lines  
**Good metrics:** Maintainability, reusability, clarity

#### 5. Main File Size Reduction is the Key Metric

**Staking main file:** 1,442 → 184 lines (87% reduction)  
**DGKO main file:** 601 → 77 lines (87% reduction)

**Why this matters:**
- Easier to understand at a glance
- Faster to find issues
- Changes are localized
- AI can process entire files

#### 6. Patterns Enable Speed

**First refactor (Staking):** ~2 hours  
**Second refactor (DGKO):** ~45 minutes  
**Estimated third (BABYDGKO):** ~30 minutes

**Why:** Established patterns, reusable components, clear workflow

### Next Candidates for Refactoring

**Priority Order:**
1. ✅ Staking (DONE - v0.18.0)
2. ✅ DGKO (DONE - v0.18.0)
3. 🎯 BABYDGKO (641 lines) - HIGH PRIORITY
   - Can reuse DGKO components!
   - Estimated time: 30-45 minutes
   - High impact: Primary community token
4. 🎯 Swap (667 lines) - MEDIUM PRIORITY
   - Similar to staking pattern
   - Estimated time: 1-2 hours
   - Complex business logic

**Not Candidates:**
- Admin (630 lines) - Special security requirements, keep isolated
- Dashboard (107 lines) - Already small
- Updates (360 lines) - Simple data display
- Documentation (861 lines) - Content-focused

### Anti-Patterns to Avoid

**❌ Don't:**
- Mix business logic in components
- Put UI in hooks
- Create monolithic component files
- Use `.ts` for files with JSX
- Duplicate code between similar pages
- Skip type definitions
- Inline everything in main page

**✅ Do:**
- Keep components pure (props in, JSX out)
- Keep hooks focused (one purpose per hook)
- Use `.tsx` for any JSX content
- Share code via imports
- Define all types
- Extract reusable patterns
- Make main page readable

### File Size Guidelines

**Main page.tsx:**
- Target: 50-200 lines
- Maximum: 300 lines
- If larger: Extract more components

**Hooks:**
- Target: 30-100 lines per hook
- Maximum: 150 lines
- If larger: Split into multiple hooks

**Components:**
- Target: 20-80 lines
- Maximum: 150 lines
- If larger: Split into sub-components

**Config:**
- Target: 50-150 lines
- Maximum: 200 lines
- If larger: Split into multiple configs

**Types:**
- Target: 20-100 lines
- Maximum: 150 lines
- If larger: Group related types

### Testing After Refactor

**Checklist:**
1. ✅ TypeScript compiles with no errors
2. ✅ All pages load without errors
3. ✅ All API calls work
4. ✅ All user interactions work
5. ✅ All animations work
6. ✅ Styling is identical
7. ✅ Performance is same or better
8. ✅ Network switching works
9. ✅ Wallet integration works
10. ✅ Transaction flows work

**Test Commands:**
```bash
# Clear cache
rm -rf .next

# Check TypeScript
npm run build

# Start dev server
npm run dev

# Manual testing
# - Navigate to refactored page
# - Test all features
# - Check browser console for errors
# - Verify API calls in Network tab
```

### Documentation After Refactor

**Update These Files:**
1. ✅ INTERNAL_DEV_DOCS.md - Architecture section
2. ✅ Design guide - If new patterns added
3. ✅ Updates page - Changelog entry
4. ✅ Layout.tsx - Version number
5. ✅ Git commit - Comprehensive message

**Don't Update:**
- Public documentation (unless features changed)
- User-facing content (architecture is internal)

---

## Version History

| Version | Date | Highlights |
|---------|------|------------|
| 1.1.0 | Nov 28, 2024 | **Enhanced Error Logging System** - Comprehensive debug logs, Debug Mode, one-click copy |
| 1.0.0 | Nov 27, 2024 | Official v1.0.0 release - Platform stable and production-ready |
| 0.23.0 | Nov 27, 2025 | Roadmap component redesign with vertical timeline and quarterly milestones |
| 0.18.0 | Nov 26, 2025 | Staking & DGKO modular refactors, architecture pattern established |
| 0.17.0 | Nov 25, 2025 | Secured Admin Panel, Design System page, Admin Dashboard |
| 0.16.0 | Nov 25, 2025 | TransactionModal, Legendary UI, Design Guide v1.7 |
| 0.15.0 | Nov 25, 2025 | Swap feature launch |
| 0.14.0 | Nov 25, 2025 | BABYDGKO page, Tokens dropdown |
| 0.13.0 | Nov 24, 2025 | DGKO page redesign |
| 0.12.0 | Nov 24, 2025 | BABYDGKO staking, TokenSelector |
| 0.11.0 | Nov 24, 2025 | Documentation page, TokenImage |
| 0.10.0 | Nov 24, 2025 | Updates page, Telegram notifications |

---

## Recent Session: Enhanced Error Logging System (Nov 28, 2024)

### What Was Built

A comprehensive error logging and debugging system that transforms error handling from basic messages into detailed, actionable debug logs that users can copy with one click.

**Key Components:**
1. **Error Logging System** - Captures comprehensive context (browser, network, transaction, API details)
2. **Debug Mode** - Force errors for testing without breaking production (`?debug=true`)
3. **Enhanced TransactionModal** - "Copy Debug Log" button + collapsible technical details
4. **Debug Menu** - Floating bug button (🐛) with 8 error scenarios to force

**Files Created:**
- `src/types/errorLog.ts` - Type definitions
- `src/utils/errorLogger.ts` - Error logging utilities
- `src/utils/debugMode.ts` - Debug mode system
- `src/components/DebugMenu.tsx` - Floating debug menu
- `docs/dev/ERROR_LOGGING_SYSTEM.md` - Comprehensive documentation
- 8+ documentation files with examples and guides

**Files Modified:**
- `src/components/TransactionModal.tsx` - Added copy button + technical details
- `src/app/staking/hooks/useModal.ts` - Added errorLog support
- `src/app/staking/hooks/useStakingActions.ts` - Integrated error logging + debug checks
- `src/app/staking/page.tsx` - Pass errorLog to modal
- `src/app/layout.tsx` - Added DebugMenu component
- `src/app/documentation/config/documentation.config.tsx` - Added public documentation

### Problem Solved

**Before:**
```
User: "I got an error"
Support: "What error? What page? What browser? What were you doing?"
User: "I don't remember..."
Support: 😫 Hours of back-and-forth
```

**After:**
```
User: *clicks "Copy Debug Log"* → *sends log*
Support: *sees everything* → *fixes immediately* 😎
```

### What Gets Captured

- Error details (title, message, stack trace)
- Context (timestamp, page, component, action, wallet address)
- Environment (app version, network, browser, OS, device)
- Transaction details (type, token, amount, TX hash, gas)
- API details (endpoint, method, status, request/response)

### Debug Mode Features

Add `?debug=true` to URL → Red bug button appears → Select error scenario → Perform action → Error triggers!

**8 Error Scenarios:**
1. 💰 Insufficient Balance
2. ⏱️ API Timeout
3. 🔥 API Error
4. 📡 Network Error
5. ⛔ Transaction Failed
6. 🚫 Wallet Rejected
7. ❌ Invalid Address
8. 📉 Slippage Exceeded

### Key Learnings

1. **Cache Clearing is Critical** - After adding new components, MUST clear `.next` cache:
   ```bash
   rm -rf .next
   npm run dev
   ```

2. **Zip Structure Matters** - When creating zips for extraction, avoid nested folders. Use:
   ```bash
   cd project-root && zip -r output.zip .
   ```
   Not:
   ```bash
   zip -r output.zip project-root/
   ```

3. **Testing Before Deployment** - Always test debug features locally before deployment:
   - Go to `/staking?debug=true`
   - Click bug button
   - Force an error
   - Verify copy button works
   - Check technical details expand

4. **Privacy Matters** - Wallet addresses truncated automatically: `klv1abc7...def456`

5. **Design Compliance** - Error modals must match Digiko aesthetic:
   - Glass morphism
   - Blue color palette
   - Smooth animations
   - Mobile responsive

### Integration Pattern

```typescript
// 1. Import utilities
import { createErrorLog } from '@/utils/errorLogger';
import { checkForForcedError, debugLog } from '@/utils/debugMode';
import { ErrorLog } from '@/types/errorLog';

// 2. Update showErrorModal signature
showErrorModal: (title: string, message: string, errorLog?: ErrorLog) => void

// 3. Add debug checks + error logging
try {
  checkForForcedError('insufficient_balance');
  // Your operation...
} catch (error) {
  const errorLog = createErrorLog({
    title: 'Operation Failed',
    message: 'User-friendly message',
    error: error as Error,
    userAddress: address,
    component: 'PageName',
    action: 'What user was doing',
    transaction: { type, tokenSymbol, amount }
  });
  
  showErrorModal('Title', 'Message', errorLog);
}
```

### Next Steps

- ✅ Integrated in staking page
- ⏳ Integrate in swap page
- ⏳ Integrate in token pages
- ⏳ Integrate in dashboard
- ⏳ Add automatic error reporting to backend
- ⏳ Build error analytics dashboard

### Documentation

- **Public:** Enhanced error logging section in `/documentation`
- **Internal:** Complete system documentation in `docs/dev/ERROR_LOGGING_SYSTEM.md`
- **Guides:** 8+ developer guides with examples and integration patterns

### Benefits

- 10x faster support resolution
- Complete debugging context in one click
- Force errors for testing without breaking production
- Privacy-conscious (wallet addresses truncated)
- Design-compliant (matches Digiko aesthetic)

---

## Notes

### Things That Work Different Than Expected

1. **Klever assets = Object, not Array** - Must convert
2. **window.kleverWeb methods are limited** - Only initialize + getWalletAddress
3. **SDK methods via @klever/sdk-web** - buildTransaction, signTransaction, broadcastTransactions
4. **Rewards not in API** - Calculated on-chain during Claim
5. **Multiple transactions = one popup** - Bundled in buildTransaction array
6. **Next.js Cache** - MUST clear `.next` after structural changes or new components

### Things To Always Verify

1. Asset ID spelling (DGKO-CXVJ exactly)
2. Precision for each token
3. API domain (.org not .finance)
4. Container width (1400px)
5. Glass class names
6. Version numbers match everywhere
7. Clear `.next` cache after adding components

---

*This document is for internal development use only. Contains sensitive configuration data.*

*Last Updated: November 28, 2024 | v1.1.0 - Enhanced Error Logging System*