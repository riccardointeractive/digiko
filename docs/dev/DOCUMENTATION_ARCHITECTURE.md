# Documentation Architecture Guide
**Complete Guide to Documentation Organization**

**Last Updated:** November 28, 2024  
**Status:** ✅ Implemented

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Current Structure](#current-structure)
3. [Documentation Hierarchy](#documentation-hierarchy)
4. [File Organization](#file-organization)
5. [Content Guidelines](#content-guidelines)
6. [Maintenance](#maintenance)

---

## 📖 Overview

This guide documents how Digiko's documentation is organized, where files should live, and how to maintain clean, accessible documentation.

### Core Principles

1. **Single Source of Truth** - Each topic has ONE authoritative document
2. **Clear Hierarchy** - Logical organization with clear navigation
3. **Focused Files** - Each file covers one topic thoroughly
4. **No Duplication** - Avoid redundant documentation
5. **Easy Discovery** - Intuitive structure for finding information

---

## 📁 Current Structure

```
digiko-web3-app/
├── docs/
│   ├── PROJECT_RULES.md              # Core development rules
│   ├── CHANGELOG.md                  # Version history
│   ├── design_guide.md               # UI/UX standards
│   ├── SWAP_README.md                # Swap feature docs
│   ├── BITCOIN_ME_API_INTEGRATION.md # Exchange integration
│   └── dev/                          # Development documentation
│       ├── README.md                 # Dev docs hub
│       ├── MODULAR_ARCHITECTURE.md   # Architecture patterns
│       ├── ERROR_LOGGING.md          # Error logging system
│       ├── DEBUG_MODE.md             # Debug tools & testing
│       ├── TROUBLESHOOTING.md        # Bug fixes & solutions
│       ├── TESTING_GUIDE.md          # Testing procedures
│       ├── CONTRACT_DEVELOPMENT.md   # Smart contract guide
│       ├── DEX_STATUS_SUMMARY.md     # DEX development status
│       ├── DEPLOYMENT_TROUBLESHOOTING.md  # Deploy issues
│       ├── GIT_NUCLEAR_RESET.md      # Git emergency procedures
│       ├── TOKEN_IMAGES.md           # Token asset guidelines
│       ├── INSTALLATION.md           # Setup instructions
│       ├── INTEGRATION_GUIDE.md      # Feature integration
│       ├── PACKAGE_README.md         # Package documentation
│       ├── SESSION_*.md              # Development session logs
│       └── ERROR_LOG_EXAMPLE.txt     # Sample error log
├── contract/
│   ├── README.md                     # Contract overview
│   ├── DEPLOYMENT.md                 # Deploy instructions
│   ├── INTEGRATION.md                # Contract integration
│   └── SUMMARY.md                    # Contract summary
└── public/
    └── docs/
        └── PROJECT_RULES.md          # Public-facing rules (if needed)
```

---

## 🏗️ Documentation Hierarchy

### Level 1: Project Root (`docs/`)

**Purpose:** High-level project documentation  
**Audience:** All team members, new developers

**Files:**
- `PROJECT_RULES.md` - Development rules & workflows
- `CHANGELOG.md` - Version history & releases
- `design_guide.md` - UI/UX design standards
- `SWAP_README.md` - Feature-specific documentation

**Guidelines:**
- Keep files focused and comprehensive
- Update regularly with project changes
- Use clear, professional language
- Include table of contents for long files

### Level 2: Development Docs (`docs/dev/`)

**Purpose:** Technical development documentation  
**Audience:** Developers, AI assistants

**Structure:**
```
docs/dev/
├── README.md                      # Hub with links to all docs
├── [TOPIC].md                     # Focused topic files
└── SESSION_[DATE]_[TOPIC].md      # Session logs (historical)
```

**Categories:**

**Architecture & Patterns:**
- `MODULAR_ARCHITECTURE.md` - Code organization patterns
- `ERROR_LOGGING.md` - Error handling system
- `DEBUG_MODE.md` - Debugging & testing tools

**Development Workflows:**
- `TESTING_GUIDE.md` - Testing procedures
- `INTEGRATION_GUIDE.md` - Feature integration steps
- `DEPLOYMENT_TROUBLESHOOTING.md` - Deploy solutions

**Blockchain & Contracts:**
- `CONTRACT_DEVELOPMENT.md` - Smart contract guide
- `DEX_STATUS_SUMMARY.md` - DEX development status

**Emergency Procedures:**
- `GIT_NUCLEAR_RESET.md` - Git recovery procedures
- `TROUBLESHOOTING.md` - Common issues & fixes

**Reference:**
- `TOKEN_IMAGES.md` - Asset guidelines
- `ERROR_LOG_EXAMPLE.txt` - Sample outputs

**Historical:**
- `SESSION_*.md` - Development session notes

### Level 3: Feature Docs (`contract/`, `src/app/[feature]/`)

**Purpose:** Feature-specific documentation  
**Location:** Alongside the feature code

**Contract Documentation:**
```
contract/
├── README.md          # Overview & purpose
├── DEPLOYMENT.md      # How to deploy
├── INTEGRATION.md     # How to integrate
└── SUMMARY.md         # Quick reference
```

**Page Documentation (if needed):**
```
src/app/[feature]/
├── README.md          # Page-specific docs
├── types/
├── config/
├── hooks/
└── components/
```

---

## 📝 File Organization

### Naming Conventions

**General Docs:**
- `TOPIC.md` - Uppercase for visibility
- `topic_guide.md` - Lowercase with underscores for guides
- `README.md` - Standard entry point

**Temporary/Historical:**
- `SESSION_YYYY-MM-DD_Topic.md` - Session notes with date
- `TOPIC_FIX.md` - Temporary fix documentation
- `TOPIC.backup` - Backup files (should be .gitignored)

### File Size Guidelines

**Optimal Sizes:**
- README/Hub files: 150-300 lines
- Topic guides: 300-600 lines
- Reference docs: 100-200 lines
- Session notes: 200-500 lines

**If file exceeds 600 lines:**
1. Consider splitting into multiple focused files
2. Create subsections with clear hierarchy
3. Add table of contents at top
4. Link to related documentation

### Content Structure

**Every documentation file should have:**

1. **Title & Metadata**
```markdown
# Title
**Purpose:** Brief description
**Last Updated:** Date
**Status:** ✅ Active / 🚧 WIP / 📦 Archive
```

2. **Table of Contents** (for files >300 lines)
```markdown
## 📋 Table of Contents
1. [Section](#section)
2. [Another](#another)
```

3. **Overview Section**
- What is this?
- Why does it exist?
- Who is it for?

4. **Main Content**
- Logical progression
- Clear headings
- Code examples
- Real-world use cases

5. **Related Documentation**
- Links to related files
- Prerequisites
- Next steps

---

## 📚 Content Guidelines

### Writing Style

**Do:**
- ✅ Use clear, direct language
- ✅ Provide code examples
- ✅ Include "why" not just "how"
- ✅ Link to related documentation
- ✅ Update dates when editing
- ✅ Use emojis for visual hierarchy (sparingly)

**Don't:**
- ❌ Use vague language
- ❌ Assume knowledge
- ❌ Duplicate content from other files
- ❌ Include outdated information
- ❌ Write walls of text without structure

### Code Examples

**Format:**
```typescript
// Good: Complete, runnable example with context

import { createErrorLog } from '@/utils/errorLogger';

try {
  await performAction();
} catch (error) {
  const errorLog = createErrorLog({
    title: 'Action Failed',
    message: 'Could not complete action',
    error: error as Error,
    userAddress: address,
    component: 'ComponentName',
    action: 'User action description',
  });
  
  showErrorModal('Error', 'Message', errorLog);
}
```

**Include:**
- Imports needed
- Full context
- Comments explaining key parts
- Realistic variable names

### Visual Organization

**Use hierarchical headings:**
```markdown
# Main Title (H1) - Once per file
## Major Sections (H2)
### Subsections (H3)
#### Details (H4)
```

**Use formatting for clarity:**
```markdown
**Bold** for emphasis
`code` for inline code
```code blocks``` for examples
> Blockquotes for important notes
- Lists for steps or items
```

**Use visual separators:**
```markdown
---  (horizontal rule between major sections)
```

### Linking & References

**Internal Links:**
```markdown
See [Architecture Guide](MODULAR_ARCHITECTURE.md)
See [Error Logging](#error-logging) for details
```

**External Links:**
```markdown
[Klever Documentation](https://klever.finance/docs)
```

**Code Links:**
```markdown
See `src/utils/errorLogger.ts` for implementation
```

---

## 🔧 Maintenance

### Regular Updates

**Weekly:**
- Update session notes if applicable
- Fix broken links
- Correct outdated information

**After Feature Completion:**
- Update relevant guides
- Add examples
- Update README.md links
- Check related documentation

**Before Each Release:**
- Update CHANGELOG.md
- Review PROJECT_RULES.md
- Check all links work
- Verify code examples compile

### Documentation Audit Checklist

**File Organization:**
- [ ] No duplicate files
- [ ] Clear naming conventions
- [ ] Proper file locations
- [ ] No orphaned files

**Content Quality:**
- [ ] All files have clear purpose
- [ ] Code examples work
- [ ] Links are valid
- [ ] Information is current
- [ ] No contradictions

**Discoverability:**
- [ ] README.md is up to date
- [ ] Table of contents accurate
- [ ] Cross-references work
- [ ] Search-friendly titles

### Archive Strategy

**When to Archive:**
- Documentation for removed features
- Outdated session notes (>6 months)
- Superseded guides
- Historical reference material

**How to Archive:**
```
docs/dev/
└── archive/
    └── YYYY-MM/
        └── archived_file.md
```

**Add archive notice:**
```markdown
# [Title]
**Status:** 📦 ARCHIVED (YYYY-MM-DD)
**Reason:** Superseded by [new_file.md]
**Historical Reference Only**
```

### Deprecation Process

1. Mark file as deprecated
```markdown
# [Title]
**Status:** ⚠️ DEPRECATED
**Replacement:** See [new_file.md]
```

2. Add redirect notice at top
3. Keep for 1 release cycle
4. Move to archive/
5. Update all links

---

## 🎯 Common Patterns

### Documentation for New Features

1. Create feature-specific docs in appropriate location
2. Update README.md with link
3. Add to relevant guides
4. Include in CHANGELOG.md
5. Update PROJECT_RULES.md if needed

### Documentation for Refactors

1. Update affected guides
2. Add "before/after" examples
3. Document lessons learned
4. Update architecture docs
5. Create session note if complex

### Documentation for Bug Fixes

1. Add to TROUBLESHOOTING.md
2. Document root cause
3. Include solution
4. Add prevention tips
5. Update relevant guides

---

## ✅ Documentation Checklist

Before committing documentation changes:

**Content:**
- [ ] Clear purpose and audience
- [ ] No duplicate content
- [ ] Code examples tested
- [ ] Links verified
- [ ] Dates updated

**Structure:**
- [ ] Proper file location
- [ ] Clear hierarchy
- [ ] Table of contents (if needed)
- [ ] Related docs linked

**Quality:**
- [ ] Spelling checked
- [ ] Grammar correct
- [ ] Formatting consistent
- [ ] No outdated info

**Maintenance:**
- [ ] README.md updated
- [ ] Related docs updated
- [ ] Old versions archived
- [ ] CHANGELOG.md updated (if applicable)

---

## 📊 Documentation Metrics

**Good Documentation Has:**
- Clear structure (headings, TOC)
- Practical examples
- Current information
- Proper links
- Regular updates

**Signs of Poor Documentation:**
- Multiple files covering same topic
- Broken links
- Outdated information
- No structure or TOC
- Vague descriptions

---

## 🎉 Summary

**Principle:** One topic, one file, one location  
**Structure:** docs/ for project, docs/dev/ for technical  
**Maintenance:** Regular updates, clear organization  
**Quality:** Clear, current, complete

**Good documentation makes good developers.** 📚
