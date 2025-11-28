'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TokensDropdown } from './TokensDropdown';

/**
 * NavigationLinks Component
 * Desktop navigation with active page indication
 */
export function NavigationLinks() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="hidden md:flex items-center gap-1">
      <Link 
        href="/dashboard" 
        className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
          isActive('/dashboard')
            ? 'text-white bg-white/5'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
      >
        Dashboard
      </Link>
      
      <TokensDropdown />
      
      <Link 
        href="/staking" 
        className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
          isActive('/staking')
            ? 'text-white bg-white/5'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
      >
        Staking
      </Link>
      
      {/* Coming Soon Items */}
      <span className="group relative px-4 py-2 text-sm text-gray-600 cursor-not-allowed flex items-center gap-1.5">
        Swap
        <span className="text-[9px] uppercase tracking-wider px-1 py-0.5 rounded bg-white/5 text-gray-500">Soon</span>
      </span>
      
      <span className="group relative px-4 py-2 text-sm text-gray-600 cursor-not-allowed flex items-center gap-1.5">
        Games
        <span className="text-[9px] uppercase tracking-wider px-1 py-0.5 rounded bg-white/5 text-gray-500">Soon</span>
      </span>
      
      <span className="group relative px-4 py-2 text-sm text-gray-600 cursor-not-allowed flex items-center gap-1.5">
        NFTs
        <span className="text-[9px] uppercase tracking-wider px-1 py-0.5 rounded bg-white/5 text-gray-500">Soon</span>
      </span>
    </div>
  );
}
