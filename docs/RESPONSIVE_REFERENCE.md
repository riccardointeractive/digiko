# Responsive Design Quick Reference
**For Digiko Web3 App Development**

---

## 📐 Typography Classes

### Headings (Auto-scaling)
```tsx
<h1 className="text-responsive-h1">     // 32px → 44px → 48px
<h2 className="text-responsive-h2">     // 28px → 36px → 36px
<h3 className="text-responsive-h3">     // 24px → 28px → 30px
<h4 className="text-responsive-h4">     // 20px → 22px → 24px
<h5 className="text-responsive-h5">     // 18px → 19px → 20px
<h6 className="text-responsive-h6">     // 16px → 17px → 18px
```

### Body Text (Auto-scaling)
```tsx
<p className="text-responsive-2xl">    // 18px → 19px → 24px
<p className="text-responsive-xl">     // 16px → 17px → 20px
<p className="text-responsive-base">   // 14px → 15px → 16px
<p className="text-responsive-sm">     // 12px → 13px → 14px
```

### Display (Hero only)
```tsx
<h1 className="text-responsive-display"> // 40px → 56px → 72px
```

---

## 📏 Spacing Quick Reference

### Page-Level Padding
```tsx
className="px-4 md:px-6 lg:px-8"        // Horizontal: 16px → 24px → 32px
className="py-8 md:py-10 lg:py-12"     // Vertical: 32px → 40px → 48px
```

### Card Padding
```tsx
// Large glass cards
className="p-5 md:p-6 lg:p-8"          // 20px → 24px → 32px

// Small stat cards
className="p-4 md:p-5 lg:p-6"          // 16px → 20px → 24px
```

### Gaps & Spacing
```tsx
className="gap-4 md:gap-6 lg:gap-8"    // Grid/Flex: 16px → 24px → 32px
className="space-y-4 md:space-y-6 lg:space-y-8"  // Vertical stack
```

### Margins
```tsx
// Major section breaks
className="mb-8 md:mb-10 lg:mb-12"     // 32px → 40px → 48px

// Between elements
className="mb-4 md:mb-5 lg:mb-6"       // 16px → 20px → 24px

// Tight spacing
className="mb-3 md:mb-4 lg:mb-5"       // 12px → 16px → 20px
```

---

## 🎨 Common Patterns

### Standard Page Layout
```tsx
<div className="min-h-screen px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
  
  {/* Page Title */}
  <div className="mb-8 md:mb-10 lg:mb-12">
    <h1 className="text-responsive-h1 mb-3 md:mb-4">Page Title</h1>
    <p className="text-responsive-xl text-gray-400">Description</p>
  </div>
  
  {/* Content */}
  <div className="grid gap-4 md:gap-6 lg:gap-8">
    {/* Cards */}
  </div>
</div>
```

### Glass Card
```tsx
<div className="glass p-5 md:p-6 lg:p-8 rounded-2xl">
  <h3 className="text-responsive-h3 mb-4 md:mb-5 lg:mb-6">Card Title</h3>
  <p className="text-responsive-base text-gray-400">Content</p>
</div>
```

### Stats Display
```tsx
<div className="flex flex-col md:flex-row items-center md:items-start 
                gap-4 md:gap-6 lg:gap-8">
  <div className="text-center md:text-left">
    <div className="text-responsive-h2 font-mono">123.45</div>
    <div className="text-responsive-base text-gray-400">DGKO</div>
  </div>
</div>
```

### Responsive Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
                gap-4 md:gap-6 lg:gap-8">
  {/* Cards */}
</div>
```

### Button (Full width on mobile)
```tsx
<button className="w-full md:w-auto px-6 md:px-8 lg:px-10 
                   py-4 md:py-4.5 lg:py-5">
  Action
</button>
```

---

## 🎯 Breakpoint Behavior

| Breakpoint | Width | Typical Use |
|------------|-------|-------------|
| `xs:` | 375px+ | iPhone SE minimum |
| `sm:` | 640px+ | Large phones |
| `md:` | 768px+ | **Tablet start** |
| `lg:` | 1024px+ | **Desktop start** |
| `xl:` | 1280px+ | Large desktop |
| `2xl:` | 1536px+ | Extra large |

---

## ✅ Component Checklist

Before committing responsive changes:

- [ ] Typography scales with `text-responsive-*` classes
- [ ] Padding uses `p-{mobile} md:p-{tablet} lg:p-{desktop}`
- [ ] Gaps use `gap-{mobile} md:gap-{tablet} lg:gap-{desktop}`
- [ ] Margins use `mb-{mobile} md:mb-{tablet} lg:mb-{desktop}`
- [ ] Layout stacks on mobile (`flex-col md:flex-row`)
- [ ] Grid columns adapt (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- [ ] Touch targets are 44x44px minimum
- [ ] Text doesn't overflow at 375px width
- [ ] Tested at 375px, 768px, and 1440px

---

## 🚫 Common Mistakes

### ❌ DON'T DO THIS:
```tsx
// Fixed sizes (not responsive)
<h1 className="text-5xl">Title</h1>

// Only mobile/desktop (missing tablet)
<div className="p-4 md:p-8">

// Inconsistent spacing
<div className="gap-4 md:gap-7 lg:gap-9">

// No breakpoint on typography
<p className="text-xl">Body text</p>
```

### ✅ DO THIS:
```tsx
// Responsive classes
<h1 className="text-responsive-h1">Title</h1>

// All three breakpoints
<div className="p-4 md:p-6 lg:p-8">

// Consistent scaling (×1.5 pattern)
<div className="gap-4 md:gap-6 lg:gap-8">

// Responsive body text
<p className="text-responsive-xl">Body text</p>
```

---

## 💡 Pro Tips

1. **Start Mobile-First**: Design at 375px, then enhance
2. **Use Responsive Classes**: Prefer `.text-responsive-*` over manual breakpoints
3. **Follow the ×1.5 Rule**: Desktop spacing ≈ 2× mobile (16px → 32px)
4. **Test Real Devices**: DevTools ≠ actual phone/tablet experience
5. **Center on Mobile**: Most content looks better centered on small screens
6. **Left-Align on Desktop**: Professional look for larger screens

---

## 🔗 Related Documents

- **Full Design Guide**: `docs/design_guide.md`
- **Project Rules**: `docs/PROJECT_RULES.md` (Rule 40: Mobile-first design)
- **Tailwind Config**: `tailwind.config.js` (Font size definitions)
- **Global Styles**: `src/app/globals.css` (Responsive classes)

---

**Last Updated:** November 29, 2025  
**Version:** 1.0  
**Purpose:** Quick reference for implementing responsive design patterns
