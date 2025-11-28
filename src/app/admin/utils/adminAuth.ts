/**
 * Admin Authentication Utilities
 * Password hashing and session management
 */

// Password configuration
export const ADMIN_PASSWORD_HASH = '698468ae756d6b5e4a8e432adefeaeba1b65d85f625fb32219aca1a4b0d348ec';
// Current password: "Digiko2025!" 
// To generate a new hash: https://emn178.github.io/online-tools/sha256.html

// Session configuration
export const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Hash password using SHA-256
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Check if session is valid
 */
export function isSessionValid(): boolean {
  const authToken = localStorage.getItem('digiko_admin_auth');
  const authTime = localStorage.getItem('digiko_admin_auth_time');
  
  if (!authToken || !authTime) return false;
  
  const timeDiff = Date.now() - parseInt(authTime);
  return timeDiff < SESSION_DURATION;
}

/**
 * Create new session
 */
export function createSession(): void {
  localStorage.setItem('digiko_admin_auth', 'true');
  localStorage.setItem('digiko_admin_auth_time', Date.now().toString());
}

/**
 * Clear session
 */
export function clearSession(): void {
  localStorage.removeItem('digiko_admin_auth');
  localStorage.removeItem('digiko_admin_auth_time');
}
