'use client';

import Link from 'next/link';
import { TokenImage, TOKEN_IDS } from '@/components/TokenImage';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-digiko-primary/10 via-transparent to-digiko-accent-secondary/10" />
        <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-digiko-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-digiko-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Hero Section */}
        <div className="min-h-[90vh] flex flex-col justify-center py-20">
          <div className="text-center max-w-5xl mx-auto">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-12 animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-digiko-primary animate-pulse" />
              <span className="text-sm text-gray-400 font-medium">Live on Klever Mainnet</span>
            </div>
            
            {/* Main headline */}
            <h1 className="text-6xl md:text-8xl font-semibold text-white mb-8 leading-none tracking-tight">
              Your Complete
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-digiko-primary via-digiko-accent to-digiko-primary bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x">
                  Web3 Ecosystem
                </span>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              A comprehensive platform for managing digital assets, staking tokens, and trading on Klever Blockchain. Everything you need in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
              <Link
                href="/dashboard"
                className="group relative px-10 py-5 bg-digiko-primary text-white font-medium rounded-2xl transition-all duration-500 shadow-[0_0_40px_rgba(0,102,255,0.3)] hover:shadow-[0_0_60px_rgba(0,102,255,0.5)] hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Launch Dashboard
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-digiko-accent/0 via-digiko-accent/30 to-digiko-accent/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </Link>
              
              <Link
                href="/documentation"
                className="px-10 py-5 glass-hover rounded-2xl font-medium text-white transition-all duration-500 hover:scale-105"
              >
                Documentation
              </Link>
            </div>

            {/* Platform Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center p-6 rounded-2xl glass-hover transition-all duration-500">
                <div className="text-4xl md:text-5xl font-mono font-medium text-white mb-2">6</div>
                <div className="text-sm text-gray-500">Core Products</div>
              </div>
              <div className="text-center p-6 rounded-2xl glass-hover transition-all duration-500">
                <div className="text-4xl md:text-5xl font-mono font-medium text-white mb-2">2</div>
                <div className="text-sm text-gray-500">Native Tokens</div>
              </div>
              <div className="text-center p-6 rounded-2xl glass-hover transition-all duration-500">
                <div className="text-4xl md:text-5xl font-mono font-medium text-white mb-2">10%</div>
                <div className="text-sm text-gray-500">Staking APR</div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Features - Main Products */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-4">Platform Features</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              A complete suite of tools and services for the Klever Blockchain ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Dashboard */}
            <Link href="/dashboard" className="group glass-hover rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02]">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-digiko-primary/20 to-digiko-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8 text-digiko-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-medium mb-3 text-white group-hover:text-digiko-primary transition-colors duration-300">Dashboard</h3>
                  <p className="text-base text-gray-400 leading-relaxed mb-4">
                    Comprehensive asset management interface. View balances, send transactions, and monitor your portfolio in real-time.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-digiko-accent">
                    <span>Explore Dashboard</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Staking */}
            <Link href="/staking" className="group glass-hover rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02]">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-digiko-accent/20 to-digiko-accent/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8 text-digiko-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-medium mb-3 text-white group-hover:text-digiko-accent transition-colors duration-300">Staking</h3>
                  <p className="text-base text-gray-400 leading-relaxed mb-4">
                    Stake DGKO and BABYDGKO tokens to earn rewards. Track your positions, claim rewards, and manage unstaking with ease.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-digiko-accent">
                    <span>Start Staking</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Swap - Coming Soon */}
            <div className="group glass rounded-3xl p-8 transition-all duration-500 relative overflow-hidden opacity-60">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-500/20 to-gray-500/5 flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-medium text-white">Swap</h3>
                    <div className="px-3 py-1.5 rounded-lg font-semibold text-xs tracking-wide backdrop-blur-xl border bg-digiko-accent/10 border-digiko-accent/30 text-digiko-accent">
                      Coming Soon
                    </div>
                  </div>
                  <p className="text-base text-gray-400 leading-relaxed">
                    Decentralized exchange powered by smart contracts. Trade tokens instantly with automated market maker technology.
                  </p>
                </div>
              </div>
            </div>

            {/* Token Pages */}
            <div className="group glass-hover rounded-3xl p-8 transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-digiko-accent/20 to-digiko-accent/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-8 h-8 text-digiko-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-medium mb-3 text-white">Token Information</h3>
                  <p className="text-base text-gray-400 leading-relaxed mb-4">
                    Dedicated pages for DGKO and BABYDGKO with real-time stats, price charts, holder information, and ecosystem details.
                  </p>
                  <div className="flex gap-3">
                    <Link href="/dgko" className="flex items-center gap-2 text-sm text-digiko-accent hover:text-white transition-colors">
                      <span>DGKO</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                    <Link href="/babydgko" className="flex items-center gap-2 text-sm text-digiko-accent hover:text-white transition-colors">
                      <span>BABYDGKO</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* NFTs - Coming Soon */}
            <div className="group glass rounded-3xl p-8 transition-all duration-500 relative overflow-hidden opacity-60">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-500/20 to-gray-500/5 flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-medium text-white">NFTs</h3>
                    <div className="px-3 py-1.5 rounded-lg font-semibold text-xs tracking-wide backdrop-blur-xl border bg-digiko-accent/10 border-digiko-accent/30 text-digiko-accent">
                      Coming Soon
                    </div>
                  </div>
                  <p className="text-base text-gray-400 leading-relaxed">
                    NFT marketplace for the Digiko ecosystem. Create, trade, and collect digital assets on Klever Blockchain.
                  </p>
                </div>
              </div>
            </div>

            {/* Games - Coming Soon */}
            <div className="group glass rounded-3xl p-8 transition-all duration-500 relative overflow-hidden opacity-60">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-500/20 to-gray-500/5 flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-medium text-white">Games</h3>
                    <div className="px-3 py-1.5 rounded-lg font-semibold text-xs tracking-wide backdrop-blur-xl border bg-digiko-accent/10 border-digiko-accent/30 text-digiko-accent">
                      Coming Soon
                    </div>
                  </div>
                  <p className="text-base text-gray-400 leading-relaxed">
                    Gaming platform with blockchain integration. Play, earn, and engage with the Digiko community through interactive experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ecosystem Tokens */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-4">Ecosystem Tokens</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Native tokens powering the Digiko platform on Klever Blockchain
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* DGKO Token */}
            <Link href="/dgko" className="group glass rounded-3xl p-10 transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-digiko-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-[0_0_30px_rgba(0,102,255,0.3)]">
                    <TokenImage assetId={TOKEN_IDS.DGKO} size="xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-white mb-1">DGKO</h3>
                    <p className="text-sm text-gray-500 font-mono">DGKO-CXVJ</p>
                  </div>
                </div>
                <p className="text-base text-gray-400 leading-relaxed mb-6">
                  The primary utility token of the Digiko ecosystem. Used for staking, governance, and accessing platform features.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500 mb-1">Max Supply</div>
                    <div className="text-white font-medium">100 Million</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">Staking APR</div>
                    <div className="text-digiko-accent font-medium">10%</div>
                  </div>
                </div>
              </div>
            </Link>

            {/* BABYDGKO Token */}
            <Link href="/babydgko" className="group glass rounded-3xl p-10 transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-digiko-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-[0_0_30px_rgba(0,212,255,0.3)]">
                    <TokenImage assetId={TOKEN_IDS.BABYDGKO} size="xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-white mb-1">BABYDGKO</h3>
                    <p className="text-sm text-gray-500 font-mono">BABYDGKO-3S67</p>
                  </div>
                </div>
                <p className="text-base text-gray-400 leading-relaxed mb-6">
                  Community meme token gifted during the DGKO ITO. Features staking rewards and brings playful utility to the ecosystem.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500 mb-1">Max Supply</div>
                    <div className="text-white font-medium">50 Billion</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">Staking APR</div>
                    <div className="text-digiko-accent font-medium">10%</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Built on Klever Blockchain Section */}
        <div className="mb-32">
          <div className="glass rounded-[40px] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-digiko-primary/10 via-transparent to-digiko-accent/10 opacity-50" />
            <div className="relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-medium text-white mb-4">Built on Klever Blockchain</h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                  A comprehensive DApp leveraging Klever's infrastructure for speed, security, and reliability
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-digiko-primary/20 to-digiko-primary/5 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-digiko-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">Klever-Powered Performance</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Built on Klever Blockchain for instant transaction finality, minimal fees, and enterprise-grade infrastructure. Experience true high-performance DeFi.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-digiko-accent/20 to-digiko-accent/5 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-digiko-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">Seamless Wallet Integration</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Connect directly through Klever Wallet extension. Your private keys stay secure in your wallet - Digiko never has access to your funds.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-digiko-primary/20 to-digiko-primary/5 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-digiko-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">Complete DeFi Suite</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    From staking and swapping to portfolio management - everything you need to participate in the Klever ecosystem, unified in one premium interface.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-4">Roadmap</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Our journey building the complete Web3 ecosystem on Klever Blockchain
            </p>
          </div>

          <div className="glass rounded-2xl border border-white/10 p-8 md:p-12">
            <div className="relative space-y-6">
              {/* Q1 2024 */}
              <div className="relative">
                <div className="absolute left-[19px] top-12 bottom-[-24px] w-px bg-gradient-to-b from-white/20 via-white/10 to-white/5" />
                <div className="relative rounded-xl border backdrop-blur-xl transition-all duration-500 bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/30 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] hover:scale-[1.01]">
                  <div className="p-5 flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 bg-gradient-to-br from-green-500 to-emerald-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h3 className="text-lg font-medium text-green-400">Q1 2024 - Foundation & Planning</h3>
                        <div className="flex-shrink-0 px-3 py-1.5 rounded-lg font-semibold text-xs tracking-wide backdrop-blur-xl border bg-green-500/15 border-green-500/30 text-green-400">Live</div>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">Project architecture designed • Token economics planned • Design system specifications • Klever blockchain research • Team formation and roadmap definition</p>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-400 font-mono">Q1 2024</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 animate-shimmer rounded-xl pointer-events-none" />
                </div>
              </div>

              {/* Q2 2024 */}
              <div className="relative">
                <div className="absolute left-[19px] top-12 bottom-[-24px] w-px bg-gradient-to-b from-white/20 via-white/10 to-white/5" />
                <div className="relative rounded-xl border backdrop-blur-xl transition-all duration-500 bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/30 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] hover:scale-[1.01]">
                  <div className="p-5 flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 bg-gradient-to-br from-green-500 to-emerald-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h3 className="text-lg font-medium text-green-400">Q2 2024 - Development & Infrastructure</h3>
                        <div className="flex-shrink-0 px-3 py-1.5 rounded-lg font-semibold text-xs tracking-wide backdrop-blur-xl border bg-green-500/15 border-green-500/30 text-green-400">Live</div>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">Platform scaffolding with Next.js 14 • Klever SDK integration • Wallet connection system • Dashboard foundation • API endpoints configuration • Mainnet token IDs setup</p>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-400 font-mono">Q2 2024</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 animate-shimmer rounded-xl pointer-events-none" />
                </div>
              </div>

              {/* Q3 2024 */}
              <div className="relative">
                <div className="absolute left-[19px] top-12 bottom-[-24px] w-px bg-gradient-to-b from-white/20 via-white/10 to-white/5" />
                <div className="relative rounded-xl border backdrop-blur-xl transition-all duration-500 bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/30 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] hover:scale-[1.01]">
                  <div className="p-5 flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 bg-gradient-to-br from-green-500 to-emerald-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h3 className="text-lg font-medium text-green-400">Q3 2024 - Core Features & Launch</h3>
                        <div className="flex-shrink-0 px-3 py-1.5 rounded-lg font-semibold text-xs tracking-wide backdrop-blur-xl border bg-green-500/15 border-green-500/30 text-green-400">Live</div>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">Complete staking system • Token pages with live data • Design system overhaul • Glass morphism UI • Price chart component • Token statistics integration</p>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-400 font-mono">Q3 2024</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 animate-shimmer rounded-xl pointer-events-none" />
                </div>
              </div>

              {/* Q4 2024 */}
              <div className="relative">
                <div className="absolute left-[19px] top-12 bottom-[-24px] w-px bg-gradient-to-b from-white/20 via-white/10 to-white/5" />
                <div className="relative rounded-xl border backdrop-blur-xl transition-all duration-500 bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/30 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] hover:scale-[1.01]">
                  <div className="p-5 flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 bg-gradient-to-br from-green-500 to-emerald-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h3 className="text-lg font-medium text-green-400">Q4 2024 - Token ITO & Platform Optimization</h3>
                        <div className="flex-shrink-0 px-3 py-1.5 rounded-lg font-semibold text-xs tracking-wide backdrop-blur-xl border bg-green-500/15 border-green-500/30 text-green-400">Live</div>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">Token ITO launch • CEX listings • DEX listings • Mobile menu & responsive design • Modular architecture refactor • Admin tools development • Smart contract implementation</p>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-400 font-mono">Q4 2024</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 animate-shimmer rounded-xl pointer-events-none" />
                </div>
              </div>

              {/* Q4 2025 */}
              <div className="relative">
                <div className="absolute left-[19px] top-12 bottom-[-24px] w-px bg-gradient-to-b from-white/20 via-white/10 to-white/5" />
                <div className="relative rounded-xl border backdrop-blur-xl transition-all duration-500 bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/30 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] hover:scale-[1.01]">
                  <div className="p-5 flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 bg-gradient-to-br from-green-500 to-emerald-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h3 className="text-lg font-medium text-green-400">Q4 2025 - Web3 Platform Complete</h3>
                        <div className="flex-shrink-0 px-3 py-1.5 rounded-lg font-semibold text-xs tracking-wide backdrop-blur-xl border bg-green-500/15 border-green-500/30 text-green-400">Live</div>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">Full staking platform operational • DeFi features integrated • Community governance tools</p>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-400 font-mono">Q4 2025</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 animate-shimmer rounded-xl pointer-events-none" />
                </div>
              </div>

              {/* Q4 2025 - DEX Swap */}
              <div className="relative">
                <div className="absolute left-[19px] top-12 bottom-[-24px] w-px bg-gradient-to-b from-white/20 via-white/10 to-white/5" />
                <div className="relative rounded-xl border backdrop-blur-xl transition-all duration-500 bg-gradient-to-br from-white/[0.03] to-white/[0.01] border-white/10 hover:border-digiko-primary/30 hover:shadow-[0_0_30px_rgba(0,102,255,0.1)] hover:scale-[1.01]">
                  <div className="p-5 flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20">
                      <span className="w-3 h-3 rounded-full border-2 border-white/40" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h3 className="text-lg font-medium text-white">Q4 2025 - Smart Contract DEX Swap</h3>
                        <div className="flex-shrink-0 px-3 py-1.5 rounded-lg font-semibold text-xs tracking-wide backdrop-blur-xl border bg-digiko-accent/10 border-digiko-accent/30 text-digiko-accent">Coming Soon</div>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">Decentralized token swapping via smart contracts • Automated market maker (AMM) • On-chain liquidity pools</p>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-400 font-mono">Q4 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Q1 2026 */}
              <div className="relative">
                <div className="relative rounded-xl border backdrop-blur-xl transition-all duration-500 bg-gradient-to-br from-white/[0.03] to-white/[0.01] border-white/10 hover:border-digiko-primary/30 hover:shadow-[0_0_30px_rgba(0,102,255,0.1)] hover:scale-[1.01]">
                  <div className="p-5 flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20">
                      <span className="w-3 h-3 rounded-full border-2 border-white/40" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h3 className="text-lg font-medium text-white">Q1 2026 - Ecosystem Expansion</h3>
                        <div className="flex-shrink-0 px-3 py-1.5 rounded-lg font-semibold text-xs tracking-wide backdrop-blur-xl border bg-digiko-accent/10 border-digiko-accent/30 text-digiko-accent">Coming Soon</div>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">NFT Marketplace launch • Games Platform release • Out of Beta milestone • New roadmap announcement with expanded features</p>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-400 font-mono">Q1 2026</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="mb-32">
          <div className="glass rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-digiko-primary/20 via-transparent to-transparent opacity-50" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-medium text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-gray-400 mb-12 leading-relaxed">
                Join the Digiko ecosystem today. Connect your wallet and start managing your digital assets with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/dashboard"
                  className="group relative px-10 py-5 bg-digiko-primary text-white font-medium rounded-2xl transition-all duration-500 shadow-[0_0_40px_rgba(0,102,255,0.3)] hover:shadow-[0_0_60px_rgba(0,102,255,0.5)] hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Launch Dashboard
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-digiko-accent/0 via-digiko-accent/30 to-digiko-accent/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </Link>
                
                <Link
                  href="/documentation"
                  className="px-10 py-5 glass-hover rounded-2xl font-medium text-white transition-all duration-500 hover:scale-105 flex items-center justify-center gap-2"
                >
                  Read Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}