import { APP_CONFIG } from '@/config/app';
import { clearSession } from '../utils/adminAuth';

/**
 * AdminHeader Component
 * Header with security badge, title, and logout button
 */

interface AdminHeaderProps {
  onLogout: () => void;
}

export function AdminHeader({ onLogout }: AdminHeaderProps) {
  const handleLogout = () => {
    clearSession();
    onLogout();
  };

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-medium text-red-400 uppercase tracking-wider">Admin Mode</span>
        </div>
        
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 rounded-xl transition-all"
        >
          Logout
        </button>
      </div>
      
      <div>
        <h1 className="text-5xl font-medium text-white mb-3">Admin Panel</h1>
        <p className="text-xl text-gray-400">
          Manage tools and monitor platform
        </p>
      </div>
    </div>
  );
}
