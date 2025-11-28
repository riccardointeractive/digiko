'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TokenImage, TOKEN_IDS } from './TokenImage';

export function TokensDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const tokens = [
    { 
      href: '/dgko', 
      label: 'DGKO',
      assetId: TOKEN_IDS.DGKO,
      description: 'Utility Token'
    },
    { 
      href: '/babydgko', 
      label: 'BABYDGKO',
      assetId: TOKEN_IDS.BABYDGKO,
      description: 'Meme Token'
    },
  ];

  const isActive = (href: string) => pathname === href;
  const isAnyTokenActive = tokens.some(token => pathname === token.href);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div 
      ref={dropdownRef}
      className="relative"
    >
      {/* Tokens Button - Now clickable instead of hover */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
          isAnyTokenActive
            ? 'text-white bg-white/5'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <span>Tokens</span>
          <svg 
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-56 bg-[#141416] rounded-xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden animate-fade-in z-50">
          <div className="p-1.5">
            {tokens.map((token) => (
              <Link
                key={token.href}
                href={token.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 group ${
                  isActive(token.href)
                    ? 'bg-digiko-primary/15 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <TokenImage 
                  assetId={token.assetId} 
                  size="sm"
                  className={`transition-transform duration-300 ${
                    isActive(token.href) ? '' : 'group-hover:scale-110'
                  }`}
                />
                <div className="flex-1">
                  <div className={`text-sm font-medium ${
                    isActive(token.href) ? 'text-white' : 'text-gray-300'
                  }`}>
                    {token.label}
                  </div>
                  <div className="text-xs text-gray-500">{token.description}</div>
                </div>
                {isActive(token.href) && (
                  <div className="w-1.5 h-1.5 rounded-full bg-digiko-primary"></div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}