# Digiko Internal Development Documentation
## 🔒 CONFIDENTIAL - For Development Use Only

**Project:** Digiko Web3 DApp  
**Blockchain:** Klever  
**Framework:** Next.js 14 + TypeScript + Tailwind CSS  
**Last Updated:** November 27, 2025 (Roadmap Redesign)  
**Version:** 0.23.0

---

## 📚 Documentation Structure

This documentation is split into focused files for easier navigation:

### **Core Documentation**

1. **[🔧 Klever Integration](KLEVER_INTEGRATION.md)**
   - Critical addresses & asset IDs
   - Token configuration (DGKO, BABYDGKO, USDT)
   - Klever SDK integration patterns
   - Transaction workflows (stake, swap, claim)
   - API routes & CORS handling

2. **[📜 Smart Contract Development](CONTRACT_DEVELOPMENT.md)**
   - Contract structure & setup
   - Build process & configuration
   - Deployment guide (testnet & mainnet)
   - **Frontend Integration Challenges** ⚠️ NEW
   - Lessons learned & debugging

3. **[🏗️ Modular Architecture](MODULAR_ARCHITECTURE.md)**
   - Complete guide to page refactoring
   - Directory structure patterns
   - File naming conventions
   - Lessons learned from refactors
   - Reusability strategies
   - **Roadmap Component Redesign** ⭐ NEW
   - Vertical timeline with quarterly milestones

4. **[🎨 Token Images & Logos](TOKEN_IMAGES.md)**
   - Klever API token images
   - Custom logo configuration
   - 3-tier fallback system
   - Troubleshooting guide
   - Best practices

5. **[🎨 Design System](DESIGN_SYSTEM.md)**
   - Glass morphism patterns
   - Color palette & typography
   - Component guidelines
   - Animation standards

6. **[🐛 Enhanced Error Logging](ERROR_LOGGING_SYSTEM.md)** ⭐ NEW
   - Comprehensive error capture system
   - Debug mode for testing
   - User-friendly error reporting
   - Complete debugging information
   - Integration patterns & examples

### **Session Documentation**

6. **[📝 DEX Frontend Integration Attempts](SESSION_2025-11-27_DEX_Frontend_Integration.md)** ⚠️ NEW
   - Complete chronology of integration attempts
   - Technical barriers encountered
   - Klever Web SDK limitations
   - Protobuf encoding challenges
   - Decision rationale & path forward
   - 7-hour session detailed breakdown
   - Anti-patterns to avoid

6. **[🔒 Admin Panel](ADMIN_PANEL.md)**
   - Security implementation
   - Password management
   - Session handling
   - Admin features
   - Localhost-only access

7. **[🐛 Troubleshooting](TROUBLESHOOTING.md)**
   - Common bugs & solutions
   - Build errors & fixes
   - API issues
   - Klever SDK problems
   - Next.js quirks

8. **[💻 Development Guide](DEVELOPMENT_GUIDE.md)**
   - Code patterns & conventions
   - Git workflow
   - File organization
   - Testing checklist
   - Deployment procedures

---

## 🚀 Quick Reference

### Critical Asset IDs
```typescript
DGKO:     'DGKO-CXVJ'      // 4 decimals (10000)
BABYDGKO: 'BABYDGKO-3S67'  // 8 decimals (100000000)
USDT:     'USDT-ODW7'      // 6 decimals (1000000)
```

### Network Endpoints
```typescript
Mainnet:  'https://api.mainnet.klever.org'
Testnet:  'https://api.testnet.klever.org'
```

### Platform Addresses
```typescript
Fee Address: 'klv1slqck0vnxuj9uk0dp6rcv00xv2exnv3wcpf3286jquu79czyxw9qccyyrn'
DGKO Pool:   'klv1pvckvh3yshmjulq4ntnkd0rmf94la6c37ykswvrcm5sy03neh3lq8dnv2h'
```

### Key Commands
```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
rm -rf .next             # Clear cache (important!)

# Contract Build
cd contract/meta
cargo run build          # Build smart contract
cargo run clean          # Clean build artifacts

# Git Workflow
git add .
git commit -m "type(scope): message"
git push

# Testing
open http://localhost:3000/[page]
# Check browser console
# Verify Network tab
```

### App Configuration (Centralized)
**Location:** `src/config/app.ts`

```typescript
export const APP_CONFIG = {
  version: '0.20.2',
  name: 'Digiko',
  status: 'Beta',
  network: 'Testnet',
  platformDisplay: 'Digiko v0.20.2',  // getter
  versionDisplay: 'v0.20.2',          // getter
}
```

**Usage:**
```typescript
import { APP_CONFIG } from '@/config/app';

// Automatic updates everywhere:
<p>{APP_CONFIG.versionDisplay}</p>  // "v0.20.2"
<p>{APP_CONFIG.name}</p>             // "Digiko"
<p>{APP_CONFIG.status}</p>           // "Beta"
<p>{APP_CONFIG.network}</p>          // "Testnet"
```

**Benefits:**
- ✅ Update version once → reflects in 6 locations automatically
- ✅ No missed updates (navigation, footer, admin, dashboard, menus)
- ✅ Type-safe with TypeScript
- ✅ Consistent app info across entire platform

**When releasing new version:** Only edit `src/config/app.ts`

---

