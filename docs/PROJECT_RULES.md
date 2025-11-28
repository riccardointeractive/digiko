# DIGIKO PROJECT RULES & WORKFLOW

## RULE 1: DEVELOPMENT DOCUMENTATION
**Location:** `docs/dev/`

Check development documentation before starting work:
- `docs/dev/README.md` - Main hub with quick reference (Asset IDs, endpoints, commands)
- `docs/dev/MODULAR_ARCHITECTURE.md` - Architecture patterns and refactoring guide
- `docs/dev/KLEVER_INTEGRATION.md` - Blockchain integration
- `docs/dev/TROUBLESHOOTING.md` - Common bugs and solutions

These are confidential internal docs written for Claude. They provide context, previous decisions, and solved problems so we never repeat past mistakes.

## RULE 2: CODE INTEGRITY
Never truncate, omit, or shorten code unless explicitly justified. Any removal must be intentional and correct. Always output complete, consistent, runnable code.

## RULE 3: LATEST VERSION AWARENESS
Always work from the latest ZIP I provide at the start of the chat. After you generate edits and send the updated files on chat, assume I have applied them locally. Continue working from the last version you produced, never revert recent fixes.

## RULE 4: PROJECT STRUCTURE AWARENESS
ZIP files intentionally exclude node_modules, klever-sdk, and other vendor folders. Assume these exist on my machine. Never regenerate or modify vendor dependencies.

## RULE 5: KLEVER DOCUMENTATION
Always consult official Klever documentation when working with KDA, staking, contracts, and blockchain logic. Klever has an official forum where examples may be referenced when relevant.

## RULE 6: TROUBLESHOOTING DISCIPLINE
Do not regenerate long reports repeatedly. Provide only what is necessary: explanations, commands, and updated files.

## RULE 7: DESIGN GUIDE COMPLIANCE
Every ZIP includes a design guide (`design_guide.md`), follow it strictly. If a new feature requires new design rules, propose them clearly so I can update the guide.

## RULE 8: FULL-FILE OUTPUT WORKFLOW
When modifying a file, return the entire file, not a diff. Ensure no missing sections. Only send partial edits if I explicitly request them.

