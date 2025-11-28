# 🛠️ Debug Menu Setup - Super Simple!

## Add Debug Menu to Your App (2 minutes)

### Option 1: Add to Root Layout (Recommended)

Open `src/app/layout.tsx` and add:

```tsx
import { DebugMenu } from '@/components/DebugMenu'; // ADD THIS

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* ... your existing code ... */}
        
        {children}
        
        <DebugMenu /> {/* ADD THIS - Shows when ?debug=true */}
      </body>
    </html>
  );
}
```

**That's it!** Now the debug menu appears on ALL pages when you add `?debug=true`

---

### Option 2: Add to Specific Pages

If you only want it on certain pages:

```tsx
'use client';

import { DebugMenu } from '@/components/DebugMenu';

export default function StakingPage() {
  return (
    <>
      {/* Your page content */}
      
      <DebugMenu /> {/* Shows when ?debug=true */}
    </>
  );
}
```

---

## How It Works

1. **No `?debug=true` in URL** → Debug menu hidden (production normal)
2. **Add `?debug=true` to URL** → Red bug button (🐛) appears bottom-right
3. **Click bug button** → Debug menu opens with error scenarios
4. **Click any error** → That error will be forced next time you do an action
5. **Do the action** → Error triggers! Test your error logging!

---

## URLs to Try

```
http://localhost:3000/staking?debug=true
http://localhost:3000/swap?debug=true
http://localhost:3000/dgko?debug=true
http://localhost:3000/dashboard?debug=true
```

---

## Complete Setup Checklist

- [ ] Extract the zip file
- [ ] Add `<DebugMenu />` to layout or pages
- [ ] Add debug checks to your code (see READY_TO_USE_EXAMPLE.ts)
- [ ] Start dev server: `npm run dev`
- [ ] Go to any page with `?debug=true`
- [ ] See bug button appear
- [ ] Click it and try forcing errors!

---

## Example: Full Integration in Staking

1. **Add DebugMenu to layout:**
```tsx
// src/app/layout.tsx
import { DebugMenu } from '@/components/DebugMenu';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <DebugMenu />
      </body>
    </html>
  );
}
```

2. **Add debug checks to staking actions:**
```tsx
// src/app/staking/hooks/useStakingActions.ts
import { checkForForcedError } from '@/utils/debugMode';
import { createErrorLog } from '@/utils/errorLogger';

const handleStake = async (...) => {
  try {
    // Add this before your staking logic:
    checkForForcedError('insufficient_balance');
    checkForForcedError('wallet_rejected');
    
    // Your staking code...
  } catch (error) {
    // Create error log
    const errorLog = createErrorLog({
      title: 'Staking Failed',
      message: 'Unable to stake',
      error: error,
      userAddress: address,
      component: 'StakingPage',
      action: `Stake ${amount} DGKO`,
      transaction: {
        type: 'stake',
        tokenSymbol: 'DGKO',
        amount: amount,
      },
    });
    
    showErrorModal('Staking Failed', 'Unable to stake', errorLog);
  }
};
```

3. **Test it:**
   - Go to: `http://localhost:3000/staking?debug=true`
   - Click bug button
   - Select "💰 Insufficient Balance"
   - Try to stake
   - **BOOM! Error with full debug log!** 🎉

---

## That's It!

Now you can force errors anytime to test error logging!

**No more "there are no errors on my end"** 😎
