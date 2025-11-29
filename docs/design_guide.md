# Digiko Web3 App - Design Guide
**Version:** 1.9  
**Last Updated:** November 29, 2025 (Comprehensive Responsive Design System)  
**Design Philosophy:** Apple-inspired fintech minimalism with Web3 sophistication

---

## 📱 RESPONSIVE DESIGN SYSTEM

### Breakpoint Strategy

We follow a **mobile-first, three-tier scaling system** based on fintech industry standards (Revolut, Coinbase, Linear, Vercel).

```
Mobile:  320px - 767px  (xs, sm breakpoints)
Tablet:  768px - 1023px (md breakpoint)
Desktop: 1024px+        (lg, xl, 2xl breakpoints)
```

**Key Principles:**
1. Design for mobile first, then enhance for larger screens
2. Typography scales proportionally across breakpoints
3. Spacing increases systematically with screen size
4. Content density adapts to available space
5. Touch targets remain accessible on all devices

### Responsive Typography Scale

All typography scales across three breakpoints using a **mathematical progression**:

| Element | Mobile (375px) | Tablet (768px) | Desktop (1024px+) | Usage |
|---------|----------------|----------------|-------------------|-------|
| **Display** | 40px | 56px | 72px | Hero sections only |
| **H1** | 32px | 44px | 48px | Page titles |
| **H2** | 28px | 36px | 36px | Major sections |
| **H3** | 24px | 28px | 30px | Subsections |
| **H4** | 20px | 22px | 24px | Card titles |
| **H5** | 18px | 19px | 20px | Small headers |
| **H6** | 16px | 17px | 18px | Micro headers |
| **Body XL** | 16px | 17px | 20px | Hero descriptions |
| **Body 2XL** | 18px | 19px | 24px | Large intro text |
| **Body Base** | 14px | 15px | 16px | Standard text |
| **Body Small** | 12px | 13px | 14px | Secondary info |
| **Caption** | 10px | 11px | 12px | Labels, metadata |

**Implementation:**

```tsx
// Use responsive classes for automatic scaling
<h1 className="text-responsive-h1">Page Title</h1>
<h2 className="text-responsive-h2">Section Header</h2>
<h3 className="text-responsive-h3">Subsection</h3>
<p className="text-responsive-xl">Large body text</p>
<p className="text-responsive-base">Standard text</p>

// Manual breakpoint control (when needed)
<h1 className="text-mobile-5xl md:text-tablet-5xl lg:text-5xl">
  Custom scaling
</h1>
```

### Responsive Spacing System

Spacing scales proportionally with screen size following fintech standards:

| Use Case | Mobile | Tablet | Desktop | Notes |
|----------|--------|--------|---------|-------|
| **Page Padding (X)** | `px-4` (16px) | `md:px-6` (24px) | `lg:px-8` (32px) | Horizontal container |
| **Page Padding (Y)** | `py-8` (32px) | `md:py-10` (40px) | `lg:py-12` (48px) | Vertical container |
| **Large Cards** | `p-5` (20px) | `md:p-6` (24px) | `lg:p-8` (32px) | Glass cards |
| **Small Cards** | `p-4` (16px) | `md:p-5` (20px) | `lg:p-6` (24px) | Stat cards |
| **Card Gaps** | `gap-4` (16px) | `md:gap-6` (24px) | `lg:gap-8` (32px) | Grid/flex spacing |
| **Section Breaks** | `mb-6` (24px) | `md:mb-8` (32px) | `lg:mb-12` (48px) | Major sections |
| **Element Spacing** | `mb-4` (16px) | `md:mb-5` (20px) | `lg:mb-6` (24px) | Between elements |
| **Tight Spacing** | `mb-3` (12px) | `md:mb-4` (16px) | `lg:mb-5` (20px) | Related items |

**Implementation Pattern:**

```tsx
// Container
<div className="px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
  
  // Large card
  <div className="p-5 md:p-6 lg:p-8 glass">
    
    // Card grid
    <div className="grid gap-4 md:gap-6 lg:gap-8">
      
      // Small card
      <div className="p-4 md:p-5 lg:p-6">
        <h3 className="text-responsive-h3 mb-3 md:mb-4 lg:mb-5">Title</h3>
        <p className="text-responsive-base">Content</p>
      </div>
      
    </div>
  </div>
</div>
```

### Responsive Layout Patterns

#### Page Container
```tsx
<div className="min-h-screen px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
  {/* Content */}
</div>
```

#### Section with Title
```tsx
<div className="mb-8 md:mb-10 lg:mb-12">
  <h1 className="text-responsive-h1 mb-3 md:mb-4">Title</h1>
  <p className="text-responsive-xl text-gray-400">Description</p>
</div>
```

#### Card Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
  <div className="glass p-5 md:p-6 lg:p-8">
    {/* Card content */}
  </div>
</div>
```

#### Stats Display
```tsx
<div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 lg:gap-8">
  <div className="text-center md:text-left">
    <div className="text-responsive-h2 font-mono">123.45</div>
    <div className="text-responsive-base text-gray-400">Label</div>
  </div>
</div>
```

### Mobile-Specific Optimizations

#### Typography
- **Reduce font sizes** by ~35% compared to desktop
- **Maintain hierarchy** through size relationships
- **Use medium weight** (500) instead of bold (700)
- **Optimize line height** for readability (1.5-1.625)

#### Spacing
- **Tighter padding** on cards (p-4 vs p-8)
- **Reduced gaps** between elements (gap-4 vs gap-8)
- **Compact margins** for sections (mb-6 vs mb-12)
- **Minimal horizontal padding** (px-4) to maximize content width

#### Layout
- **Stack vertically** instead of horizontal layouts
- **Center align** feature cards and stats
- **Full width** buttons and inputs
- **Collapse navigation** into hamburger menu

#### Touch Targets
- **Minimum 44x44px** for all interactive elements
- **Increased padding** on buttons (py-4 minimum)
- **Adequate spacing** between touch targets (gap-3 minimum)

### Tablet-Specific Considerations

Tablet sits between mobile and desktop, requiring careful balance:

#### Typography
- **Intermediate sizes** (~80% of desktop)
- **Balanced line height** (1.5-1.75)
- **Slightly reduced** but not cramped

#### Layout
- **2-column grids** for cards
- **Hybrid alignment** (center for features, left for lists)
- **Expanded navigation** (partial or full)
- **Wider containers** but not full desktop width

#### Spacing
- **Mid-range padding** (p-6 typical)
- **Comfortable gaps** (gap-6 typical)
- **Adequate margins** (mb-8 typical)

### Responsive Component Checklist

When creating or modifying components:

- [ ] **Typography scales** across all breakpoints
- [ ] **Spacing adapts** (padding, gaps, margins)
- [ ] **Layout responds** (stack on mobile, grid on desktop)
- [ ] **Touch targets** meet 44x44px minimum
- [ ] **Text doesn't overflow** at any breakpoint
- [ ] **Images scale** proportionally
- [ ] **Focus states** work on all devices
- [ ] **Tested** on mobile (375px), tablet (768px), desktop (1440px)

---

## 🎨 Color System

### Primary Colors
- **Primary Blue:** `#0066FF` (RGB: 0, 102, 255)
  - Usage: Primary CTAs, interactive elements, highlights, active states
  - Tailwind: `digiko-primary`
  
- **Secondary Blue:** `#0052CC` (RGB: 0, 82, 204)
  - Usage: Hover states on primary blue, darker variants
  - Tailwind: `digiko-secondary`

### Accent Colors
- **Accent Cyan:** `#00D4FF` (RGB: 0, 212, 255)
  - Usage: Secondary highlights, gradients, special states
  - Tailwind: `digiko-accent`
  
- **Accent Purple:** `#7C3AED` (RGB: 124, 58, 237)
  - Usage: Tertiary accents, rare highlights (minimal use)
  - Tailwind: `digiko-accent-secondary`

### Background Colors
- **Ultra Dark:** `#0A0A0C` (RGB: 10, 10, 12)
  - Usage: Main body background
  - Tailwind: `digiko-dark-300`
  
- **Glass Dark:** `rgba(18, 18, 20, 0.5)` with `blur(24px)`
  - Usage: Glass morphism cards and containers
  - Tailwind: `.glass` utility class

### Grayscale System
```
Gray 50:  #2C2C2E (Lightest - borders, dividers)
Gray 100: #242426
Gray 200: #1C1C1E (Elevated surfaces)
Gray 300: #161618
Gray 400: #0E0E10 (Darkest gray)
```

### Blue Scale (for gradients and variants)
```
Blue 50:  #E6F0FF (Lightest)
Blue 100: #B3D4FF
Blue 200: #80B8FF
Blue 300: #4D9CFF
Blue 400: #1A80FF
Blue 500: #0066FF (Primary)
Blue 600: #0052CC
Blue 700: #003D99
Blue 800: #002966
Blue 900: #001433 (Darkest)
```

### Text Colors
- **Primary Text:** `#FFFFFF` (Pure white)
- **Secondary Text:** `#9CA3AF` (Gray 400)
- **Tertiary Text:** `#6B7280` (Gray 500)
- **Disabled Text:** `#4B5563` (Gray 600)

### State Colors
- **Success:** `#10B981` (Green 500)
- **Warning:** `#F59E0B` (Amber 500)
- **Error:** `#EF4444` (Red 500)
- **Info:** `#3B82F6` (Blue 500)

### Opacity Scales
```
Border Opacity: rgba(255, 255, 255, 0.08) - Default
               rgba(255, 255, 255, 0.05) - Subtle
               rgba(0, 102, 255, 0.4)    - Primary hover

Background Opacity: rgba(0, 102, 255, 0.1)  - Light fill
                   rgba(0, 102, 255, 0.2)  - Medium fill
                   rgba(0, 102, 255, 0.05) - Ultra subtle
```

---

## 📐 Typography

### Font Families
- **Primary Sans:** Geist Sans
  - Variable: `var(--font-geist-sans)`
  - Usage: Headlines, UI elements, buttons, body text
  
- **Primary Mono:** Geist Mono
  - Variable: `var(--font-geist-mono)`
  - Usage: Numbers, counters, addresses, code-like text, statistics

### Font Features
```css
font-feature-settings: 'cv11', 'ss01';
font-variant-ligatures: contextual;
font-variant-numeric: tabular-nums; /* For numbers */
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-rendering: optimizeLegibility;
```

### Type Scale

#### Display (Hero Headlines)
- **Size:** `text-6xl md:text-8xl` (60px → 96px)
- **Weight:** `font-semibold` (600)
- **Line Height:** `leading-none` (1)
- **Letter Spacing:** `tracking-tight` (-0.025em)
- **Usage:** Hero sections only

#### Heading 1
- **Size:** `text-5xl` (48px)
- **Weight:** `font-medium` (500)
- **Line Height:** `leading-tight` (1.25)
- **Usage:** Page titles

#### Heading 2
- **Size:** `text-4xl md:text-5xl` (36px → 48px)
- **Weight:** `font-medium` (500)
- **Line Height:** `leading-tight` (1.25)
- **Usage:** Major section headers

