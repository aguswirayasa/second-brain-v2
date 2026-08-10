# 🖤 Second Brain - Gothic Edition

A dark, elegant sanctuary for your knowledge network. Built with Next.js 14, Tailwind CSS, and Framer Motion.

## ✨ Features

- **Dark Gothic Aesthetic**: Deep blacks, rich crimsons, and antique golds
- **Mobile-First Design**: Seamless experience across all devices
- **Knowledge Graph**: Visualize your interconnected thoughts with vis-network
- **Skills Tracker**: Monitor your acquired abilities and progress
- **Smooth Animations**: Framer-motion powered interactions
- **Responsive Layout**: Sidebar navigation on desktop, bottom nav on mobile

## 🎨 Design Philosophy

No AI slop here. This is pure gothic elegance:
- Ornate dividers ❧❦
- Velvet crimson gradients
- Metallic gold accents
- Gothic typography (Playfair Display)
- Dark surfaces with glassmorphism effects

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
cd projects/second-brain-gothic
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see your gothic sanctuary.

### Production Build

```bash
npm run build
npm run start
```

## 📁 Vault Integration

Set the VAULT_DIR environment variable to point to your Obsidian vault:

```bash
export VAULT_DIR=/path/to/your/vault
npm run dev
```

## 🎭 Components

### Key Sections

1. **Home/Dashboard** (`/`)
   - Knowledge graph visualization
   - Quick stats and navigation

2. **Notes** (`/notes`)
   - Browse all markdown files
   - Rich text reading
   - Search functionality

3. **Skills** (`/skills`)
   - Track acquired abilities
   - XP progression system
   - Locked content reveal

4. **Graph** (`/graph`)
   - Full-screen knowledge visualization
   - Interactive node exploration

### Navigation

- **Desktop**: Left sidebar with icon navigation
- **Mobile**: Bottom tab bar + hamburger menu

## 🛠️ Tech Stack

- **Framework**: Next.js 14 App Router
- **Styling**: Tailwind CSS with custom gothic theme
- **Animations**: Framer Motion
- **Graph**: vis-network
- **Icons**: Lucide React

## 🎨 Customization

### Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  gothic: { black: '#0a0a0a', ... },
  crimson: { deep: '#2d0f16', blood: '#8b0000', ... },
  gold: { antique: '#d4af37', muted: '#8b7b38', ... }
}
```

### Fonts
Add more fonts in `app/globals.css`.

## 📱 Mobile Optimization

- Touch-friendly button sizes (min 44px)
- Bottom navigation for easy one-handed use
- Optimized animations for performance
- Safe area padding for notched devices

## 🔮 Future Enhancements

- [ ] Export capabilities (PNG/SVG/graph export)
- [ ] Advanced filtering & search
- [ ] Real-time collaboration
- [ ] AI-powered insights
- [ ] History/undo functionality
- [ ] Template library
- [ ] Plugin system

## 🎯 Testing Checklist

Before deployment:
- [ ] Test on iOS Safari
- [ ] Test on Android Chrome
- [ ] Verify touch gestures
- [ ] Check animation smoothness
- [ ] Validate responsive breakpoints
- [ ] Test keyboard navigation (desktop)
- [ ] Verify accessibility (contrast, focus states)

## 📝 License

Private project - all rights reserved

---

*Created with dark magic and gothic elegance* 🖤
