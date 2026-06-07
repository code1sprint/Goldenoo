<div align="center">

# GOLDENOO JEWELLERY

**Luxury gold and jewellery e-commerce experience**

Traditional Iranian goldsmithing meets modern technology — transparent gold pricing, interactive 3D product viewing, and a dedicated AI shopping consultant.

[![Deploy to GitHub Pages](https://github.com/code1sprint/Goldenoo/actions/workflows/deploy.yml/badge.svg)](https://github.com/code1sprint/Goldenoo/actions/workflows/deploy.yml)

</div>

---

## About

**Goldenoo** is a luxury gold and jewellery storefront built for the Iranian market. The interface is fully **right-to-left (RTL)** and in Persian (Farsi), delivering an experience comparable to a high-end physical gallery.

The project goes beyond a simple product showcase:

- Transparent pricing based on the **official Iranian gold guild formula** (raw gold + making fee + gallery profit + tax)
- **Live 18K gold rate** with automatic refresh
- **360-degree 3D viewing** for selected products
- **AI consultant** powered by Google Gemini for purchase guidance

---

## Preview

### Homepage — Hero

<img src="src/assets/images/%5BGoldenoo1%5D.png" alt="Goldenoo homepage hero section" width="100%" />

Cinematic banner with a diamond ring backdrop, purchase guarantees (stamped 18K gold, hologram invoice, insured shipping), and brand statistics.

---

### Smart Gold Calculator

<img src="src/assets/images/%5BGoldenoo2%5D.png" alt="Goldenoo gold price calculator" width="100%" />

Real-time final invoice calculation with a full breakdown (raw gold, making fee, 7% profit, 9% VAT) and a weekly price fluctuation chart.

---

### Product Showcase

<img src="src/assets/images/%5BGoldenoo3%5D.png" alt="Goldenoo product grid" width="100%" />

Product cards with ratings, weight, making fee percentage, live estimated price, and **360-degree viewing** for 3D models.

---

### Design Atelier & Craftsmanship Process

<img src="src/assets/images/%5BGoldenoo4%5D.png" alt="Goldenoo atelier section" width="100%" />

Interactive four-step production timeline: hand sketching, 3D modeling, centrifugal casting, and stone setting with final polish.

---

## Features

| Feature | Description |
|---------|-------------|
| **Product catalog** | 12 products across 6 categories: rings, necklaces, earrings, bracelets, sets, coins |
| **Dynamic pricing** | Price calculated from weight, making fee, gemstones, and live gold rate |
| **Gold calculator** | Invoice simulator respecting raw gold VAT exemption (Iranian guild law) |
| **Live rate ticker** | Refreshes every 14 seconds from the server API |
| **Shopping cart** | Add items with size and laser engraving options, quantity management |
| **Product details** | Modal with technical specs, size selection, and 3D viewer |
| **AI consultant** | Persian chat via Gemini 3.5 Flash, with preset fallback responses when no API key is set |
| **Atelier section** | Interactive timeline of the handmade production process |
| **Customer reviews** | Testimonial cards with scroll parallax animations |
| **Luxury design** | Dark and gold theme, Vazirmatn and Playfair Display fonts |

---

## Tech Stack

### Frontend
- **React 19** + **TypeScript**
- **Vite 6** — build tooling and HMR
- **Tailwind CSS 4** — styling
- **Motion** — animations and parallax
- **Three.js** + **React Three Fiber** + **Drei** — GLB model rendering
- **Lucide React** — icons

### Backend
- **Express 4** — unified server with Vite middleware in development
- **Google GenAI SDK** — AI consultant
- **dotenv** — environment variable management

---

## Project Structure

```
Goldenoo/
├── src/
│   ├── App.tsx                 # Root component and state management
│   ├── main.tsx
│   ├── index.css               # Tailwind theme and fonts
│   ├── types.ts                # Product, CartItem, Message types
│   ├── data/
│   │   └── products.ts         # 12 sample products
│   ├── components/
│   │   ├── Navbar.tsx          # Navigation and category filter
│   │   ├── Hero.tsx            # Parallax banner
│   │   ├── Categories.tsx      # Category filter
│   │   ├── ProductsList.tsx    # Product grid and pricing formula
│   │   ├── GoldCalculator.tsx  # Calculator and chart
│   │   ├── ProductDetailModal.tsx
│   │   ├── CartDrawer.tsx      # Slide-out shopping cart
│   │   ├── AiConsultant.tsx    # AI chat consultant
│   │   ├── AtelierSection.tsx  # Craftsmanship process
│   │   └── Jewellery3DViewer.tsx
│   └── assets/
│       ├── images/             # Images and screenshots
│       └── 3D/                 # GLB models
├── server.ts                   # API: gold-price, gemini/chat
├── vite.config.ts
├── index.html
└── .github/workflows/deploy.yml
```

---

## Local Setup

### Prerequisites

- **Node.js** 20 or later
- Google Gemini API key (optional — preset responses are used when the key is not set)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/code1sprint/Goldenoo.git
cd Goldenoo

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Set GEMINI_API_KEY in the .env file

# 4. Start the development server
npm run dev
```

The app will be available at:

```
http://localhost:3000
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run Express + Vite in development mode |
| `npm run build` | Build frontend and bundle server for production |
| `npm run build:pages` | Static build for GitHub Pages |
| `npm run start` | Run production server |
| `npm run preview` | Preview Vite build |
| `npm run lint` | TypeScript check (`tsc --noEmit`) |

---

## API Endpoints

The Express server exposes two main endpoints:

### `GET /api/gold-price`

Returns a simulated 18K gold rate (Toman per gram):

```json
{
  "price18k": 3485000,
  "currency": "تومان (گرم ۱۸ عیار)",
  "lastUpdated": "2026-06-07T12:00:00.000Z"
}
```

### `POST /api/gemini/chat`

Send a message to the AI consultant:

```json
// Request
{ "message": "Suggest a gift for an anniversary under 70 million Tomans." }

// Response
{ "text": "..." }
```

> **Note:** On static hosting (GitHub Pages), API endpoints are not available. Run the Express server locally or deploy it separately to use the AI consultant and live gold rate.

---

## Pricing Formula

Final price for each gold product follows the Goldenoo gallery standard:

```
Total = [ (18K rate per gram + making fee) × weight ]
      + 7% gallery profit
      + 9% VAT (on making fee and profit — not on raw gold)
      + gemstone value
```

This logic is implemented in `ProductsList.tsx` and `GoldCalculator.tsx`.

---

## Deployment

### GitHub Pages (static)

Every push to the `main` branch triggers an automatic build and deploy:

```
https://code1sprint.github.io/Goldenoo/
```

> Only the static frontend is deployed. Server APIs (AI consultant and gold rate) require a separate Express deployment.

### Production with server

```bash
npm run build
NODE_ENV=production npm run start
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | No | Google Gemini API key for the AI consultant |
| `APP_URL` | No | Hosting URL (used by AI Studio) |
| `NODE_ENV` | No | Set to `production` to serve static files |

---

## UI Design

- **Color palette:** background `#0c0c0d`, gold accent `#dfb76c`
- **Fonts:** Vazirmatn (Persian text), Playfair Display (numbers and headings)
- **Direction:** full RTL with `direction: rtl`
- **Animations:** Hero parallax, scroll fade-in, skeleton loading states

---

## Sample Products

| Category | Count | Examples |
|----------|-------|----------|
| Rings | 4 | Royal diamond, exclusive 3D model, Artemis wave, Florence minimal |
| Necklaces | 2 | Elizabeth medallion, Cartier chain |
| Earrings | 2 | Venus pearl drop, Goldbox hoop |
| Bracelets | 2 | Tennis diamond, Van Cleef chain |
| Sets | 1 | Ruby and diamond bridal set |
| Coins | 1 | Full Bahar Azadi (Emami) coin |

---

## License

This project is released under the **Apache-2.0** license.

---

<div align="center">

Built for Goldenoo Jewellery Gallery

**[Live Demo](https://code1sprint.github.io/Goldenoo/)** · **[Report a Bug](https://github.com/code1sprint/Goldenoo/issues)**

</div>
