import { useState } from 'react';
import { hashPassword, ADMIN_PASSWORD_HASH, MAX_LOGIN_ATTEMPTS, LOCKOUT_DURATION, createSession } from '../utils/adminAuth';

/**
 * LoginForm Component
 * Admin authentication form with password hashing and security features
 */

interface LoginFormProps {
  onSuccess: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      setError('Too many failed attempts. Please wait 5 minutes.');
      return;
    }

    if (!password) {
      setError('Please enter a password');
      return;
    }

    setError('');
    
    try {
      const hashedInput = await hashPassword(password);
      
      if (hashedInput === ADMIN_PASSWORD_HASH) {
        // Success
        createSession();
        onSuccess();
        setPassword('');
        setAttempts(0);
      } else {
        // Failed
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        
        if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
          setIsLocked(true);
          setError('Too many failed attempts. Access locked for 5 minutes.');
          setTimeout(() => {
            setIsLocked(false);
            setAttempts(0);
          }, LOCKOUT_DURATION);
        } else {
          setError(`Incorrect password. ${MAX_LOGIN_ATTEMPTS - newAttempts} attempts remaining.`);
        }
        
        setPassword('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-digiko-primary to-digiko-accent mb-4 shadow-[0_0_40px_rgba(0,102,255,0.3)]">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-semibold text-white mb-2 tracking-tight">Admin Access</h1>
          <p className="text-gray-400">Enter your password to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="glass rounded-2xl border border-white/10 p-8">
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-white mb-3">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLocked}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-digiko-primary/40 focus:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed pr-12"
                placeholder="Enter admin password"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl border bg-red-500/10 border-red-500/20">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="text-sm text-red-400">{error}</div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLocked || !password}
            className="group relative w-full px-6 py-4 bg-gradient-to-r from-digiko-primary to-digiko-accent text-white font-semibold rounded-xl transition-all duration-500 shadow-[0_0_30px_rgba(0,102,255,0.4)] hover:shadow-[0_0_50px_rgba(0,102,255,0.6)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
              {isLocked ? 'Access Locked' : 'Access Admin Panel'}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </button>
        </form>

        {/* Security Info */}
        <div className="mt-6 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-xs text-amber-400/80">
              <div className="font-semibold mb-1">Security Notice</div>
              <div className="text-amber-400/60">
                • {MAX_LOGIN_ATTEMPTS} attempts allowed before lockout<br />
                • Session valid for 24 hours<br />
                • Password is hashed for security
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
