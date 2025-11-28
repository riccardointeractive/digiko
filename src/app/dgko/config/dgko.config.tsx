import { TokenomicsItem, RoadmapItem, TokenDetail } from '../types/dgko.types';
import { Exchange } from '@/types/exchange';

/**
 * DGKO Configuration
 * All constants, static data, and configuration for the DGKO token page
 */

// Asset ID for DGKO token
export const DGKO_ASSET_ID = 'DGKO-CXVJ';

// Token precision (4 decimals = 10000)
export const DGKO_PRECISION = 10000;

// Tokenomics data - Modern tech palette
export const tokenomics: TokenomicsItem[] = [
  { label: 'Community & Staking', percent: 40, color: '#0066FF' },
  { label: 'Ecosystem Growth', percent: 25, color: '#00D4FF' },
  { label: 'Team & Advisors', percent: 15, color: '#6366F1' },
  { label: 'Liquidity', percent: 10, color: '#A855F7' },
  { label: 'Reserve', percent: 10, color: '#3B82F6' },
];

// Roadmap data
export const roadmap: RoadmapItem[] = [
  { 
    title: 'Q1 2024 - Foundation & Planning', 
    status: 'live', 
    quarter: 'Q1 2024',
    description: '• Project architecture designed • Token economics planned • Design system specifications • Klever blockchain research • Team formation and roadmap definition'
  },
  { 
    title: 'Q2 2024 - Development & Infrastructure', 
    status: 'live', 
    quarter: 'Q2 2024',
    description: '• Platform scaffolding with Next.js 14 • Klever SDK integration • Wallet connection system • Dashboard foundation • API endpoints configuration • Mainnet token IDs setup'
  },
  { 
    title: 'Q3 2024 - Core Features & Launch', 
    status: 'live', 
    quarter: 'Q3 2024',
    description: '• Complete staking system • DGKO token page with live data • Design system overhaul • Glass morphism UI • Price chart component • Token statistics integration'
  },
  { 
    title: 'Q4 2024 - Token ITO & Platform Optimization', 
    status: 'live', 
    quarter: 'Q4 2024',
    description: '• DGKO Token ITO launch • CEX listings: Bitcoin.me, Coininn • DEX listings: VoxSwap, KleverWallet • Mobile menu & responsive design • Modular architecture refactor • Admin tools development • Smart contract implementation'
  },
  { 
    title: 'Q2 2025 - DEX Expansion', 
    status: 'live', 
    quarter: 'Q2 2025',
    description: '• Swopus DEX listing • Additional liquidity pools • Trading volume growth'
  },
  { 
    title: 'Q4 2025 - Web3 Platform Complete', 
    status: 'live', 
    quarter: 'Q4 2025',
    description: '• Full staking platform operational • DeFi features integrated • Community governance tools'
  },
  { 
    title: 'Q4 2025 - Smart Contract DEX Swap', 
    status: 'coming', 
    quarter: 'Q4 2025',
    description: '• Decentralized token swapping via smart contracts • Automated market maker (AMM) • On-chain liquidity pools'
  },
  { 
    title: 'Q1 2026 - Ecosystem Expansion', 
    status: 'coming', 
    quarter: 'Q1 2026',
    description: '• NFTs Marketplace launch • Games Platform release • Out of Beta milestone • New roadmap announcement with expanded features'
  },
];

// Token Details
export const tokenDetails: TokenDetail[] = [
  { label: 'Name', value: 'DGKO' },
  { label: 'Type', value: 'KDA (Klever Digital Asset)' },
  { label: 'Blockchain', value: 'Klever Blockchain' },
  { label: 'Precision', value: '4 decimals', mono: true },
  { label: 'Asset ID', value: 'DGKO-CXVJ', mono: true },
];

// Exchanges
export const exchanges: Exchange[] = [
  { 
    name: 'Bitcoin.me', 
    type: 'CEX', 
    url: 'https://cex.bitcoin.me/us/trade/DGKO-USDT',
    logo: '/exchanges/bitcoinme.png',
    pair: 'DGKO/USDT'
  },
  { 
    name: 'Klever Wallet', 
    type: 'Swap', 
    url: 'https://klever.io',
    logo: '/exchanges/klever.png',
    pair: 'DGKO/USDT'
  },
  { 
    name: 'VoxSwap', 
    type: 'Swap', 
    url: 'https://voxswap.io/',
    logo: '/exchanges/voxswap.jpg',
    pair: 'DGKO/USDT'
  },
  { 
    name: 'Swopus', 
    type: 'DEX', 
    url: 'https://app.swopus.com/swap/KLV-DGKO',
    logo: '/exchanges/swopus.svg',
    pair: 'DGKO/KLV'
  },
  { 
    name: 'SAME', 
    type: 'DEX', 
    url: 'https://app.want-same.com/dex',
    logo: '/exchanges/same.jpg',
    pair: 'DGKO/KID'
  },
];

// SVG Icons - All reusable icons for the page
export const Icons = {
  staking: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  ),
  swap: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  ),
  nft: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  ),
  games: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
    </svg>
  ),
  arrow: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  ),
  fire: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
    </svg>
  ),
  plus: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  ),
  check: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  x: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  telegram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  ),
};
