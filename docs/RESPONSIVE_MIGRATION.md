# Responsive Design Migration Guide
**Converting Existing Components to the New System**

---

## 🎯 Migration Strategy

### Phase 1: Critical Pages (Week 1)
- Dashboard
- Staking
- DGKO Token Page
- BABYDGKO Token Page

### Phase 2: Secondary Pages (Week 2)
- Documentation
- Updates
- Roadmap
- Admin Panel

### Phase 3: Components (Week 3)
- Shared components
- Modals
- Navigation
- Footer

---

## 🔄 Step-by-Step Migration Process

### Step 1: Typography
**Find and replace fixed text sizes with responsive classes**

#### Headings
```tsx
// FIND
className="text-5xl"
className="text-4xl"
className="text-3xl"
className="text-2xl"
className="text-xl"

// REPLACE WITH
className="text-responsive-h1"
className="text-responsive-h2"
className="text-responsive-h3"
className="text-responsive-h4"
className="text-responsive-h5"
```

#### Body Text
```tsx
// FIND
className="text-xl"       // Large body
className="text-base"     // Standard body
className="text-sm"       // Small text

// REPLACE WITH
className="text-responsive-xl"
className="text-responsive-base"
className="text-responsive-sm"
```

---

### Step 2: Padding
**Add responsive padding to all containers**

#### Page Containers
```tsx
// FIND
className="px-8 py-12"

// REPLACE WITH
className="px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12"
```

#### Large Cards
```tsx
// FIND
className="p-8"

// REPLACE WITH
className="p-5 md:p-6 lg:p-8"
```

#### Small Cards
```tsx
// FIND
className="p-6"

// REPLACE WITH
className="p-4 md:p-5 lg:p-6"
```

---

### Step 3: Gaps & Spacing
**Update grid/flex gaps and margins**

#### Grid Gaps
```tsx
// FIND
className="gap-8"
className="gap-6"

// REPLACE WITH
className="gap-4 md:gap-6 lg:gap-8"
className="gap-3 md:gap-4 lg:gap-6"
```

#### Section Margins
```tsx
// FIND
className="mb-12"
className="mb-8"
className="mb-6"

// REPLACE WITH
className="mb-8 md:mb-10 lg:mb-12"
className="mb-6 md:mb-7 lg:mb-8"
className="mb-4 md:mb-5 lg:mb-6"
```

---

### Step 4: Layout
**Make layouts responsive to screen size**

#### Stacking
```tsx
// FIND
className="flex"

// REPLACE WITH (if should stack on mobile)
className="flex flex-col md:flex-row"
```

#### Grid Columns
```tsx
// FIND
className="grid grid-cols-3"
className="grid grid-cols-2"

// REPLACE WITH
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
className="grid grid-cols-1 md:grid-cols-2"
```

#### Alignment
```tsx
// FIND
className="text-left"

// REPLACE WITH (if should center on mobile)
className="text-center md:text-left"

// Same for flex alignment
className="items-center md:items-start"
className="justify-center md:justify-start"
```

---

## 📝 Component-Specific Migrations

### Example 1: Dashboard Page

#### BEFORE
```tsx
export default function Dashboard() {
  return (
    <div className="min-h-screen px-8 py-12">
      <div className="mb-12">
        <h1 className="text-5xl font-medium text-white mb-3">Dashboard</h1>
        <p className="text-xl text-gray-400">Manage your Klever assets</p>
      </div>
      
      <div className="grid grid-cols-3 gap-8">
        <div className="glass p-8 rounded-2xl">
          <h3 className="text-2xl font-medium mb-6">Balance</h3>
          <div className="text-3xl font-mono">1,234.56</div>
          <div className="text-base text-gray-400">DGKO</div>
        </div>
      </div>
    </div>
  );
}
```

