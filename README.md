<div align="center">

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![CheapShark API](https://img.shields.io/badge/CheapShark_API-No_Key_Required-00CC66?style=for-the-badge)](https://apidocs.cheapshark.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<h1>🎮 Deal Hunter</h1>
<h3>Never overpay for a PC game again.</h3>

<p><em>Real-time discounts from Steam & Epic Games · Price history · Custom alerts · Zero backend</em></p>

**[🚀 Try Deal Hunter Live — No Login Required](https://deal-hunter-nine-psi.vercel.app/)**

</div>

---

## 🎯 What Problem Does This Solve?

PC gamers miss deals constantly. Steam has tens of thousands of games with prices changing daily. Epic Games gives free games weekly that are easy to miss. Checking both stores manually is tedious, and browser tabs don't tell you if this is actually a good deal or just a mild discount.

**Deal Hunter** solves this in one dark, fast, glanceable interface:
- See the **highest discounts right now** across both stores
- Know the **all-time lowest price** for any game before you buy
- Set a **price alert** so you're notified when your wishlist game hits your budget
- Check the **Turkish Lira price** in one click (relevant regional pricing)

No backend. No API key. No account. Just open it and start saving money.

---

## 👥 Who This Is For

- **PC gamers** who buy games on sale and don't want to miss deals
- **Budget-conscious shoppers** who want to know if a discount is actually worth it
- **Turkish market users** who need localized TRY pricing for Steam purchases
- **Developers** learning React/Vite frontend patterns with a real-world public API integration

---

## ⚡ Key Benefits

- **Instant:** No backend server — the app calls the CheapShark API directly from your browser
- **No registration required:** No API keys, no accounts, just clone and run
- **Smart filtering:** Live search by title + dynamic price range slider
- **Price intelligence:** All-time low price shown in an expanding popover for every game
- **Price alerts:** Set custom alert thresholds, saved locally — never miss a target price again
- **Premium feel:** Dark glassmorphism design with neon accents and smooth animations
- **Fully responsive:** Desktop, tablet, and mobile — all pixel-perfect

---

## 🌟 Features

| Feature | Description |
|---|---|
| 🔥 **Real-Time Discounts** | Fetches the highest current discounts via CheapShark API instantly |
| 🏪 **Store Integration** | Steam and Epic Games deals in one unified view |
| 🔍 **Live Title Search** | Filter any game by name as you type |
| 💰 **Price Range Slider** | Dynamic budget control — only show deals you can afford |
| 📉 **Price History** | Expanding popover shows the all-time lowest price recorded for each game |
| 🇹🇷 **TR Pricing** | One-click fetch for current Turkish Lira pricing on Steam |
| 🔔 **Price Alerts** | Set custom price targets, saved to localStorage — persistent across sessions |
| ⭐ **Review Scores** | Steam review summaries and positive percentage scores |
| 🌙 **Dark Glassmorphism UI** | Neon accents, frosted glass cards, smooth hover animations |
| 📱 **Fully Responsive** | Works flawlessly on desktop, tablet, and mobile |

---

## 🛠️ Technical Architecture

```
Deal Hunter
│
├── Frontend (React + Vite)
│   ├── Component architecture with React Hooks
│   ├── Lucide React icons
│   └── Custom CSS Design System (CSS Variables, no framework)
│
├── Data Layer
│   ├── CheapShark API — real-time game deals (no key required)
│   ├── Steam Store API — Turkish Lira regional pricing
│   └── localStorage — price alerts persistence
│
└── Build & Deploy
    ├── Vite (ultra-fast HMR dev server + production bundle)
    └── Vercel (live at deal-hunter-nine-psi.vercel.app)
```

**Tech Stack:**
- [React](https://reactjs.org/) (Hooks & Components)
- [Vite](https://vitejs.dev/) (Build tool & dev server)
- Vanilla CSS (Custom design system with CSS variables)
- [Lucide React](https://lucide.dev/) (Icon set)
- [CheapShark API](https://apidocs.cheapshark.com/) (Game deals data — free, no key required)

---

## 🚀 Getting Started

This project has zero backend and requires no API keys. Clone, install, and start saving money.

### Prerequisites
- Node.js v16 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/oguzemirtopuz/deal-hunter.git
cd deal-hunter

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. That's it.

---

## 🗺️ Roadmap

- [ ] GOG.com integration
- [ ] Historical price chart (30-day graph per game)
- [ ] Browser extension for inline deal alerts on Steam pages
- [ ] Dark/light mode toggle
- [ ] Wishlist sync with Steam public wishlists

---

## 🤝 Contributing

Contributions welcome. Good first issues:
- Adding new store integrations (GOG, Humble)
- Implementing dark/light mode
- Improving mobile layout

---

## 📄 License

MIT License. See `LICENSE` for details.

---

<div align="center">
  <sub>Built by <a href="https://github.com/oguzemirtopuz">Oğuz Emir Topuz</a></sub>
  <br/>
  <sub>⭐ If this saved you money on a game, give it a star.</sub>
</div>
