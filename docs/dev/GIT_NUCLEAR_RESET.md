# Git Nuclear Reset Procedure

⚠️ **EMERGENCY USE ONLY** ⚠️

Use this when:
- Git repository exceeds 100 MB
- Push fails with `HTTP 400` or `RPC failed`
- `git count-objects -vH` shows >50 MB
- Contract build artifacts tracked in history

**This DESTROYS ALL GIT HISTORY.** Only use when other methods fail.

---

## When NOT to Use This

Don't use nuclear reset if:
- Just a few large files tracked → Use `git rm --cached` + BFG
- Recent commits only → Use `git reset --hard HEAD~N`
- Can revert specific commits → Use `git revert`

**Use this ONLY when:**
- Hundreds of build artifacts in history
- Multiple attempts to clean failed
- Need deployment NOW

---

## Pre-Flight Checklist

Before starting, verify:

```bash
# 1. Are you in the right directory?
pwd
# Should show: /Users/riccardomarconato/digiko-web3-app

# 2. Do you have uncommitted changes?
git status
# Save any important changes first!

# 3. Check current size
git count-objects -vH
# If >100 MB, proceed. If <50 MB, DON'T use nuclear option.

# 4. Is .gitignore configured correctly?
cat .gitignore
# Must exclude: contract/target/, node_modules/, etc.
```

---

## The Nuclear Reset Procedure

### Step 1: Back Up Current Work

```bash
cd /Users/riccardomarconato/digiko-web3-app

# Create backup of entire project
cd ..
cp -r digiko-web3-app digiko-web3-app-backup
cd digiko-web3-app

# Note: This backup includes .git, so you can restore if needed
```

### Step 2: Remove Git History Completely

```bash
# Remove ALL git history (this is the nuclear part)
rm -rf .git

# Verify it's gone
ls -la | grep .git
# Should return nothing
```

### Step 3: Verify .gitignore is Correct

```bash
# Check .gitignore has ALL necessary exclusions
cat .gitignore

# MUST include:
# node_modules/
# .next/
# .env*
# contract/target/
# contract/meta/target/
# contract/wasm/target/
# *.o
# *.rlib
# *.rmeta
# *.d

# If missing, fix NOW before git init
```

### Step 4: Initialize Fresh Repository

```bash
# Create new empty repository
git init

# Should see:
# Initialized empty Git repository in /Users/riccardomarconato/digiko-web3-app/.git/
```

### Step 5: Add ONLY Source Files

**CRITICAL:** Do NOT `git add .` blindly!

```bash
# Add configuration first
git add .gitignore

# Add source directories
git add src/
git add public/
git add docs/

# Add package files
git add package.json
git add package-lock.json

# Add config files
git add next.config.js
git add tailwind.config.js
git add tsconfig.json
git add vercel.json
git add postcss.config.js

# Add markdown docs
git add *.md

# Add contract SOURCE only (NOT builds)
git add contract/*.toml
git add contract/src/
git add contract/wasm/src/
git add contract/wasm/Cargo.toml
```

### Step 6: Verify What's Being Added

```bash
# Check staged files
git status

# Should see:
# - new file: src/...
# - new file: public/...
# - new file: docs/...

# Should NOT see:
# - contract/target/
# - contract/meta/target/
# - node_modules/
# - .next/

# Check size of what's being added
git count-objects -vH

# Should be:
# count: ~200-300
# size: <2 MiB

# If size is still >10 MB, STOP and check what's included:
git ls-files | while read f; do du -h "$f"; done | sort -h | tail -20
```

### Step 7: First Clean Commit

```bash
# Commit everything
git commit -m "v1.1.0: Enhanced Error Logging System"

# Should see:
# [master (root-commit) XXXXXXX] v1.1.0: Enhanced Error Logging System
# ~200 files changed, ~40000 insertions(+)
```

### Step 8: Verify Clean Repository

```bash
# Final size check
git count-objects -vH

# Success metrics:
# count: ~300 objects
# size: ~500 KB - 2 MB ✅
# 
# If still >10 MB, something is wrong. Check:
git ls-files | wc -l
# Should be 200-300 files, not 2000+
```

### Step 9: Configure Remote

```bash
# Set main as default branch
git branch -M main

# Add remote (use your repo URL)
git remote add origin https://github.com/riccardointeractive/digiko.git

# Verify remote
git remote -v
# origin  https://github.com/riccardointeractive/digiko.git (fetch)
# origin  https://github.com/riccardointeractive/digiko.git (push)
```

### Step 10: Force Push

```bash
# Force push to overwrite remote
git push -u origin main --force

# Should see:
# Enumerating objects: 279, done.
# Counting objects: 100% (279/279), done.
# Delta compression using up to 8 threads
# Compressing objects: 100% (245/245), done.
# Writing objects: 100% (279/279), 435.39 KiB | 12.09 MiB/s, done. ✅
# Total 279 (delta 29), reused 0 (delta 0), pack-reused 0
# remote: Resolving deltas: 100% (29/29), done.
# To https://github.com/riccardointeractive/digiko.git
#  + e1ac2cf...272998f main -> main (forced update) ✅
```