#### Heading 3
- **Size:** `text-2xl` (24px)
- **Weight:** `font-medium` (500)
- **Line Height:** `leading-snug` (1.375)
- **Usage:** Card titles, subsection headers

#### Heading 4
- **Size:** `text-xl` (20px)
- **Weight:** `font-medium` (500)
- **Line Height:** `leading-snug` (1.375)
- **Usage:** Small section headers

#### Body Large
- **Size:** `text-xl md:text-2xl` (20px → 24px)
- **Weight:** `font-light` (300)
- **Line Height:** `leading-relaxed` (1.625)
- **Usage:** Hero descriptions, intros

#### Body Regular
- **Size:** `text-base` (16px)
- **Weight:** `font-normal` (400)
- **Line Height:** `leading-normal` (1.5)
- **Usage:** Standard body text

#### Body Small
- **Size:** `text-sm` (14px)
- **Weight:** `font-normal` (400)
- **Line Height:** `leading-relaxed` (1.625)
- **Usage:** Card descriptions, secondary info

#### Caption
- **Size:** `text-xs` (12px)
- **Weight:** `font-normal` (400)
- **Line Height:** `leading-normal` (1.5)
- **Usage:** Labels, metadata, timestamps

### Font Weight Guidelines
- **NEVER use:** `font-bold` (700) - too heavy for this design
- **Primary weights:**
  - `font-light` (300) - Hero descriptions
  - `font-normal` (400) - Body text
  - `font-medium` (500) - Headings, buttons, emphasis
  - `font-semibold` (600) - Hero headlines only

### Numbers & Stats
Always use:
```tsx
className="font-mono stat-number"
// or in Tailwind
className="font-mono tabular-nums"
```

---

## 📄 Page Title Pattern

All internal pages (Dashboard, Staking, DGKO, etc.) must follow this consistent structure:

### Standard Page Title
```tsx
<div className="mb-12">
  <h1 className="text-5xl font-medium text-white mb-3">Page Name</h1>
  <p className="text-xl text-gray-400">Brief description of the page</p>
</div>
```

**Specifications:**
- **Container:** `mb-12` (48px bottom margin for proper spacing before content)
- **Title:** `text-5xl font-medium text-white mb-3` (48px size, 12px bottom margin)
- **Description:** `text-xl text-gray-400` (20px size, gray color)
- **Layout:** Left-aligned (not centered)
- **No decorations:** No icons, badges, or extra elements in the title itself

**Examples:**
```tsx
// Dashboard
<div className="mb-12">
  <h1 className="text-5xl font-medium text-white mb-3">Dashboard</h1>
  <p className="text-xl text-gray-400">Manage your Klever assets with Digiko</p>
</div>

// Staking
<div className="mb-12">
  <h1 className="text-5xl font-medium text-white mb-3">Staking</h1>
  <p className="text-xl text-gray-400">Stake your tokens and earn rewards on Klever Blockchain via Digiko</p>
</div>

// DGKO
<div className="mb-12">
  <h1 className="text-5xl font-medium text-white mb-3">DGKO Token</h1>
  <p className="text-xl text-gray-400">The native utility token of the Digiko ecosystem, built on Klever Blockchain</p>
</div>
```

**Anti-patterns (DO NOT USE):**
- ❌ Centered titles on internal pages
- ❌ Icons inline with page title (e.g., `<IconBox icon="💎" /> <h1>Title</h1>`)
- ❌ Smaller heading sizes (`text-4xl` or below)
- ❌ Smaller description text (`text-base` or below)
- ❌ Less spacing (`mb-8` instead of `mb-12`)
- ❌ Different spacing between title and description (`mb-2` instead of `mb-3`)

**Exception:**
The homepage (landing page) can use a different hero treatment with centered text, larger sizes, and decorative elements as it serves a marketing purpose.

---

## 🔘 Buttons

### Primary Button (CTA)
```tsx
<button className="group relative px-10 py-5 bg-digiko-primary text-white font-medium rounded-2xl transition-all duration-500 shadow-[0_0_40px_rgba(0,102,255,0.3)] hover:shadow-[0_0_60px_rgba(0,102,255,0.5)] hover:scale-105 overflow-hidden">
  <span className="relative z-10 flex items-center gap-2">
    Button Text
    {/* Optional icon */}
  </span>
  <div className="absolute inset-0 bg-gradient-to-r from-digiko-accent/0 via-digiko-accent/30 to-digiko-accent/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
</button>
```
**Usage:** Primary CTAs, main actions, hero buttons

**States:**
- Default: Blue bg with glow
- Hover: Increased glow + scale + sweep animation
- Active: Same as hover
- Disabled: `opacity-50 cursor-not-allowed`

### Secondary Button (Glass)
```tsx
<button className="px-10 py-5 glass-hover rounded-2xl font-medium text-white transition-all duration-500 hover:scale-105">
  Button Text
</button>
```
**Usage:** Secondary actions, alternative CTAs

**States:**
- Default: Glass background
- Hover: Lighter glass + blue border + glow + scale (via `.glass-hover`)

### Ghost Button (Wallet/Nav)
```tsx
<button className="group relative px-6 py-2.5 bg-digiko-primary/10 hover:bg-digiko-primary/20 text-white rounded-xl transition-all duration-300 border border-digiko-primary/30 hover:border-digiko-primary/50 overflow-hidden">
  <span className="relative z-10 flex items-center gap-2 font-medium">
    Button Text
  </span>
  <div className="absolute inset-0 bg-gradient-to-r from-digiko-primary/0 via-digiko-primary/20 to-digiko-primary/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
</button>
```
**Usage:** Wallet connect, toolbar actions, navigation

**States:**
- Default: Light blue background + blue border
- Hover: Darker blue background + stronger border + sweep

### Tertiary Button (Glass Hover)
```tsx
<button className="px-4 py-2.5 glass-hover rounded-xl transition-all duration-300 text-gray-400 hover:text-white">
  Icon or Text
</button>
```
**Usage:** Icon buttons, disconnect, minimal actions

**States:**
- Default: Glass with gray text
- Hover: Enhanced glass + white text

### White Button (Inverse)
```tsx
<button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-digiko-dark-300 font-medium rounded-2xl hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl">
  Button Text
</button>
```
**Usage:** Special CTAs on dark glass backgrounds

**States:**
- Default: White background + dark text + shadow
- Hover: Scale + increased shadow

### Button Sizing
- **Large (Hero):** `px-10 py-5 text-base` (40px → 56px)
- **Medium (Default):** `px-6 py-2.5 text-sm` (24px → 44px)
- **Small (Icons):** `px-4 py-2.5 text-sm` (20px → 44px)

### Button Radius
- **Large buttons:** `rounded-2xl` (16px)
- **Medium buttons:** `rounded-xl` (12px)
- **Small buttons:** `rounded-lg` (8px)

---

## 📦 Components

### Glass Card
```tsx
<div className="glass rounded-3xl p-8">
  {/* Content */}
</div>
```
**Properties:**
- Background: `rgba(18, 18, 20, 0.5)`
- Backdrop filter: `blur(24px) saturate(180%)`
- Border: `1px solid rgba(255, 255, 255, 0.08)`
- Border radius: `rounded-3xl` (24px)
- Padding: `p-8` (32px)

### Glass Card with Hover
```tsx
<div className="glass-hover rounded-3xl p-8 cursor-pointer">
  {/* Content */}
</div>
```
**Hover states:**
- Background: `rgba(28, 28, 30, 0.6)`
- Border: `rgba(0, 102, 255, 0.4)`
- Shadow: `0 8px 40px rgba(0, 102, 255, 0.15)`
- Transform: `translateY(-2px)`

### IconBox Component
```tsx
<IconBox 
  icon={<svg>...</svg>} 
  size="md" 
  variant="blue" 
/>
```
**Variants:**
- `blue`: Blue gradient (primary)
- `purple`: Purple gradient (secondary accent)
- `cyan`: Cyan gradient (secondary accent)

**Sizes:**
- `sm`: `w-10 h-10` (40px)
- `md`: `w-14 h-14` (56px)
- `lg`: `w-16 h-16` (64px)

**Structure:**
```tsx
<div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-digiko-primary/20 to-digiko-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 text-digiko-primary">
  {icon}
</div>
```

### Status Badge
```tsx
<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
  <div className="w-2 h-2 rounded-full bg-digiko-primary" />
  <span className="text-sm text-gray-400 font-medium">Status Text</span>
</div>
```

### Feature Card (Homepage)
```tsx
<div className="group glass-hover rounded-3xl p-8 cursor-pointer">
  <IconBox icon={icon} size="md" variant="blue" />
  <h3 className="text-xl font-medium mb-3 text-white mt-6">{title}</h3>
  <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
</div>
```

### Info Row (Key-Value Pairs)
```tsx
<div className="flex justify-between items-center py-3 border-b border-white/5">
  <span className="text-gray-400">Label</span>
  <span className="text-white font-medium">Value</span>
</div>
```

---

## 🎭 Effects & Animations