#### AFTER
```tsx
export default function Dashboard() {
  return (
    <div className="min-h-screen px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
      <div className="mb-8 md:mb-10 lg:mb-12">
        <h1 className="text-responsive-h1 text-white mb-3 md:mb-4">Dashboard</h1>
        <p className="text-responsive-xl text-gray-400">Manage your Klever assets</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        <div className="glass p-5 md:p-6 lg:p-8 rounded-2xl">
          <h3 className="text-responsive-h3 mb-4 md:mb-5 lg:mb-6">Balance</h3>
          <div className="text-responsive-h3 font-mono">1,234.56</div>
          <div className="text-responsive-base text-gray-400">DGKO</div>
        </div>
      </div>
    </div>
  );
}
```

**Changes Made:**
- ✅ Page padding: Added mobile/tablet breakpoints
- ✅ Section margin: Made responsive
- ✅ H1: Changed to `text-responsive-h1`
- ✅ Description: Changed to `text-responsive-xl`
- ✅ Grid: Added mobile stacking
- ✅ Card padding: Made responsive
- ✅ All typography: Using responsive classes

---

### Example 2: Stats Card Component

#### BEFORE
```tsx
interface StatsCardProps {
  title: string;
  value: string;
  symbol: string;
}

export function StatsCard({ title, value, symbol }: StatsCardProps) {
  return (
    <div className="glass p-6 rounded-2xl">
      <h4 className="text-xl font-medium mb-4">{title}</h4>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-mono">{value}</span>
        <span className="text-base text-gray-400">{symbol}</span>
      </div>
    </div>
  );
}
```

#### AFTER
```tsx
interface StatsCardProps {
  title: string;
  value: string;
  symbol: string;
}

export function StatsCard({ title, value, symbol }: StatsCardProps) {
  return (
    <div className="glass p-4 md:p-5 lg:p-6 rounded-2xl">
      <h4 className="text-responsive-h4 mb-3 md:mb-4">{title}</h4>
      <div className="flex items-baseline gap-2">
        <span className="text-responsive-h3 font-mono">{value}</span>
        <span className="text-responsive-base text-gray-400">{symbol}</span>
      </div>
    </div>
  );
}
```

**Changes Made:**
- ✅ Padding: `p-6` → `p-4 md:p-5 lg:p-6`
- ✅ Title: `text-xl` → `text-responsive-h4`
- ✅ Margin: `mb-4` → `mb-3 md:mb-4`
- ✅ Value: `text-3xl` → `text-responsive-h3`
- ✅ Symbol: `text-base` → `text-responsive-base`

---

### Example 3: Button Component

#### BEFORE
```tsx
export function PrimaryButton({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-10 py-5 bg-digiko-primary text-white font-medium 
                 rounded-2xl transition-all duration-500"
    >
      {children}
    </button>
  );
}
```

#### AFTER
```tsx
export function PrimaryButton({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full md:w-auto 
                 px-6 md:px-8 lg:px-10 
                 py-4 md:py-4.5 lg:py-5 
                 bg-digiko-primary text-white font-medium 
                 rounded-2xl transition-all duration-500"
    >
      <span className="text-responsive-base">{children}</span>
    </button>
  );
}
```

**Changes Made:**
- ✅ Width: Full width on mobile, auto on desktop
- ✅ Horizontal padding: Responsive
- ✅ Vertical padding: Responsive (maintains 44px touch target)
- ✅ Text size: Using responsive class

---

## 🔍 Code Search Patterns

Use these search patterns to find components that need migration:

### Find Fixed Typography
```bash
# Search for fixed text sizes
grep -r "text-5xl" src/
grep -r "text-4xl" src/
grep -r "text-3xl" src/
grep -r "text-2xl" src/
grep -r "text-xl" src/
grep -r "text-base" src/

# Exclude already responsive
grep -r "text-5xl" src/ | grep -v "text-responsive"
```

### Find Fixed Padding
```bash
# Search for non-responsive padding
grep -r 'className=".*p-8' src/ | grep -v "md:"
grep -r 'className=".*p-6' src/ | grep -v "md:"
grep -r 'className=".*p-4' src/ | grep -v "md:"
```

### Find Fixed Gaps
```bash
# Search for non-responsive gaps
grep -r 'gap-8' src/ | grep -v "md:"
grep -r 'gap-6' src/ | grep -v "md:"
grep -r 'gap-4' src/ | grep -v "md:"
```