### Step 11: Verify Deployment Triggered

```bash
# Check Vercel dashboard
# Should see new deployment triggered automatically

# Or check GitHub
# Navigate to: https://github.com/riccardointeractive/digiko
# Should see clean commit history starting fresh
```

---

## Success Metrics

**Before Nuclear Reset:**
```
Enumerating objects: 2879
Writing objects: 311.45 MiB
error: RPC failed; HTTP 400 ❌
```

**After Nuclear Reset:**
```
Enumerating objects: 279
Writing objects: 435 KB
remote: Resolving deltas: 100% ✅
```

**Reduction:** 99.86%

---

## If Something Goes Wrong

### Push Still Fails
```bash
# Check what's actually in the repo
git ls-files

# If you see build artifacts:
git rm --cached path/to/artifact
git commit --amend

# Try push again
git push -u origin main --force
```

### Lost Important Files
```bash
# Restore from backup
cd /Users/riccardomarconato/
rm -rf digiko-web3-app
cp -r digiko-web3-app-backup digiko-web3-app
cd digiko-web3-app

# Start procedure again from Step 2
```

### Vercel Deployment Fails After Push
```bash
# Check Vercel logs for new errors
# Likely causes:
# 1. Missing environment variables → Add in Vercel dashboard
# 2. Missing dependencies → Check package.json committed
# 3. Build errors → See DEPLOYMENT_TROUBLESHOOTING.md
```

---

## Post-Nuclear Cleanup

After successful deployment:

```bash
# 1. Remove backup (only after confirming production works!)
cd /Users/riccardomarconato/
rm -rf digiko-web3-app-backup

# 2. Document what happened
# Add entry to docs/INTERNAL_DEV_DOCS.md with:
# - Date of nuclear reset
# - Reason (what was bloating repo)
# - Final clean size

# 3. Update .gitignore if needed
# Add any patterns that were causing bloat
```

---

## Prevention for Future

After using nuclear reset once, prevent it happening again:

### 1. Configure .gitignore Properly
```bash
# Before EVER running cargo build or npm install
cat > .gitignore << 'EOF'
node_modules/
.next/
contract/target/
contract/meta/target/
contract/wasm/target/
*.o
*.rlib
*.rmeta
EOF
```

### 2. Regular Size Checks
```bash
# Add to your workflow - check before every push
git count-objects -vH

# If size >10 MB, investigate BEFORE pushing
```

### 3. Pre-Commit Hook (Optional)
```bash
# Create .git/hooks/pre-commit
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
SIZE=$(git count-objects -v | grep "size: " | awk '{print $2}')
if [ $SIZE -gt 10000 ]; then
  echo "❌ Repository size is ${SIZE}KB - too large!"
  echo "Run: git count-objects -vH"
  exit 1
fi
EOF

chmod +x .git/hooks/pre-commit
```

---

## Understanding What Happened

### Why .gitignore Wasn't Enough
```bash
# Adding to .gitignore AFTER files are tracked doesn't help
echo "contract/target/" >> .gitignore
git add .gitignore
git commit -m "Add gitignore"

# Files are still in git history!
# .gitignore only affects NEW files
```

### Why git rm --cached Wasn't Enough
```bash
# This removes from tracking
git rm --cached -r contract/target/

# But leaves in history
git log -- contract/target/
# Still shows old commits with those files
```

### Why Nuclear Reset Worked
```bash
# Removes .git/ directory entirely
rm -rf .git

# Loses ALL history
# Creates fresh repo with ONLY current files
# Result: Clean history, correct size
```

---

## Alternative: BFG Repo Cleaner (If Time Permits)

If not in emergency, can try BFG before nuclear option:

```bash
# Install BFG
brew install bfg

# Clone fresh copy
git clone --mirror https://github.com/riccardointeractive/digiko.git

# Remove large blobs
bfg --strip-blobs-bigger-than 1M digiko.git

# Cleanup
cd digiko.git
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push
git push

# BUT: This still leaves history, just cleans large files
# Nuclear reset is cleaner for contract artifacts
```

---

## Final Checklist

After nuclear reset, verify:

- [ ] Git push succeeded
- [ ] Repository size <2 MB: `git count-objects -vH`
- [ ] Vercel deployment succeeded
- [ ] Production site works
- [ ] .gitignore includes all build artifacts
- [ ] Backup removed (after confirming production works)
- [ ] INTERNAL_DEV_DOCS.md updated with event

---

## When to Consider This Again

Only if:
- Repo exceeds 50 MB again
- Multiple failed push attempts
- `git count-objects -vH` shows >1000 objects bloat

**Remember:** This should be RARE. With proper .gitignore, should never need again.

---

**Nuclear reset completed: 2024-11-28**  
**Reason:** Contract build artifacts (311 MB)  
**Result:** Clean repo (435 KB) ✅