### Glass Morphism (Utility Class)
```css
.glass {
  background: rgba(18, 18, 20, 0.5);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

### Glass Hover (Utility Class)
```css
.glass-hover {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-hover:hover {
  background: rgba(28, 28, 30, 0.6);
  border-color: rgba(0, 102, 255, 0.4);
  box-shadow: 0 8px 40px rgba(0, 102, 255, 0.15);
  transform: translateY(-2px);
}
```

### Glow Effect (Utility Class)
```css
.glow {
  position: relative;
}

.glow::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: linear-gradient(45deg, #0066FF, #00D4FF);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
  filter: blur(12px);
}

.glow:hover::before {
  opacity: 0.6;
}
```

### Gradient Text
```tsx
<span className="bg-gradient-to-r from-digiko-primary via-digiko-accent to-digiko-primary bg-clip-text text-transparent animate-gradient-x">
  Gradient Text
</span>
```

### Fade In Animation
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
```

### Gradient X Animation (For text only)
```css
@keyframes gradientX {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-gradient-x {
  background-size: 200% auto;
  animation: gradientX 3s ease infinite;
}
```

### Transition Standards
- **Fast:** `duration-300` (300ms) - Hovers, color changes
- **Medium:** `duration-500` (500ms) - Scales, transforms
- **Slow:** `duration-700` (700ms) - Sweeps, complex animations
- **Ultra Slow:** `duration-1000` (1000ms) - Hero animations

### Easing Functions
- **Standard:** `cubic-bezier(0.4, 0, 0.2, 1)` (Tailwind default)
- **Ease In Out:** `ease-in-out`
- **Ease Out:** `ease-out`

---

## 📏 Spacing & Layout

### Page Container Pattern (CRITICAL)
**All internal pages MUST use this exact container structure:**

```tsx
<div className="min-h-screen py-16">
  <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
    {/* Page content */}
  </div>
</div>
```

**Specifications:**
- **Outer Wrapper:** `min-h-screen py-16` - Ensures full viewport height with 64px top/bottom padding
- **Max Width:** `max-w-[1400px]` (1400px) - NEVER use `max-w-6xl` (1152px)
- **Centering:** `mx-auto`
- **Horizontal Padding:** `px-6 lg:px-8` (24px → 32px responsive)
- **Vertical Padding:** `py-16` on outer wrapper (64px top/bottom)

**Why This Structure:**
- `min-h-screen` ensures pages fill viewport even with minimal content
- `py-16` provides optimal breathing room from top/bottom
- 64px top padding gives content proper presence
- Consistent across DGKO, BABYDGKO, Swap, and all modern pages

**Anti-patterns (DO NOT USE):**
- ❌ `container mx-auto` (uses Tailwind's default breakpoints)
- ❌ `max-w-6xl` (1152px - too narrow!)
- ❌ `px-4` (16px padding - too narrow for desktop)
- ❌ `py-12` instead of `py-16` (48px instead of 64px - too cramped)
- ❌ Putting `py-*` on inner container instead of outer wrapper

### Vertical Spacing Hierarchy (CRITICAL)

**Complete top-to-bottom spacing system:**

```tsx
{/* Level 1: Page Wrapper */}
<div className="min-h-screen py-16">  {/* 64px top/bottom padding */}
  
  <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
    
    {/* Level 2: Page Title Section */}
    <div className="mb-12">  {/* 48px bottom margin */}
      <h1 className="text-5xl font-medium text-white mb-3">Page Title</h1>  {/* 12px to description */}
      <p className="text-xl text-gray-400">Page description</p>
    </div>
    
    {/* Level 3: Major Content Section */}
    <div className="mb-12">  {/* 48px between major sections */}
      <div className="glass rounded-3xl p-8">
        {/* Card content */}
      </div>
    </div>
    
    {/* Level 4: Another Major Section */}
    <div className="mb-12">  {/* 48px between sections */}
      <div className="grid gap-6">  {/* 24px between grid items */}
        <div className="glass rounded-3xl p-6">Card 1</div>
        <div className="glass rounded-3xl p-6">Card 2</div>
      </div>
    </div>
    
  </div>
</div>
```

**Visual Hierarchy from Top:**
```
┌────────────────────────────────┐
│  ↓ 64px (py-16) - TOP          │
│  ┌──────────────────────┐      │
│  │  Page Title          │      │
│  │  Description         │      │
│  └──────────────────────┘      │
│  ↓ 48px (mb-12)                │
│  ┌──────────────────────┐      │
│  │  First Section       │      │
│  └──────────────────────┘      │
│  ↓ 48px (mb-12)                │
│  ┌──────────────────────┐      │
│  │  Second Section      │      │
│  └──────────────────────┘      │
│  ↓ 64px (py-16) - BOTTOM       │
└────────────────────────────────┘
```

**Spacing Scale Reference:**
- **py-16** (64px) - Page top/bottom padding (outer wrapper)
- **mb-12** (48px) - Major section separators (title → content, section → section)
- **mb-8** (32px) - Subsection separators within cards
- **gap-6** or **mb-6** (24px) - Between related cards/items
- **mb-4** (16px) - Between tightly related items
- **mb-3** (12px) - Title to description (within page header)
- **mb-2** (8px) - Label to input field

**When to Use Each:**
- Use **py-16** for: Page wrapper only
- Use **mb-12** for: Page title section, major section separators
- Use **mb-8** for: Subsections within a major section
- Use **gap-6** for: Grid/flex layouts with cards
- Use **mb-3** for: Heading to its immediate description

**Consistency Rule:**
ALL pages must follow this hierarchy. No exceptions for "special" pages.

### Container Widths
- **Page Container:** `max-w-[1400px]` (documented above)
- **Content Sections:** Full width within page container
- **Text Blocks:** `max-w-3xl` or `max-w-4xl` for readability when needed

### Section Spacing
- **Between Sections:** `mb-32` (128px)
- **Between Cards:** `gap-6` or `gap-8` (24px or 32px)
- **Internal Padding:** `p-8` or `p-12 md:p-20` (32px or 48px → 80px)

### Grid Systems
```tsx
// 2-column responsive
<div className="grid lg:grid-cols-2 gap-8">

// 3-column responsive
<div className="grid grid-cols-3 gap-8">

// 4-column responsive
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
```

### Border Radius Scale
- **Extra Large:** `rounded-[40px]` (40px) - Hero sections
- **3XL:** `rounded-3xl` (24px) - Main cards
- **2XL:** `rounded-2xl` (16px) - Buttons, containers
- **XL:** `rounded-xl` (12px) - Small buttons, badges
- **Large:** `rounded-lg` (8px) - Minor elements
- **Full:** `rounded-full` - Badges, dots

---

## 🎯 Icons

### Icon Sizing
- **Small:** `w-4 h-4` (16px) - In buttons
- **Medium:** `w-5 h-5` (20px) - Navigation
- **Large:** `w-6 h-6` (24px) - Feature cards, IconBox

### Icon Styling
```tsx
<svg 
  className="w-6 h-6" 
  fill="none" 
  viewBox="0 0 24 24" 
  stroke="currentColor"
  strokeWidth={1.5}
>
  {/* SVG paths */}
</svg>
```

### Icon Guidelines
- Always use `fill="none"` for line icons
- Standard stroke width: `strokeWidth={1.5}` or `strokeWidth={2}`
- Use `stroke="currentColor"` to inherit text color
- Use `strokeLinecap="round"` and `strokeLinejoin="round"` for rounded corners

---

## 🚫 Anti-Patterns (Never Do This)

### Typography
- ❌ **NO** `font-bold` (700 weight) - too heavy
- ❌ **NO** flashing text animations
- ❌ **NO** color cycling text
- ❌ **NO** animated letter-spacing
- ❌ **NO** pulsing text opacity

### Colors
- ❌ **NO** purple on blue buttons
- ❌ **NO** green accents (except success states)
- ❌ **NO** orange/amber (except warning states)
- ❌ **NO** mixing purple with cyan randomly

### Animations
- ❌ **NO** pulsing animations on static elements
- ❌ **NO** infinite pulse effects
- ❌ **NO** rotation animations (except loading spinners)
- ❌ **NO** shake/wobble effects

### Layout
- ❌ **NO** inconsistent border radius
- ❌ **NO** mixing px and rem units randomly
- ❌ **NO** inconsistent spacing between similar components

---

## ✅ Best Practices

### Consistency Rules
1. If a button exists on homepage, reuse it everywhere
2. IconBox variants: blue (primary), cyan (secondary), purple (rare)
3. All numbers use `font-mono` with `tabular-nums`
4. Glass cards always use `rounded-3xl` and `p-8`
5. Primary CTAs always have glow shadow and sweep animation

### Color Logic
- Primary blue → Hover: Same blue with increased opacity/glow
- Glass → Hover: Lighter glass + blue border + glow
- White text → Hover: Keep white, adjust background
- Gray text → Hover: White text

### Interaction Patterns
- **Scale on hover:** `hover:scale-105` (5% larger)
- **Lift on hover:** `hover:translateY(-2px)`
- **Glow on hover:** Increase shadow opacity and blur
- **Border on hover:** Increase opacity and add blue tint

### Responsive Guidelines
- Text: `text-6xl md:text-8xl` (mobile → desktop)
- Padding: `px-6 lg:px-8` (mobile → desktop)
- Grid: `grid md:grid-cols-2 lg:grid-cols-4`
- Always test on mobile (375px), tablet (768px), desktop (1440px)

---

## 🔧 Custom CSS Utilities

### Selection Style
```css
::selection {
  background: rgba(0, 102, 255, 0.3);
  color: white;
}
```

### Focus Visible
```css
*:focus-visible {
  outline: 2px solid #0066FF;
  outline-offset: 2px;
}
```

### Scrollbar
```css
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #0A0A0C;
}

::-webkit-scrollbar-thumb {
  background: #1C1C1E;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #0066FF;
}
```

---

## 🔌 ConnectWalletPrompt Component

A unified, professional component for wallet connection prompts across all pages.

### Design Specifications

**Location:** `/src/components/ConnectWalletPrompt.tsx`

**Usage:** Import and use when wallet is not connected:
```tsx
import { ConnectWalletPrompt } from '@/components/ConnectWalletPrompt';

if (!isConnected) {
  return <ConnectWalletPrompt />;
}
```

### Visual Structure

```tsx
<div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
  <div className="max-w-2xl mx-auto">
    <div className="glass rounded-3xl p-8 md:p-12 border border-white/10">
      {/* Wallet Icon */}
      {/* Title & Subtitle */}
      {/* 3 Feature Icons */}
      {/* Info Box */}
      {/* Instructions */}
      {/* Download Link */}
    </div>
  </div>
</div>
```

### Icon System

**Main Icon (Wallet):**
- Container: `w-16 h-16 rounded-2xl bg-white/5 border border-white/10`
- Icon: `w-8 h-8 text-white` (wallet SVG)
- Centered above title

**Feature Icons (3-column grid):**
- Icons: `w-5 h-5 text-gray-400` (SVG icons, not emojis)
- Labels: `text-xs text-gray-400`
- Cards: `rounded-xl bg-white/5 border border-white/10 p-3`
- Features:
  - **Secure:** Shield with checkmark icon
  - **Fast:** Lightning bolt icon
  - **Non-custodial:** Key icon

**Info Icon:**
- Size: `w-5 h-5 text-digiko-primary`
- Info circle SVG
- Appears in blue info box

### Color Usage

- **Main icon container:** Neutral white/5 background (NOT blue)
- **Main icon:** Pure white `text-white`
- **Feature icons:** Gray `text-gray-400`
- **Info icon:** Blue `text-digiko-primary`
- **Text:** White for title, gray-400 for descriptions

**Rationale:** Avoid blue overload since navigation already has blue wallet button. Neutral gray/white creates better visual balance.

### Typography

- **Title:** `text-3xl font-medium text-white text-center`
- **Subtitle:** `text-gray-400 text-center`
- **Feature labels:** `text-xs text-gray-400`
- **Info text:** `text-sm text-gray-300 leading-relaxed`
- **Instructions:** `text-sm text-gray-500`

### Spacing

- Container: `py-12` (48px vertical)
- Card padding: `p-8 md:p-12` (32px → 48px)
- Icon margin bottom: `mb-6` (24px)
- Feature grid gap: `gap-3` (12px)
- Section spacing: `mb-8` (32px between sections)

### Best Practices

✅ **DO:**
- Use SVG icons for all icons (no emojis)
- Keep main icon neutral (white/gray)
- Use consistent icon sizing
- Maintain glass morphism aesthetic
- Center all content
- Provide clear instructions

❌ **DON'T:**
- Use blue background for main icon (conflicts with nav)
- Use emojis instead of SVG icons
- Add glow effects or animations
- Make it full-screen modal
- Use different styling on different pages

### Integration

This component should be used on:
- Dashboard page (when not connected)
- Staking page (when not connected)
- Any future pages requiring wallet connection

**Consistency is key:** All pages must use the same component for wallet connection prompts.

---

## 📋 Component Checklist

When creating/updating any component, verify:

- [ ] Uses Geist Sans for UI text
- [ ] Uses Geist Mono for numbers/stats
- [ ] No `font-bold` weights used
- [ ] Button follows one of the 5 defined patterns
- [ ] Glass cards use `.glass` or `.glass-hover`
- [ ] IconBox used for all decorative icons (except ConnectWalletPrompt)
- [ ] SVG icons used instead of emojis for professional appearance
- [ ] Consistent spacing (8, 12, 24, 32px)
- [ ] Hover states defined for interactive elements
- [ ] No pulsing animations on static elements
- [ ] Colors match the defined palette
- [ ] Responsive classes for mobile/desktop
- [ ] Wallet connection uses ConnectWalletPrompt component

---

## 🎨 Quick Reference

### Most Common Classes
```
Containers: glass rounded-3xl p-8
Buttons: px-10 py-5 bg-digiko-primary text-white font-medium rounded-2xl
Headings: text-2xl font-medium text-white
Body: text-sm text-gray-400 leading-relaxed
Numbers: font-mono tabular-nums
Grid: grid md:grid-cols-2 lg:grid-cols-4 gap-6
```

### Color Quick Access
```
Primary: digiko-primary (#0066FF)
Accent: digiko-accent (#00D4FF)
Background: digiko-dark-300 (#0A0A0C)
Text: white, gray-400, gray-500
```

### Spacing Quick Access
```
Tiny: gap-2 (8px)
Small: gap-4 (16px)
Medium: gap-6 (24px)
Large: gap-8 (32px)
XL: gap-12 (48px)
```

---

**End of Design Guide v1.2**

---

## 💎 Staking Page Patterns (Added Nov 23, 2024)

### Three-Column Layout
The staking page uses a 3-column grid layout on desktop (`grid-cols-1 lg:grid-cols-3`) to organize:
1. **Stake Section** - Left column
2. **Rewards/Claim Section** - Center column  
3. **Unstake/Withdraw Section** - Right column

### Color Coding for Actions
Different action types use distinct color schemes:
- **Stake**: Primary blue (`digiko-primary`) - Main CTA color
- **Claim**: Green gradient (`from-green-500 to-emerald-500`) - Positive reward action
- **Unstake**: Secondary blue (`digiko-secondary`) - Secondary action
- **Withdraw**: Purple gradient (`from-purple-500 to-violet-500`) - Final action

### Rewards Display Card
```tsx
<div className="p-6 bg-gradient-to-br from-digiko-primary/10 to-digiko-accent/5 rounded-2xl border border-digiko-primary/20">
  <div className="text-gray-400 text-sm mb-2">Claimable Rewards</div>
  <div className="text-3xl font-mono font-medium text-white mb-1">
    {amount} {token}
  </div>
  <div className="text-xs text-gray-500 font-mono">
    Additional info
  </div>
</div>
```
- Subtle gradient background
- Three-tier text hierarchy
- Always use `font-mono` for numbers

### Unstaking Queue Items
```tsx
<div className={`p-4 rounded-xl border transition-all ${
  isReady 
    ? 'bg-green-500/10 border-green-500/30' 
    : 'bg-klever-dark border-white/10'
}`}>
  {/* Content */}
</div>
```
- Use green tint for ready-to-withdraw items
- Default dark background for pending items
- Smooth transitions between states

### Info Boxes
```tsx
<div className="p-4 bg-digiko-primary/5 rounded-xl border border-digiko-primary/10">
  <div className="flex items-start gap-3">
    <div className="mt-0.5">
      <svg className="w-5 h-5 text-digiko-primary" /* ... */>
    </div>
    <div className="text-sm text-gray-300 leading-relaxed">
      Info text here
    </div>
  </div>
</div>
```
- Ultra-subtle blue background
- Icon + text layout
- Used for helpful hints and explanations

### Button States & Disabled
- Disabled buttons use `opacity-50 cursor-not-allowed`
- Loading state shows "Processing..." text
- All buttons maintain hover effects when enabled
- Use descriptive button text based on state (e.g., "No Rewards Yet" instead of just "Claim")

### Best Practices
✅ **DO:**
- Use color coding to distinguish action types
- Show clear state indicators (ready vs pending)
- Use font-mono for all numerical displays
- Provide helpful info boxes for user guidance
- Give immediate feedback on button states

❌ **DON'T:**
- Mix gradient buttons with flat buttons in the same action group
- Use red/warning colors for primary actions
- Show empty states without helpful messaging
- Forget to disable buttons when action is unavailable

---

## 🏷️ Logo Badge (Added Nov 24, 2024)

The Digiko logo includes a "Beta" badge to indicate the current development stage.

### Badge Styling
```tsx
<span className="relative px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase bg-gradient-to-r from-digiko-primary/20 to-digiko-accent/20 text-digiko-accent border border-digiko-accent/30 rounded-md">
  Beta
  <span className="absolute inset-0 rounded-md bg-digiko-accent/10 blur-sm" />
</span>
```

**Specifications:**
- **Text:** `text-[10px]` uppercase, `tracking-wider`
- **Color:** `text-digiko-accent` (cyan #00D4FF)
- **Background:** Gradient from primary/20 to accent/20
- **Border:** `border-digiko-accent/30`
- **Glow:** Subtle blur effect behind badge
- **Padding:** `px-2 py-0.5`
- **Border Radius:** `rounded-md`

**Usage:** Appears next to "Digiko" text in header and footer.

---

## 🚫 Coming Soon Navigation Items (Added Nov 24, 2024)

Navigation items for unreleased features are displayed but disabled.

### Desktop Nav (Coming Soon)
```tsx
<span className="group relative px-4 py-2 text-sm text-gray-600 cursor-not-allowed flex items-center gap-1.5">
  Feature Name
  <span className="text-[9px] uppercase tracking-wider px-1 py-0.5 rounded bg-white/5 text-gray-500">Soon</span>
</span>
```

### Mobile Menu (Coming Soon)
```tsx
<div className="flex items-center justify-between px-4 py-3.5 text-sm font-medium rounded-xl text-gray-600 cursor-not-allowed">
  <div className="flex items-center gap-3">
    {/* Icon */}
    Feature Name
  </div>
  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 text-gray-500">
    Soon
  </span>
</div>
```

**Specifications:**
- **Text Color:** `text-gray-600` (darker than normal nav items)
- **Cursor:** `cursor-not-allowed`
- **Badge:** Tiny "Soon" label with `bg-white/5` background
- **Badge Text:** `text-[9px]` or `text-[10px]`, uppercase, `tracking-wider`
- **Not clickable:** Use `<span>` or `<div>` instead of `<Link>`

**Current Coming Soon Items:**
- Swap
- Games
- NFTs
- Contract

---

## 🎯 Tokens Dropdown Menu (Added Nov 25, 2025)

For desktop navigation, token pages (DGKO, BABYDGKO) are grouped under a professional "Tokens" dropdown menu instead of individual navigation links.

### Component Structure
```tsx
<TokensDropdown />
```

### Hover-based Interaction
- **Trigger:** Mouse hover (not click)
- **Opens on:** `onMouseEnter`
- **Closes on:** `onMouseLeave`
- **Smooth transitions:** 300ms duration

### Dropdown Button
```tsx
<button className="px-4 py-2 text-sm rounded-lg transition-all duration-300 text-gray-400 hover:text-white hover:bg-white/5">
  <div className="flex items-center gap-1.5">
    <span>Tokens</span>
    <svg className="w-4 h-4 transition-transform duration-300 rotate-180">
      {/* Chevron down icon */}
    </svg>
  </div>
</button>
```

### Active State
- **Active when:** Any token page is currently viewed (`/dgko` or `/babydgko`)
- **Active styling:** `text-white bg-white/5`
- **Arrow rotation:** Rotates 180° when menu is open

### Dropdown Panel
```tsx
<div className="absolute left-0 top-full mt-2 w-56 bg-[#141416] rounded-xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden animate-fade-in z-50">
```

**Specifications:**
- **Width:** `w-56` (224px)
- **Background:** Solid `bg-[#141416]` (not glass)
- **Border:** `border-white/10`
- **Shadow:** `shadow-2xl shadow-black/50`
- **Border radius:** `rounded-xl`
- **Position:** `left-0` (aligns with button's left edge)
- **Gap from button:** `mt-2` (8px)

### Token Menu Items
```tsx
<Link className="flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 group">
  <TokenImage assetId={token.assetId} size="sm" />
  <div className="flex-1">
    <div className="text-sm font-medium text-gray-300">DGKO</div>
    <div className="text-xs text-gray-500">Utility Token</div>
  </div>
  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-digiko-primary"></div>}
</Link>
```

**Item Specifications:**
- **Padding:** `px-3 py-3`
- **Token Logo:** `TokenImage size="sm"` (32px)
- **Logo hover effect:** `group-hover:scale-110` on non-active items
- **Token name:** `text-sm font-medium text-gray-300`
- **Description:** `text-xs text-gray-500` ("Utility Token" / "Meme Token")
- **Active indicator:** Small blue dot (`w-1.5 h-1.5 rounded-full bg-digiko-primary`)
- **Active state:** `bg-digiko-primary/15 text-white`
- **Hover state:** `hover:text-white hover:bg-white/5`

### Token List Order
1. **DGKO** - Utility Token
2. **BABYDGKO** - Meme Token

### Animation
- **Entrance:** `animate-fade-in` (fade in with slight scale)
- **Logo scale:** Smooth `scale-110` on hover
- **Arrow rotation:** Smooth 180° rotation when open

### Integration
```tsx
// In layout.tsx desktop navigation
<div className="hidden md:flex items-center gap-1">
  <Link href="/dashboard">Dashboard</Link>
  <TokensDropdown />  {/* Replaces individual DGKO and BABYDGKO links */}
  <Link href="/staking">Staking</Link>
  {/* Coming soon items */}
</div>
```

**Best Practices:**
✅ **DO:**
- Use hover interaction for desktop dropdown menus
- Show token logos for quick visual identification
- Include descriptive labels ("Utility Token", "Meme Token")
- Use solid backgrounds for dropdown panels
- Show active state indicator for current page
- Smooth transitions on all interactive elements

❌ **DON'T:**
- Use click-to-open for desktop dropdowns (use hover)
- Make dropdown too wide (stick to w-56)
- Use glass morphism on dropdown panels (readability)
- Forget to show which token page is currently active
- Have too many items (keep it clean with 2-3 tokens max)

**Design Rationale:**
- **Cleaner navigation:** Reduces top-level nav items from 5 to 4
- **Scalability:** Easy to add future tokens without cluttering nav
- **Visual hierarchy:** Groups related pages together
- **Professional UX:** Similar to modern fintech apps (Stripe, PayPal, Coinbase)
- **Hover interaction:** Faster for desktop users than click-open dropdowns

---

## 📱 Mobile Menu Patterns (Added Nov 24, 2024)

### Solid Background for Accessibility
The mobile menu uses a **solid background** instead of glass morphism for better readability and accessibility.

```tsx
<div className="mx-4 bg-[#141416] rounded-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
```

**Rationale:** Navigation is a critical component. Solid backgrounds ensure text is always readable regardless of page content beneath.

### Menu Structure
- **Backdrop:** `bg-black/60 backdrop-blur-sm` (click to close)
- **Panel:** Solid `bg-[#141416]` with rounded corners
- **Items:** Include icons for each nav item
- **Active State:** `bg-digiko-primary/15` with blue border
- **Bottom Info:** Shows "Digiko Beta" and network status

### WalletConnect Position
- **Mobile:** WalletConnect button is **outside** the menu, in the header bar
- **Compact styling:** Shorter text ("Connect" vs "Connect Wallet"), smaller padding

**Best Practices:**
✅ **DO:**
- Keep wallet button always visible (not hidden in menu)
- Use solid backgrounds for navigation menus
- Include icons for visual scanning
- Show active page state clearly

❌ **DON'T:**
- Hide critical actions (wallet) inside menus
- Use transparent/glass backgrounds for navigation
- Forget to close menu after navigation

---

## 📋 Updates/Changelog Page (Added Nov 24, 2025)

### Purpose
A timeline-style changelog page accessible from the footer, not main navigation. Shows version history with categorized entries.

### Timeline Structure
```tsx
<div className="relative">
  {/* Vertical timeline line */}
  <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-digiko-primary/50 via-white/10 to-transparent" />
  
  {/* Entry with dot */}
  <div className="relative pl-8">
    <div className="absolute left-0 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-digiko-dark-300 border-2 border-digiko-primary" />
    {/* Content card */}
  </div>
</div>
```

### Update Entry Card
```tsx
<div className="glass rounded-2xl p-6 border border-white/10">
  {/* Header: version + type badge + date */}
  <div className="flex flex-wrap items-center gap-3 mb-4">
    <span className="font-mono text-lg text-white">v{version}</span>
    <span className="px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase rounded {typeStyles}">
      {type}
    </span>
    <span className="text-sm text-gray-500">{date}</span>
  </div>
  
  {/* Title */}
  <h2 className="text-xl font-medium text-white mb-4">{title}</h2>
  
  {/* Changes list with checkmarks */}
  <ul className="space-y-2">
    <li className="flex items-start gap-3 text-sm text-gray-400">
      <svg className="w-4 h-4 text-digiko-primary mt-0.5 flex-shrink-0">...</svg>
      <span>{change}</span>
    </li>
  </ul>
</div>
```

### Type Badge Colors
- **Release:** `bg-digiko-primary/10 border-digiko-primary/30 text-digiko-primary`
- **Feature:** `bg-emerald-500/10 border-emerald-500/30 text-emerald-400`
- **Fix:** `bg-amber-500/10 border-amber-500/30 text-amber-400`
- **Improvement:** `bg-violet-500/10 border-violet-500/30 text-violet-400`

### Footer Version Display
```tsx
<p className="text-xs text-gray-600 font-mono mt-1">v0.9.0</p>
```
- Uses `font-mono` for version number
- Positioned under "Built on Klever Blockchain"
- `text-xs` size, `text-gray-600` color

### Best Practices
✅ **DO:**
- Use timeline dots connected by gradient line
- Include type badges for categorization
- Use checkmark icons for change items
- Keep version in `font-mono`
- Link from footer only (not main nav)

❌ **DON'T:**
- Add to main navigation (low priority page)
- Use different card styles than glass
- Forget to update version in footer when releasing

---

## 📚 Documentation Page (Added Nov 24, 2025)

### Purpose
A comprehensive documentation page accessible from the footer and desktop more menu. Provides user guidance on all app features.

### Page Structure
```tsx
<div className="min-h-screen py-16 px-6 lg:px-8">
  <div className="max-w-4xl mx-auto">
    {/* Standard page title */}
    <div className="mb-12">
      <h1 className="text-5xl font-medium text-white mb-3">Documentation</h1>
      <p className="text-xl text-gray-400">Description</p>
    </div>
    
    {/* Quick navigation */}
    <div className="mb-12 p-6 glass rounded-2xl border border-white/10">
      {/* Navigation links */}
    </div>
    
    {/* Sections */}
    <div className="space-y-16">
      {sections.map(section => (
        <section id={section.id} className="scroll-mt-24">
          <h2 className="text-2xl font-medium text-white mb-6 pb-3 border-b border-white/10">
            {section.title}
          </h2>
          {section.content}
        </section>
      ))}
    </div>
  </div>
</div>
```

### Section Headers
- **Size:** `text-2xl font-medium text-white`
- **Spacing:** `mb-6 pb-3` with bottom border
- **Border:** `border-b border-white/10`
- **Scroll offset:** `scroll-mt-24` for fixed nav

### Quick Navigation Links
```tsx
<a className="px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300">
  {section.title}
</a>
```

### Info Cards (Technical Details)
```tsx
<div className="p-4 bg-white/5 rounded-xl border border-white/10">
  {/* Content */}
</div>
```

### Warning/Troubleshooting Cards
```tsx
<div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
  <h4 className="text-amber-400 font-medium mb-3">Issue Title</h4>
  {/* List of solutions */}
</div>
```

### Code Display
```tsx
<code className="text-digiko-accent text-sm font-mono">api.endpoint.here</code>
```

---

## 🍔 Desktop More Menu (Added Nov 24, 2025)

### Purpose
A burger/hamburger menu in the desktop navigation for secondary pages (Documentation, Updates) to save horizontal space.

### Menu Button
```tsx
<button className={`p-2 rounded-lg transition-all duration-300 ${
  isOpen 
    ? 'bg-white/10 text-white' 
    : 'text-gray-400 hover:text-white hover:bg-white/5'
}`}>
  <svg className="w-5 h-5">
    {/* Hamburger icon */}
  </svg>
</button>
```

### Dropdown Panel
```tsx
<div className="absolute right-0 top-full mt-2 w-48 bg-[#141416] rounded-xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden animate-fade-in z-50">
  <div className="p-1.5">
    {/* Menu items */}
  </div>
  
  {/* Footer info */}
  <div className="px-4 py-2.5 border-t border-white/5 bg-white/[0.02]">
    <div className="flex items-center justify-between text-xs text-gray-500">
      <span className="font-mono">v0.11.0</span>
      <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
        Mainnet
      </span>
    </div>
  </div>
</div>
```

### Menu Item
```tsx
<Link className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-300 ${
  isActive
    ? 'bg-digiko-primary/15 text-white'
    : 'text-gray-400 hover:text-white hover:bg-white/5'
}`}>
  <span>{icon}</span>
  {label}
</Link>
```

### Specifications
- **Background:** Solid `bg-[#141416]` (matches mobile menu)
- **Border:** `border border-white/10`
- **Shadow:** `shadow-2xl shadow-black/50`
- **Border Radius:** `rounded-xl`
- **Width:** `w-48` (192px)
- **Position:** Right-aligned dropdown
- **Animation:** `animate-fade-in`

### Behavior
- Click outside to close
- Escape key to close
- Navigation closes menu

### Best Practices
✅ **DO:**
- Use solid background (not glass) for dropdown menus
- Include version and network status in footer
- Use icons for visual scanning
- Show active state for current page

❌ **DON'T:**
- Add too many items (keep it focused)
- Use glass morphism for dropdowns (readability issues)
- Forget to handle click outside and escape key

---

## 🪙 Token Page Patterns (Updated Nov 25, 2025)

### Standard Page Structure
Token pages follow this consistent structure:

```tsx
<div className="min-h-screen py-16"> {/* Consistent py-16 padding */}
  <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
    {/* Page Header with Token Logo */}
    {/* Optional: Origin Story / Hero Section */}
    {/* Stats Overview Grid */}
    {/* Staking Section (if applicable) */}
    {/* Token Activity (Burned/Minted) */}
    {/* Tokenomics */}
    {/* On-Chain Data */}
    {/* Ecosystem Features */}
    {/* Roadmap */}
    {/* Token Details + Where to Trade */}
    {/* Community/Social Links */}
    {/* CTA Section */}
  </div>
</div>
```

**Standard Spacing:**
- Page container: `py-16` (not py-12)
- Section bottom margin: `mb-12`
- Section title bottom margin: `mb-6`

### Page Header with Token Logo
Token pages are allowed to include the token logo inline with the page title for brand recognition:

```tsx
<div className="mb-12">
  <div className="flex items-center gap-4 mb-3">
    <TokenImage assetId={TOKEN_IDS.DGKO} size="xl" />
    <h1 className="text-5xl font-medium text-white">DGKO Token</h1>
  </div>
  <p className="text-xl text-gray-400">Description here</p>
</div>
```

**Note:** This is an exception to the "no icons inline with page title" rule, specific to token pages only.

### Origin Story Card (Optional)
For meme tokens or tokens with special backstory, use a featured card:

```tsx
<div className="glass rounded-3xl p-8 border border-white/10 mb-12">
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 rounded-xl bg-digiko-accent/10 flex items-center justify-center text-digiko-accent flex-shrink-0">
      {/* Icon - sparkles, gift, etc */}
    </div>
    <div>
      <h2 className="text-2xl font-medium text-white mb-3">Story Title</h2>
      <p className="text-gray-400 leading-relaxed">
        Origin story and context about the token...
      </p>
    </div>
  </div>
</div>
```

**Use cases:**
- Meme tokens explaining their origin
- Community tokens explaining distribution
- Gift tokens explaining how they were distributed

### Stats Overview Grid
Simple grid of key metrics at the top of the page:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
  <div className="glass rounded-2xl p-6 border border-white/10">
    <div className="text-sm text-gray-400 mb-2">Label</div>
    <div className="text-2xl font-mono text-white">Value</div>
    {/* Optional: subtitle or link */}
  </div>
</div>
```

**Common metrics:**
- Total Supply
- Circulating Supply
- Stakers (with KleverScan link)
- Total Staked

**KleverScan Link Pattern:**
```tsx
<a 
  href="https://kleverscan.org/asset/TOKEN-ID" 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-xs text-digiko-primary hover:text-digiko-accent transition-colors"
>
  View all holders →
</a>
```

### Staking Section with Header
Featured section for staking statistics with prominent header and CTA:

```tsx
<div className="glass rounded-3xl border border-white/10 p-6 mb-12">
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-medium text-white">Staking Overview</h2>
    <Link 
      href="/staking"
      className="text-sm text-digiko-primary hover:text-digiko-accent transition-colors"
    >
      Start Staking →
    </Link>
  </div>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {/* Inner stat cards */}
  </div>
</div>
```

**Staking Metrics (in order):**
1. Total Staked (token symbol as subtitle)
2. Staked Supply (percentage with "of circulating")
3. APR (**Important:** use `text-green-400` for the value)
4. Stakers (number of unique wallets)

### Inner Stat Cards
For displaying multiple stats inside a glass container:

```tsx
<div className="bg-white/5 rounded-2xl p-4">
  <div className="text-sm text-gray-400 mb-1">Label</div>
  <div className="text-2xl font-mono text-white">Value</div>
  <div className="text-xs text-gray-500 mt-1">Subtitle</div>
</div>
```

**Specifications:**
- Background: `bg-white/5`
- Border radius: `rounded-2xl`
- Padding: `p-4`
- Label: `text-sm text-gray-400 mb-1`
- Value: `text-2xl font-mono text-white`
- Subtitle: `text-xs text-gray-500 mt-1`

**Special Cases:**
- APR values: Use `text-green-400` instead of `text-white`
- Large numbers: Use `.toLocaleString()` for comma formatting
- Loading state: Show `'—'` as placeholder

### Tokenomics Section
Two layout options depending on content complexity:

**Option 1: Simple Layout (BABYDGKO style)**
```tsx
<div className="mb-12">
  <h2 className="text-2xl font-medium text-white mb-6">Tokenomics</h2>
  <div className="glass rounded-3xl border border-white/10 p-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="flex justify-center">
        <DonutChart />
      </div>
      <div className="space-y-4">
        {/* Distribution list */}
      </div>
    </div>
  </div>
</div>
```

**Option 2: Complex Layout with Details (DGKO style)**
```tsx
<div className="glass rounded-3xl border border-white/10 overflow-hidden mb-12">
  <div className="p-6 border-b border-white/10">
    <h2 className="text-2xl font-medium text-white">Tokenomics</h2>
  </div>
  
  <div className="grid grid-cols-1 lg:grid-cols-2">
    <div className="p-8 md:p-12 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10">
      <DonutChart />
    </div>
    
    <div className="p-6 md:p-8">
      <div className="space-y-3">
        {/* Distribution list with hover effect */}
      </div>
      
      {/* Optional: Additional details */}
      <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-gray-500 mb-1">Decimals</div>
          <div className="font-mono text-white">4</div>
        </div>
      </div>
    </div>
  </div>
</div>
```

Use Option 1 for simpler tokens, Option 2 when including additional technical details.

### Donut Chart Component
For tokenomics visualization:

**Specifications:**
- Size: 280px
- Stroke width: 16px
- Gap between segments: 2%
- Stroke linecap: `round`
- Background ring: `rgba(255,255,255,0.03)`
- Animation: Fade in with staggered delay (100ms per segment)

**Color Palette (tech-modern blue theme):**
```
#0066FF - Primary Blue (brand)
#00D4FF - Cyan
#6366F1 - Indigo
#A855F7 - Purple
#3B82F6 - Sky Blue
```

**Center Content:**
```tsx
<div className="absolute inset-0 flex flex-col items-center justify-center">
  <div className="text-4xl font-mono font-medium text-white">10B</div>
  <div className="text-sm text-gray-500">Max Supply</div>
</div>
```

### Activity Cards (Burned/Minted)
For displaying token activity with colored icon:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
  <div className="glass rounded-2xl p-6 border border-white/10">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
        {/* Fire icon for burn */}
      </div>
      <div>
        <div className="text-sm text-gray-400">Total Burned</div>
        <div className="text-xl font-mono text-white">Value</div>
      </div>
    </div>
    <p className="text-sm text-gray-500">Description of the metric</p>
  </div>
</div>
```

**Icon Background Colors:**
- Burn/Fire: `bg-red-500/10 text-red-400`
- Mint/Add: `bg-digiko-primary/10 text-digiko-primary`
- Success/Gift: `bg-green-500/10 text-green-400`
- Sparkles/Special: `bg-digiko-accent/10 text-digiko-accent`

**Layout:**
- Use 2-column grid on md+ breakpoints
- Icon size: `w-10 h-10` with `rounded-xl`
- Value size: `text-xl font-mono`
- Icon size inside: `w-5 h-5`

### Roadmap Timeline
Horizontal timeline for showing feature roadmap:

```tsx
<div className="mb-12">
  <h2 className="text-2xl font-medium text-white mb-6">Roadmap</h2>
  <div className="glass rounded-2xl border border-white/10 p-6">
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {roadmap.map((item, index) => (
        <div key={item.title} className="flex items-center">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
            item.status === 'live' 
              ? 'bg-green-500/10 border border-green-500/20' 
              : 'bg-white/5'
          }`}>
            {item.status === 'live' ? (
              <span className="text-green-400">{checkIcon}</span>
            ) : (
              <span className="w-4 h-4 rounded-full border-2 border-gray-500" />
            )}
            <div>
              <div className={`font-medium ${item.status === 'live' ? 'text-green-400' : 'text-white'}`}>
                {item.title}
              </div>
              <div className="text-xs text-gray-500">{item.quarter}</div>
            </div>
          </div>
          {index < roadmap.length - 1 && (
            <div className="w-8 h-px bg-white/10 mx-2" />
          )}
        </div>
      ))}
    </div>
  </div>
