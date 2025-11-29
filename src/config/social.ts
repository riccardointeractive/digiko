/**
 * Social Links Configuration
 * Centralized management of all social media links for DGKO and BABYDGKO
 * 
 * @fileoverview Single source of truth for social media URLs across the platform
 */

export const SOCIAL_LINKS = {
  /**
   * DGKO Social Links
   */
  DGKO: {
    X: 'https://x.com/DigikoCrypto',
    LINKEDIN: 'https://www.linkedin.com/company/digiko-marketplace/',
    TELEGRAM: 'https://t.me/DigikoCommunity',
  },
  
  /**
   * BABYDGKO Social Links
   */
  BABYDGKO: {
    X: 'https://x.com/babydigiko',
    LINKEDIN: 'https://www.linkedin.com/company/digiko-marketplace/', // Same as DGKO
    TELEGRAM: 'https://t.me/DigikoCommunity', // Same as DGKO
  },
} as const;

/**
 * Type-safe access to social links
 */
export type SocialPlatform = 'X' | 'LINKEDIN' | 'TELEGRAM';
export type TokenType = 'DGKO' | 'BABYDGKO';
