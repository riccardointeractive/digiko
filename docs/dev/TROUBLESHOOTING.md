# Troubleshooting Guide
## Common Issues and Solutions

**Last Updated:** November 26, 2025  
**Version:** 0.21.0

---

## Table of Contents
1. [Auto-Refresh Issues](#auto-refresh-issues)
2. [ZIP Installation Problems](#zip-installation-problems)
3. [Cache & Build Issues](#cache--build-issues)
4. [Transaction Problems](#transaction-problems)
5. [Token Images Not Loading](#token-images-not-loading)
6. [TypeScript Errors](#typescript-errors)
7. [Klever SDK Issues](#klever-sdk-issues)

---

## Auto-Refresh Issues

### Problem: Page Continuously Refreshing

**Symptoms:**
- Page/data updates automatically every 30-60 seconds
- Constant API calls in terminal logs
- No user interaction required for updates
- Disturbing user experience

**Root Causes:**
1. **KleverContext auto-refresh** (MOST COMMON)
   - Location: `src/context/KleverContext.tsx`
   - Affects: ENTIRE app (all pages)
   - Impact: GLOBAL - highest priority to fix

2. **Hook-level auto-refresh**
   - Location: Individual hooks in page folders
   - Affects: Specific page only
   - Examples: `useTokenBalances.ts`, `useTransactionHistory.ts`

3. **Component-level auto-refresh**
   - Location: Individual components
   - Affects: That component only
   - Example: `Balance.tsx`

**Solution:**

### Step 1: Identify Auto-Refresh Sources

Search for `setInterval` in codebase:
```bash
grep -r "setInterval" src --include="*.tsx" --include="*.ts" | grep -v node_modules
```

### Step 2: Remove Each setInterval

**Pattern to REMOVE:**
```typescript
// ❌ BAD - Auto-refresh pattern
useEffect(() => {
  if (!address) return;
  
  const interval = setInterval(() => {
    fetchData();
  }, 30000); // Runs every 30 seconds
  
  return () => clearInterval(interval);
}, [address, fetchData]);
```

**Pattern to ADD:**
```typescript
// ✅ GOOD - Manual refresh pattern
const fetchData = useCallback(async () => {
  // Fetch logic here
}, [dependencies]);

useEffect(() => {
  fetchData(); // Run once on mount
}, [fetchData]);

// Return refetch function for manual refresh
return { data, loading, error, refetch: fetchData };
```

### Step 3: Add Manual Refresh UI

**Add refresh button to component:**
```typescript
<button
  onClick={refetch}
  disabled={loading}
  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10"
  title="Refresh"
>
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
</button>
```

### Verification

After fixes, verify in browser console:
1. Load page and note timestamps in console logs
2. Wait 60 seconds without touching anything
3. **Expected:** No automatic logs appearing
4. **If fail:** Run grep command again to find remaining intervals

**Files Fixed (Nov 26, 2025):**
- `src/context/KleverContext.tsx` - Removed global 30s balance refresh
- `src/app/dashboard/hooks/useTokenBalances.ts` - Removed 30s refresh
- `src/app/dashboard/hooks/useTransactionHistory.ts` - Removed 60s refresh  
- `src/components/Balance.tsx` - Removed 30s timestamp refresh

---

## ZIP Installation Problems

### Problem: Files Not Updating After ZIP Installation

**Symptoms:**
- Unzip command succeeds
- `npm run dev` starts successfully
- Browser still shows OLD code/UI
- Changes aren't visible

**Root Causes:**

### 1. Wrong Extraction Directory

**Problem:** ZIP contains nested paths (e.g., `digiko-web3-app/digiko-web3-app/src/...`)

**Why it happens:**
```bash
# ❌ WRONG - Extracts TO project root FROM project root
cd /Users/riccardomarconato/digiko-web3-app
unzip -o ~/Downloads/package.zip
# Creates: digiko-web3-app/digiko-web3-app/src/... (NESTED!)
```

**Solution:**
```bash
# ✅ CORRECT - Extract FROM parent directory
cd /Users/riccardomarconato
unzip -o ~/Downloads/package.zip
cd digiko-web3-app
rm -rf .next
npm run dev
```

**OR use ZIP with correct paths:**
```bash
# ZIP created with: cd project_root && zip -r package.zip src/
# Then extract FROM project root:
cd /Users/riccardomarconato/digiko-web3-app
unzip -o ~/Downloads/package.zip  # Works because paths start with src/
rm -rf .next
npm run dev
```

### 2. Browser Cache Persisting

**Problem:** Browser caches old JavaScript bundle

**Solution:**
```bash
# Terminal: Clear Next.js cache
rm -rf .next

# Browser: Hard refresh
# Mac: Cmd + Shift + R
# Or: DevTools → Right-click refresh → "Empty Cache and Hard Reload"

# Nuclear option: Close browser tab completely
# Then open fresh tab to localhost:3000
```

### 3. Multiple Dev Servers Running

**Problem:** Old dev server still running on different port

**Symptoms:**
```
Port 3000 is in use, trying 3001...
```

**Solution:**
```bash
# Kill all Next.js processes
pkill -f next

# Verify they're dead
ps aux | grep next

# Then start fresh
npm run dev
```

### Installation Best Practices

**Always use this sequence:**
```bash
# 1. Kill existing servers
pkill -f next

# 2. Navigate to correct directory
cd /Users/riccardomarconato
# OR
cd /Users/riccardomarconato/digiko-web3-app
# (depends on ZIP structure)

# 3. Extract
unzip -o ~/Downloads/package.zip

# 4. Navigate if needed
cd digiko-web3-app  # Only if extracted from parent

# 5. Clear cache
rm -rf .next

# 6. Start server
npm run dev

# 7. Browser: Hard refresh or new tab
```

---

## Cache & Build Issues

### Problem: "Missing required error components"

**Solution:**
```bash
rm -rf .next && npm run dev
```

**When to clear cache:**
- After structural changes (new directories, moved files)
- After component refactors
- After config changes
- Any error mentioning "error components"
- When in doubt

### Problem: TypeScript compilation fails after update

**Symptoms:**
```
Type 'X' is not assignable to type 'Y'
Property 'Z' does not exist on type 'W'
```

**Solution:**
1. Check if types file was updated: `src/types/klever.ts`
2. Verify imports match new type definitions
3. Clear cache: `rm -rf .next`
4. Restart TypeScript server in VSCode: `Cmd+Shift+P` → "Restart TS Server"

---

## Transaction Problems

### Problem: Transactions Not Showing in Dashboard

**Debug Process:**

### Step 1: Check Browser Console (Not Terminal!)

Open DevTools (F12) and look for:
```
🔍 Fetching transactions from: https://api.mainnet.klever.org/v1.0/transaction/list/...
📡 Transaction API response status: 404 or 200
📦 Transaction API full response: {...}
📋 Transaction list length: X
```

### Step 2: Interpret Results

**Status 404:**
```
ℹ️ No transactions found (404) - wallet may be new or inactive
```
- **Meaning:** Wallet has no transaction history
- **Normal:** For new/inactive wallets
- **Action:** Make a test transaction to verify system works

**Status 200 + Empty Array:**
```
📋 Transaction list length: 0
```
- **Meaning:** API returns success but no transactions
- **Possible:** Klever API sync issue or genuinely empty
- **Action:** Check wallet on Klever blockchain explorer

**Status 200 + Data but Not Displaying:**
```
📋 Transaction list length: 5
✅ Formatted transactions count: 5
```
- **Meaning:** Data arrives but component doesn't render
- **Possible:** Component rendering bug or filter issue
- **Action:** Check component code and formatting logic

### Step 3: Verify Transaction Fetching

Add debug logs if not present:
```typescript
console.log('🔍 Fetching transactions from:', apiUrl);
const response = await fetch(apiUrl);
console.log('📡 Response status:', response.status);
const data = await response.json();
console.log('📦 Full response:', data);
```

### Step 4: Check Network Configuration

Verify correct network in `src/config/app.ts`:
```typescript
export const APP_CONFIG = {
  network: 'Mainnet', // or 'Testnet'
}
```

**Mainnet tokens** won't show on testnet API and vice versa!

---

## Token Images Not Loading

**See:** [TOKEN_IMAGES.md](TOKEN_IMAGES.md) for complete guide

**Quick Fix:**
```bash
# Check if TokenImage component is using correct API
grep -A 10 "const getImageUrl" src/components/TokenImage.tsx

# Should check Klever API FIRST, then custom logos
```

---

## TypeScript Errors

### Problem: "Cannot find module '@/...'"

**Solution:**
```bash
# Verify tsconfig.json has correct paths
cat tsconfig.json | grep baseUrl
# Should show: "baseUrl": "."

# Clear and restart
rm -rf .next
npm run dev
```

### Problem: "Type X is not assignable"

**Common causes:**
1. Missing property in interface
2. Incorrect type import
3. Changed type definition not propagated

**Solution:**
1. Check `src/types/klever.ts` for current types
2. Update imports to match
3. Clear cache: `rm -rf .next`

---

## Klever SDK Issues

### Problem: Transaction fails silently

**Debug:**
```typescript
// Add logging to transaction flow
console.log('1️⃣ Building transaction...');
const unsignedTx = await buildTransaction(...);
console.log('2️⃣ Unsigned TX:', unsignedTx);

console.log('3️⃣ Signing transaction...');
const signedTx = await signTransaction(unsignedTx);
console.log('4️⃣ Signed TX:', signedTx);

console.log('5️⃣ Broadcasting transaction...');
const result = await broadcastTransactions([signedTx]);
console.log('6️⃣ Result:', result);
```

### Problem: Staking bucket ID not found

**Solution:**
- Bucket IDs are created on first stake
- For unstaking, must query `/address/{address}` to get bucket IDs
- Cannot hardcode bucket IDs - they're dynamic per user

**See:** [KLEVER_INTEGRATION.md](KLEVER_INTEGRATION.md) for complete Klever guide

---

## General Debugging Workflow

### 1. Check Browser Console FIRST
- Terminal logs = Server-side
- Console logs = Client-side
- Most React issues appear in console, not terminal

### 2. Clear Cache When In Doubt
```bash
rm -rf .next && npm run dev
```

### 3. Verify File Locations
```bash
# Check if file exists where you think it does
ls -la src/app/dashboard/page.tsx

# Check file contents
cat src/app/dashboard/page.tsx | head -20
```

### 4. Check for Multiple Versions
```bash
# Find all files with same name
find src -name "page.tsx" -type f

# Can reveal unexpected duplicates
```

### 5. Kill All Processes
```bash
# Nuclear option
pkill -f next
pkill -f node
# Then start fresh
```

---

## Quick Command Reference

```bash
# Clear everything and restart
pkill -f next && rm -rf .next && npm run dev

# Find auto-refresh intervals
grep -r "setInterval" src --include="*.tsx" --include="*.ts"

# Check what's running
ps aux | grep next
lsof -i :3000  # What's using port 3000

# Find file locations
find src -name "*.tsx" | grep dashboard

# Check file contents quickly
cat src/app/dashboard/page.tsx | grep -A 5 "export default"
```

---

## When All Else Fails

1. **Read the error message carefully**
   - Error messages are accurate 90% of the time
   - They tell you exactly what's wrong

2. **Check recent changes**
   - What was the last thing that worked?
   - What changed since then?

3. **Isolate the problem**
   - Does it happen on ALL pages or ONE page?
   - Does it happen in ALL browsers or ONE browser?
   - Does it happen for ALL users or ONE user?

4. **Start fresh**
   ```bash
   # Nuclear option
   rm -rf .next
   rm -rf node_modules
   npm install
   npm run dev
   ```

5. **Check the docs**
   - [KLEVER_INTEGRATION.md](KLEVER_INTEGRATION.md) - Blockchain issues
   - [MODULAR_ARCHITECTURE.md](MODULAR_ARCHITECTURE.md) - Code structure
   - [TOKEN_IMAGES.md](TOKEN_IMAGES.md) - Image loading

---

*Last Updated: November 26, 2025 | v0.21.0*  
*If you find a bug not covered here, document it!*
