/**
 * DevModeBanner Component
 * Warning banner shown when DEV_MODE is active
 */

export function DevModeBanner() {
  return (
    <div className="mb-6 bg-yellow-500/20 border-2 border-yellow-500 rounded-lg p-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl">🧪</span>
        <div>
          <div className="font-semibold text-yellow-300">DEVELOPMENT MODE ACTIVE</div>
          <div className="text-sm text-yellow-200">
            Simulated transactions only. No real tokens will be staked.
            Set <code className="bg-black/30 px-2 py-1 rounded">DEV_MODE = false</code> in the code to enable real transactions.
          </div>
        </div>
      </div>
    </div>
  );
}
