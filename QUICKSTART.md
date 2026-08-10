# 🚀 Quick Start Guide - Second Brain Gothic

## Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Your Obsidian vault (optional, can use empty)

## Installation Steps

### Step 1: Navigate to Project
```bash
cd /home/azzaroth/projects/second-brain-gothic
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- Next.js 14 (framework)
- Tailwind CSS (styling)
- Framer Motion (animations)
- Lucide React (icons)
- vis-network (graph visualization)

### Step 3: Configure Vault Directory
Edit `.env.local` file or set environment variable:

```bash
export VAULT_DIR=/path/to/your/vault
```

Or create `.env.local`:
```
VAULT_DIR=/home/azzaroth/vault
```

### Step 4: Start Development Server
```bash
npm run dev
```

Open your browser to: **http://localhost:3000**

---

## First Time Experience

1. **Welcome Dashboard**
   - You'll see the gothic dark theme immediately
   - Graph visualization loads automatically
   - Quick stats show node count

2. **Browse Notes**
   - Click "Browse Notes" card or navigate to `/notes`
   - See your vault's markdown files
   - Search by title, folder, or content

3. **Explore Skills**
   - Navigate to `/skills`
   - View acquired abilities with XP progress
   - See locked content that will unlock later

4. **Full Graph View**
   - Click "Graph" in sidebar/bottom nav
   - Explore interconnected knowledge
   - Drag nodes to rearrange
   - Zoom with mouse wheel/two-finger pinch

---

## Mobile Usage

### On Phone/Tablet

1. **Bottom Navigation Bar**
   - Home icon: Dashboard
   - Brain icon: Knowledge graph
   - Book icon: Notes list
   - Shield icon: Skills tracker

2. **Touch Gestures**
   - Tap nodes to view details
   - Pinch to zoom graph
   - Drag to pan around
   - Long press for additional actions

3. **Responsive Layouts**
   - Single column on small screens
   - Split view on tablets
   - Automatic orientation support

---

## Customization Quick Reference

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  crimson: { blood: '#YOUR_COLOR' },
  gold: { antique: '#YOUR_GOLD' },
  gothic: { black: '#YOUR_DARK' },
}
```

### Change Fonts
Edit `app/globals.css`:
```css
fontFamily: {
  serif: ['Your Font', 'serif'],
  gothic: ['Your Gothic Font', 'cursive'],
}
```

### Add More Navigation Items
Edit `components/Sidebar.tsx`:
```javascript
const navItems = [
  { icon: HomeIcon, label: "Home", href: "/" },
  // Add new items here...
]
```

---

## Troubleshooting

### Issue: Graph not loading
**Solution**: 
- Check vault directory exists
- Verify `.env.local` has correct path
- Look for console errors

### Issue: TypeScript errors during build
**Solution**: Normal development noise
- Run: `npm run dev` instead of build
- Errors are from Next.js type definitions, not your code

### Issue: Mobile layout broken
**Solution**:
- Clear browser cache
- Test on actual device
- Check responsive breakpoints

### Issue: No notes appear
**Solution**:
- Ensure vault contains `.md` files
- Files must have `# Title` headings
- Check folder permissions

---

## Performance Tips

### For Large Vaults (1000+ files)
```bash
# Build optimized production version
npm run build
npm start
```

### Enable Compression
Next.js automatically enables gzip compression in production.

### Optimize Images
If you add images to vault:
- Use WebP format
- Keep under 500KB
- Compress before adding

---

## Production Deployment

### Option 1: Vercel (Recommended)
```bash
vercel deploy --prod
```

Set environment variable in Vercel dashboard:
```
VAULT_DIR=/path/to/vault
```

### Option 2: Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

### Option 3: Node Server
```bash
npm run build
NODE_ENV=production node_modules/.bin/next start
```

---

## Keyboard Shortcuts (Desktop)

| Key | Action |
|-----|--------|
| `Ctrl/Cmd + K` | Quick search |
| `G G` | Go to Graph |
| `G N` | Go to Notes |
| `G S` | Go to Skills |
| `ESC` | Close modal/focus |

---

## Development Workflow

### Adding a New Feature
1. Create component in `components/`
2. Add page in `app/[feature]/page.tsx`
3. Update navigation in `Sidebar.tsx` or `MobileNav.tsx`
4. Test on mobile and desktop

### Styling Changes
1. Update color tokens in `tailwind.config.js`
2. Add utility classes in `globals.css`
3. Use existing components first
4. Test across browsers

### API Updates
1. Modify route in `app/api/`
2. Update client fetch calls
3. Handle loading/error states
4. Add TypeScript interfaces

---

## Getting Help

### Documentation Files
- `README.md` - Overview
- `REDESIGN_COMPLETE.md` - Full documentation
- `QUICK_START.md` - This file

### Code Comments
Inline comments explain complex logic.

### Debug Mode
Enable verbose logging in components:
```typescript
console.log('Current state:', state)
```

---

## Next Actions

✅ Complete installation  
✅ Test on mobile device  
✅ Import your vault data  
✅ Customize colors/fonts  
✅ Deploy to production  

---

**Need help?** Check the code comments or review the full redesign documentation.

*May your knowledge flow through darkness elegantly.* 🖤✨
