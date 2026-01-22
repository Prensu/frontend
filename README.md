# Shikali Threads – Frontend

An ecommerce frontend built with React and Vite, featuring a product catalog, cart, checkout, and lightweight local-only authentication.

## Stack
- React 18 + Vite 6 (module bundler/dev server)
- React Router 7 (client-side routing)
- Tailwind CSS 3 (utility styling) + custom `index.css`
- Framer Motion (micro animations)
- React Toastify (notifications)
- Local state via React Context (ShopContext) with localStorage persistence for auth and orders

## Features
- Catalog browsing with search, filters, and product detail pages.
- Cart management (sizes/quantities) with running totals and checkout flow.
- Simple auth (signup/login/logout) stored locally; routes like checkout/orders are protected.
- Orders view fed from local cart data; payment options are UI-only (Stripe/Razorpay/COD selection, no gateway calls).
- Responsive layout with mobile-friendly nav and payment picker.

## Project Structure
- `src/main.jsx` – app bootstrap with Router and `ShopContextProvider`.
- `src/App.jsx` – route definitions and global chrome (navbar, footer, search, chatbot).
- `src/context/ShopContext.jsx` – products, cart, orders, auth, and helpers.
- `src/pages/` – page-level screens (Home, Collection, Product, Cart, PlaceOrder, Orders, Login, About, Contact).
- `src/components/` – shared UI (Navbar, CartTotal, RequireAuth, etc.).
- `src/assets/` – static product data and imagery.

## Scripts
- `npm install` – install dependencies.
- `npm run dev` – start Vite dev server.
- `npm run build` – production build.
- `npm run preview` – preview the production build.
- `npm run lint` – run ESLint.

## Auth & Data Notes
- Authentication is purely client-side and stored in `localStorage`; it is not secure for production.
- Orders and cart data are also local; there is no backend or payment processing.
- Payment method selection is cosmetic; integrate a real provider before live use.

## Quick Start
```bash
npm install
npm run dev
# open the shown localhost URL
```
