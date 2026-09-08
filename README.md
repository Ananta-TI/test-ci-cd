# cicd-react

Aplikasi web React minimal yang dibuat khusus sebagai **latihan CI/CD**. Proyek ini sengaja dibuat sesederhana mungkin — hanya satu halaman statis — supaya fokus utamanya ada pada pipeline build, test, dan deployment.

[![GitLab CI](https://gitlab.com/ananta-ti/test-ci-cd/badges/main/pipeline.svg)](https://gitlab.com/ananta-ti/test-ci-cd/pipelines)
[![GitHub Actions CI/CD](https://github.com/Ananta-TI/test-ci-cd/actions/workflows/ci.yml/badge.svg)](https://github.com/Ananta-TI/test-ci-cd/actions/workflows/ci.yml)
[![GitHub Actions Docker](https://github.com/Ananta-TI/test-ci-cd/actions/workflows/docker.yml/badge.svg)](https://github.com/Ananta-TI/test-ci-cd/actions/workflows/docker.yml)

## Teknologi

- [React](https://react.dev) 19
- [Vite](https://vitejs.dev) 8
- [NGINX](https://nginx.org) (untuk serving hasil build di Docker)
- ESLint 10

## Menjalankan Secara Lokal

```bash
npm install     # install dependencies
npm run dev     # dev server dengan HMR (http://localhost:5173)
npm run build   # build ke folder dist/
npm run lint    # jalankan ESLint
npm run preview # pratinjau hasil build (http://localhost:4173)
```

t


## Menjalankan dengan Docker

```bash
docker compose up --build
```

Container `test-ci-cd` akan berjalan di **http://localhost:8080** (NGINX menyajikan file statis dari hasil build). `nginx.conf` mengonfigurasi fallback SPA ke `index.html`, dan `vite.config.js` menggunakan `base: './'` agar aset memakai path relatif (cocok untuk deployment GitHub Pages).

## Pipeline CI/CD

Proyek ini memiliki **tiga pipeline** terpisah untuk latihan:

### 1. GitLab CI (`.gitlab-ci.yml`)

Pipeline GitLab paling sederhana, memakai image `node:22` dengan dua stage:

| Stage | Script |
|---|---|
| `install` | `npm ci` |
| `build` | `npm run build` |

### 2. GitHub Actions — CI/CD (`.github/workflows/ci.yml`)

Berjalan pada push/PR ke `main`. Dua job:

- **`build`** — setup Node.js 20, `npm ci`, `npm run build`, lalu mengunggah folder `dist/` sebagai artifact Pages.
- **`deploy`** (membutuhkan `build`) — deploy otomatis hasil build ke **GitHub Pages** menggunakan `actions/deploy-pages`.

### 3. GitHub Actions — Docker (`.github/workflows/docker.yml`)

Berjalan pada push/PR ke `main`. Satu job `docker`:

- Login ke **GitHub Container Registry (GHCR)** dengan `GITHUB_TOKEN`.
- Build image Docker (multi-stage: build dengan `node:20-alpine`, serve dengan `nginx:alpine`).
- Push image ke **`ghcr.io/ananta-ti/cicd-react:latest`**.

## Struktur Proyek

```
.
├── .github/workflows/   # GitHub Actions: ci.yml (Pages) & docker.yml (GHCR)
├── .gitlab-ci.yml       # Pipeline GitLab CI
├── Dockerfile           # Multi-stage: build Node → serve NGINX
├── docker-compose.yml   # Jalankan container di port 8080
├── nginx.conf           # Konfigurasi NGINX (SPA fallback)
├── vite.config.js       # Konfigurasi Vite (base: './')
└── src/                 # Kode aplikasi React
    ├── App.jsx          # Halaman utama
    └── main.jsx         # Entry point React
```

> Last updated: 2026