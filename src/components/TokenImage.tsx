'use client';

import { useState, useEffect } from 'react';

interface TokenImageProps {
  assetId: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  network?: 'mainnet' | 'testnet';
}

const sizeClasses = {
  xs: 'w-5 h-5',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

// Cache for token logos to avoid repeated API calls
const logoCache: Record<string, string | null> = {};

export function TokenImage({ 
  assetId, 
  size = 'md', 
  className = '',
  network = 'mainnet'
}: TokenImageProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLogo = async () => {
      const cacheKey = `${network}:${assetId}`;
      
      // Check cache first
      if (logoCache[cacheKey] !== undefined) {
        setLogoUrl(logoCache[cacheKey]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(false);
        
        // Check Klever API for logo
        const apiUrl = network === 'mainnet'
          ? `https://api.mainnet.klever.org/v1.0/assets/${assetId}`
          : `https://api.testnet.klever.org/v1.0/assets/${assetId}`;
        
        const response = await fetch(apiUrl);
        
        if (response.ok) {
          const data = await response.json();
          const asset = data.data?.asset;
          
          // Logo is directly in asset.logo field
          const logo = asset?.logo || null;
          
          // Cache the result
          logoCache[cacheKey] = logo;
          setLogoUrl(logo);
        } else {
          logoCache[cacheKey] = null;
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching token logo:', err);
        logoCache[cacheKey] = null;
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (assetId) {
      fetchLogo();
    }
  }, [assetId, network]);

  // Get fallback text (first 2 chars of token name)
  const getFallbackText = () => {
    const name = assetId.split('-')[0];
    return name.substring(0, 2).toUpperCase();
  };

  // Get gradient colors based on token name
  const getGradientColors = () => {
    const name = assetId.toLowerCase();
    if (name.includes('dgko') && !name.includes('baby')) {
      return 'from-digiko-primary/30 to-digiko-accent/20';
    }
    if (name.includes('baby')) {
      return 'from-digiko-accent/30 to-purple-500/20';
    }
    if (name.includes('klv')) {
      return 'from-purple-500/30 to-pink-500/20';
    }
    if (name.includes('kfi')) {
      return 'from-amber-500/30 to-orange-500/20';
    }
    // Default gradient
    return 'from-gray-500/30 to-gray-600/20';
  };

  const sizeClass = sizeClasses[size];

  // Loading state
  if (loading) {
    return (
      <div className={`${sizeClass} rounded-full bg-white/5 animate-pulse ${className}`} />
    );
  }

  // Has logo - show image
  if (logoUrl && !error) {
    return (
      <img
        src={logoUrl}
        alt={`${assetId} logo`}
        className={`${sizeClass} rounded-full object-cover ${className}`}
        onError={() => setError(true)}
      />
    );
  }

  // Fallback - show styled placeholder with gradient
  return (
    <div 
      className={`${sizeClass} rounded-full bg-gradient-to-br ${getGradientColors()} flex items-center justify-center border border-white/10 ${className}`}
    >
      <span className="text-white/80 font-mono text-xs font-medium">
        {getFallbackText()}
      </span>
    </div>
  );
}

// Utility function to get token logo URL (for use outside React)
export async function getTokenLogoUrl(
  assetId: string, 
  network: 'mainnet' | 'testnet' = 'mainnet'
): Promise<string | null> {
  const cacheKey = `${network}:${assetId}`;
  
  if (logoCache[cacheKey] !== undefined) {
    return logoCache[cacheKey];
  }

  try {
    const apiUrl = network === 'mainnet'
      ? `https://api.mainnet.klever.org/v1.0/assets/${assetId}`
      : `https://api.testnet.klever.org/v1.0/assets/${assetId}`;
    
    const response = await fetch(apiUrl);
    
    if (response.ok) {
      const data = await response.json();
      const asset = data.data?.asset;
      const logo = asset?.logo || null;
      
      logoCache[cacheKey] = logo;
      return logo;
    }
    
    logoCache[cacheKey] = null;
    return null;
  } catch (err) {
    console.error('Error fetching token logo:', err);
    logoCache[cacheKey] = null;
    return null;
  }
}

// Pre-defined token IDs for easy reference
export const TOKEN_IDS = {
  DGKO: 'DGKO-CXVJ',
  BABYDGKO: 'BABYDGKO-3S67',
  KLV: 'KLV',
  KFI: 'KFI',
} as const;