</div>
```

**States:**
- Live: `bg-green-500/10 border border-green-500/20` with green checkmark
- Coming: `bg-white/5` with empty circle (`border-2 border-gray-500`)

**Connector:**
- Use `w-8 h-px bg-white/10 mx-2` between items
- Don't add connector after last item

### Social Links
For community/social media buttons:

```tsx
<div className="mb-12">
  <h2 className="text-2xl font-medium text-white mb-6">Community</h2>
  <div className="glass rounded-2xl border border-white/10 p-6">
    <div className="flex flex-wrap gap-3">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 text-gray-400 hover:text-white"
      >
        {icon}
        <span className="font-medium">{name}</span>
      </a>
    </div>
  </div>
</div>
```

**Social Icon Guidelines:**
- Use filled SVGs (`fill="currentColor"`) for brand icons (X, LinkedIn, Telegram)
- Size: `w-5 h-5`
- Color transitions from `text-gray-400` to platform-specific color on hover
- Common hover colors:
  - X/Twitter: `hover:text-white`
  - Telegram: `hover:text-blue-400` or `hover:text-sky-400`
  - LinkedIn: `hover:text-blue-400`

### API Data Fetching Pattern
**CRITICAL:** Use this exact pattern for fetching token data (same as DGKO):

```tsx
const fetchTokenStats = async () => {
  try {
    setLoading(true);
    const assetId = 'TOKEN-ID';
    
    const apiUrl = network === 'mainnet' 
      ? `https://api.mainnet.klever.org/v1.0/assets/${assetId}`
      : `https://api.testnet.klever.org/v1.0/assets/${assetId}`;
    
    const response = await fetch(apiUrl);
    
    if (response.ok) {
      const data = await response.json();
      const asset = data.data?.asset;
      
      if (asset) {
        // IMPORTANT: Precision varies by token
        // DGKO: 10000 (4 decimals)
        // BABYDGKO: 100000000 (8 decimals)
        const precision = 10000; // For DGKO - adjust for other tokens
        const maxSupply = parseFloat(asset.maxSupply || '0') / precision;
        const circulatingSupply = parseFloat(asset.circulatingSupply || '0') / precision;
        const totalStaked = parseFloat(asset.staking?.totalStaked || '0') / precision;
        const burned = parseFloat(asset.burnedValue || '0') / precision;
        const minted = parseFloat(asset.mintedValue || '0') / precision;
        
        // Get current APR (last entry in apr array)
        const aprArray = asset.staking?.apr || [];
        const currentApr = aprArray.length > 0 
          ? aprArray[aprArray.length - 1].value / 100 
          : 0;
        
        // Calculate staked percentage
        const stakedPercent = circulatingSupply > 0 
          ? (totalStaked / circulatingSupply) * 100 
          : 0;
        
        setStats({
          totalSupply: maxSupply.toLocaleString('en-US', { maximumFractionDigits: 0 }),
          circulatingSupply: circulatingSupply.toLocaleString('en-US', { maximumFractionDigits: 0 }),
          stakingHolders: asset.stakingHolders || 0,
          totalStaked: totalStaked.toLocaleString('en-US', { maximumFractionDigits: 0 }),
          stakedPercent: Math.round(stakedPercent),
          apr: currentApr,
          burned: burned.toLocaleString('en-US', { maximumFractionDigits: 0 }),
          minted: minted.toLocaleString('en-US', { maximumFractionDigits: 0 }),
        });
      }
    }
  } catch (error) {
    console.error('Error fetching token stats:', error);
  } finally {
    setLoading(false);
  }
};
```

**Key Points:**
- Single API call to `/v1.0/assets/{assetId}` - no separate staking endpoint
- All staking data is nested: `asset.staking.*`
- Precision: `10000` (4 decimals) for DGKO, `100000000` (8 decimals) for BABYDGKO
- APR comes from array: `asset.staking.apr[last].value / 100`
- Stakers from: `asset.stakingHolders`
- Burned/Minted from: `asset.burnedValue` / `asset.mintedValue`
- Use `Math.round()` for percentages
- Use `.toLocaleString()` for display formatting

### Best Practices for Token Pages
✅ **DO:**
- Show live on-chain data (supply, staked, burned)
- Use consistent `py-16` padding for all token pages
- Include staking stats with APR in green (`text-green-400`)
- Link to KleverScan for holder details
- Show ecosystem features with status badges
- Include social links for community
- Use donut chart for tokenomics visualization
- Use the standardized API fetching pattern
- Display loading state as `'—'` not "Loading..."
- Format large numbers with `.toLocaleString()`

❌ **DON'T:**
- Use different padding (py-12 vs py-16) between token pages
- Show price data without reliable API source
- Use emojis for icons (use SVG icons)
- Overcrowd with too many sections
- Forget to link to staking page from token page
- Make multiple API calls when one call provides all data
- Use different API patterns between token pages
- Display APR without green color
- Forget the `toFixed()` inconsistency fix - APR should display as integer or one decimal

### Token Page Checklist
When creating a new token page, ensure:
- [ ] Page uses `py-16` padding
- [ ] Token logo inline with title
- [ ] All sections have `mb-12` spacing
- [ ] Stats use `font-mono` for numbers
- [ ] APR displayed in `text-green-400`
- [ ] KleverScan link included for holders
- [ ] API uses single call pattern from example
- [ ] Loading state shows `'—'` not "Loading..."
- [ ] Numbers formatted with `.toLocaleString()`
- [ ] Inner stat cards use `bg-white/5`
- [ ] Roadmap shows live features in green
- [ ] Social links included
- [ ] Links to staking page included

---


---

## 🎭 TransactionModal Component

The supreme transaction feedback system with celebration effects, premium typography, and status-based theming.

### Component Usage
```tsx
import { TransactionModal } from '@/components/TransactionModal';

