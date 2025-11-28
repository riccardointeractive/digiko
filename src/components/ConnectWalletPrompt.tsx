export function ConnectWalletPrompt() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="glass rounded-3xl p-8 md:p-12 border border-white/10">
          
          {/* Wallet Icon - Clean and simple */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
              </svg>
            </div>
          </div>

          {/* Title & Subtitle */}
          <h2 className="text-3xl font-medium text-white text-center mb-2">
            Connect Your Wallet
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Connect to start managing your digital assets
          </p>

          {/* Features - Simple 3-column with SVG icons */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {/* Secure */}
            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex justify-center mb-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div className="text-xs text-gray-400">Secure</div>
            </div>

            {/* Fast */}
            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex justify-center mb-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <div className="text-xs text-gray-400">Fast</div>
            </div>

            {/* Non-custodial */}
            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex justify-center mb-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                </svg>
              </div>
              <div className="text-xs text-gray-400">Non-custodial</div>
            </div>
          </div>

          {/* Info Box - Minimal */}
          <div className="mb-6 p-4 rounded-xl bg-digiko-primary/5 border border-digiko-primary/20">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-digiko-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-gray-300 leading-relaxed">
                Make sure you have the Klever Wallet extension installed and unlocked
              </p>
            </div>
          </div>

          {/* Secondary instruction */}
          <p className="text-center text-sm text-gray-500 mb-6">
            Click the "Connect Wallet" button in the top navigation to continue
          </p>

          {/* Download link */}
          <p className="text-center text-sm text-gray-500">
            Don't have Klever Wallet?{' '}
            <a 
              href="https://klever.io/extension/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-digiko-primary hover:text-digiko-accent transition-colors font-medium"
            >
              Download here →
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}