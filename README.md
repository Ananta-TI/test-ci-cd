# Lancar CI/CD

Full-stack app: landing page CMS + USB scanner (RFID/barcode) untuk latihan CI/CD.

- **Frontend**: React 19 + Vite + Tailwind 4 (hash routing)
- **Backend**: Express + PostgreSQL (auth JWT, konten landing, data scanner)
- **Deploy**: Vercel (serverless), Render (web + Postgres), Docker

## Menjalankan di Lokal

```bash
npm install          # install dependencies (frontend + backend digabung di root)

npm run dev:api      # terminal 1: Express API di http://localhost:3000
npm run dev          # terminal 2: Vite dev server di http://localhost:5173
```

Vite sudah dikonfigurasi mem-proxy `/api/*` ke Express, jadi login, CMS, dan
scanner langsung berfungsi tanpa build.

> Butuh Postgres. Salin `.env.example` ke `server/.env` lalu sesuaikan koneksi,
> atau pakai `docker compose up db` untuk Postgres di localhost.

### Build produksi lokal

```bash
npm run build        # build frontend ke dist/
npm start            # Express menyajikan API + dist/ di http://localhost:3000
```

## Menjalankan dengan Docker

```bash
docker compose up --build
```

Aplikasi (frontend + API) berjalan di **http://localhost:8080**, Postgres di
localhost:5432. Skema database dibuat otomatis saat start.

## Deploy ke Vercel

1. Import repository ke Vercel (deteksi otomatis, tanpa setting tambahan).
2. Tambahkan environment variable:
   - `DATABASE_URL` — connection string Postgres (Neon/Supabase/Vercel Postgres)
   - `JWT_SECRET` — secret untuk token login

API berjalan sebagai Vercel Function (`api/index.js`); semua request `/api/*`
di-rewrite ke sana oleh `vercel.json`, sisanya di-fallback ke `index.html` (SPA).

## Deploy ke Render

`render.yaml` sudah berisi blueprint: web service (Node) + Postgres gratis.
Environment `DATABASE_URL` dan `JWT_SECRET` dikonfigurasi otomatis.

## Pipeline CI

- **GitHub Actions** (`.github/workflows/ci.yml`) — lint + syntax check server + build pada push/PR ke `main`. Docker image di-push ke GHCR oleh `docker.yml`.
- **GitLab CI** (`.gitlab-ci.yml`) — stage `lint` dan `build` (artifact `dist/`).

## Struktur Proyek

```
.
├── api/index.js          # Entry Vercel Function (mount server/app.js)
├── vercel.json           # Rewrites: /api/* → function, sisanya → SPA
├── server/               # Backend Express (CommonJS)
│   ├── app.js            # Definisi app: middleware + routing API
│   ├── index.js          # Entry lokal/Docker: static serving + listen
│   ├── db.js             # Pool Postgres + initDB (migrasi ringan)
│   ├── middleware/auth.js
│   └── routes/           # auth, landing, scanner
├── src/                  # Frontend React
│   ├── App.jsx           # Hash router + guard auth
│   ├── context/          # Auth, Theme, Landing (CMS state)
│   ├── components/scanner/  # USBScanner, ScanResult, UserForm
│   └── pages/            # Landing, Login, Register, Dashboard, Scanner
├── Dockerfile            # Build frontend → Node runtime (API + statis)
├── docker-compose.yml    # web + postgres
└── render.yaml           # Blueprint Render
```

> Last updated: 2026