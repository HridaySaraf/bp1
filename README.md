# Bhumita Petrochem - Digital Visiting Card

A static, frontend-only digital business card for Bhumita Petrochem.

## Features

- 📇 Contact info display (Pranay Shah, Director)
- 📞 Quick actions: Call, WhatsApp, Email, Instagram
- 💾 Save Contact (vCard download)
- 🔗 Share Card (Web Share API / Clipboard)
- 📍 Location: Mumbai, India
- 🌐 Website link

## Tech Stack

- React 18
- Tailwind CSS
- Framer Motion (animations)
- Lucide React & React Icons

## Local Development

```bash
cd frontend
yarn install
yarn start
```

## Build for Production

```bash
cd frontend
yarn build
```

Output will be in `frontend/build/` - ready to deploy to any static hosting.

## Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Set root directory: `frontend`
4. Build command: `yarn build`
5. Output directory: `build`

## Deploy to Netlify

1. Push to GitHub
2. Import in Netlify
3. Base directory: `frontend`
4. Build command: `yarn build`
5. Publish directory: `frontend/build`

## Deploy to GitHub Pages

```bash
cd frontend
yarn add gh-pages
# Add to package.json scripts: "deploy": "gh-pages -d build"
yarn build
yarn deploy
```

## No Backend Required

This is a fully static site. All features work client-side:
- vCard generated via JavaScript Blob API
- Share uses native Web Share API with clipboard fallback
- All links are static external URLs
