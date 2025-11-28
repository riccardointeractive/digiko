/**
 * Debug Mode Configuration
 * 
 * Enable debug mode by adding ?debug=true to any URL
 * Example: http://localhost:3000/staking?debug=true
 * 
 * This allows you to force errors and test the error logging system
 * without needing actual bugs!
 */

export const DEBUG_MODE = {
  // Enable/disable via URL parameter
  isEnabled: () => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.get('debug') === 'true';
  },
  
  // Error scenarios you can force
  scenarios: {
    INSUFFICIENT_BALANCE: 'insufficient_balance',
    API_TIMEOUT: 'api_timeout',
    API_ERROR: 'api_error',
    NETWORK_ERROR: 'network_error',
    TRANSACTION_FAILED: 'transaction_failed',
    WALLET_REJECTED: 'wallet_rejected',
    INVALID_ADDRESS: 'invalid_address',
    SLIPPAGE_EXCEEDED: 'slippage_exceeded',
  },
  
  // Current forced error scenario
  getCurrentScenario: () => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    return params.get('force_error');
  },
  
  // Check if a specific error should be forced
  shouldForceError: (scenario: string) => {
    return DEBUG_MODE.isEnabled() && DEBUG_MODE.getCurrentScenario() === scenario;
  },
};

/**
 * Force Error Utilities
 * 
 * These functions help you force errors in different parts of the app
 */

export class ForceError extends Error {
  constructor(message: string, public scenario: string) {
    super(message);
    this.name = 'ForceError';
  }
}

// Check if we should force an error before an operation
export function checkForForcedError(scenario: string): void {
  if (DEBUG_MODE.shouldForceError(scenario)) {
    const errorMessages: Record<string, string> = {
      insufficient_balance: 'Insufficient balance for this operation',
      api_timeout: 'API request timed out after 30 seconds',
      api_error: 'API returned 500 Internal Server Error',
      network_error: 'Network request failed - no internet connection',
      transaction_failed: 'Transaction execution reverted on blockchain',
      wallet_rejected: 'User rejected the transaction in wallet',
      invalid_address: 'Invalid wallet address format',
      slippage_exceeded: 'Slippage tolerance exceeded during swap',
    };
    
    throw new ForceError(
      errorMessages[scenario] || 'Forced error for testing',
      scenario
    );
  }
}

// Simulate API error
export function maybeForceApiError(scenario: string): Response | null {
  if (DEBUG_MODE.shouldForceError(scenario)) {
    return new Response(
      JSON.stringify({ error: 'Forced API error for testing' }),
      { status: 500, statusText: 'Internal Server Error' }
    );
  }
  return null;
}

// Add console styling for debug messages
export function debugLog(message: string, data?: any) {
  if (DEBUG_MODE.isEnabled()) {
    console.log(
      '%c🐛 DEBUG MODE: ' + message,
      'background: #0066FF; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;',
      data || ''
    );
  }
}

export default DEBUG_MODE;
