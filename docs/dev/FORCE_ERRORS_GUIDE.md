# 🐛 How to Force Real Errors for Testing

## The Problem You Have
"There are no errors on my end!" - So you can't test the error logging system 😅

## The Solution
**DEBUG MODE** - Force errors to happen so you can test error logging!

---

## 🚀 Quick Start (3 Steps)

### Step 1: Enable Debug Mode
Add `?debug=true` to any URL:

```
http://localhost:3000/staking?debug=true
```

You'll see a **red bug button (🐛)** in the bottom-right corner!

### Step 2: Open Debug Menu
Click the bug button → Debug menu opens

### Step 3: Choose an Error
Click any error scenario:
- 💰 Insufficient Balance
- ⏱️ API Timeout
- 🔥 API Error
- 📡 Network Error
- ⛔ Transaction Failed
- 🚫 Wallet Rejected
- ❌ Invalid Address
- 📉 Slippage Exceeded

### Step 4: Trigger It!
Now do whatever action in the app (stake, swap, etc.) → **BOOM! Error happens!** 🎉

---

## 📋 Example Workflow

### Test Staking Error:

1. Go to: `http://localhost:3000/staking?debug=true`
2. Click the 🐛 bug button
3. Select **"💰 Insufficient Balance"**
4. Try to stake some DGKO
5. **Error modal appears!**
6. Click **"Copy Debug Log"**
7. Paste to see the full log
8. Click **"Show Technical Details"**
9. See all the captured info!

### Test API Error:

1. Go to: `http://localhost:3000/dgko?debug=true`
2. Click the 🐛 bug button
3. Select **"🔥 API Error"**
4. Refresh the page
5. **Error modal appears!**
6. Test the copy button and technical details!

### Test Transaction Error:

1. Go to: `http://localhost:3000/staking?debug=true`
2. Click the 🐛 bug button
3. Select **"⛔ Transaction Failed"**
4. Try to stake tokens
5. **Error modal appears with transaction details!**

---

## 🔧 How to Add Debug Checks to Your Code

### Quick Integration (2 lines):

**Before:**
```typescript
const handleStake = async (amount: string) => {
  // ... validation ...
  
  try {
    // your staking code
  } catch (error) {
    showErrorModal('Failed', 'Error happened');
  }
};
```

**After:**
```typescript
import { checkForForcedError, debugLog } from '@/utils/debugMode';
import { createErrorLog } from '@/utils/errorLogger';

const handleStake = async (amount: string) => {
  // ... validation ...
  
  try {
    // 🐛 ADD THESE 2 LINES:
    checkForForcedError('insufficient_balance');
    checkForForcedError('wallet_rejected');
    
    // your staking code
  } catch (error) {
    debugLog('Error occurred', error);
    
    // Create full error log
    const errorLog = createErrorLog({
      title: 'Staking Failed',
      message: 'Unable to stake tokens',
      error: error as Error,
      userAddress: address,
      component: 'StakingPage',
      action: `Stake ${amount} DGKO`,
      transaction: {
        type: 'stake',
        tokenSymbol: 'DGKO',
        amount: amount,
      },
    });
    
    showErrorModal('Staking Failed', 'Unable to stake tokens', errorLog);
  }
};
```

**That's it!** Now when you select that error in debug menu, it will trigger!

---

## 📍 Where to Add Checks

### Staking Page (`useStakingActions.ts`):
```typescript
// In handleStake:
checkForForcedError('insufficient_balance');
checkForForcedError('wallet_rejected');
checkForForcedError('transaction_failed');

// In handleUnstake:
checkForForcedError('transaction_failed');

// In handleClaim:
checkForForcedError('transaction_failed');
```

### Swap Page:
```typescript
// In handleSwap:
checkForForcedError('insufficient_balance');
checkForForcedError('slippage_exceeded');
checkForForcedError('transaction_failed');
```

### Token Pages (DGKO/BABYDGKO):
```typescript
// In API calls:
checkForForcedError('api_timeout');
checkForForcedError('api_error');
checkForForcedError('network_error');
```

### Dashboard:
```typescript
// In wallet operations:
checkForForcedError('wallet_rejected');
checkForForcedError('network_error');
```

---

## 🎯 Testing Checklist

For each page, test:

- [ ] Enable debug mode (`?debug=true`)
- [ ] See bug button appear
- [ ] Open debug menu
- [ ] Select an error scenario
- [ ] Trigger the action (stake, swap, etc.)
- [ ] Error modal appears
- [ ] "Copy Debug Log" button works
- [ ] Pasting shows full formatted log
- [ ] "Show Technical Details" expands correctly
- [ ] All captured data is present
- [ ] Close modal works
- [ ] Clear forced error in debug menu
- [ ] Try action again → works normally

---

## 🎨 What You'll See

### Debug Menu Open:
```
┌─────────────────────────────┐
│ 🐛 Debug Mode         Exit  │
│ Force errors to test        │
├─────────────────────────────┤
│ 💰 Insufficient Balance     │
│    User doesn't have enough │
├─────────────────────────────┤
│ ⏱️ API Timeout              │
│    API request takes long   │
├─────────────────────────────┤
│ 🔥 API Error                │
│    API returns 500 error    │
└─────────────────────────────┘
```

### Error Modal:
```
┌─────────────────────────────┐
│          ❌                  │
│   Staking Failed            │
│   Insufficient balance...   │
│                             │
│ ┌─ Copy Debug Log ─────┐   │
│ └────────────────────────┘  │
│                             │
│ ┌─ Show Technical Details┐  │
│ └────────────────────────┘  │
│                             │
│ Copy this log and send...  │
└─────────────────────────────┘
```

---

## 💡 Pro Tips

1. **Test on different pages** - Each page captures different context
2. **Test different errors** - Each error type captures different data
3. **Check the console** - Debug mode logs helpful info
4. **Test on mobile** - Resize browser and test responsive design
5. **Clear errors** - Click "Clear forced error" to go back to normal

---

## 🆘 Troubleshooting

### Bug button doesn't appear
- Make sure URL has `?debug=true`
- Check browser console for errors

### Error doesn't trigger
- Make sure you added `checkForForcedError()` in the code
- Check which error scenario is selected
- Try refreshing the page

### Can't find where to add checks
- See `docs/dev/DEBUG_MODE_INTEGRATION.md` for examples
- Look for try/catch blocks in your code
- Look for places where errors can happen

---

## 🎉 Result

Now you can:
1. ✅ Force any error to happen
2. ✅ Test error modal with real scenarios
3. ✅ See exactly what users will copy and send you
4. ✅ Verify all data is captured correctly
5. ✅ Test without breaking the app!

**No more "no errors on my end" problem!** 😎

---

## 📚 Files You Need

All debug mode files are in the zip:
- `src/utils/debugMode.ts` - Debug mode logic
- `src/components/DebugMenu.tsx` - Floating debug menu
- `docs/dev/DEBUG_MODE_INTEGRATION.md` - Integration examples

---

## ⚠️ Important Notes

- **Debug mode only works with `?debug=true`** in URL
- **Never deploy with forced errors enabled**
- **This is for local testing only**
- **Production will work normally**

---

Ready to test? Let's do it! 🚀

1. Extract the files
2. Add debug checks to one page (staking is easiest)
3. Go to that page with `?debug=true`
4. Click the bug button
5. Force an error
6. Watch it work!
