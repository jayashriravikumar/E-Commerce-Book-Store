# E-Commerce Book Store

Full-stack e‑commerce sample for books with advanced product filtering, JWT auth, and a clean React + Express + MongoDB architecture.

## Features

- Responsive React frontend (Vite + Tailwind) with:
  - Product filter sidebar (category, brand, price, rating, availability, discount, color, size, new arrivals, best seller)
  - Active filter tags, URL query persistence, pagination, and skeleton loading
  - Cart, checkout, and orders pages (JWT-protected endpoints)
- Node.js + Express backend with MongoDB:
  - `GET /api/products` with server-side filtering and pagination
  - `POST /api/products`, `GET /api/products/:id`, `PUT/DELETE /api/products/:id`
  - Orders endpoint `POST /api/orders` (authenticated) and `GET /api/orders` (user orders)
  - Query builder with in-memory fallback catalog

## Tech Stack

- Frontend: React, Vite, Tailwind CSS (index.css), Axios, React Router
- Backend: Node.js, Express, Mongoose, JWT for authentication
- Database: MongoDB (local or Atlas)

## Repo structure

- `Backend/` — Express API, models, controllers, routes, seeder
- `Frontend/` — React app, components, pages, styles

## Prerequisites

- Node.js (>=18 recommended)
- npm or yarn
- MongoDB (local running on default port, or a MongoDB Atlas connection URI)

---

## Backend — setup & run

1. Open a terminal and install dependencies:

```bash
cd Backend
npm install
```

2. Copy and edit environment file `Backend/config/config.env` (a sample already exists). Important vars:

```
PORT=5000
DB_URI=mongodb://127.0.0.1:27017/bookstore
JWT_SECRET_KEY=your_jwt_secret_here
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7
```

3. (Optional) Seed the database with books and generated product catalog:

```bash
npm run seed:books
```

4. Run server in development:

```bash
npm run dev
# or for production
npm start
```

Server runs on `http://localhost:5000` by default (see `PORT`).

---

## Frontend — setup & run

1. Install dependencies and start dev server:

```bash
cd Frontend
npm install
npm run dev
```

2. The frontend expects an API base URL. Configure `VITE_API_BASE_URL` in your environment or start the backend on `http://localhost:5000`.

Open the app at the URL Vite prints (usually `http://localhost:5173`).

---

## Important Scripts

- Backend
  - `npm run dev` — start backend with nodemon
  - `npm start` — run production server
  - `npm run seed:books` — seed books & product records
- Frontend
  - `npm run dev` — start Vite dev server
  - `npm run build` — build frontend for production

---

## API Reference (examples)

- Get products with filters (server-side filtering & pagination):

```
GET /api/products
GET /api/products?keyword=react&category=Technology&brand=OReilly
GET /api/products?minPrice=100&maxPrice=500&rating=4
GET /api/products?color=Blue,Red&size=M
GET /api/products?page=2&limit=12
```

- Single product:

```
GET /api/products/:id
```

- Orders (authenticated):

```
POST /api/orders  -- create order (Bearer token)
GET /api/orders   -- list user orders (Bearer token)
```

Authentication: the backend expects a `Authorization: Bearer <token>` header for protected routes and also supports cookie fallback.

---

## Product Filtering Behavior

- Frontend builds filter state from URL query parameters and sends them to `GET /api/products`.
- Query parameters supported: `keyword, category, brand, minPrice, maxPrice, rating, availability, discount, color, size, newArrivals, bestSeller, page, limit`.
- Backend `buildProductQuery()` normalizes parameters to a Mongoose filter supporting `$in`, range queries, regex searches and boolean flags.

---

## Development notes & tips

- If MongoDB is not available, the backend falls back to a generated product catalog in `Backend/utils/productCatalog.js`.
- Add indexes for high-traffic production fields (already configured on `brand`, `stock`, `discount`, `isNewArrival`, `isBestSeller`, etc.).
- Use `JWT_SECRET_KEY` long, random value in production and set `DB_URI` to a managed MongoDB (Atlas) instance.

---

## Deploying

- Build the frontend (`cd Frontend && npm run build`) and serve the static assets with a CDN or a static host.
- Host the backend on a Node-friendly host (Heroku, Render, Railway, VPS) and point `DB_URI` to a production MongoDB instance.

---

## Contributing

Please open issues or PRs. Follow existing code style in `Frontend/src` and `Backend/`.

---

## License

This project is provided as-is. Add a license file if you plan to publish it.
# E-Commerce-Website