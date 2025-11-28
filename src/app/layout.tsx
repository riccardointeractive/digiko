import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { KleverProvider } from '@/context/KleverContext';
import Link from 'next/link';
import { WalletConnect } from '@/components/WalletConnect';
import { MobileMenu } from '@/components/MobileMenu';
import { DesktopMoreMenu } from '@/components/DesktopMoreMenu';
import { NavigationLinks } from '@/components/NavigationLinks';
import { AdminIcon } from '@/components/AdminIcon';
import { APP_CONFIG } from '@/config/app';
import { Analytics } from '@vercel/analytics/react';
import { DebugMenu } from '@/components/DebugMenu';

export const metadata: Metadata = {
  title: 'Digiko Web3 DApp',
  description: 'Digiko - Full-featured Web3 application on Klever Blockchain',
  keywords: 'Digiko, Klever, Blockchain, Web3, DApp, Cryptocurrency',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans">
        <KleverProvider>
          <div className="min-h-screen bg-digiko-dark-300">
            {/* Navigation with advanced glass morphism */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                  {/* Logo with Badge */}
                  <div className="flex items-center">
                    <Link 
                      href="/" 
                      className="relative flex items-center gap-2 group"
                    >
                      <span className="relative z-10 text-xl font-semibold tracking-tight text-white">
                        {APP_CONFIG.name}
                      </span>
                      {/* BETA Badge */}
                      <span className="relative px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase bg-gradient-to-r from-digiko-primary/20 to-digiko-accent/20 text-digiko-accent border border-digiko-accent/30 rounded-md">
                        {APP_CONFIG.status}
                        <span className="absolute inset-0 rounded-md bg-digiko-accent/10 blur-sm" />
                      </span>
                      <span className="absolute -inset-2 bg-gradient-to-r from-digiko-primary/20 to-digiko-accent/20 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                    </Link>
                    {/* Admin Icon - Only visible on localhost */}
                    <AdminIcon />
                  </div>
                  
                  {/* Desktop Navigation */}
                  <NavigationLinks />
                  
                  {/* Right side actions - Desktop */}
                  <div className="hidden md:flex items-center gap-3">
                    <WalletConnect />
                    {/* Desktop More Menu (Documentation, Updates) */}
                    <DesktopMoreMenu />
                  </div>

                  {/* Mobile: Wallet + Menu */}
                  <div className="flex md:hidden items-center gap-2">
                    {/* Compact wallet on mobile - outside menu */}
                    <WalletConnect />
                    {/* Mobile menu component */}
                    <MobileMenu />
                  </div>
                </div>
              </div>
            </nav>

            {/* Main content with proper spacing for fixed nav */}
            <main className="pt-20">{children}</main>

            {/* Footer */}
            <footer className="relative mt-32 border-t border-white/5">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-digiko-primary/5 to-transparent pointer-events-none" />
              <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="text-center md:text-left">
                    {/* Footer Logo with Badge */}
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <span className="text-xl font-semibold text-white">{APP_CONFIG.name}</span>
                      <span className="px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase bg-gradient-to-r from-digiko-primary/20 to-digiko-accent/20 text-digiko-accent border border-digiko-accent/30 rounded-md">
                        {APP_CONFIG.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Built on Klever Blockchain
                    </p>
                    <p className="text-xs text-gray-600 font-mono mt-1">
                      {APP_CONFIG.versionDisplay}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8 text-sm text-gray-500">
                    <Link href="/documentation" className="hover:text-digiko-primary transition-colors duration-300">Documentation</Link>
                    <Link href="/updates" className="hover:text-digiko-primary transition-colors duration-300">Updates</Link>
                    <a href="#" className="hover:text-digiko-primary transition-colors duration-300">Support</a>
                    <a href="#" className="hover:text-digiko-primary transition-colors duration-300">GitHub</a>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-white/5 text-center text-sm text-gray-600">
                  © 2025 Digiko. All rights reserved.
                </div>
              </div>
            </footer>
          </div>
        </KleverProvider>
        <Analytics />
        <DebugMenu />
      </body>
    </html>
  );
}