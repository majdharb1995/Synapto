# SYNAPTO AI Systems

> Neural Automation for the Enterprise — Vite + React + Framer Motion

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build (http://localhost:4173)
npm run preview
```

## Requirements

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0 (or pnpm/yarn)

## Project Structure

```
synapto-ai-systems/
├── index.html              # SEO meta + Open Graph + fonts
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg         # Custom SYNAPTO hexagon favicon
└── src/
    ├── main.jsx            # React entry
    ├── App.jsx             # App shell + page router
    ├── context/
    │   └── AppContext.jsx  # Central state: lang, theme, navigation
    ├── data/
    │   └── translations.js # Full EN/AR dictionary
    ├── components/
    │   ├── Navbar.jsx      # Floating pill-style centered navbar
    │   ├── VisualCore.jsx  # Reusable AI Core Engine visual
    │   └── Footer.jsx
    ├── pages/
    │   ├── Home.jsx        # Landing page
    │   ├── Solutions.jsx   # 3 SaaS model cards
    │   ├── Workflow.jsx    # Step-by-step flow diagram
    │   ├── AILab.jsx       # Research lab + experiments
    │   ├── Contact.jsx     # Contact form + direct channels
    │   └── FeedbackForm.jsx # Star rating + n8n webhook
    └── styles/
        ├── theme.css       # Dark/Light theme variables
        ├── main.css        # Reset + base
        ├── App.css         # Main layout + responsive
        └── feedback.css    # Feedback page styles
```

## Features

- ✅ **Floating centered navbar** — pill-style, blur background, rounded
- ✅ **EN default + AR toggle** — full RTL support with arrow reversal
- ✅ **Dark/Light mode** — persisted in localStorage
- ✅ **Page transitions** — Framer Motion AnimatePresence
- ✅ **Responsive** — breakpoints at 360 / 414 / 480 / 640 / 768 / 1024 / 1280 / 1440 / 1920
- ✅ **Mobile menu** — slide-in panel with body-scroll lock
- ✅ **Accessibility** — ARIA labels, focus rings, keyboard nav, reduced-motion
- ✅ **SEO** — meta tags, Open Graph, Twitter Cards, favicon

## Pages Overview

| Page | Route (state) | Description |
|------|---------------|-------------|
| Home | `home` | Hero with title, description, CTA buttons, trust badges |
| Solutions | `solution` | 3 SaaS model cards with launch + preview actions |
| Workflow | `workflow` | Visual step diagram (4 nodes with connectors) |
| AI Lab | `ailab` | Stats grid + 3 experiment cards with status badges |
| Contact | `contact` | Form (name/email/company/message) + direct channels |
| Feedback | `feedback` | Star rating + email/telegram + n8n webhook integration |

## Customization

### Change brand colors
Edit `src/styles/theme.css`:
```css
:root {
  --cyan: #00f3ff;        /* Primary brand color */
  --cyan-bright: #33ffdd; /* Hover state */
}
```

### Add a new page
1. Create `src/pages/MyPage.jsx`
2. Add translation keys in `src/data/translations.js` (both `en` and `ar`)
3. Add nav item in `src/components/Navbar.jsx` (`navItems` array)
4. Add case in `src/App.jsx` (`renderPage` switch)

### Change n8n webhook URL
Edit `src/pages/FeedbackForm.jsx`:
```js
const N8N_WEBHOOK_URL = 'https://your-webhook-url';
const BOT_USERNAME = 'YourTelegramBot';
```

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Vite | ^5.4.0 | Build tool + dev server |
| React | ^18.3.1 | UI framework |
| Framer Motion | ^11.0.8 | Page transitions + animations |
| Lucide React | ^0.344.0 | Icons |

## Browser Support

- Chrome / Edge ≥ 90
- Firefox ≥ 88
- Safari ≥ 14
- Mobile Safari / Chrome Mobile ≥ 14

## License

© 2026 Synapto AI Systems. Designed & Built by Majd Harb.