<TransactionModal
  isOpen={modalOpen}
  status="success" // 'success' | 'error' | 'loading'
  title="Transaction Successful"
  message="Your tokens have been staked successfully"
  txHash="abc123..." // Optional, shows Kleverscan link
  onClose={closeModal}
  autoDismiss={true} // Auto-close after 5s on success
  autoDismissDelay={5000}
/>
```

### Design Specifications

#### Typography (Supreme Style)
- **Title:** `text-[2rem] font-bold tracking-[-0.02em] leading-tight antialiased`
- **Message:** `text-base font-medium tracking-[-0.01em] text-gray-300 antialiased`
- **TX Hash Label:** `text-[0.6875rem] font-semibold tracking-[0.08em] uppercase`
- **Button:** `text-base font-bold tracking-[-0.01em] antialiased`

**Key Principles:**
- Negative letter spacing (-0.01em to -0.02em) for premium feel
- Bold weights (font-bold/font-semibold) are allowed in modals for emphasis
- Always use `antialiased` for smooth rendering
- Precise sizes using rem values (2rem, 0.6875rem)

#### Status-Based Theming

**Success State:**
```tsx
// Colors
gradient: 'from-green-500/20 via-emerald-500/20 to-green-500/20'
buttonGradient: 'from-green-500 to-emerald-500'
glow: 'shadow-[0_0_80px_rgba(16,185,129,0.4)]'

