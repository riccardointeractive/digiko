'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { APP_CONFIG } from '@/config/app';
import { isSessionValid } from './utils/adminAuth';
import { tools, quickActions, quickLinks } from './config/admin.config';
import { LoginForm } from './components/LoginForm';
import { AdminHeader } from './components/AdminHeader';

/**
 * Admin Page - Modular Architecture
 * 
 * Password-protected admin panel for managing platform tools and settings.
 * Authentication handled via SHA-256 hashed passwords with session management.
 * All tools and configuration in config/admin.config.tsx.
 */
export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  useEffect(() => {
    setIsAuthenticated(isSessionValid());
    setIsLoading(false);
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass rounded-2xl border border-white/10 p-8">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-digiko-primary border-t-transparent rounded-full animate-spin" />
            <div className="text-white font-medium">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  // Login screen
  if (!isAuthenticated) {
    return <LoginForm onSuccess={() => setIsAuthenticated(true)} />;
  }

  // Authenticated admin panel
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Header */}
        <AdminHeader onLogout={() => setIsAuthenticated(false)} />

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="glass rounded-2xl p-6 border border-white/10">
            <div className="text-3xl font-mono font-semibold text-white mb-1">
              {tools.reduce((acc, cat) => acc + cat.items.length, 0)}
            </div>
            <div className="text-sm text-gray-400">Total Tools</div>
          </div>
          <div className="glass rounded-2xl p-6 border border-white/10">
            <div className="text-3xl font-mono font-semibold text-green-400 mb-1">
              {tools.reduce((acc, cat) => acc + cat.items.filter(i => i.status === 'active').length, 0)}
            </div>
            <div className="text-sm text-gray-400">Active</div>
          </div>
          <div className="glass rounded-2xl p-6 border border-white/10">
            <div className="text-3xl font-mono font-semibold text-blue-400 mb-1">
              {tools.reduce((acc, cat) => acc + cat.items.filter(i => i.status === 'coming').length, 0)}
            </div>
            <div className="text-sm text-gray-400">Coming Soon</div>
          </div>
          <div className="glass rounded-2xl p-6 border border-white/10">
            <div className="text-3xl font-mono font-semibold text-white mb-1">{APP_CONFIG.versionDisplay}</div>
            <div className="text-sm text-gray-400">Version</div>
          </div>
        </div>

        {/* Tools by Category */}
        <div className="space-y-12 mb-12">
          {tools.map((category) => (
            <div key={category.category}>
              <h2 className="text-2xl font-semibold text-white mb-6">{category.category}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((tool) => (
                  <Link 
                    key={tool.id}
                    href={tool.href}
                    className={`group glass rounded-2xl p-6 border border-white/10 transition-all duration-300 ${
                      tool.status === 'active' 
                        ? 'hover:border-digiko-primary/40 hover:bg-white/5 cursor-pointer' 
                        : 'opacity-60 cursor-not-allowed'
                    }`}
                    onClick={(e) => tool.status === 'coming' && e.preventDefault()}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${
                        tool.status === 'active' ? 'bg-digiko-primary/10' : 'bg-white/5'
                      }`}>
                        {tool.icon}
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-lg ${
                        tool.badgeColor === 'green' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'
                      }`}>
                        {tool.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{tool.title}</h3>
                    <p className="text-sm text-gray-400">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions & Links Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Quick Actions */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={action.action}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-left"
                >
                  <span className="text-2xl">{action.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-white">{action.title}</div>
                    <div className="text-xs text-gray-400">{action.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="glass rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link, idx) => (
                link.url.startsWith('http') ? (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{link.title}</span>
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>
                ) : (
                  <Link
                    key={idx}
                    href={link.url}
                    className="block p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{link.title}</span>
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="glass rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-6">System Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Platform Version</div>
                <div className="flex items-center gap-3">
                  <div className="text-white font-mono">{APP_CONFIG.versionDisplay}</div>
                  <button
                    onClick={() => copyToClipboard(APP_CONFIG.version, 'version')}
                    className="text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedItem === 'version' ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">App Name</div>
                <div className="text-white">{APP_CONFIG.name}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Status</div>
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded-lg bg-amber-500/10 text-amber-400 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {APP_CONFIG.status}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Network</div>
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  {APP_CONFIG.network}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Framework</div>
                <div className="text-white">Next.js 14</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Blockchain</div>
                <div className="text-white">Klever</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
