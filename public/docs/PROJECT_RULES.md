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

## RULE 22: CONFIGURATION FILE EXTENSIONS
Config with JSX equals `.tsx` extension ALWAYS

**Example:** `dashboard.config.tsx` (contains SVG icons)  
**Example:** `swap.config.tsx` (contains JSX elements)

## RULE 23: FILE SIZE GUIDELINES
- Main page files should be 50-200 lines (orchestrator only)
- Extract components when files exceed 200 lines
- Break down complex logic into focused hooks

## RULE 24: TROUBLESHOOTING MULTIPLE DEV SERVERS
If you see "Port 3000 is in use, trying 3001..." or get 404 errors:

1. Kill all Next.js processes first: `pkill -f next`
2. Then start fresh: `rm -rf .next` then `npm run dev`

## RULE 25: VERSION DISPLAY TESTING
After updating version in `src/config/app.ts`, verify it appears correctly in:
- Navigation header
- Footer
- Admin panel (2 places)
- Dashboard account info
- Mobile menu
- Desktop More menu

## RULE 26: UNNECESSARY COMPUTER USE AVOIDANCE
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
