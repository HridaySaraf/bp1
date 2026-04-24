# Bhumita Petrochem - Digital Visiting Card

A static, frontend-only digital business card built with React 18 + Vite.

## Features
- Contact display with company branding
- Quick actions: Call, WhatsApp, Email, Instagram
- **Save Contact (vCard)** - Works on Android, iPhone, and Desktop
- **Share Card** - Web Share API with clipboard fallback
- Fully responsive & mobile-optimized design
- SEO optimized with Open Graph tags

## Tech Stack
- React 18.2
- Vite 5
- Tailwind CSS 3.4
- Framer Motion 11
- Lucide React & React Icons

## Local Development

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

Build output: `dist/`

## Deploy to Vercel

### Option 1: Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option 2: GitHub Integration
1. Push this folder to GitHub
2. Import project in Vercel Dashboard
3. Settings auto-detected from `vercel.json`
4. Deploy!

### Manual Settings (if needed)
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node.js Version**: 20.x

## Project Structure
```
frontend/
├── index.html          # Entry HTML
├── package.json        # Dependencies (Node 20.x)
├── vercel.json         # Vercel config
├── vite.config.js      # Vite config
├── tailwind.config.js  # Tailwind config
├── postcss.config.js   # PostCSS config
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx        # React entry
    ├── App.jsx         # App component
    ├── index.css       # Global styles
    └── components/
        └── DigitalCard.jsx
```

## No Backend Required
All features work client-side:
- vCard generated via JavaScript Blob API
- Share uses Web Share API with clipboard fallback
- All links are static external URLs

## Cross-Platform Compatibility
- ✅ Android (Chrome, Samsung Internet)
- ✅ iOS (Safari, Chrome)
- ✅ Desktop (Chrome, Firefox, Safari, Edge)
