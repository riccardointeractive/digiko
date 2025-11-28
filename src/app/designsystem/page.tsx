'use client';

import { useState } from 'react';
import { TransactionModal, TransactionStatus } from '@/components/TransactionModal';

export default function DesignSystemPage() {
  // Modal demo state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<TransactionStatus>('success');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const showModal = (status: TransactionStatus) => {
    setModalStatus(status);
    setModalOpen(true);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(label);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Hero */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-digiko-primary/10 border border-digiko-primary/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-digiko-primary animate-pulse" />
            <span className="text-xs font-semibold text-digiko-primary tracking-wide">ADMIN ONLY</span>
          </div>
          <h1 className="text-6xl font-semibold text-white mb-4 tracking-tight">Design System</h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            Complete reference for Digiko&apos;s design language - colors, typography, components, animations, and patterns.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="glass rounded-2xl p-6 border border-white/10">
            <div className="text-3xl font-mono font-semibold text-white mb-1">12</div>
            <div className="text-sm text-gray-400">Components</div>
          </div>
          <div className="glass rounded-2xl p-6 border border-white/10">
            <div className="text-3xl font-mono font-semibold text-white mb-1">24</div>
            <div className="text-sm text-gray-400">Colors</div>
          </div>
          <div className="glass rounded-2xl p-6 border border-white/10">
            <div className="text-3xl font-mono font-semibold text-white mb-1">8</div>
            <div className="text-sm text-gray-400">Type Scales</div>
          </div>
          <div className="glass rounded-2xl p-6 border border-white/10">
            <div className="text-3xl font-mono font-semibold text-white mb-1">4</div>
            <div className="text-sm text-gray-400">Animations</div>
          </div>
        </div>

        {/* Navigation */}
        <div className="glass rounded-2xl border border-white/10 p-6 mb-12">
          <div className="flex flex-wrap gap-3">
            <a href="#colors" className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm text-gray-400 hover:text-white">Colors</a>
            <a href="#typography" className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm text-gray-400 hover:text-white">Typography</a>
            <a href="#components" className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm text-gray-400 hover:text-white">Components</a>
            <a href="#buttons" className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm text-gray-400 hover:text-white">Buttons</a>
            <a href="#cards" className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm text-gray-400 hover:text-white">Cards</a>
            <a href="#badges" className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm text-gray-400 hover:text-white">Badges</a>
            <a href="#animations" className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm text-gray-400 hover:text-white">Animations</a>
            <a href="#spacing" className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm text-gray-400 hover:text-white">Spacing</a>
          </div>
        </div>

        {/* COLORS SECTION */}
        <section id="colors" className="mb-20">
          <h2 className="text-4xl font-semibold text-white mb-8 tracking-tight">Color System</h2>
          
          {/* Primary Colors */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-white mb-6">Primary Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                className="glass rounded-2xl p-6 border border-white/10 cursor-pointer hover:border-digiko-primary/40 transition-all"
                onClick={() => copyToClipboard('#0066FF', 'primary')}
              >
                <div className="w-full h-32 rounded-xl bg-digiko-primary mb-4 shadow-[0_0_40px_rgba(0,102,255,0.3)]" />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold mb-1">Primary Blue</div>
                    <div className="font-mono text-sm text-gray-400">#0066FF</div>
                    <div className="text-xs text-gray-500 mt-1">digiko-primary</div>
                  </div>
                  {copiedColor === 'primary' && (
                    <div className="text-xs text-green-400">✓ Copied!</div>
                  )}
                </div>
              </div>

              <div 
                className="glass rounded-2xl p-6 border border-white/10 cursor-pointer hover:border-digiko-accent/40 transition-all"
                onClick={() => copyToClipboard('#00D4FF', 'accent')}
              >
                <div className="w-full h-32 rounded-xl bg-digiko-accent mb-4 shadow-[0_0_40px_rgba(0,212,255,0.3)]" />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold mb-1">Accent Cyan</div>
                    <div className="font-mono text-sm text-gray-400">#00D4FF</div>
                    <div className="text-xs text-gray-500 mt-1">digiko-accent</div>
                  </div>
                  {copiedColor === 'accent' && (
                    <div className="text-xs text-green-400">✓ Copied!</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* State Colors */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-white mb-6">State Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass rounded-xl p-4 border border-white/10">
                <div className="w-full h-20 rounded-lg bg-green-500 mb-3" />
                <div className="text-white text-sm font-medium mb-1">Success</div>
                <div className="font-mono text-xs text-gray-400">#10B981</div>
              </div>
              <div className="glass rounded-xl p-4 border border-white/10">
                <div className="w-full h-20 rounded-lg bg-red-500 mb-3" />
                <div className="text-white text-sm font-medium mb-1">Error</div>
                <div className="font-mono text-xs text-gray-400">#EF4444</div>
              </div>
              <div className="glass rounded-xl p-4 border border-white/10">
                <div className="w-full h-20 rounded-lg bg-amber-500 mb-3" />
                <div className="text-white text-sm font-medium mb-1">Warning</div>
                <div className="font-mono text-xs text-gray-400">#F59E0B</div>
              </div>
              <div className="glass rounded-xl p-4 border border-white/10">
                <div className="w-full h-20 rounded-lg bg-blue-500 mb-3" />
                <div className="text-white text-sm font-medium mb-1">Info</div>
                <div className="font-mono text-xs text-gray-400">#3B82F6</div>
              </div>
            </div>
          </div>

          {/* Grayscale */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">Grayscale System</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: 'Gray 50', color: '#2C2C2E', usage: 'Borders, dividers' },
                { name: 'Gray 100', color: '#242426', usage: 'Elevated surfaces' },
                { name: 'Gray 200', color: '#1C1C1E', usage: 'Card backgrounds' },
                { name: 'Gray 300', color: '#161618', usage: 'Containers' },
                { name: 'Gray 400', color: '#0E0E10', usage: 'Darkest gray' },
              ].map((gray) => (
                <div key={gray.name} className="glass rounded-xl p-4 border border-white/10">
                  <div className="w-full h-20 rounded-lg mb-3" style={{ backgroundColor: gray.color }} />
                  <div className="text-white text-sm font-medium mb-1">{gray.name}</div>
                  <div className="font-mono text-xs text-gray-400 mb-2">{gray.color}</div>
                  <div className="text-xs text-gray-500">{gray.usage}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TYPOGRAPHY SECTION */}
        <section id="typography" className="mb-20">
          <h2 className="text-4xl font-semibold text-white mb-8 tracking-tight">Typography</h2>
          
          <div className="glass rounded-2xl border border-white/10 p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="text-sm text-gray-400 mb-2">Primary Sans</div>
                <div className="text-3xl font-sans text-white">Geist Sans</div>
                <div className="text-sm text-gray-500 mt-2">Headlines, UI, body text</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-2">Primary Mono</div>
                <div className="text-3xl font-mono text-white">Geist Mono</div>
                <div className="text-sm text-gray-500 mt-2">Numbers, addresses, code</div>
              </div>
            </div>
          </div>

          {/* Type Scale */}
          <div className="space-y-6">
            <div className="glass rounded-2xl border border-white/10 p-6">
              <div className="text-xs text-gray-500 mb-2">text-6xl · font-semibold</div>
              <div className="text-6xl font-semibold text-white tracking-tight">Display</div>
              <div className="text-sm text-gray-400 mt-2">Hero headlines only</div>
            </div>

            <div className="glass rounded-2xl border border-white/10 p-6">
              <div className="text-xs text-gray-500 mb-2">text-5xl · font-medium</div>
              <div className="text-5xl font-medium text-white">Heading 1</div>
              <div className="text-sm text-gray-400 mt-2">Page titles</div>
            </div>

            <div className="glass rounded-2xl border border-white/10 p-6">
              <div className="text-xs text-gray-500 mb-2">text-4xl · font-medium</div>
              <div className="text-4xl font-medium text-white">Heading 2</div>
              <div className="text-sm text-gray-400 mt-2">Major section headers</div>
            </div>

            <div className="glass rounded-2xl border border-white/10 p-6">
              <div className="text-xs text-gray-500 mb-2">text-2xl · font-semibold</div>
              <div className="text-2xl font-semibold text-white tracking-[-0.02em]">Heading 3</div>
              <div className="text-sm text-gray-400 mt-2">Card titles, subsections (with negative tracking)</div>
            </div>

            <div className="glass rounded-2xl border border-white/10 p-6">
              <div className="text-xs text-gray-500 mb-2">text-base · font-normal</div>
              <div className="text-base font-normal text-white">Body Regular</div>
              <div className="text-sm text-gray-400 mt-2">Standard body text</div>
            </div>

            <div className="glass rounded-2xl border border-white/10 p-6">
              <div className="text-xs text-gray-500 mb-2">text-sm · font-normal</div>
              <div className="text-sm font-normal text-white">Body Small</div>
              <div className="text-sm text-gray-400 mt-2">Card descriptions, secondary info</div>
            </div>

            <div className="glass rounded-2xl border border-white/10 p-6">
              <div className="text-xs text-gray-500 mb-2">text-xs · font-semibold</div>
              <div className="text-xs font-semibold text-white tracking-wide">CAPTION TEXT</div>
              <div className="text-sm text-gray-400 mt-2">Labels, metadata, badges</div>
            </div>
          </div>

          {/* Font Weight Warning */}
          <div className="mt-8 p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <div className="text-amber-400 font-semibold mb-1">Font Weight Rule</div>
                <div className="text-sm text-gray-400">
                  <strong className="text-white">NEVER use font-bold (700)</strong> except in TransactionModal component. Use font-semibold (600) maximum everywhere else.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPONENTS SECTION */}
        <section id="components" className="mb-20">
          <h2 className="text-4xl font-semibold text-white mb-8 tracking-tight">Components</h2>

          {/* TransactionModal */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-white mb-6">TransactionModal</h3>
            <div className="glass rounded-2xl border border-white/10 p-8">
              <p className="text-gray-400 mb-6">
                Supreme transaction feedback system with celebration particles, status-based theming, and auto-dismiss.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <button
                  onClick={() => showModal('success')}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold rounded-xl transition-all hover:scale-105"
                >
                  Show Success
                </button>
                <button
                  onClick={() => showModal('error')}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-semibold rounded-xl transition-all hover:scale-105"
                >
                  Show Error
                </button>
                <button
                  onClick={() => showModal('loading')}
                  className="px-6 py-3 bg-gradient-to-r from-digiko-primary to-digiko-accent hover:from-digiko-secondary hover:to-digiko-primary text-white font-semibold rounded-xl transition-all hover:scale-105"
                >
                  Show Loading
                </button>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <pre className="text-xs text-gray-400 overflow-x-auto"><code>{`<TransactionModal
  isOpen={modalOpen}
  status="success"
  title="Transaction Successful"
  message="Your tokens have been staked!"
  txHash="abc123..."
  onClose={closeModal}
  autoDismiss={true}
/>`}</code></pre>
              </div>
            </div>
          </div>

          {/* Glass Cards */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-white mb-6">Glass Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass rounded-2xl border border-white/10 p-6">
                <h4 className="text-white font-semibold mb-2">Standard Glass Card</h4>
                <p className="text-sm text-gray-400 mb-4">
                  Basic glass morphism card with border and backdrop blur.
                </p>
                <code className="text-xs text-digiko-accent">className=&quot;glass rounded-2xl border border-white/10 p-6&quot;</code>
              </div>

              <div className="glass rounded-2xl border border-digiko-primary/40 p-6 shadow-[0_0_40px_rgba(0,102,255,0.2)]">
                <h4 className="text-white font-semibold mb-2">Highlighted Glass Card</h4>
                <p className="text-sm text-gray-400 mb-4">
                  Glass card with colored border and glow effect.
                </p>
                <code className="text-xs text-digiko-accent">border-digiko-primary/40 shadow-[0_0_40px_...]</code>
              </div>
            </div>
          </div>
        </section>

        {/* BUTTONS SECTION */}
        <section id="buttons" className="mb-20">
          <h2 className="text-4xl font-semibold text-white mb-8 tracking-tight">Buttons</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Primary Button */}
            <div className="glass rounded-2xl border border-white/10 p-6">
              <div className="text-sm text-gray-400 mb-4">Primary CTA</div>
              <button className="group relative px-10 py-5 bg-digiko-primary text-white font-semibold rounded-2xl transition-all duration-500 shadow-[0_0_40px_rgba(0,102,255,0.3)] hover:shadow-[0_0_60px_rgba(0,102,255,0.5)] hover:scale-105 overflow-hidden mb-4">
                <span className="relative z-10">Primary Button</span>
                <div className="absolute inset-0 bg-gradient-to-r from-digiko-accent/0 via-digiko-accent/30 to-digiko-accent/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </button>
              <code className="text-xs text-gray-400 block">px-10 py-5 bg-digiko-primary rounded-2xl</code>
            </div>

            {/* Success Button */}
            <div className="glass rounded-2xl border border-white/10 p-6">
              <div className="text-sm text-gray-400 mb-4">Success Action</div>
              <button className="group relative px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold rounded-2xl transition-all duration-500 shadow-[0_0_40px_rgba(34,197,94,0.4)] hover:shadow-[0_0_60px_rgba(34,197,94,0.6)] hover:scale-105 overflow-hidden mb-4">
                <span className="relative z-10">Success Button</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </button>
              <code className="text-xs text-gray-400 block">from-green-500 to-emerald-500</code>
            </div>

            {/* Secondary Button */}
            <div className="glass rounded-2xl border border-white/10 p-6">
              <div className="text-sm text-gray-400 mb-4">Secondary Action</div>
              <button className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-2xl transition-all duration-300 mb-4">
                Secondary Button
              </button>
              <code className="text-xs text-gray-400 block">bg-white/5 border border-white/10</code>
            </div>

            {/* Danger Button */}
            <div className="glass rounded-2xl border border-white/10 p-6">
              <div className="text-sm text-gray-400 mb-4">Danger Action</div>
              <button className="group relative px-10 py-5 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-semibold rounded-2xl transition-all duration-500 shadow-[0_0_40px_rgba(239,68,68,0.4)] hover:scale-105 overflow-hidden mb-4">
                <span className="relative z-10">Danger Button</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </button>
              <code className="text-xs text-gray-400 block">from-red-500 to-rose-500</code>
            </div>
          </div>
        </section>

        {/* CARDS SECTION */}
        <section id="cards" className="mb-20">
          <h2 className="text-4xl font-semibold text-white mb-8 tracking-tight">Card Patterns</h2>
          
          <div className="space-y-8">
            {/* Ready Card */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Ready-to-Claim Card (Legendary)</h3>
              <div className="group relative overflow-hidden rounded-2xl border backdrop-blur-xl bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-green-500/10 border-green-500/40 shadow-[0_0_40px_rgba(34,197,94,0.15)] hover:shadow-[0_0_60px_rgba(34,197,94,0.25)] transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 animate-shimmer" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent" />
                
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] animate-pulse-glow">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[1.75rem] font-semibold font-mono text-white tracking-[-0.02em] leading-none tabular-nums">500</div>
                        <div className="text-sm font-semibold text-gray-400 mt-1 tracking-wide">DGKO</div>
                      </div>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg font-semibold text-xs tracking-wide backdrop-blur-xl border bg-green-500/15 border-green-500/30 text-green-400">
                      Ready to claim
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm font-semibold text-green-400 mb-3">
                    <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    Click &quot;Withdraw&quot; to claim your tokens
                  </div>
                  
                  <button className="w-full py-3.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold text-sm tracking-[-0.01em] rounded-xl transition-all duration-500 shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] hover:scale-[1.02]">
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                      Withdraw
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Unstaking Progress Card</h3>
              <div className="rounded-2xl border backdrop-blur-xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-[1.75rem] font-semibold font-mono text-white tracking-[-0.02em] leading-none tabular-nums">250</div>
                      <div className="text-sm font-semibold text-gray-400 mt-1 tracking-wide">DGKO</div>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg font-semibold text-xs tracking-wide backdrop-blur-xl border bg-digiko-accent/10 border-digiko-accent/30 text-digiko-accent">
                      3d 5h remaining
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-digiko-accent">75%</span>
                    </div>
                    <div className="relative h-2.5 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-xl border border-white/5">
                      <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-digiko-primary via-digiko-accent to-digiko-primary bg-[length:200%_100%] rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(0,102,255,0.5)] animate-gradient-flow" 
                           style={{ width: '75%' }} />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-slow" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BADGES SECTION */}
        <section id="badges" className="mb-20">
          <h2 className="text-4xl font-semibold text-white mb-8 tracking-tight">Badges</h2>
          
          <div className="glass rounded-2xl border border-white/10 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-3">
                <div className="text-xs text-gray-500 mb-2">Success</div>
                <div className="px-3 py-1.5 rounded-lg font-semibold text-xs tracking-wide backdrop-blur-xl border bg-green-500/15 border-green-500/30 text-green-400 inline-block">
                  Ready to claim
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs text-gray-500 mb-2">Info</div>
                <div className="px-3 py-1.5 rounded-lg font-semibold text-xs tracking-wide backdrop-blur-xl border bg-digiko-accent/10 border-digiko-accent/30 text-digiko-accent inline-block">
                  3d 5h remaining
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs text-gray-500 mb-2">Warning</div>
                <div className="px-3 py-1.5 rounded-lg font-semibold text-xs tracking-wide backdrop-blur-xl border bg-amber-500/10 border-amber-500/30 text-amber-400 inline-block">
                  High impact
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs text-gray-500 mb-2">Error</div>
                <div className="px-3 py-1.5 rounded-lg font-semibold text-xs tracking-wide backdrop-blur-xl border bg-red-500/10 border-red-500/30 text-red-400 inline-block">
                  Failed
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-white/5">
              <code className="text-xs text-gray-400">
                px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide
              </code>
            </div>
          </div>
        </section>

        {/* ANIMATIONS SECTION */}
        <section id="animations" className="mb-20">
          <h2 className="text-4xl font-semibold text-white mb-8 tracking-tight">Premium Animations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl border border-white/10 p-6">
              <div className="text-white font-semibold mb-3">Shimmer (2s)</div>
              <div className="relative h-32 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl overflow-hidden mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/30 to-green-500/0 animate-shimmer" />
              </div>
              <code className="text-xs text-gray-400">animate-shimmer</code>
            </div>

            <div className="glass rounded-2xl border border-white/10 p-6">
              <div className="text-white font-semibold mb-3">Shimmer Slow (3s)</div>
              <div className="relative h-32 bg-gradient-to-br from-digiko-primary/10 to-digiko-accent/10 rounded-xl overflow-hidden mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-shimmer-slow" />
              </div>
              <code className="text-xs text-gray-400">animate-shimmer-slow</code>
            </div>

            <div className="glass rounded-2xl border border-white/10 p-6">
              <div className="text-white font-semibold mb-3">Gradient Flow (3s)</div>
              <div className="h-32 bg-gradient-to-r from-digiko-primary via-digiko-accent to-digiko-primary bg-[length:200%_100%] rounded-xl animate-gradient-flow" />
              <code className="text-xs text-gray-400 mt-4 block">animate-gradient-flow</code>
            </div>

            <div className="glass rounded-2xl border border-white/10 p-6">
              <div className="text-white font-semibold mb-3">Pulse Glow (2s)</div>
              <div className="flex items-center justify-center h-32">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center animate-pulse-glow">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <code className="text-xs text-gray-400">animate-pulse-glow</code>
            </div>
          </div>
        </section>

        {/* SPACING SECTION */}
        <section id="spacing" className="mb-20">
          <h2 className="text-4xl font-semibold text-white mb-8 tracking-tight">Spacing System</h2>
          
          <div className="glass rounded-2xl border border-white/10 p-8">
            <div className="space-y-4">
              {[
                { name: 'Container Max Width', value: '1400px', usage: 'max-w-[1400px]' },
                { name: 'Section Margin', value: '48px', usage: 'mb-12' },
                { name: 'Card Padding', value: '32px', usage: 'p-8' },
                { name: 'Small Card Padding', value: '24px', usage: 'p-6' },
                { name: 'Page Padding Y', value: '64px', usage: 'py-16' },
                { name: 'Gap Between Items', value: '16px', usage: 'gap-4' },
                { name: 'Gap Between Sections', value: '24px', usage: 'gap-6' },
              ].map((spacing) => (
                <div key={spacing.name} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div>
                    <div className="text-white font-medium">{spacing.name}</div>
                    <div className="text-sm text-gray-400 mt-1">{spacing.value}</div>
                  </div>
                  <code className="text-xs text-digiko-accent px-3 py-1 rounded bg-digiko-primary/10">
                    {spacing.usage}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="glass rounded-2xl border border-white/10 p-8 text-center">
          <div className="text-gray-400 text-sm mb-2">
            Design System v1.7
          </div>
          <div className="text-xs text-gray-500">
            Last updated: November 25, 2025
          </div>
        </div>

      </div>

      {/* TransactionModal Demo */}
      <TransactionModal
        isOpen={modalOpen}
        status={modalStatus}
        title={
          modalStatus === 'success' ? 'Transaction Successful!' :
          modalStatus === 'error' ? 'Transaction Failed' :
          'Processing Transaction'
        }
        message={
          modalStatus === 'success' ? 'Your tokens have been staked successfully' :
          modalStatus === 'error' ? 'Insufficient balance or network error' :
          'Please wait while we process your transaction...'
        }
        txHash={modalStatus === 'success' ? 'abc123def456ghi789jkl012mno345pqr678stu901vwx234yz' : undefined}
        onClose={() => setModalOpen(false)}
        autoDismiss={modalStatus === 'success'}
      />
    </div>
  );
}