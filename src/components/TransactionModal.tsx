'use client';

import React, { useEffect, useState } from 'react';
import { ErrorLog } from '@/types/errorLog';
import { copyErrorLogToClipboard, formatErrorLogForCopy } from '@/utils/errorLogger';

export type TransactionStatus = 'success' | 'error' | 'loading';

interface TransactionModalProps {
  isOpen: boolean;
  status: TransactionStatus;
  title?: string;
  message?: string;
  txHash?: string;
  errorLog?: ErrorLog; // Enhanced: full error context for debugging
  onClose: () => void;
  autoDismiss?: boolean;
  autoDismissDelay?: number;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  status,
  title,
  message,
  txHash,
  errorLog,
  onClose,
  autoDismiss = false,
  autoDismissDelay = 5000,
}) => {
  const [particles, setParticles] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    delay: number;
    size: number;
    color: string;
    duration: number;
  }>>([]);
  const [copied, setCopied] = useState(false);
  const [debugLogCopied, setDebugLogCopied] = useState(false);
  const [showDebugDetails, setShowDebugDetails] = useState(false);

  useEffect(() => {
    if (isOpen && status === 'success') {
      // Generate colorful celebration particles
      const colors = [
        '#10B981', // green
        '#34D399', // emerald
        '#6EE7B7', // light green
        '#0066FF', // digiko blue
        '#00D4FF', // digiko cyan
        '#F59E0B', // amber
        '#FBBF24', // yellow
      ];
      
      const newParticles = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
        delay: Math.random() * 0.4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 0.5 + 1,
      }));
      setParticles(newParticles);
    }
  }, [isOpen, status]);

  useEffect(() => {
    if (isOpen && autoDismiss && status !== 'loading') {
      const timer = setTimeout(() => {
        onClose();
      }, autoDismissDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoDismiss, autoDismissDelay, status, onClose]);

  const handleCopy = async () => {
    if (txHash) {
      await navigator.clipboard.writeText(txHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyDebugLog = async () => {
    if (errorLog) {
      const success = await copyErrorLogToClipboard(errorLog);
      if (success) {
        setDebugLogCopied(true);
        setTimeout(() => setDebugLogCopied(false), 2000);
      }
    }
  };

  if (!isOpen) return null;

  const getStatusConfig = () => {
    switch (status) {
      case 'success':
        return {
          title: title || 'Transaction Successful',
          icon: (
            <div className="relative">
              {/* Animated rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-2 border-green-500/30 animate-ping-slow" />
                <div className="absolute w-40 h-40 rounded-full border-2 border-green-500/20 animate-ping-slower" />
              </div>
              
              {/* Celebration particles */}
              {particles.map((particle) => (
                <div
                  key={particle.id}
                  className="absolute rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    background: particle.color,
                    boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                    animation: `particle-explode ${particle.duration}s ease-out ${particle.delay}s forwards`,
                    '--particle-x': `${particle.x}px`,
                    '--particle-y': `${particle.y}px`,
                  } as React.CSSProperties}
                />
              ))}
              
              {/* Success checkmark */}
              <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-[0_0_60px_rgba(16,185,129,0.6)] animate-scale-bounce">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 animate-pulse opacity-50" />
                <svg 
                  className="w-16 h-16 text-white relative z-10" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M5 13l4 4L19 7"
                    className="animate-check-draw"
                  />
                </svg>
              </div>
            </div>
          ),
          gradient: 'from-green-500/20 via-emerald-500/20 to-green-500/20',
          buttonGradient: 'from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600',
          glow: 'shadow-[0_0_80px_rgba(16,185,129,0.4)]',
        };
      case 'error':
        return {
          title: title || 'Transaction Failed',
          icon: (
            <div className="relative">
              {/* Animated warning rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-2 border-red-500/40 animate-pulse-ring" />
              </div>
              
              <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center shadow-[0_0_60px_rgba(239,68,68,0.6)] animate-shake-strong">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-400 to-rose-400 animate-pulse opacity-50" />
                <svg 
                  className="w-16 h-16 text-white relative z-10" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </div>
            </div>
          ),
          gradient: 'from-red-500/20 via-rose-500/20 to-red-500/20',
          buttonGradient: 'from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600',
          glow: 'shadow-[0_0_80px_rgba(239,68,68,0.4)]',
        };
      case 'loading':
        return {
          title: title || 'Processing Transaction',
          icon: (
            <div className="relative">
              {/* Spinning rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-4 border-digiko-primary/20 border-t-digiko-primary animate-spin" />
                <div className="absolute w-36 h-36 rounded-full border-4 border-digiko-accent/20 border-t-digiko-accent animate-spin-slow" />
              </div>
              
              <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-digiko-primary to-digiko-accent flex items-center justify-center shadow-[0_0_60px_rgba(0,102,255,0.6)] animate-pulse-glow">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-digiko-primary/50 to-digiko-accent/50 animate-pulse" />
                <div className="relative w-14 h-14 rounded-full border-4 border-white/30 border-t-white animate-spin" />
              </div>
            </div>
          ),
          gradient: 'from-digiko-primary/20 via-digiko-accent/20 to-digiko-primary/20',
          buttonGradient: 'from-digiko-primary to-digiko-accent hover:from-digiko-secondary hover:to-digiko-primary',
          glow: 'shadow-[0_0_80px_rgba(0,102,255,0.4)]',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <>
      {/* Animated backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 z-50 animate-backdrop-fade"
        onClick={status !== 'loading' ? onClose : undefined}
      />
      
      {/* Gradient overlay for extra atmosphere */}
      <div className={`fixed inset-0 z-50 bg-gradient-to-br ${config.gradient} opacity-30 animate-gradient pointer-events-none`} />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className={`glass w-full max-w-lg rounded-[2rem] border border-white/10 ${config.glow} pointer-events-auto animate-modal-entrance backdrop-blur-2xl`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          {status !== 'loading' && (
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 group border border-white/10"
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Content */}
          <div className="p-10 flex flex-col items-center text-center">
            {/* Icon with extra spacing */}
            <div className="mb-8">
              {config.icon}
            </div>

            {/* Title */}
            <h3 className="text-[2rem] font-bold text-white mb-3 tracking-[-0.02em] leading-tight antialiased">
              {config.title}
            </h3>

            {/* Message */}
            {message && (
              <p className="text-gray-300 text-base mb-4 max-w-sm leading-relaxed font-medium tracking-[-0.01em] antialiased">
                {message}
              </p>
            )}

            {/* Debug Log Section (Error only) */}
            {status === 'error' && errorLog && (
              <div className="w-full mt-6 space-y-3">
                {/* Copy Debug Log Button */}
                <button
                  onClick={handleCopyDebugLog}
                  className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group flex items-center justify-center gap-2"
                >
                  {debugLogCopied ? (
                    <>
                      <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium text-green-500">Debug Log Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Copy Debug Log</span>
                    </>
                  )}
                </button>

                {/* Collapsible Technical Details */}
                <div className="w-full">
                  <button
                    onClick={() => setShowDebugDetails(!showDebugDetails)}
                    className="w-full py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 flex items-center justify-between group"
                  >
                    <span className="text-xs font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                      {showDebugDetails ? 'Hide' : 'Show'} Technical Details
                    </span>
                    <svg 
                      className={`w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-all duration-300 ${showDebugDetails ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Technical Details Content */}
                  {showDebugDetails && (
                    <div className="mt-3 p-4 rounded-xl bg-black/20 border border-white/5 space-y-3 animate-slide-up">
                      {/* Timestamp */}
                      <div className="flex justify-between items-start gap-3">
                        <span className="text-xs text-gray-500 font-medium">Time:</span>
                        <span className="text-xs text-gray-300 font-mono text-right">{new Date(errorLog.timestamp).toLocaleString()}</span>
                      </div>

                      {/* Route */}
                      <div className="flex justify-between items-start gap-3">
                        <span className="text-xs text-gray-500 font-medium">Page:</span>
                        <span className="text-xs text-gray-300 font-mono text-right">{errorLog.route}</span>
                      </div>

                      {/* Component */}
                      {errorLog.component && (
                        <div className="flex justify-between items-start gap-3">
                          <span className="text-xs text-gray-500 font-medium">Component:</span>
                          <span className="text-xs text-gray-300 font-mono text-right">{errorLog.component}</span>
                        </div>
                      )}

                      {/* Action */}
                      {errorLog.action && (
                        <div className="flex justify-between items-start gap-3">
                          <span className="text-xs text-gray-500 font-medium">Action:</span>
                          <span className="text-xs text-gray-300 font-mono text-right">{errorLog.action}</span>
                        </div>
                      )}

                      {/* Browser */}
                      <div className="flex justify-between items-start gap-3">
                        <span className="text-xs text-gray-500 font-medium">Browser:</span>
                        <span className="text-xs text-gray-300 font-mono text-right">
                          {errorLog.browser.name} {errorLog.browser.version} ({errorLog.browser.os})
                        </span>
                      </div>

                      {/* Network */}
                      <div className="flex justify-between items-start gap-3">
                        <span className="text-xs text-gray-500 font-medium">Network:</span>
                        <span className="text-xs text-gray-300 font-mono text-right">{errorLog.network}</span>
                      </div>

                      {/* App Version */}
                      <div className="flex justify-between items-start gap-3">
                        <span className="text-xs text-gray-500 font-medium">Version:</span>
                        <span className="text-xs text-gray-300 font-mono text-right">{errorLog.appVersion}</span>
                      </div>

                      {/* User Address */}
                      {errorLog.userAddress && (
                        <div className="flex justify-between items-start gap-3">
                          <span className="text-xs text-gray-500 font-medium">Address:</span>
                          <span className="text-xs text-gray-300 font-mono text-right">{errorLog.userAddress}</span>
                        </div>
                      )}

                      {/* Transaction Details */}
                      {errorLog.transaction && (
                        <>
                          <div className="pt-2 border-t border-white/5">
                            <span className="text-xs text-gray-500 font-medium">Transaction Details:</span>
                          </div>
                          <div className="flex justify-between items-start gap-3">
                            <span className="text-xs text-gray-500 font-medium">Type:</span>
                            <span className="text-xs text-gray-300 font-mono text-right">{errorLog.transaction.type}</span>
                          </div>
                          {errorLog.transaction.tokenSymbol && (
                            <div className="flex justify-between items-start gap-3">
                              <span className="text-xs text-gray-500 font-medium">Token:</span>
                              <span className="text-xs text-gray-300 font-mono text-right">{errorLog.transaction.tokenSymbol}</span>
                            </div>
                          )}
                          {errorLog.transaction.amount && (
                            <div className="flex justify-between items-start gap-3">
                              <span className="text-xs text-gray-500 font-medium">Amount:</span>
                              <span className="text-xs text-gray-300 font-mono text-right">{errorLog.transaction.amount}</span>
                            </div>
                          )}
                        </>
                      )}

                      {/* API Details */}
                      {errorLog.api && (
                        <>
                          <div className="pt-2 border-t border-white/5">
                            <span className="text-xs text-gray-500 font-medium">API Details:</span>
                          </div>
                          <div className="flex justify-between items-start gap-3">
                            <span className="text-xs text-gray-500 font-medium">Endpoint:</span>
                            <span className="text-xs text-gray-300 font-mono text-right break-all">{errorLog.api.endpoint}</span>
                          </div>
                          {errorLog.api.statusCode && (
                            <div className="flex justify-between items-start gap-3">
                              <span className="text-xs text-gray-500 font-medium">Status:</span>
                              <span className="text-xs text-gray-300 font-mono text-right">{errorLog.api.statusCode}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Helper Text */}
                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  Copy this log and send it to support for faster debugging
                </p>
              </div>
            )}

            {/* Transaction Hash */}
            {txHash && status === 'success' && (
              <div className="w-full mt-6 p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl animate-slide-up">
                <p className="text-[0.6875rem] text-gray-400 mb-3 font-semibold uppercase tracking-[0.08em] antialiased">Transaction Hash</p>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-mono text-digiko-accent truncate flex-1 font-medium tracking-tight">
                    {txHash}
                  </p>
                  <button
                    onClick={handleCopy}
                    className="p-2.5 hover:bg-white/5 rounded-xl transition-all duration-300 group relative"
                    title="Copy transaction hash"
                  >
                    {copied ? (
                      <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                  <a
                    href={`https://kleverscan.org/transaction/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 hover:bg-white/5 rounded-xl transition-all duration-300 group"
                    title="View on Kleverscan"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-digiko-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            )}

            {/* Action button */}
            {status !== 'loading' && (
              <button
                onClick={onClose}
                className={`mt-8 w-full py-4 px-8 rounded-2xl font-bold text-base tracking-[-0.01em] transition-all duration-500 bg-gradient-to-r ${config.buttonGradient} text-white ${config.glow} hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group antialiased`}
              >
                <span className="relative z-10">{status === 'success' ? 'Done' : 'Close'}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes particle-explode {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--particle-x)), calc(-50% + var(--particle-y))) scale(1);
            opacity: 0;
          }
        }

        @keyframes check-draw {
          0% {
            stroke-dasharray: 50;
            stroke-dashoffset: 50;
          }
          100% {
            stroke-dasharray: 50;
            stroke-dashoffset: 0;
          }
        }

        @keyframes scale-bounce {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes shake-strong {
          0%, 100% {
            transform: translateX(0) rotate(0deg);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-6px) rotate(-3deg);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(6px) rotate(3deg);
          }
        }

        @keyframes backdrop-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modal-entrance {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes gradient {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes pulse-ring {
          0%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.2;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 60px rgba(0, 102, 255, 0.6);
          }
          50% {
            box-shadow: 0 0 80px rgba(0, 102, 255, 0.8);
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }

        @keyframes ping-slower {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-check-draw path {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
          animation: check-draw 0.7s ease-out 0.4s forwards;
        }

        .animate-scale-bounce {
          animation: scale-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-shake-strong {
          animation: shake-strong 0.6s ease-out;
        }

        .animate-backdrop-fade {
          animation: backdrop-fade 0.4s ease-out;
        }

        .animate-modal-entrance {
          animation: modal-entrance 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-gradient {
          animation: gradient 3s ease-in-out infinite;
        }

        .animate-pulse-ring {
          animation: pulse-ring 2s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-ping-slower {
          animation: ping-slower 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out 0.3s forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
};