# Responsive Design Visual Guide
**Typography & Spacing Examples Across Breakpoints**

---

## 📊 Typography Scale Visualization

### H1 - Page Titles
```
Mobile (375px):   ████████████████████████████████ 32px
Tablet (768px):   ████████████████████████████████████████████ 44px  
Desktop (1024px): ████████████████████████████████████████████████ 48px
```
**Usage:** Main page titles
**Class:** `text-responsive-h1`
**Implementation:** `text-mobile-5xl md:text-tablet-5xl lg:text-5xl`

---

### H2 - Section Headers
```
Mobile (375px):   ████████████████████████████ 28px
Tablet (768px):   ████████████████████████████████████ 36px
Desktop (1024px): ████████████████████████████████████ 36px
```
**Usage:** Major section headers
**Class:** `text-responsive-h2`
**Implementation:** `text-mobile-4xl md:text-tablet-4xl lg:text-4xl`

---

### H3 - Subsection Headers
```
Mobile (375px):   ████████████████████████ 24px
Tablet (768px):   ████████████████████████████ 28px
Desktop (1024px): ██████████████████████████████ 30px
```
**Usage:** Card titles, subsections
**Class:** `text-responsive-h3`
**Implementation:** `text-mobile-3xl md:text-tablet-3xl lg:text-3xl`

---

### H4 - Card Titles
```
Mobile (375px):   ████████████████████ 20px
Tablet (768px):   ██████████████████████ 22px
Desktop (1024px): ████████████████████████ 24px
```
**Usage:** Small section headers, card titles
**Class:** `text-responsive-h4`
**Implementation:** `text-mobile-2xl md:text-tablet-2xl lg:text-2xl`

---

### Body XL - Hero Descriptions
```
Mobile (375px):   ████████████████ 16px
Tablet (768px):   █████████████████ 17px
Desktop (1024px): ████████████████████ 20px
```
**Usage:** Hero descriptions, large body text
**Class:** `text-responsive-xl`
**Implementation:** `text-mobile-lg md:text-tablet-lg lg:text-xl`

---

### Body Base - Standard Text
```
Mobile (375px):   ██████████████ 14px
Tablet (768px):   ███████████████ 15px
Desktop (1024px): ████████████████ 16px
```
**Usage:** Standard paragraph text
**Class:** `text-responsive-base`
**Implementation:** `text-mobile-base md:text-tablet-base lg:text-base`

---

## 📏 Spacing Scale Visualization

### Page Padding (Horizontal)
```
Mobile:   |←—— 16px ——→| Content |←—— 16px ——→|
Tablet:   |←—— 24px ——————→| Content |←—— 24px ——————→|
Desktop:  |←—— 32px ————————→| Content |←—— 32px ————————→|
```
**Class:** `px-4 md:px-6 lg:px-8`

---

### Card Padding (Large)
```
Mobile:   ┌—— 20px ——┐
          | Content  |
          └—— 20px ——┘

Tablet:   ┌—— 24px ————┐
          |   Content  |
          └—— 24px ————┘

Desktop:  ┌—— 32px ————————┐
          |     Content    |
          └—— 32px ————————┘
```
**Class:** `p-5 md:p-6 lg:p-8`

---

### Grid Gaps
```
Mobile:   [Card] ←16px→ [Card]
Tablet:   [Card] ←—24px—→ [Card]
Desktop:  [Card] ←——32px——→ [Card]
```
**Class:** `gap-4 md:gap-6 lg:gap-8`

---

## 🎨 Real Component Examples

### Example 1: Page Header
```tsx
// BEFORE (not responsive)
<div className="mb-12">
  <h1 className="text-5xl font-medium text-white mb-3">Dashboard</h1>
  <p className="text-xl text-gray-400">Manage your Klever assets</p>
</div>

// AFTER (fully responsive)
<div className="mb-8 md:mb-10 lg:mb-12">
  <h1 className="text-responsive-h1 text-white mb-3 md:mb-4">Dashboard</h1>
  <p className="text-responsive-xl text-gray-400">Manage your Klever assets</p>
</div>
```

**Changes:**
- H1: 48px fixed → 32px/44px/48px responsive
- Description: 20px fixed → 16px/17px/20px responsive
- Bottom margin: 48px fixed → 32px/40px/48px responsive
- Title margin: 12px fixed → 12px/16px/16px responsive

---

### Example 2: Glass Card
```tsx
// BEFORE (not responsive)
<div className="glass p-8 rounded-2xl">
  <h3 className="text-2xl font-medium mb-6">Card Title</h3>
  <p className="text-base text-gray-400">Content here</p>
</div>

// AFTER (fully responsive)
<div className="glass p-5 md:p-6 lg:p-8 rounded-2xl">
  <h3 className="text-responsive-h3 mb-4 md:mb-5 lg:mb-6">Card Title</h3>
  <p className="text-responsive-base text-gray-400">Content here</p>
</div>
```