**CRITICAL:** For every update, new file, or change, provide EXACTLY this format at the end of the message:
1. **View your file** link (computer:// link to outputs)
2. **bash** code block with command
3. File attachment (automatic from zip)

**No extra commentary after providing the download link and command.**

**Downloaded files location:** All files downloaded from Claude are in `~/Downloads/`

**Command format:** `cd /Users/riccardomarconato/digiko-web3-app && unzip -o ~/Downloads/filename.zip`

**File verification:** 
- NEW file → use `create_file` FIRST, then zip
- EXISTING file → use `str_replace`, then zip  
- Always verify file exists before zipping to prevent failed commands

## RULE 9: CLARIFY AMBIGUITIES
If anything in the ZIP is unclear, ask before writing risky or assumption-based code.

## RULE 10: NO UNNECESSARY BOILERPLATE
Do not generate scaffolding, placeholders, or new components unless requested.

## RULE 11: NAMING CONVENTIONS
Follow the project's naming conventions. If inconsistencies exist, propose a standard.

**Modular Architecture Conventions:**
- Types: `[page].types.ts` (example: `dgko.types.ts`)
- Config: `[page].config.tsx` (use `.tsx` if contains JSX)
- Hooks: `use[Purpose].ts` (example: `useTokenStats.ts`)
- Components: `[ComponentName].tsx` (example: `DonutChart.tsx`)

## RULE 12: CENTRALIZED CONFIGURATION
Never hardcode app-wide constants in components.

**Location:** `src/config/app.ts`  
**Contains:** version, name, status, network  
**Usage in all components:** `import { APP_CONFIG } from '@/config/app';`

**Pattern:** All app-wide constants (version, app name, API URLs, feature flags) should live in centralized config files.

**Automatically updates:** Navigation header, Footer, Admin panel (2 places), Dashboard account info, Mobile menu, Desktop More menu

## RULE 13: ENVIRONMENT AWARENESS
When giving commands or configuration, specify whether they apply to development, staging, or production.

## RULE 14: COPY-PASTE-READY COMMANDS
Terminal commands must be clean, one-line, copy-paste ready. No comments inside command blocks. No markdown formatting in commands.

**Good:** `cd /Users/riccardomarconato/digiko-web3-app && npm run dev`  
**Bad:** Multiple lines with comments

## RULE 15: NO SPECULATIVE FEATURES
Do not redesign or add new architecture unless I explicitly request it.

## RULE 16: CONSOLE LOGS
I can provide Chrome DevTools console logs by exporting them. Ask for logs when needed.

## RULE 17: CONFIRMATION RULE
At the start of every new chat, or after receiving these instructions, send a short confirmation stating you read and understood all rules.

## RULE 18: DOCUMENTATION WORKFLOW
When I say "let's document it" or similar, perform two tasks:

### a. Update the Public Documentation Page
**Location:** `src/app/documentation/page.tsx`

This is not the development guide. Update it with every completed task, new feature, and change. Preserve its integrity, do not remove or modify existing sections unless safe and correct. Technical details are welcome for transparency, but the target reader is the end user.

### b. Update Development Documentation
**Location:** `docs/dev/`

Add learnings to appropriate file:
- Architecture decisions → `MODULAR_ARCHITECTURE.md`
- Klever integration → `KLEVER_INTEGRATION.md`
- Bug fixes → `TROUBLESHOOTING.md`
- New patterns → relevant file

Add everything learned during the chat:
- Decisions and reasons
- Pitfalls and solutions
- Technical insights
- Lessons learned

## RULE 19: GIT WORKFLOW
When I say "ok we finished here, let's git it" you must:

### a. Update the Project Version
Edit `src/config/app.ts` and change version number

This automatically updates navigation, footer, admin, dashboard, menus

**Choose correct version bump:**
- **MAJOR** `v1.0.0` to `v2.0.0` for breaking changes, new architectures, or big new features
- **MINOR** `v1.0.0` to `v1.1.0` for new features or improvements that are not breaking
- **PATCH** `v1.0.0` to `v1.0.1` for bug fixes, small refactors, styling adjustments, or minor improvements

Choose the version based on changes in current chat.

### b. Update the Updates Page
**Location:** `src/app/updates/page.tsx`

Add new entry with version number, what changed, why it changed, fixes and improvements, consistent formatting with previous entries

### c. Generate These Exact Git Commands
```
git add .
git commit -m "LOG HERE"
git push
```

### d. Replace LOG HERE
Use professional commit message that includes clear summary of everything done in this chat, bug fixes, refactors, improvements, or new features, any decisive notes or relevant technical considerations

Avoid funny, embarrassing, unprofessional logs. Avoid personal taste references like "Apple style", "super", "premium"

Then provide short human-readable summary of changes matching commit log.

## RULE 20: CRITICAL PATHS REFERENCE
**Project root:** `/Users/riccardomarconato/digiko-web3-app/`

**Key directories:**
- `docs/dev/` (Development documentation)
- `src/config/app.ts` (Centralized app configuration)
- `src/app/documentation/` (Public documentation)
- `src/app/updates/` (Updates page)
- `design_guide.md` (Design reference)

## RULE 21: ESSENTIAL COMMANDS
- **Development:** `npm run dev`
- **Build:** `npm run build`
- **Git workflow:** `git add .` then `git commit -m "message"` then `git push`
- **Kill all Next.js processes** if multiple servers running: `pkill -f next`
- **Clear .next cache** CRITICAL after structural changes: `rm -rf .next && npm run dev`

**CRITICAL:** Clear `.next` cache after structural changes (new directories, moved files), component refactors, config changes, any "missing required error components" message

## RULE 22: DEPLOYMENT RULES

### Git Repository Management
**NEVER commit contract build artifacts:**
- `contract/target/` - Can reach 300+ MB
- `contract/meta/target/` - Rust build artifacts
- `contract/wasm/target/` - WASM build outputs
- `*.o`, `*.rlib`, `*.rmeta`, `*.d` - Individual build files

**Check git size before EVERY push:**
```bash
git count-objects -vH
```
- **Good:** <10 MB
- **Warning:** 10-50 MB (investigate what's bloating)
- **Critical:** >50 MB (use nuclear reset procedure)

**If push fails with HTTP 400 or >100 MB:**
1. **DO NOT** try incremental fixes
2. Go directly to `docs/dev/GIT_NUCLEAR_RESET.md`
3. Follow procedure exactly
4. This is the ONLY reliable fix

**Configure .gitignore BEFORE first cargo build:**
```bash
# CRITICAL contract exclusions
contract/target/
contract/meta/target/
contract/wasm/target/
*.o
*.rlib
*.rmeta
*.d
```

### Next.js + Web3 Requirements

**Force dynamic rendering everywhere:**

1. **Root layout** (`src/app/layout.tsx`):
```typescript
export const dynamic = 'force-dynamic';
```

2. **ALL API routes** (`src/app/api/*/route.ts`):
```typescript
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  // ...
}
```

**Why:** Web3 apps require runtime features:
- `useSearchParams()` needs actual URL
- Wallet connections need browser
- `localStorage` doesn't exist server-side
- API routes with searchParams need runtime request

**Without force-dynamic, expect:**
- ⚠️ `useSearchParams() should be wrapped in suspense boundary`
- ⚠️ `Route couldn't be rendered statically`
- ⚠️ `localStorage is not defined`

### Type Safety Rules

**Klever context returns `string | null`:**
```typescript
const { address } = useKlever(); // string | null

// ❌ Wrong - type error
userAddress: address

// ✅ Correct - explicit conversion
userAddress: address || undefined
```

**Why this matters:**
- TypeScript strict mode treats null and undefined as distinct
- Never use type casting (`as`) to bypass this
- Use `|| undefined` for null-to-undefined conversion

### TypeScript Configuration

**Always exclude non-source directories:**
```json
{
  "exclude": ["node_modules", "docs/**/*", "contract/**/*", "temp/**/*"]
}
```

**Why:** Prevents TypeScript from compiling:
- Documentation examples
- Contract source code
- Temporary files

### Font Management

**Use geist npm package, NOT local files:**
```bash
npm install geist
```

```typescript
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
```

**Why:**
- Fonts tracked in package.json
- No local files to remember to commit
- Automatic updates
- Self-hosted (not CDN)

### Pre-Deployment Checklist

Before `git push`:

1. **Check git size:**
```bash
git count-objects -vH
# Must be <10 MB
```

2. **Verify force-dynamic present:**
```bash
grep -r "export const dynamic" src/app/
# Must see layout.tsx and all API routes
```

3. **Test build locally:**
```bash
npm run build
# Must complete without errors
```

4. **Check what's being committed:**
```bash
git status
# Should NOT see: target/, node_modules/, .next/
```

### Build Failure Cascade

**Fix errors in this order:**

1. **Layer 1: Compilation**
   - Missing imports
   - Missing files (fonts)
   - Syntax errors

2. **Layer 2: Type Checking**
   - null vs undefined
   - Interface mismatches

3. **Layer 3: Static Generation**
   - useSearchParams errors
   - API route static errors
   - localStorage SSR errors

4. **Layer 4: Runtime**
   - Browser-only features

**Each layer reveals the next.** Don't try to fix Layer 3 before Layer 1!

### Emergency Procedures

**Build fails:**
1. Read ENTIRE error message
2. Check `docs/dev/DEPLOYMENT_TROUBLESHOOTING.md`
3. Apply solution
4. Test locally: `npm run build`
5. Push fix

**Git push fails (>100 MB):**
1. Use `docs/dev/GIT_NUCLEAR_RESET.md`
2. Do NOT try incremental fixes
3. Nuclear reset is the ONLY reliable solution

**Deployment succeeds but site broken:**
1. Check browser console
2. Likely: Missing environment variables
3. Verify Vercel env vars match local `.env`

### Related Documentation

- `docs/dev/DEPLOYMENT_TROUBLESHOOTING.md` - Complete failure catalog
- `docs/dev/GIT_NUCLEAR_RESET.md` - Emergency git cleanup
- `.gitignore` - Properly configured exclusions

### Success Metrics

**v1.1.0 Deployment (November 28, 2024):**
- 12 failed builds before success
- 9 different failure modes encountered
- 311 MB → 435 KB (99.86% reduction)
- All failures documented for future prevention

**Future deployments should be:**
- 1 attempt, <15 minutes
- This documentation makes it possible

## RULE 23: CONFIGURATION FILE EXTENSIONS
Config with JSX equals `.tsx` extension ALWAYS

**Example:** `dashboard.config.tsx` (contains SVG icons)  
**Example:** `swap.config.tsx` (contains JSX elements)

## RULE 24: FILE SIZE GUIDELINES
- Main page files should be 50-200 lines (orchestrator only)
- Extract components when files exceed 200 lines
- Break down complex logic into focused hooks

## RULE 25: TROUBLESHOOTING MULTIPLE DEV SERVERS
If you see "Port 3000 is in use, trying 3001..." or get 404 errors:

1. Kill all Next.js processes first: `pkill -f next`
2. Then start fresh: `rm -rf .next` then `npm run dev`

## RULE 26: VERSION DISPLAY TESTING
After updating version in `src/config/app.ts`, verify it appears correctly in:
- Navigation header
- Footer
- Admin panel (2 places)
- Dashboard account info
- Mobile menu
- Desktop More menu

## RULE 27: UNNECESSARY COMPUTER USE AVOIDANCE
Claude should not use computer tools when:
- Answering factual questions from Claude's training knowledge
- Summarizing content already provided in conversation
- Explaining concepts or providing information

## RULE 27: MEMORY APPLICATION
Claude selectively applies memories in its responses based on relevance. Zero memories for generic questions. Comprehensive personalization for explicitly personal requests. Claude NEVER explains its selection process for applying memories. Claude responds as if information exists naturally in its immediate awareness.

## RULE 28: DOCUMENTATION PRIORITY
**Check these BEFORE working:**
- `docs/dev/README.md` (Quick reference)
- `docs/dev/MODULAR_ARCHITECTURE.md` (If refactoring)
- `design_guide.md` (If working on UI)
- Previous chat transcripts (If available)

**Update these AFTER working:**
- Development docs (`docs/dev/`)
- Public docs (`src/app/documentation/`)
- Updates page (`src/app/updates/`)
- Git commit

## RULE 29: QUICK DECISION TREE
- **New feature?** Check design guide → Create components → Document
- **Bug fix?** Check troubleshooting docs → Fix → Document solution
- **Refactor?** Check modular architecture guide → Follow patterns → Document
- **Version release?** Update `src/config/app.ts` → Update `updates/page.tsx` → Git it
- **Cache issues?** `rm -rf .next && npm run dev`
- **Multiple servers?** `pkill -f next` → Restart

## RULE 30: TESTING DECISION TREE
**Small change (typo, color, single component)?**  
Quick smoke test 5 minutes:
- `rm -rf .next && npm run dev`
- Open changed page
- Verify it works
- Check console for errors

**Medium change (page refactor, new feature)?**  
Focused feature test 15-20 minutes:
- Test the specific feature thoroughly
- Check related functionality
- Console errors
- Quick mobile check
- Run `npm run build`

**Multiple changes OR critical feature OR version release?**  
Full test suite 45-60 minutes:
- Run complete test plan with all 8 sections
- Cross-browser if critical
- Full regression testing

Let the scope of changes guide testing depth. Not every commit needs full testing suite.

## RULE 31: AUTOMATIC DOCUMENTATION REFRESH
At the start of EVERY task (or when switching tasks), Claude must:
- View `design_guide.md` (always)
- View `docs/dev/README.md` (always)  
- View relevant `docs/dev/` files (architecture, Klever, troubleshooting)

This happens automatically and silently. No exceptions.

**Purpose:** Prevent long-conversation degradation and context drift.

---

## TESTING PLAN v0.20.3 RELEASE
**Date:** November 26, 2025  
**Changes:** Dashboard refactor, Navigation improvements, Centralized config

### PRE-TESTING SETUP
```bash
cd /Users/riccardomarconato/digiko-web3-app
pkill -f next
rm -rf .next
npm run dev
```
**Expected:** Server starts on `http://localhost:3000`

### TEST 1: VERSION DISPLAY CENTRALIZED CONFIG
**Purpose:** Verify APP_CONFIG works across all locations

**Navigation Header**
- Open `http://localhost:3000`
- Check navigation shows "Digiko" and "Beta" badge
- Verify both are using APP_CONFIG not hardcoded

**Footer**
- Scroll to bottom of any page
- Check footer shows "Digiko" name, "Beta" status badge, "v0.20.3" version number

**Admin Panel**
- Navigate to `http://localhost:3000/admin`
- Enter password: `Digiko2025!`
- Verify version card shows "v0.20.3"
- Scroll down to System Information
- Verify "Platform Version" shows "v0.20.3"
- Click "Copy" button on version
- Verify it copies "v0.20.3"

**Dashboard Account Info**
- Connect wallet if not connected
- Navigate to `http://localhost:3000/dashboard`
- Check Account Info card shows Network "Testnet", Platform "Digiko v0.20.3"

**Mobile Menu**
- Resize browser to mobile view (< 768px)
- Click hamburger menu (three lines icon)
- Scroll to bottom of menu
- Verify shows "Digiko Beta" and "Testnet"

**Desktop More Menu**
- Resize browser to desktop view (> 768px)
- Click "More" button (three horizontal lines, top right)
- Check bottom shows "v0.20.3" version and "Testnet" network with green dot

**PASS:** All 6 locations show correct version from APP_CONFIG  
**FAIL:** Any location shows wrong version or hardcoded values

### TEST 2: NAVIGATION UX IMPROVEMENTS
**Purpose:** Verify click-based dropdown and active page indication

**Tokens Dropdown Click Behavior**
- Navigate to `http://localhost:3000`
- Click "Tokens" button in navigation
- Verify dropdown appears with DGKO and BABYDGKO
- Move mouse away from dropdown
- Verify dropdown DOES NOT disappear (no more hover issues)
- Click "Tokens" button again
- Verify dropdown closes
- Click "Tokens" to open again
- Click anywhere outside dropdown
- Verify dropdown closes automatically

**Active Page Indication**
- Navigate to `http://localhost:3000/dashboard`
- Check "Dashboard" link is white with subtle background, other links are gray
- Navigate to `http://localhost:3000/staking`
- Check "Staking" link is white with subtle background, other links are gray
- Navigate to `http://localhost:3000/swap`
- Check "Swap" link is white with subtle background, other links are gray
- Navigate to `http://localhost:3000/dgko`
- Check "Tokens" button is white with subtle background, other links are gray
- Navigate to `http://localhost:3000/babydgko`
- Check "Tokens" button is white with subtle background, other links are gray

**Dropdown Navigation**
- Click "Tokens" dropdown
- Click "DGKO"
- Verify navigates to DGKO page AND dropdown closes
- Click "Tokens" dropdown
- Click "BABYDGKO"
- Verify navigates to BABYDGKO page AND dropdown closes

**PASS:** Dropdown is click-based, reliable, and active states work  
**FAIL:** Dropdown disappears on hover or active states don't show

### TEST 3: DASHBOARD MODULAR ARCHITECTURE
**Purpose:** Verify dashboard refactor maintains all functionality

**Dashboard Page Load**
- Navigate to `http://localhost:3000/dashboard` disconnected
- Verify "Connect Wallet" prompt shows
- Connect wallet
- Verify dashboard loads correctly

**Dashboard Components**
- Verify page header shows "Dashboard" title
- Check Balance card displays left column
- Check Account Info card displays left column
- Check Send Form displays right column
- Scroll down to Quick Guide section

**Account Info Card**
- Verify shows three rows: Network "Testnet", Status Green dot "Connected", Platform "Digiko v0.20.3"

**Quick Guide Section**
- Verify 4 guide items with icons: Connect Wallet (lock icon, blue), Check Balance (coin icon, cyan), Send Tokens (send icon, blue), Smart Contracts (code icon, cyan)
- Verify each has icon, title, and description
- Check icons alternate blue/cyan colors

**Send Form Functionality**
- Enter a valid KLV address in "Recipient Address"
- Enter amount in "Amount to Send"
- Verify "Send KLV" button appears
- DO NOT actually send unless testing on testnet

**PASS:** All dashboard components render and function correctly  
**FAIL:** Any component missing or not displaying properly

### TEST 4: MOBILE RESPONSIVENESS
**Purpose:** Verify all changes work on mobile

**Mobile Navigation**
- Resize browser to mobile (< 768px)
- Click hamburger menu
- Verify menu opens
- Check "Dashboard" link
- Navigate to dashboard
- Verify menu closes after navigation
- Verify current page has colored background in menu

**Mobile Dashboard**
- View dashboard on mobile
- Verify Balance card stacks on top
- Verify Account Info card below Balance
- Verify Send Form below Account Info
- Verify Quick Guide items stack vertically
- Verify all text is readable

**Mobile Footer**
- Scroll to footer on mobile
- Verify "Digiko Beta" displays correctly
- Verify "v0.20.3" displays correctly
- Verify footer links stack vertically

**PASS:** Mobile layout works correctly  
**FAIL:** Layout breaks or content overlaps

### TEST 5: CONSOLE AND NETWORK CHECKS
**Purpose:** Verify no errors in browser console

**Browser Console**
- Open DevTools (F12 or Cmd+Option+I)
- Go to Console tab
- Navigate through all pages: `/`, `/dashboard`, `/staking`, `/swap`, `/dgko`, `/babydgko`
- Verify NO red errors (warnings are ok)
- Check for any React hydration errors

**Network Tab**
- Go to Network tab in DevTools
- Navigate to `/dashboard`
- Verify Balance API call succeeds (200 status)
- Navigate to `/dgko`
- Verify token stats API call succeeds
- Navigate to `/swap`
- Verify no 404 errors

**PASS:** No console errors, all API calls succeed  
**FAIL:** Red errors in console or failed API calls

### TEST 6: BUILD TEST
**Purpose:** Verify production build works

```bash
cd /Users/riccardomarconato/digiko-web3-app
npm run build
```

- Build completes successfully
- No TypeScript errors
- No build warnings or only minor ones
- Check build output shows all pages compiled

**PASS:** Production build succeeds  
**FAIL:** Build errors or TypeScript compilation fails

### TEST 7: WALLET CONNECTION FLOW
**Purpose:** Verify wallet integration still works

**Connect Wallet**
- Disconnect wallet if connected
- Navigate to `http://localhost:3000/dashboard`
- Verify "Connect Wallet" prompt shows
- Click "Connect Wallet" button top right
- Klever Extension popup appears
- Approve connection
- Verify dashboard loads with balance

**Wallet Features**
- Check balance displays correctly
- Navigate to `/staking`
- Verify staking positions display if any
- Navigate to `/swap`
- Verify swap interface shows correct balances

**PASS:** Wallet connection works smoothly  
**FAIL:** Cannot connect or features don't work

### TEST 8: CROSS-BROWSER TESTING (OPTIONAL)
**Purpose:** Verify works in multiple browsers

**Chrome/Edge**
- Test all features in Chrome
- Verify version displays correctly
- Verify navigation works

**Firefox**
- Test in Firefox
- Verify version displays correctly
- Verify navigation works

**Safari** (Mac only)
- Test in Safari
- Verify version displays correctly
- Verify navigation works

**PASS:** Works in all tested browsers  
**FAIL:** Issues in specific browser

---

## FINAL CHECKLIST

**Visual Inspection**
- All pages load correctly
- No layout issues or overlapping elements
- Colors and styling consistent with design guide
- Glass morphism effects working
- Animations smooth

**Functionality**
- All navigation links work
- Wallet connection works
- Version shows v0.20.3 everywhere
- Active page indication working
- Dropdown click behavior working
- Dashboard components all working

**Code Quality**
- No console errors
- Production build succeeds
- TypeScript compilation clean
- No broken API calls

---

## ISSUE REPORTING TEMPLATE
**Test Failed:** [Test name and step]  
**Expected:** [What should happen]  
**Actual:** [What actually happened]  
**Browser:** [Chrome/Firefox/Safari]  
**Console Errors:** [Any errors from console]  
**Screenshot:** [If applicable]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Error occurs]

---

## SUCCESS CRITERIA
**ALL TESTS MUST PASS:**
- Version displays correctly in all 6 locations
- Navigation click behavior works reliably
- Active page indication shows correctly
- Dashboard refactor maintains functionality
- No console errors
- Production build succeeds
- Mobile responsive

**If all pass:** Ready for git commit and deployment  
**If any fail:** Debug and retest before committing

---

## POST-TESTING
After all tests pass:

```bash
git add .
git commit -m "v0.20.3: Centralized app configuration

Created single source of truth for version, app name, status, and network in src/config/app.ts. All 6 locations (navigation, footer, admin, dashboard, mobile menu, desktop menu) now import from centralized config.

Benefits: Update version once, reflects everywhere automatically. No more missed updates or inconsistent values.

Files: Created src/config/app.ts, updated 5 components + 2 dev docs"
git push
```

Testing complete!

## RULE 28: NO NESTED ZIPS - CRITICAL

**DANGER:** Zipping with parent directory creates nested structure when unzipping!

### The Problem:
```bash
# ❌ WRONG - Creates nested structure
cd /home/claude
zip -r package.zip digiko-web3-app/file.txt

# When user runs:
cd /Users/riccardomarconato/digiko-web3-app
unzip package.zip
# Result: digiko-web3-app/digiko-web3-app/file.txt ❌❌❌
```

### The Solution:
```bash
# ✅ CORRECT - Zip from inside directory
cd /home/claude/digiko-web3-app
zip -r package.zip file.txt

# When user runs:
cd /Users/riccardomarconato/digiko-web3-app
unzip -o ~/Downloads/package.zip
# Result: digiko-web3-app/file.txt ✅
```

### Mandatory Zip Procedure:

**ALWAYS use this pattern:**
```bash
cd /home/claude/digiko-web3-app
zip -r /home/claude/output-name.zip relative/path/to/files
cp /home/claude/output-name.zip /mnt/user-data/outputs/
```

**NEVER include parent directory in zip path!**

### Unzip Commands for User:

**Single file update:**
```bash
cd /Users/riccardomarconato/digiko-web3-app
unzip -o ~/Downloads/filename.zip
```

**Multiple files update:**
```bash
cd /Users/riccardomarconato/digiko-web3-app
unzip -o ~/Downloads/filename.zip
```

### Emergency: Remove Nested Directory

If nesting happens:
```bash
cd /Users/riccardomarconato/digiko-web3-app
rm -rf digiko-web3-app  # Remove nested directory
# Then apply files correctly
```

### Verification:

After creating zip, Claude should state:
```bash
# Zip created from: /home/claude/digiko-web3-app
# Contains: [list of relative paths]
# Unzip with: cd /Users/riccardomarconato/digiko-web3-app && unzip -o ~/Downloads/filename.zip
```

**This prevents the deadly double-nesting that caused deployment failures.**

## RULE 29: NO COMMENTS IN BASH BLOCKS

User copy-pastes bash commands directly into terminal without reading.

Comments with # break commands when copy-pasted.

NEVER include comments inside bash code blocks.

Wrong:
```bash
git add .
git commit -m "message"
git push
```

Correct:
```bash
git add .
git commit -m "message"
git push
```

If explanation needed, write it OUTSIDE the code block.

All bash commands must be copy-paste ready with zero edits required.
## RULE 30: PRE-ZIP CHECKLIST

Before creating any zip file for Claude, always perform these checks:

### Required Checks

1. **Run git status** - Ensure clean working directory
   ```bash
   git status
   # Should show only intentional changes
   ```

2. **Verify no ignored files are included**
   ```bash
   # Check for common ignored items
   ls temp/ 2>/dev/null && echo "⚠️  temp/ exists"
   ls kleverSDK/ 2>/dev/null && echo "⚠️  kleverSDK/ exists in root"
   ls .vscode/ 2>/dev/null && echo "⚠️  .vscode/ exists"
   ls tsconfig.tsbuildinfo 2>/dev/null && echo "⚠️  tsconfig.tsbuildinfo exists"
   ```

3. **Check for nested directories**
   ```bash
   # Look for accidental nesting
   find . -maxdepth 1 -type d -name "digiko-web3-app" 2>/dev/null
   ```

4. **Verify no temp/workflow files**
   ```bash
   ls *_FIX.md READY_TO_*.md GIT_COMMIT_*.md 2>/dev/null
   ```

5. **Confirm .gitignore compliance**
   ```bash
   git status --ignored
   # Should not show any files that will be zipped
   ```

### Pre-Zip Command Sequence

```bash
cd /Users/riccardomarconato/digiko-web3-app
git status
find . -type d -name "*{*" -o -name "*}*"
ls temp/ kleverSDK/ .vscode/ 2>/dev/null
```

If any issues found → Fix before zipping  
If all clear → Safe to create zip

---

## RULE 31: NO CURLY BRACES IN DIRECTORY NAMES

**Critical:** Never use `{` or `}` characters in actual directory names.

### Allowed Characters

- ✅ Alphanumeric: `a-z`, `A-Z`, `0-9`
- ✅ Hyphens: `token-stats`, `error-logging`
- ✅ Underscores: `token_stats`, `error_logging`
- ❌ Curly braces: `{types,config}` - **NEVER**
- ❌ Spaces: `token stats` - **NEVER**
- ❌ Special chars: `@`, `#`, `$`, etc. - **NEVER**

### Why This Matters

Curly braces in directory names:
- Break bash commands
- Confuse git operations
- Cause build failures
- Make paths unresolvable

### Placeholder vs Reality

**Documentation placeholders (OK):**
```
Create these directories:
src/app/feature/{types,config,hooks,components}/
```

This means: Create 4 separate directories
- `types/`
- `config/`
- `hooks/`
- `components/`

**Reality (WRONG):**
```bash
# DO NOT create literal curly-brace directory!
mkdir "src/app/feature/{types,config,hooks,components}"
# This creates ONE directory with braces in the name ❌
```

**Reality (CORRECT):**
```bash
# Create each directory separately
mkdir src/app/feature/types
mkdir src/app/feature/config
mkdir src/app/feature/hooks
mkdir src/app/feature/components
```

### Verification

Check for malformed directories:
```bash
cd /Users/riccardomarconato/digiko-web3-app
find . -type d -name "*{*" -o -name "*}*"
# Should return empty
```

If found → Remove immediately:
```bash
rm -rf "path/to/{malformed}/directory"
```

---

## RULE 32: DOCUMENTATION HIERARCHY

All documentation follows a strict hierarchy for clarity and maintainability.

### Structure

```
docs/
├── PROJECT_RULES.md              # ← You are here (Core rules)
├── CHANGELOG.md                  # Version history
├── design_guide.md               # Design standards
├── [FEATURE].md                  # Feature-specific docs
└── dev/                          # Development documentation
    ├── README.md                 # Dev docs hub (must read first)
    ├── MODULAR_ARCHITECTURE.md   # Architecture patterns
    ├── ERROR_LOGGING.md          # Error handling
    ├── DEBUG_MODE.md             # Debugging tools
    ├── TROUBLESHOOTING.md        # Bug fixes
    ├── [TOPIC].md                # Other technical topics
    └── archive/                  # Historical docs
        └── YYYY-MM/
            └── old_file.md
```

### File Placement Rules

**Root docs/ directory:**
- High-level project documentation
- Design standards
- Feature-specific guides
- User-facing documentation

**docs/dev/ directory:**
- Technical implementation details
- Development workflows
- Architecture patterns
- Internal debugging guides
- Integration instructions

**Feature directories:**
- Feature-specific implementation
- Component documentation
- Local README if complex

### What Goes Where

**PROJECT_RULES.md (this file):**
- Development workflows
- Git procedures
- Coding standards
- Critical commands
- Testing procedures

**design_guide.md:**
- UI/UX patterns
- Color palette
- Typography
- Component styles
- Glass morphism specs

**docs/dev/README.md:**
- Quick reference
- Asset IDs
- API endpoints
- Common commands
- Links to all dev docs

**docs/dev/[TOPIC].md:**
- Deep dive on specific topic
- Implementation details
- Code patterns
- Examples
- Best practices

### Documentation Naming

**General docs:** `TOPIC.md` (uppercase)  
**Guides:** `topic_guide.md` (lowercase with underscores)  
**Entry points:** `README.md` (standard)  
**Historical:** `SESSION_YYYY-MM-DD_Topic.md` (dated)

### When to Create New Docs

**Create new file if:**
- Topic needs >300 lines
- Topic is standalone
- Topic will be referenced often
- Topic needs separate maintenance

**Add to existing file if:**
- Related to existing topic
- <100 lines of content
- Rarely referenced
- Part of larger guide

### Documentation Quality Standards

Every doc must have:
1. Clear title and purpose
2. Last updated date
3. Table of contents (if >300 lines)
4. Code examples
5. Links to related docs

See `docs/dev/DOCUMENTATION_ARCHITECTURE.md` for complete guidelines.

---

## RULE 33: CLEANUP WORKFLOW

Before executing "let's git it", perform systematic cleanup.

### Pre-Commit Cleanup Checklist

```bash
cd /Users/riccardomarconato/digiko-web3-app
```

#### 1. Remove Temporary Files
```bash
# Check for temp files
ls temp/ *_FIX.md READY_TO_*.md GIT_COMMIT_*.md 2>/dev/null

# Remove if found
rm -rf temp/
rm *_FIX.md READY_TO_*.md GIT_COMMIT_*.md 2>/dev/null
```

#### 2. Remove Backup Files
```bash
# Check for backups
find . -name "*.backup" -o -name "*.save" -o -name "*.bak"

# Remove if found
find . -name "*.backup" -delete
find . -name "*.save" -delete
find . -name "*.bak" -delete
```

#### 3. Check Git Status
```bash
git status

# Should show ONLY:
# - Intentional code changes
# - Updated documentation
# - Modified .gitignore (if applicable)

# Should NOT show:
# - temp/ directory
# - *_FIX.md files
# - *.backup files
# - tsconfig.tsbuildinfo
# - .vscode/
# - kleverSDK/ in root
```

#### 4. Verify .gitignore Compliance
```bash
git status --ignored

# Check that ignored items are actually ignored
# Look for any "to be committed" files that should be ignored
```

#### 5. Run Build Test
```bash
npm run build

# Must succeed with no errors
# Warnings are OK if minor
```

### Cleanup Script (Optional)

Create `cleanup.sh` in root:
```bash
#!/bin/bash
echo "🧹 Pre-commit cleanup..."

# Remove temp files
rm -rf temp/
rm *_FIX.md READY_TO_*.md GIT_COMMIT_*.md 2>/dev/null

# Remove backups
find . -name "*.backup" -delete
find . -name "*.save" -delete
find . -name "*.bak" -delete

# Show git status
echo ""
echo "📊 Git status:"
git status

echo ""
echo "✅ Cleanup complete!"
```

Make executable:
```bash
chmod +x cleanup.sh
```

Run before commit:
```bash
./cleanup.sh
```

### What to Clean

**Always remove:**
- temp/ directory
- *_FIX.md workflow files
- READY_TO_*.md workflow files
- GIT_COMMIT_*.md draft commits
- *.backup files
- *.save files
- *.bak files
- .vscode/ directory
- tsconfig.tsbuildinfo
- kleverSDK/ in root (keep only in public/)

**Never remove:**
- node_modules/ (already .gitignored)
- .next/ (already .gitignored)
- .env files (already .gitignored)
- Intentional documentation
- Source code changes
- Public assets

### Post-Cleanup Verification

```bash
# 1. Check git status is clean
git status

# 2. Verify build works
npm run build

# 3. Verify no ignored files staged
git status --ignored

# 4. Double-check removed files are actually gone
ls temp/ kleverSDK/ .vscode/ 2>/dev/null

# If all checks pass → Safe to commit
```

### Integration with "let's git it"

The standard git workflow (RULE 19) now includes cleanup:

```bash
# 1. CLEANUP (NEW STEP)
./cleanup.sh  # or manual cleanup

# 2. Verify clean
git status

# 3. Update version (RULE 19a)
# Edit src/config/app.ts

# 4. Update Updates page (RULE 19b)
# Edit src/app/updates/page.tsx

# 5. Commit (RULE 19c-d)
git add .
git commit -m "LOG HERE"
git push
```

### Emergency: Already Committed Junk

If you accidentally committed temp files:

```bash
# Remove from git, keep locally
git rm --cached temp/ -r
git rm --cached *_FIX.md

# Commit the removal
git commit -m "chore: remove temp files from git"
git push
```

If major cleanup needed, see `docs/dev/GIT_NUCLEAR_RESET.md`.

---

## RULE 34: VERSION UPDATE LOCATIONS

When updating version number, these locations must be synchronized:

### Primary Source of Truth
`src/config/app.ts` - **THE SINGLE SOURCE**
```typescript
export const APP_CONFIG = {
  version: 'v1.0.0',  // Update this FIRST
  name: 'Digiko',
  // ...
}
```

### Automatically Updated (via import)
These import from `APP_CONFIG` and update automatically:
- ✅ Navigation header
- ✅ Footer
- ✅ Admin panel
- ✅ Dashboard account info
- ✅ Mobile menu
- ✅ Desktop more menu

### Manually Updated
`package.json` - **Update to match**
```json
{
  "name": "digiko-web3-app",
  "version": "1.0.0",  // Update this SECOND (no 'v' prefix)
}
```

### Verification
```bash
# Check all version references
grep -r "v1.0.0" src/ | grep -v node_modules
grep '"version"' package.json
```

All should match the version in `src/config/app.ts`.

---

These rules supplement the existing PROJECT_RULES.md and help prevent the structural issues identified in the November 28, 2024 audit.
