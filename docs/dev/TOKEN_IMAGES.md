# Token Images & Logos Guide
**Last Updated:** November 26, 2025  
**Status:** Comprehensive reference for token image handling

---

## 🎨 How Token Images Work

### **System Overview**

The Digiko app uses a **3-tier fallback system** for token images:

1. **Custom Logos** (Highest Priority) - For Digiko tokens
2. **Klever API Logos** - For standard Klever tokens  
3. **Generated Gradients** - Fallback for tokens without logos

---

## 📡 Klever API Token Logos

### **API Endpoint**
```
GET https://api.{network}.klever.org/v1.0/assets/{assetId}
```

**Networks:**
- `mainnet` - Production network
- `testnet` - Test network

### **Response Structure**
```json
{
  "data": {
    "asset": {
      "assetId": "KLV",
      "name": "Klever",
      "ticker": "KLV",
      "logo": "https://klever.org/logo.png",  // ← Logo URL here
      "precision": 6,
      // ... other fields
    }
  }
}
```

### **Which Tokens Have Logos?**

**✅ Have logos in Klever API:**
- `KLV` (Klever)
- `KFI` (Klever Finance)
- Most standard Klever ecosystem tokens

**❌ Don't have logos in Klever API:**
- `DGKO-CXVJ` (Custom Digiko token)
- `BABYDGKO-3S67` (Custom Baby Digiko token)
- Most newly created custom tokens
- Tokens created but not yet verified/indexed

**Why?** Custom tokens need to be registered and verified in Klever's system before logos appear in the API. This is a manual process by token creators.

---

## 🔧 Adding Custom Token Logos

### **Location:** `src/config/tokens.ts`

```typescript
export const CUSTOM_TOKEN_LOGOS: Record<string, string> = {
  'DGKO-CXVJ': '/images/tokens/dgko.png',
  'BABYDGKO-3S67': '/images/tokens/babydgko.png',
};
```

### **Steps to Add Token Logo:**

**1. Prepare Logo Image**
- Format: PNG with transparency
- Size: 512x512px (minimum 128x128px)
- Quality: High resolution for crisp display
- Circular or square design (component will round it)

**2. Add to Public Directory**
```bash
# Create tokens directory if not exists
mkdir -p /Users/riccardomarconato/digiko-web3-app/public/images/tokens

# Add your logo
cp dgko-logo.png /Users/riccardomarconato/digiko-web3-app/public/images/tokens/dgko.png
```

**3. Register in Token Config**
Edit `src/config/tokens.ts`:
```typescript
export const CUSTOM_TOKEN_LOGOS: Record<string, string> = {
  'DGKO-CXVJ': '/images/tokens/dgko.png',
  'BABYDGKO-3S67': '/images/tokens/babydgko.png',
  'YOUR-TOKEN-ID': '/images/tokens/your-token.png', // ← Add here
};
```

**4. Update TokenImage Component**
The component checks custom logos first:
```typescript
// In TokenImage.tsx - add check for custom logos
const customLogo = CUSTOM_TOKEN_LOGOS[assetId];
if (customLogo) {
  return <img src={customLogo} ... />;
}
```

---

## 🎯 TokenImage Component

### **Location:** `src/components/TokenImage.tsx`

### **Current Implementation**
```typescript
<TokenImage 
  assetId="DGKO-CXVJ" 
  size="md"
  network="testnet"
/>
```

### **Fallback System (Current)**

```
1. Klever API Check
   ↓ (if logo exists)
   Show real logo
   ↓ (if no logo)
2. Styled Gradient Fallback
   - Shows first 2 letters
   - Token-specific colors
   - Professional appearance
```

### **Improved System (Recommended)**

```
1. Custom Logo Check (NEW)
   ↓ (if in CUSTOM_TOKEN_LOGOS)
   Show custom logo
   ↓ (if not found)
2. Klever API Check
   ↓ (if logo exists)
   Show API logo
   ↓ (if no logo)
3. Styled Gradient Fallback
   - Shows first 2 letters
   - Token-specific colors
```

---

## 🔄 Updating TokenImage Component

### **Add Custom Logo Support**

**Current code:**
```typescript
// src/components/TokenImage.tsx
useEffect(() => {
  const fetchLogo = async () => {
    // Only checks Klever API
    const apiUrl = `https://api.mainnet.klever.org/v1.0/assets/${assetId}`;
    // ...
  };
}, [assetId]);
```

**Improved code:**
```typescript
import { getCustomLogo } from '@/config/tokens';