## 📦 Project Structure

```
digiko-web3-app/
├── contract/                      # 📜 Smart contracts
│   ├── src/
│   │   └── lib.rs                 # Main contract logic
│   ├── wasm/                      # WASM build
│   ├── meta/                      # Build system
│   ├── output/                    # Compiled contracts
│   │   ├── digiko-swap.wasm       # Contract bytecode
│   │   └── digiko-swap.abi.json   # Contract interface
│   ├── README.md                  # Contract docs
│   ├── INTEGRATION.md             # Frontend integration
│   └── Cargo.toml                 # Rust package config
│
├── docs/
│   ├── dev/                       # 📚 Development docs (you are here)
│   │   ├── README.md              # Main index
│   │   ├── CONTRACT_DEVELOPMENT.md # 📜 Smart contract guide
│   │   ├── MODULAR_ARCHITECTURE.md
│   │   ├── KLEVER_INTEGRATION.md
│   │   ├── DESIGN_SYSTEM.md
│   │   ├── ADMIN_PANEL.md
│   │   ├── TROUBLESHOOTING.md
│   │   └── DEVELOPMENT_GUIDE.md
│   └── [other]/                   # Other documentation
│
├── src/
│   ├── app/                       # Next.js pages
│   │   ├── staking/               # ✅ MODULAR (15 files)
│   │   ├── dgko/                  # ✅ MODULAR (16 files)
│   │   ├── babydgko/              # ✅ MODULAR (16 files)
│   │   ├── swap/                  # ✅ MODULAR (13 files)
│   │   ├── dashboard/             # ✅ MODULAR (6 files)
│   │   ├── updates/               # ✅ MODULAR (5 files)
│   │   ├── documentation/         # ✅ MODULAR (7 files)
│   │   ├── admin/                 # ✅ MODULAR (6 files) 🔒 Password protected
│   │   └── ...
│   ├── components/                # Reusable components
│   ├── config/                    # 🆕 App configuration
│   │   └── app.ts                 # Version, name, status, network
│   ├── context/                   # State management
│   └── utils/                     # Utilities
│
├── design_guide.md                # v1.7 Design reference
└── package.json                   # Dependencies
```

---

## 🎯 Current Status (v0.21.0)

### ✅ Completed
- **Dashboard UX Overhaul** (v0.21.0)
  - Removed auto-refresh from entire app (4 sources eliminated)
  - Added manual refresh controls with user-friendly UI
  - Removed redundant dashboard header (portfolio is title)
  - Enhanced transaction debugging capabilities
- Staking page: Modular architecture (15 files)
- DGKO page: Modular architecture (16 files)
- Admin panel: Password-protected, localhost-only
- Swap feature: DGKO ↔ USDT trading
- TransactionModal: Premium UI
- Design guide: v1.7 with comprehensive patterns
- Centralized app configuration (src/config/app.ts)

### 🎯 In Progress
- BABYDGKO refactor (next priority)
- Documentation improvements

### 📋 Planned
- Swap page refactor
- Additional token pages
- NFTs feature
- Games feature

---

## 🔥 Most Important Things

### 1. File Extensions Matter!
```typescript
// ❌ WRONG
config/icons.ts  // Contains JSX

// ✅ CORRECT
config/icons.tsx // Contains JSX
```

### 2. Always Clear Cache
```bash
rm -rf .next  # After any structural changes!
```

### 3. Asset IDs Must Be Exact
```typescript
'DGKO-CXVJ'  // ✅ Correct
'DGKO'       // ❌ Won't work
```

### 4. Precision Is Critical
```typescript
DGKO:     value / 10000      // 4 decimals
BABYDGKO: value / 100000000  // 8 decimals
```

### 5. Main Files Should Be Small
```
Target:  50-200 lines (orchestrator only)
Maximum: 300 lines
If larger: Refactor to modular
```

---

## 🆘 Need Help?

**Find It Fast:**
- Klever issues? → [KLEVER_INTEGRATION.md](KLEVER_INTEGRATION.md)
- Smart contracts? → [CONTRACT_DEVELOPMENT.md](CONTRACT_DEVELOPMENT.md)
- Refactoring? → [MODULAR_ARCHITECTURE.md](MODULAR_ARCHITECTURE.md)
- Design question? → [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)
- Build error? → [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- Code patterns? → [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)
- Admin stuff? → [ADMIN_PANEL.md](ADMIN_PANEL.md)

---

## 📊 Version History

| Version | Date | Highlights |
|---------|------|------------|
| 0.21.0 | Nov 26, 2025 | Eliminated auto-refresh (4 sources), manual refresh UI, dashboard UX overhaul |
| 0.18.0 | Nov 26, 2025 | Modular architecture (Staking, DGKO), split docs |
| 0.17.0 | Nov 25, 2025 | Admin panel, Design System page |
| 0.16.0 | Nov 25, 2025 | TransactionModal, Legendary UI |
| 0.15.0 | Nov 25, 2025 | Swap feature launch |
| 0.14.0 | Nov 25, 2025 | BABYDGKO page, Tokens dropdown |
| 0.13.0 | Nov 24, 2025 | DGKO page redesign |

---

*This documentation is for internal development use only.*  
*Contains sensitive configuration data.*  
*Last Updated: November 26, 2025 | v0.21.0*
