import { ACCOUNT_INFO } from '../config/dashboard.config';

/**
 * AccountInfoCard Component
 * Displays network, connection status, and platform info
 */
export function AccountInfoCard() {
  return (
    <div className="glass rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8">
      <h2 className="text-responsive-h3 text-white mb-4 md:mb-5 lg:mb-6">Account Info</h2>
      <div className="space-y-3 md:space-y-4">
        <div className="flex justify-between items-center py-2 md:py-3 border-b border-white/5">
          <span className="text-responsive-base text-gray-400">Network</span>
          <span className="text-responsive-base text-white font-medium">{ACCOUNT_INFO.network}</span>
        </div>
        <div className="flex justify-between items-center py-2 md:py-3 border-b border-white/5">
          <span className="text-responsive-base text-gray-400">Status</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-responsive-base text-green-500 font-medium">Connected</span>
          </div>
        </div>
        <div className="flex justify-between items-center py-2 md:py-3">
          <span className="text-responsive-base text-gray-400">Platform</span>
          <span className="text-responsive-base text-digiko-primary font-medium">{ACCOUNT_INFO.platform}</span>
        </div>
      </div>
    </div>
  );
}