**Changes:**
- Padding: 32px fixed → 20px/24px/32px responsive
- H3: 24px fixed → 24px/28px/30px responsive
- Text: 16px fixed → 14px/15px/16px responsive
- Margin: 24px fixed → 16px/20px/24px responsive

---

### Example 3: Stats Grid
```tsx
// BEFORE (not responsive)
<div className="grid grid-cols-3 gap-8">
  <div className="p-6">
    <div className="text-2xl font-mono">123.45</div>
    <div className="text-base text-gray-400">DGKO</div>
  </div>
</div>

// AFTER (fully responsive)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
                gap-4 md:gap-6 lg:gap-8">
  <div className="p-4 md:p-5 lg:p-6">
    <div className="text-responsive-h3 font-mono">123.45</div>
    <div className="text-responsive-base text-gray-400">DGKO</div>
  </div>
</div>
```

**Changes:**
- Grid: 3 cols fixed → 1/2/3 cols responsive
- Gap: 32px fixed → 16px/24px/32px responsive
- Padding: 24px fixed → 16px/20px/24px responsive
- Number: 24px fixed → 24px/28px/30px responsive
- Label: 16px fixed → 14px/15px/16px responsive

---

## 📱 Mobile vs Desktop Comparison

### Mobile (375px)
```
┌—————————————————————————————————————┐
|         [16px padding]              |
|                                     |
|  Dashboard            [32px text]   |
|  Manage assets        [16px text]   |
|         [32px space]                |
|  ┌———————————————————————————————┐  |
|  | [20px padding]                |  |
|  |                               |  |
|  | Balance     [24px text]       |  |
|  | 1,234.56    [14px text]       |  |
|  |                               |  |
|  └———————————————————————————————┘  |
|         [16px gap]                  |
|  ┌———————————————————————————————┐  |
|  | Another Card                  |  |
|  └———————————————————————————————┘  |
|                                     |
└—————————————————————————————————————┘
```

### Desktop (1440px)
```
┌—————————————————————————————————————————————————————————————————┐
|               [32px padding]                                    |
|                                                                 |
|  Dashboard                          [48px text]                 |
|  Manage your Klever assets          [20px text]                 |
|               [48px space]                                      |
|  ┌——————————————————┐   [32px]   ┌——————————————————┐          |
|  | [32px padding]   |    gap     | [32px padding]   |          |
|  |                  |            |                  |          |
|  | Balance          |            | Another Card     |          |
|  | 1,234.56 [30px]  |            | Content [16px]   |          |
|  | DGKO [16px]      |            |                  |          |
|  |                  |            |                  |          |
|  └——————————————————┘            └——————————————————┘          |
|                                                                 |
└—————————————————————————————————————————————————————————————————┘
```

**Key Differences:**
1. **Typography:** 30-50% smaller on mobile
2. **Spacing:** 50% less padding/gaps on mobile
3. **Layout:** Stacked on mobile, grid on desktop
4. **Content Density:** More breathing room on desktop

---

## 🎯 Mathematical Progression

Our responsive system follows a **consistent scaling ratio**:

### Typography Ratio
```
Mobile → Tablet: +35% average
Tablet → Desktop: +10% average
Overall: Mobile → Desktop = +50% average
```

### Spacing Ratio
```
Mobile → Tablet: +50% (16px → 24px)
Tablet → Desktop: +33% (24px → 32px)
Overall: Mobile → Desktop = +100% (16px → 32px)
```

This creates **harmonious scaling** where everything feels proportionally correct at any breakpoint.

---

## ✅ Testing Checklist

Use this checklist when implementing responsive design:

### Visual Tests
- [ ] Open page at 375px width (iPhone SE)
- [ ] Check all text is readable (no squinting)
- [ ] Verify no horizontal scroll
- [ ] Confirm spacing feels comfortable (not cramped)
- [ ] Test at 768px (tablet - iPad)
- [ ] Verify layout transitions smoothly
- [ ] Check spacing scales proportionally
- [ ] Test at 1440px (desktop)
- [ ] Confirm layout uses available space well
- [ ] Verify text isn't too large/small

### Functional Tests
- [ ] Touch targets are 44x44px minimum
- [ ] Buttons are easy to tap on mobile
- [ ] No text overflow/wrapping issues
- [ ] Cards stack properly on mobile
- [ ] Grid columns adapt correctly
- [ ] Padding doesn't make content too narrow

### Code Quality
- [ ] Using responsive classes (`.text-responsive-*`)
- [ ] All three breakpoints defined (mobile/tablet/desktop)
- [ ] Consistent spacing patterns (×1.5 ratio)
- [ ] No hardcoded sizes where responsive needed
- [ ] Follows design guide patterns

---

**Last Updated:** November 29, 2025  
**Version:** 1.0  
**Purpose:** Visual reference for responsive design implementation