// Icon: Green gradient circle with checkmark
// Particles: 24 colorful celebration particles
// Rings: Pulsing animated rings around icon
```

**Error State:**
```tsx
// Colors
gradient: 'from-red-500/20 via-rose-500/20 to-red-500/20'
buttonGradient: 'from-red-500 to-rose-500'
glow: 'shadow-[0_0_80px_rgba(239,68,68,0.4)]'

// Icon: Red gradient circle with X
// Animation: Shake effect
// Rings: Pulsing warning rings
```

**Loading State:**
```tsx
// Colors
gradient: 'from-digiko-primary/20 via-digiko-accent/20 to-digiko-primary/20'
buttonGradient: 'from-digiko-primary to-digiko-accent'
glow: 'shadow-[0_0_80px_rgba(0,102,255,0.4)]'

// Icon: Digiko gradient with dual spinning rings
// Animation: Pulsing glow effect
```

#### Celebration Particles
- **Count:** 24 particles on success
- **Colors:** `['#10B981', '#34D399', '#6EE7B7', '#0066FF', '#00D4FF', '#F59E0B', '#FBBF24']`
- **Size Range:** 4-12px random
- **Animation:** `particle-explode` with random delays (0-0.4s)
- **Duration:** 1-1.5s random per particle
- **Direction:** Radial explosion from center

#### Transaction Hash Display
```tsx
<div className="w-full mt-6 p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
  <p className="text-[0.6875rem] text-gray-400 mb-3 font-semibold uppercase tracking-[0.08em]">
    Transaction Hash
  </p>
  <div className="flex items-center gap-3">
    <p className="text-sm font-mono text-digiko-accent truncate flex-1 font-medium tracking-tight">
      {txHash}
    </p>
    {/* Copy button */}
    {/* Kleverscan link */}
  </div>
