# Shikali Threads – Frontend

Modern ecommerce UI for Shikali Threads, built with React + Vite and tailored for a smooth cart-to-checkout flow.

🔗 Live demo: https://frontend-qmfto1mqb-prensus-projects.vercel.app/

## ✨ Highlights
- 🛍️ Browse: hero, collections grid, search/filter, product detail view.
- 🛒 Cart & Checkout: size/quantity control, running totals, delivery form, payment picker UI.
- 🔐 Auth: local signup/login/logout with protected checkout and orders (localStorage-backed).
- 📦 Orders: simple order history sourced from cart data.
- 📱 Responsive: mobile-first nav, search, and checkout layouts.

## 🛠️ Tech Stack
- ⚛️ React 18, ⚡ Vite 6, 🧭 React Router 7
- 🎨 Tailwind CSS 3 + custom `index.css`
- 🎬 Framer Motion (micro animations)
- 🔔 React Toastify (notifications)
- 🧠 State: React Context (`ShopContext`) with localStorage persistence

## 🗺️ Project Map
- `src/main.jsx` – app bootstrap with Router and `ShopContextProvider`.
- `src/App.jsx` – routes and global chrome (navbar, footer, search, chatbot).
- `src/context/ShopContext.jsx` – products, cart, orders, auth helpers.
- `src/pages/` – screens (Home, Collection, Product, Cart, PlaceOrder, Orders, Login, About, Contact).
- `src/components/` – shared UI (Navbar, CartTotal, RequireAuth, etc.).
- `src/assets/` – product data and imagery.

## 📜 Scripts
- `npm install` – install dependencies
- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview the production build
- `npm run lint` – run ESLint

## ⚠️ Notes
- Auth and orders are client-side only (localStorage); not production-secure.
- Payment methods are UI-only (Stripe/Razorpay/COD badges) with no gateway calls.
- Add a backend and real payment provider before going live.

## 🚀 Quick Start
```bash
npm install
npm run dev
# open the shown localhost URL
```