useEffect(() => {
  const fetchLogo = async () => {
    // 1. Check custom logos first
    const customLogo = getCustomLogo(assetId);
    if (customLogo) {
      setLogoUrl(customLogo);
      setLoading(false);
      return;
    }

    // 2. Then check Klever API
    const apiUrl = `https://api.mainnet.klever.org/v1.0/assets/${assetId}`;
    // ... existing API code
  };
}, [assetId]);
```

---

## 📊 Token Configuration Database

### **Location:** `src/config/tokens.ts`

Complete metadata for all tokens:

```typescript
export const TOKEN_CONFIG: Record<string, TokenConfig> = {
  'KLV': {
    assetId: 'KLV',
    name: 'Klever',
    symbol: 'KLV',
    decimals: 6,
    color: '#7C3AED',
  },
  'DGKO-CXVJ': {
    assetId: 'DGKO-CXVJ',
    name: 'Digiko',
    symbol: 'DGKO',
    logo: '/images/tokens/dgko.png',
    decimals: 4,
    color: '#0066FF',
  },
  // Add more tokens...
};
```

**Usage:**
```typescript
import { getTokenConfig, getTokenName, getTokenDecimals } from '@/config/tokens';

const config = getTokenConfig('DGKO-CXVJ');
const name = getTokenName('DGKO-CXVJ');      // "DGKO"
const decimals = getTokenDecimals('DGKO-CXVJ'); // 4
```

---

## 🐛 Troubleshooting

### **Token Shows Gradient Instead of Logo**

**Check:**
1. Is token in `CUSTOM_TOKEN_LOGOS`?
2. Is image file in `/public/images/tokens/`?
3. Is image path correct? (starts with `/images/` not `/public/images/`)
4. Clear Next.js cache: `rm -rf .next`
5. Check browser console for 404 errors

### **Logo Not Loading from Klever API**

**Reasons:**
- Token is custom/new and not registered in Klever system
- Token doesn't have logo uploaded to Klever
- Network mismatch (check if using testnet vs mainnet)
- API rate limiting (unlikely but possible)

**Solution:**
Add to `CUSTOM_TOKEN_LOGOS` instead

### **Wrong Network Being Checked**

**Check:** `src/config/app.ts`
```typescript
export const APP_CONFIG = {
  network: 'Testnet', // or 'Mainnet'
};
```

Component converts to lowercase: `'testnet'` or `'mainnet'`

---

## 🎨 Gradient Fallback System

When no logo is available, shows styled gradient with token initials:

**Token-Specific Gradients:**
- DGKO: Blue gradient (`from-digiko-primary/30 to-digiko-accent/20`)
- BABYDGKO: Cyan-purple gradient (`from-digiko-accent/30 to-purple-500/20`)
- KLV: Purple-pink gradient (`from-purple-500/30 to-pink-500/20`)
- KFI: Amber-orange gradient (`from-amber-500/30 to-orange-500/20`)
- Unknown: Gray gradient (default)

**Example:**
```
┌─────────┐
│   DG    │  ← First 2 letters
└─────────┘
  Blue gradient background
```

---

## 📝 Best Practices

### **1. Image Optimization**
- Use PNG with transparency
- Optimize file size (<100KB ideal)
- Use 512x512px for best quality
- Test on both light and dark backgrounds

### **2. Caching**
- Component caches API results automatically
- Custom logos load instantly (no API call)
- Clear cache with page refresh

### **3. Network Awareness**
- Always use network from `APP_CONFIG`
- Don't hardcode 'mainnet' or 'testnet'
- Component handles network switching

### **4. Fallback Priority**
```
Custom Logo → Klever API → Gradient Fallback
```
Always provide custom logos for important tokens

---

## 🚀 Quick Reference

### **Check if token has logo:**
1. Check `CUSTOM_TOKEN_LOGOS` in `src/config/tokens.ts`
2. Test API: `curl https://api.mainnet.klever.org/v1.0/assets/{assetId}`
3. Look for `"logo"` field in response

### **Add new token logo:**
1. Add image to `/public/images/tokens/`
2. Register in `CUSTOM_TOKEN_LOGOS`
3. Clear cache: `rm -rf .next`
4. Restart: `npm run dev`

### **Use token image:**
```tsx
import { TokenImage } from '@/components/TokenImage';

<TokenImage assetId="DGKO-CXVJ" size="md" network="testnet" />
```

---

## 🔗 Related Files

- `src/components/TokenImage.tsx` - Image component
- `src/config/tokens.ts` - Token configuration
- `src/config/app.ts` - Network configuration
- `public/images/tokens/` - Custom logo storage

---

*Last Updated: November 26, 2025*  
*For internal development use only*