</div>
```

#### Performance Notes
- ✅ No backdrop blur (removed for better performance)
- ✅ CSS animations only (GPU-accelerated)
- ✅ No JavaScript animation loops
- ✅ Modal only exists when `isOpen={true}`

---

## 🎨 Legendary Card Design (Unstaking Queue Pattern)

Premium card design for time-sensitive actions with status visualization.

### Header Pattern
```tsx
<div>
  <h3 className="text-2xl font-semibold text-white tracking-[-0.02em] mb-1">
    Section Title
  </h3>
  <p className="text-sm text-gray-400 font-medium">
    Descriptive subtitle or count
  </p>
</div>
```

### Card Structure (Ready State)
```tsx
<div className="group relative overflow-hidden rounded-2xl border backdrop-blur-xl bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-green-500/10 border-green-500/40 shadow-[0_0_40px_rgba(34,197,94,0.15)] hover:shadow-[0_0_60px_rgba(34,197,94,0.25)] transition-all duration-500">
  
  {/* Shimmer effect overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 animate-shimmer" />
  
  {/* Top highlight line */}
  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent" />
  
  <div className="relative p-6">
    {/* Icon + Amount Row */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        {/* Success Icon */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] animate-pulse-glow">
          <CheckIcon />
        </div>
        
        {/* Amount Display */}
        <div>
          <div className="text-[1.75rem] font-semibold font-mono text-white tracking-[-0.02em] leading-none tabular-nums">
            500
          </div>
          <div className="text-sm font-semibold text-gray-400 mt-1 tracking-wide">
            DGKO
          </div>
        </div>
      </div>
      
      {/* Small Status Badge */}
      <div className="px-3 py-1.5 rounded-lg font-semibold text-xs tracking-wide backdrop-blur-xl border bg-green-500/15 border-green-500/30 text-green-400">
        Ready to claim
      </div>
    </div>
    
    {/* CTA Text */}
    <div className="flex items-center gap-2 text-sm font-semibold text-green-400">
      <ArrowDownIcon className="w-4 h-4 animate-bounce" />
      Click "Withdraw" to claim your tokens
    </div>
    
    {/* Action Button */}
    <button className="w-full mt-3 py-3.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold text-sm tracking-[-0.01em] rounded-xl transition-all duration-500 shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] hover:scale-[1.02]">
      <span className="flex items-center justify-center gap-2">
        <ArrowDownIcon />
        Withdraw
      </span>
    </button>
  </div>
</div>
```

### Card Structure (Unstaking State)
```tsx
<div className="rounded-2xl border backdrop-blur-xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500">
  <div className="p-6">
    {/* Amount + Status Badge (no checkmark icon) */}
    
    {/* Progress Bar */}
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-semibold">
        <span className="text-gray-400">Progress</span>
        <span className="text-digiko-accent">75%</span>
      </div>
      <div className="relative h-2.5 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-xl border border-white/5">
        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-digiko-primary via-digiko-accent to-digiko-primary bg-[length:200%_100%] rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(0,102,255,0.5)] animate-gradient-flow" 
             style={{ width: '75%' }} />
        {/* Shine overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-slow" />
      </div>
    </div>
  </div>
</div>
```

### Status Badge Patterns

**Small Badge (Recommended):**
```tsx
<div className="px-3 py-1.5 rounded-lg font-semibold text-xs tracking-wide backdrop-blur-xl border transition-all">
  Status Text
</div>
```

**Badge Colors:**
- Ready/Success: `bg-green-500/15 border-green-500/30 text-green-400`
- Unstaking/Progress: `bg-digiko-accent/10 border-digiko-accent/30 text-digiko-accent`
- Warning: `bg-amber-500/10 border-amber-500/30 text-amber-400`

### Icon Patterns

**Success Checkmark (with glow):**
```tsx
<div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] animate-pulse-glow">
  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
</div>
```

**Down Arrow (for withdraw/claim actions):**
```tsx
<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
</svg>
```

---

## ✨ Premium Animation System

Custom animations for fintech-grade polish.

### Shimmer Effect (Fast - 2s)
```css
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
```
**Usage:** Success card overlays, button shine effects
**HTML:**
```tsx
<div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 animate-shimmer" />
```

### Shimmer Effect (Slow - 3s)
```css
@keyframes shimmer-slow {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-shimmer-slow {
  animation: shimmer-slow 3s infinite;
}
```
**Usage:** Progress bar shine, subtle overlays

### Gradient Flow (3s)
```css
@keyframes gradient-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient-flow {
  animation: gradient-flow 3s ease infinite;
}
```
**Usage:** Progress bars, loading states
**Required:** `bg-[length:200%_100%]` on element

### Pulse Glow (2s)
```css
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
  }
  50% {
    box-shadow: 0 0 30px rgba(34, 197, 94, 0.6);
  }
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}
```
**Usage:** Success icons, ready indicators

### Scale Transform Patterns

**Buttons:**
```tsx
hover:scale-[1.02]  // Subtle lift (cards, buttons)
hover:scale-[1.05]  // Strong lift (primary CTAs)
active:scale-[0.98] // Press effect
disabled:hover:scale-100 // Disable hover effect when disabled
```

**Cards:**
```tsx
hover:shadow-[0_0_60px_rgba(34,197,94,0.25)] // Increase glow on hover
transition-all duration-500 // Smooth transitions
```

---

## 🎯 Button Inside Card Pattern

Full-width action buttons positioned at the bottom of cards.

### Standard Pattern
```tsx
<button className="w-full mt-4 py-3.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold text-sm tracking-[-0.01em] rounded-xl transition-all duration-500 shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] disabled:hover:scale-100 overflow-hidden group relative">
  <span className="relative z-10 flex items-center justify-center gap-2">
    <svg className="w-4 h-4">...</svg>
    Action Text
  </span>
  {/* Shine effect */}
  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
</button>
```

### Spacing Guidelines
- **Margin top:** `mt-4` (16px) after content
- **Padding:** `py-3.5` (14px vertical)
- **Width:** Always `w-full`
- **Border radius:** `rounded-xl` (12px)

### Color Schemes

**Success/Claim Actions:**
```tsx
from-green-500 to-emerald-500 
hover:from-green-400 hover:to-emerald-400
shadow-[0_0_25px_rgba(34,197,94,0.4)]
```

**Primary Actions:**
```tsx
from-digiko-primary to-digiko-accent 
hover:from-digiko-secondary hover:to-digiko-primary
shadow-[0_0_25px_rgba(0,102,255,0.4)]
```

**Danger Actions:**
```tsx
from-red-500 to-rose-500 
hover:from-red-600 hover:to-rose-600
shadow-[0_0_25px_rgba(239,68,68,0.4)]
```

### With Icon Examples

**Down Arrow (Withdraw/Claim):**
```tsx
<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
</svg>
```

**Check (Confirm):**
```tsx
<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
</svg>
```

---

## 📝 Design Checklist for New Features

When implementing new transaction flows or status cards:

### TransactionModal Checklist
- [ ] Use supreme typography with negative tracking
- [ ] Implement all three states (success/error/loading)
- [ ] Add celebration particles for success (24 particles)
- [ ] Include TX hash display with copy + Kleverscan link
- [ ] Enable auto-dismiss for success state (5s)
- [ ] No backdrop blur (performance)
- [ ] Proper button with shine effect

### Legendary Card Checklist
- [ ] Premium header with font-semibold (not bold)
- [ ] Status-based gradient backgrounds
- [ ] Small badges (px-3 py-1.5, text-xs)
- [ ] Shimmer overlay on ready state
- [ ] Top highlight line on ready cards
- [ ] Success icon with pulse-glow animation
- [ ] Full-width button at bottom
- [ ] Down arrow icon for withdraw actions
- [ ] Progress bar with gradient-flow for unstaking
- [ ] Proper hover states (scale, shadow increase)

### Animation Checklist
- [ ] Use CSS animations (no JS loops)
- [ ] Apply shimmer to ready/success states
- [ ] Use gradient-flow on progress bars
- [ ] Add pulse-glow to success icons
- [ ] Include shine effect on buttons (group-hover pattern)
- [ ] Proper transition durations (300-1000ms)

---

**End of Design Guide v1.7**
---

## 📱 MOBILE-RESPONSIVE DESIGN SYSTEM (Nov 28, 2025)

### Philosophy
**Mobile-First Fintech Standards** - Following industry leaders (Revolut, Coinbase, N26)
- Design for small screens first
- Add desktop flourishes after
- Content density over spaciousness on mobile
- Professional polish on all devices

---

### Mobile Typography Scale

#### Responsive Font Sizes (tailwind.config.js)
```javascript
fontSize: {
  'mobile-xs': ['0.625rem', { lineHeight: '1rem' }],      // 10px
  'mobile-sm': ['0.75rem', { lineHeight: '1.125rem' }],   // 12px
  'mobile-base': ['0.875rem', { lineHeight: '1.375rem' }], // 14px
  'mobile-lg': ['1rem', { lineHeight: '1.5rem' }],        // 16px
  'mobile-xl': ['1.125rem', { lineHeight: '1.75rem' }],   // 18px
  'mobile-2xl': ['1.25rem', { lineHeight: '1.875rem' }],  // 20px
  'mobile-3xl': ['1.5rem', { lineHeight: '2rem' }],       // 24px
  'mobile-4xl': ['1.75rem', { lineHeight: '2.25rem' }],   // 28px
  'mobile-5xl': ['2rem', { lineHeight: '2.5rem' }],       // 32px
  'mobile-6xl': ['2.5rem', { lineHeight: '3rem' }],       // 40px
}
```

#### Responsive Utility Classes (globals.css)
```css
.text-responsive-h1 { @apply text-mobile-5xl md:text-5xl font-medium; }
.text-responsive-h2 { @apply text-mobile-4xl md:text-4xl font-medium; }
.text-responsive-h3 { @apply text-mobile-3xl md:text-3xl font-medium; }
.text-responsive-h4 { @apply text-mobile-2xl md:text-2xl font-medium; }
.text-responsive-xl { @apply text-mobile-lg md:text-xl; }
.text-responsive-2xl { @apply text-mobile-xl md:text-2xl; }
.stat-mobile { @apply text-mobile-xl md:text-2xl font-medium; }
.balance-display { @apply text-mobile-xl md:text-2xl font-medium; }
.token-name-mobile { @apply text-mobile-base md:text-xl; }
.truncate-mobile { @apply truncate max-w-[150px] md:max-w-none; }
.break-mobile { @apply break-words md:break-normal; }
```

#### Scaling Reference
```
Element Type    | Desktop | Mobile  | Reduction
----------------|---------|---------|----------
H1 Headings     | 48px    | 32px    | -33%
H2 Headings     | 36px    | 28px    | -22%
H3 Headings     | 30px    | 24px    | -20%
Balance Numbers | 20px    | 18px    | -10%
Token Names     | 20px    | 14px    | -30%
Body Text       | 20px    | 16px    | -20%
```

---

### Mobile Spacing System

#### Fintech Standard Spacing
```
Element           | Desktop | Mobile  | Reduction
------------------|---------|---------|----------
Page Padding      | 32px    | 16px    | -50%
Page Vertical     | 48px    | 32px    | -33%
Glass Cards       | 32px    | 20px    | -38%
Stats Cards       | 24px    | 16px    | -33%
Card Gaps         | 32px    | 16px    | -50%
Section Margins   | 48px    | 24px    | -50%
Inner Spacing     | 24px    | 16px    | -33%
```

**Average mobile reduction: ~40%**

#### Spacing Class Patterns
```tsx
// Container padding
className="px-4 lg:px-8 py-8 lg:py-12"

