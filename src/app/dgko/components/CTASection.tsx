import Link from 'next/link';

/**
 * CTASection Component
 * Call-to-action section with Buy DGKO and Stake DGKO buttons
 */
export function CTASection() {
  return (
    <div className="glass rounded-3xl p-8 md:p-12 border border-white/10 text-center">
      <h2 className="text-3xl font-medium text-white mb-4">Get DGKO Today</h2>
      <p className="text-gray-400 mb-8 max-w-xl mx-auto">
        Join the Digiko ecosystem. Buy, stake, and earn rewards on Klever Blockchain.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="https://bitcoin.me"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative px-8 py-4 bg-digiko-primary text-white font-medium rounded-2xl transition-all duration-500 shadow-[0_0_40px_rgba(0,102,255,0.3)] hover:shadow-[0_0_60px_rgba(0,102,255,0.5)] hover:scale-105 overflow-hidden"
        >
          <span className="relative z-10">Buy DGKO</span>
          <div className="absolute inset-0 bg-gradient-to-r from-digiko-accent/0 via-digiko-accent/30 to-digiko-accent/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        </a>
        <Link
          href="/staking"
          className="px-8 py-4 glass-hover rounded-2xl font-medium text-white transition-all duration-300"
        >
          Stake DGKO
        </Link>
      </div>
    </div>
  );
}
