import { TokenomicsItem, RoadmapItem, TokenDetail } from '../types/babydgko.types';
import { Exchange } from '@/types/exchange';

/**
 * BABYDGKO Configuration
 * All constants, static data, and configuration for the BABYDGKO token page
 */

// Asset ID for BABYDGKO token
export const BABYDGKO_ASSET_ID = 'BABYDGKO-3S67';

// Token precision (8 decimals = 100000000)
export const BABYDGKO_PRECISION = 100000000;

// Tokenomics data - Meme token palette with brighter colors
export const tokenomics: TokenomicsItem[] = [
  { label: 'Community Rewards', percent: 50, color: '#00D4FF' },
  { label: 'Airdrops & Events', percent: 20, color: '#A855F7' },
  { label: 'Ecosystem Support', percent: 15, color: '#0066FF' },
  { label: 'Team & Development', percent: 10, color: '#6366F1' },
  { label: 'Reserve', percent: 5, color: '#3B82F6' },
];

// Roadmap data for meme token
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
    description: '• Complete staking system • BABYDGKO token page with live data • Design system overhaul • Glass morphism UI • Token statistics integration • Meme-inspired design elements'
  },
  { 
    title: 'Q4 2024 - Token Launch & Platform Optimization', 
    status: 'live', 
    quarter: 'Q4 2024',
    description: '• BABYDGKO minting during DGKO ITO • Gifted to DGKO ITO participants • CEX listings: RareCanvas, Coininn • DEX listings: Swopus • Staking system activated • Mobile menu & responsive design • Modular architecture refactor • Admin tools development'
  },
  { 
    title: 'Q2 2025 - DEX Expansion', 
    status: 'live', 
    quarter: 'Q2 2025',
    description: '• Additional liquidity pools • Trading volume growth • Community engagement'
  },
  { 
    title: 'Q4 2025 - Web3 Platform Complete', 
    status: 'live', 
    quarter: 'Q4 2025',
    description: '• Full staking platform operational • DeFi features integrated • Community governance tools • Meme contests and events platform'
  },
  { 
    title: 'Q4 2025 - Smart Contract DEX Swap', 
    status: 'coming', 
    quarter: 'Q4 2025',
    description: '• Decentralized token swapping via smart contracts • Automated market maker (AMM) • BABYDGKO trading pairs • Liquidity incentives'
  },
  { 
    title: 'Q1 2026 - Ecosystem Expansion', 
    status: 'coming', 
    quarter: 'Q1 2026',
    description: '• NFTs Marketplace launch • Games Platform release • Meme contests platform • Out of Beta milestone • New roadmap announcement with community-driven features'
  },
];

// Token Details
export const tokenDetails: TokenDetail[] = [
  { label: 'Name', value: 'BABYDGKO' },
  { label: 'Type', value: 'KDA (Klever Digital Asset)' },
  { label: 'Blockchain', value: 'Klever Blockchain' },
  { label: 'Precision', value: '8 decimals', mono: true },
  { label: 'Asset ID', value: 'BABYDGKO-3S67', mono: true },
];

// Exchanges
export const exchanges: Exchange[] = [
  { 
    name: 'RareCanvas', 
    type: 'CEX', 
    url: 'https://rarecanvas.io',
    logo: '/exchanges/rarecanvas.png',
    pair: 'BABYDGKO/USDT'
  },
  { 
    name: 'Swopus', 
    type: 'DEX', 
    url: 'https://app.swopus.com/swap/KLV-BABYDGKO',
    logo: '/exchanges/swopus.svg',
    pair: 'BABYDGKO/KLV'
  },
  { 
    name: 'Coininn', 
    type: 'CEX', 
    url: 'https://coininn.com',
    logo: '/exchanges/coininn.png',
    pair: 'BABYDGKO/USDT'
  },
];

// SVG Icons - All reusable icons for the page
export const Icons = {
  gift: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  ),
  staking: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  ),
  community: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  trophy: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
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
  sparkles: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  x: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  telegram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  ),
  check: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
};
