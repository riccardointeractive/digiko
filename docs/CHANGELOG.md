# CHANGELOG

## v1.1.5 - Mobile UX Overhaul (November 28, 2025)

### 🎨 Mobile-Responsive Typography
- Added comprehensive mobile font scale (10 sizes: mobile-xs through mobile-6xl)
- Created responsive utility classes: text-responsive-h1, balance-display, token-name-mobile
- Optimized heading sizes for mobile: H1 48px→32px, H2 36px→28px, H3 30px→24px
- Token names now scale properly: 20px desktop → 14px mobile
- Fixed BABYDGKO overflow on mobile with flex-wrap pattern

### 📐 Mobile Spacing Optimization
- Reduced mobile spacing by ~40% following fintech standards (Revolut, Coinbase)
- Container padding: 32px → 16px mobile
- Glass cards: 32px → 20px mobile
- Stats cards: 24px → 16px mobile
- Card gaps: 32px → 16px mobile
- Section margins: 48px → 24px mobile

### 🎯 Visual Polish
- Text color minimalism: removed decorative blue text
- All informational text now white/gray only
- Blue reserved for interactive elements only
- Fixed NumberInput focus state (removed unwanted inner rectangle)
- Centered "How It Works" section on mobile for better symmetry

### 🐛 Debug & Error Logging
- Integrated debug mode with floating red bug button (?debug=true)
- Test error types: Wallet, Transaction, API, Network, Invalid Input
- Enhanced error logging with "Copy Debug Log" button in all error modals
- Comprehensive debug logs: error details, timestamp, route, user info, app version

### 🔧 Technical Fixes
- Fixed Klever API endpoints: api.klever.org → api.mainnet.klever.org
- Added version number to mobile menu footer
- All 6 locations now show version: header, footer, admin, dashboard, mobile menu, desktop menu

### 📚 Documentation
- Updated design_guide.md to v1.8 with comprehensive mobile-responsive section
- Added 11 new project rules (RULE 40-50) covering mobile-first development
- Created LESSONS_2025_11_28.md documenting all learnings
- Updated Updates page with v1.1.5 entry
- Added mobile testing standards and production readiness checklist

### 🎯 Files Modified
- tailwind.config.js - Mobile font sizes
- globals.css - Responsive utilities
- MobileMenu.tsx - Added version display
- StakingHeader.tsx, StakeCard.tsx, UnstakingCard.tsx - Responsive spacing
- StakingStatsGrid.tsx, RewardsCard.tsx - Mobile padding
- HowItWorksSection.tsx - Centered layout
- NumberInput.tsx - Focus state fix
- BABYDGKOHeader.tsx - Flex-wrap for overflow
- UnstakingQueueItem.tsx - Text color cleanup
- design_guide.md - v1.8 with mobile section (+400 lines)
- PROJECT_RULES.md - v1.8 with 11 new rules (+350 lines)
- updates.config.ts - Added v1.1.5 entry

---

## v1.1.0 - API Endpoint Fix (November 28, 2025)

### 🔧 Critical Fixes
- Fixed Klever API endpoint from api.klever.org to api.mainnet.klever.org
- All blockchain queries now working correctly
- DNS resolution verified

---

## v1.0.1 - Analytics Integration (November 28, 2025)

### 📊 Features
- Integrated Vercel Analytics for visitor tracking
- Privacy-friendly analytics with GDPR compliance
- Automatic tracking of page views and unique visitors
- Web Vitals monitoring for performance metrics

---

## v1.0.0 - Platform Launch (November 28, 2025)

### 🚀 Initial Release
- Official platform launch at digiko.io
- DGKO staking operational (10% APR)
- BABYDGKO staking operational (10% APR)
- Dashboard with KLV balance tracking
- Dedicated token pages with live statistics
- Klever Wallet integration
- Premium glass morphism UI
- Mobile-responsive design
- Public documentation

---