### Find Non-Responsive Grids
```bash
# Search for grids without responsive columns
grep -r 'grid-cols-' src/ | grep -v "md:grid-cols"
```

---

## ✅ Migration Checklist (Per Component)

### Before Migration
- [ ] Review component in browser at different sizes
- [ ] Note any layout issues or overflow problems
- [ ] Identify all typography elements
- [ ] List all spacing (padding, gaps, margins)
- [ ] Check if layout needs to stack on mobile

### During Migration
- [ ] Update all text sizes to responsive classes
- [ ] Add responsive padding (all breakpoints)
- [ ] Add responsive gaps/margins (all breakpoints)
- [ ] Make layout responsive (stack/grid)
- [ ] Ensure touch targets are 44px minimum
- [ ] Add `w-full md:w-auto` to buttons if needed

### After Migration
- [ ] Test at 375px (iPhone SE)
- [ ] Test at 768px (iPad)
- [ ] Test at 1440px (Desktop)
- [ ] Verify no horizontal scroll at any size
- [ ] Check spacing feels proportional
- [ ] Confirm typography scales nicely
- [ ] Test all interactive elements work
- [ ] Verify layout transitions smoothly

---

## 🚨 Common Issues & Solutions

### Issue 1: Text Overflow on Mobile
**Problem:** Long words or numbers overflow container

**Solution:**
```tsx
// Add flex-wrap and break utilities
className="flex flex-wrap items-baseline gap-2"
className="break-words"  // For text
className="break-all"    // For numbers/addresses
```

---

### Issue 2: Buttons Too Small on Mobile
**Problem:** Touch targets under 44px

**Solution:**
```tsx
// Increase mobile padding
className="py-4 md:py-4.5 lg:py-5"  // 48px on mobile
```

---

### Issue 3: Grid Doesn't Stack
**Problem:** Multiple columns on mobile create cramped layout

**Solution:**
```tsx
// Start with 1 column
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

---

### Issue 4: Content Too Narrow on Mobile
**Problem:** Excessive padding reduces usable space

**Solution:**
```tsx
// Use tighter padding on mobile
className="px-4 md:px-6 lg:px-8"  // Not px-8 on mobile
```

---

### Issue 5: Typography Not Scaling
**Problem:** Using fixed Tailwind classes

**Solution:**
```tsx
// Replace fixed classes
text-5xl → text-responsive-h1
text-2xl → text-responsive-h3
text-base → text-responsive-base
```

---

## 📊 Progress Tracking

### Migration Status Template

Create a file `MIGRATION_PROGRESS.md`:

```markdown
# Responsive Design Migration Progress

## Pages
- [ ] Dashboard (0%)
- [ ] Staking (0%)
- [ ] DGKO Token (0%)
- [ ] BABYDGKO Token (0%)
- [ ] Documentation (0%)
- [ ] Updates (0%)
- [ ] Roadmap (0%)
- [ ] Admin (0%)

## Components
- [ ] Navigation (0%)
- [ ] Footer (0%)
- [ ] StatsCard (0%)
- [ ] TokenCard (0%)
- [ ] StakingCard (0%)
- [ ] Modal (0%)
- [ ] Button (0%)

## Testing
- [ ] Mobile (375px) - All pages tested
- [ ] Tablet (768px) - All pages tested
- [ ] Desktop (1440px) - All pages tested
- [ ] Touch targets verified
- [ ] No overflow issues
```

---

## 🎓 Best Practices

1. **Migrate incrementally** - One component at a time
2. **Test immediately** - After each change
3. **Follow patterns** - Use existing responsive components as reference
4. **Document issues** - Note any problems for team awareness
5. **Ask for review** - Get feedback on visual results

---

## 🔗 Related Resources

- **Design Guide:** `docs/design_guide.md`
- **Quick Reference:** `docs/RESPONSIVE_REFERENCE.md`
- **Visual Guide:** `docs/RESPONSIVE_VISUAL_GUIDE.md`
- **Tailwind Config:** `tailwind.config.js`
- **Global Styles:** `src/app/globals.css`

---

**Last Updated:** November 29, 2025  
**Version:** 1.0  
**Purpose:** Guide for migrating existing components to responsive design system