// Card padding
className="p-5 md:p-8"

// Stats/small cards
className="p-4 md:p-6"

// Element gaps
className="gap-4 md:gap-8"

// Section spacing
className="mb-4 md:mb-6"
className="mb-6 md:mb-12"

// Grid gaps
className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8"
```

---

### Mobile Layout Patterns

#### Center on Mobile, Left on Desktop
**Use Case:** Feature cards, How It Works sections, icon+text layouts

```tsx
// Container
<div className="text-center md:text-left">
  
  // Icon wrapper
  <div className="flex justify-center md:justify-start mb-6">
    <IconBox icon={...} />
  </div>
  
  // Title (always centered)
  <h3 className="font-medium text-white mb-2 text-lg">
    Feature Title
  </h3>
  
  // Description
  <p className="text-gray-400 text-sm leading-relaxed">
    Feature description text...
  </p>
</div>
```

#### Balance Display Pattern
**Use Case:** Token balances, staked amounts

```tsx
<div className="flex items-baseline gap-2 flex-wrap">
  {/* Number - larger */}
  <span className="balance-display font-mono text-white">
    {amount}
  </span>
  
  {/* Symbol - smaller */}
  <span className="token-name-mobile text-gray-400">
    {symbol}
  </span>
</div>
```

**Critical:** Always use `flex-wrap` to prevent overflow on long token names

#### Long Token Names
**Problem:** BABYDGKO overflows on small screens

```tsx
// Header with long token name
<h1 className="text-responsive-h1 text-white flex flex-wrap items-baseline gap-2">
  <span className="break-mobile">BABYDGKO</span>
  <span className="text-responsive-xl text-gray-400">Token</span>
</h1>
```

**Key:**
- `flex-wrap` allows name to wrap
- `break-mobile` breaks words on mobile
- Smaller subtitle text

---

### Mobile Text Color Rules

#### Minimize Color Usage
**Philosophy:** Clean, functional color - not decorative

**Do:**
- White for informational text
- Gray for secondary/labels
- Blue ONLY for interactive elements

**Don't:**
- Blue text for amounts/balances
- Colored text for token names
- Accent colors for static info

```tsx
// ✅ CORRECT
<span className="text-white">1,234.56</span>
<span className="text-gray-400">DGKO</span>

// ❌ WRONG
<span className="text-digiko-accent">1,234.56</span>
<span className="text-digiko-primary">DGKO</span>
```

**Exception:** State indicators (green for success, red for error)

---

### Mobile Focus States

#### Global vs Component Focus
**Problem:** Global `*:focus-visible` creates unwanted outlines

```css
/* Global (in globals.css) */
*:focus-visible {
  outline: 2px solid #0066FF;
  outline-offset: 2px;
}
```

**Solution:** Override on inputs, let containers handle focus

```tsx
// Input - no outline
<input 
  className="
    outline-none 
    focus:outline-none 
    focus-visible:outline-none
    focus:ring-0
    focus:border-0
  "
/>

// Wrapper - border change
<div className="
  border border-white/10
  focus-within:border-digiko-primary
  transition-colors
">
  <input ... />
</div>
```

**Pattern:** Inputs suppress outline, wrappers show focus state

---

### Mobile Component Checklist

When creating/modifying components for mobile:

- [ ] Responsive padding (`p-4 md:p-8`)
- [ ] Responsive gaps (`gap-4 md:gap-8`)
- [ ] Responsive typography (`text-responsive-*`)
- [ ] Balance display pattern for numbers+symbols
- [ ] Flex-wrap on token name displays
- [ ] Center-on-mobile for feature cards
- [ ] White/gray text (blue only for buttons)
- [ ] Focus states properly handled
- [ ] Tested on iPhone SE (375px)
- [ ] Tested on iPhone 14 Pro Max (430px)

---

### Mobile Testing Standards

#### Required Test Devices (DevTools)
1. **iPhone SE (375px)** - Smallest common size
2. **iPhone 12/13 (390px)** - Most common
3. **iPhone 14 Pro Max (430px)** - Largest iPhone

#### Visual Test Checklist
- [ ] No text overflow or wrapping issues
- [ ] All content visible without horizontal scroll
- [ ] Touch targets at least 44x44px
- [ ] Spacing feels professional (not cramped/wasteful)
- [ ] Text hierarchy clear
- [ ] Focus states work correctly
- [ ] Cards stack properly
- [ ] No layout shift on interaction

#### Performance Test
- [ ] Smooth scrolling
- [ ] Fast tap response
- [ ] Animations don't jank
- [ ] Images load progressively

---

### Mobile-First Development Workflow

1. **Start Mobile**
   - Design component at 375px width
   - Use mobile spacing (p-4, gap-4, etc)
   - Center layout if appropriate
   
2. **Add Desktop Enhancements**
   - Add `md:` breakpoint classes
   - Increase spacing (p-4 → md:p-8)
   - Left-align if appropriate
   
3. **Test Both**
   - Toggle device toolbar
   - Check 375px, 390px, 768px, 1440px
   - Verify breakpoint transitions
   
4. **Polish**
   - Fine-tune spacing
   - Adjust typography scale
   - Test focus states

**Never design desktop-first and try to "make it responsive" - always start mobile.**

---

## 📐 Mobile Spacing Reference Chart

```
Use Case                    | Mobile Class | Desktop Class
----------------------------|--------------|---------------
Page container padding      | px-4         | lg:px-8
Page vertical spacing       | py-8         | lg:py-12
Large glass cards           | p-5          | md:p-8
Stats/small cards           | p-4          | md:p-6
Inner card sections         | p-4          | md:p-6
Card-to-card gaps           | gap-4        | md:gap-8
Major section breaks        | mb-6         | md:mb-12
Minor section breaks        | mb-4         | md:mb-6
Element spacing             | space-y-4    | md:space-y-6
Grid column gaps            | gap-4        | md:gap-8
```

**Rule of Thumb:** Mobile = 16px (p-4), Desktop = 32px (md:p-8)

---

## 🎨 Mobile Color Usage Guide

### Text Colors by Purpose

**Informational (static, read-only):**
```tsx
text-white         // Primary values, amounts, titles
text-gray-400      // Labels, symbols, secondary info
text-gray-500      // Tertiary, timestamps, metadata
```

**Interactive (clickable, actionable):**
```tsx
text-digiko-primary        // Links, interactive text
hover:text-digiko-accent   // Hover states
```

**State Indicators:**
```tsx
text-green-400    // Success, positive values
text-red-400      // Error, negative values
text-yellow-400   // Warning, pending
text-blue-400     // Info, neutral
```

**Disabled:**
```tsx
text-gray-600      // Disabled text
opacity-50         // Disabled elements
```

### Background Colors by Purpose

**Cards:**
```tsx
bg-klever-dark     // Inner sections (rgba(18,18,20))
glass              // Main cards (rgba(18,18,20,0.5) + blur)
glass-hover        // Interactive cards
```

**Buttons:**
```tsx
bg-digiko-secondary               // Primary action
bg-white/5 hover:bg-white/10      // Secondary action
bg-digiko-primary/10              // Info boxes
```

**Never use:**
- Colored backgrounds for text display
- Blue backgrounds for amounts
- Accent colors for static content

---

## 💡 Design Principles Summary

### Mobile Design Commandments

1. **Content First**
   - Mobile users want information, not decoration
   - Maximize content density while maintaining readability
   - Every pixel should serve a purpose
   
2. **Touch-Friendly**
   - All interactive elements minimum 44x44px
   - Adequate spacing between touch targets
   - Clear visual feedback on interaction
   
3. **Hierarchy Through Scale**
   - Use size, not color, for hierarchy
   - Numbers bigger than labels
   - Headings scale proportionally
   
4. **Functional Color**
   - Blue = interactive/actionable
   - White/gray = informational
   - Color guides action, not decoration
   
5. **Centered When Narrow**
   - Center-align content on mobile
   - Left-align on desktop
   - Icons follow text alignment
   
6. **Flexible Containers**
   - Use flex-wrap for unpredictable content
   - Allow line breaks for long text
   - Never force single-line on mobile
   
7. **Focus on Performance**
   - Minimize animations on mobile
   - Optimize images for small screens
   - Fast interactions trump fancy effects

---

**Last Updated:** November 29, 2025  
**Version:** 1.9  
**Changes:** 
- Added comprehensive three-tier responsive design system (Mobile → Tablet → Desktop)
- Documented complete typography scaling across all breakpoints
- Created responsive spacing system with fintech-standard patterns
- Added tablet-specific font sizes and considerations
- Established responsive layout patterns and component checklist
- Updated all responsive classes with tablet breakpoint support

