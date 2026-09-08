# Design System — Lancar

Lancar adalah aplikasi pengiriman untuk UMKM Indonesia. Halaman ini adalah
landing page bergaya Vercel: kanvas terang, tinta hitam sebagai CTA tunggal,
gradien mesh multi-warna sebagai satu-satunya dekorasi — kalem, presisi, dan
penuh gerak halus.

## Prinsip

1. **Tinta hitam adalah target konversi** — satu tombol `--primary` untuk semua CTA utama.
2. **Gradien mesh adalah brand** — dipakai hanya di skala hero, tidak pernah dikecilkan.
3. **Tipografi tenang** — ceiling berat 600, sentence-case, tracking negatif agresif.
4. **Elevasi bertumpuk** — bayangan berlapis offset kecil + ring hairline inset, bukan drop-shadow tunggal.

## Tokens (Vercel-inspired)

| Token | Terang | Gelap (inversi) |
|---|---|---|
| `--canvas` | `#ffffff` | `#0b0b0b` |
| `--canvas-soft` | `#fafafa` | `#101010` |
| `--canvas-soft-2` | `#f5f5f5` | `#171717` |
| `--ink` | `#171717` | `#fafafa` |
| `--body` | `#4d4d4d` | `#b3b3b3` |
| `--mute` | `#888888` | `#6b6b6b` |
| `--hairline` | `#ebebeb` | `#262626` |
| `--link` | `#0070f3` | `#3291ff` |
| `--primary` (CTA) | `#171717` | `#fafafa` |
| `--on-primary` | `#ffffff` | `#171717` |
| `--violet` / `--cyan` | `#7928ca` / `#50e3c2` | sama |

Gradien mesh — tiga pasang: develop `#007cf0→#00dfd8`, preview `#7928ca→#ff0080`,
ship `#ff4d4d→#f9cb28`. Dipakai sebagai `.mesh` (backdrop hero, blur 46px,
mask radial). Tema dikelola `ThemeContext` (`src/context/ThemeContext.jsx`):
atribut `data-theme` di `<html>`, tersimpan di `localStorage`, default **terang**.

## Tipografi

- **Satoshi Variable** (`public/Satoshi-Variable.ttf`) — substitusi Geist (geometric sans, 400/500/600).
- Kelas `.display` → berat **600** (ceiling), `letter-spacing: -0.045em`, `line-height: 1.04`.
- **Mono** (`ui-monospace` stack) untuk lapisan teknis: eyebrow section, caption galeri, label footer.
- `.display-gradient` → gradien ink→link.
- `.text-outline` → teks outline (`-webkit-text-stroke`) untuk dekorasi besar.
- Skala judul section: `clamp(30px, 4.5vw, 52px)`; hero: `clamp(38px, 5.5vw, 64px)`.

## Efek & Library

| Efek | Library | Lokasi |
|---|---|---|
| Smooth scroll + sinkron ScrollTrigger | [Lenis](https://github.com/darkroomengineering/lenis) + GSAP | `MotionSystem.jsx` (`useSmoothScroll`) |
| Reveal & scrub parallax | GSAP ScrollTrigger | `MotionSystem.jsx` (`Reveal`, `Parallax`) |
| Micro-interaksi, menu, 3D hover | Motion (framer) | `AnimatedContent.jsx` (`TiltCard`) |
| Partikel interaktif (hero) | Canvas + Motion | `ui/ParticleText.jsx` |
| Marquee kecepatan-scroll | Motion values | `ui/ScrollVelocity.jsx` |
| Counter angka (stats, langkah) | Anime.js v4 | `Stats.jsx`, `HowItWorksSection.jsx` |
| Kaca cair (liquid glass) | CSS conic-gradient mesh (opacity rendah) | `AnimatedContent.jsx` (`LiquidGlass`) |
| Band polaritas-balik | `--primary` flip (gelap↔terang) | `.band-dark`, `UmkmSection` |
| Glare mengikuti kursor | Motion springs | `TiltCard`, `.card-spot` |
| Grain film + cursor glow | CSS/SVG noise, Motion | `MainLayout`, `index.css` |

## Komponen

- `Navbar` — pil kaca saat scroll, toggle tema animatif, menu mobile fullscreen dengan stagger.
- `SectionTitle` — eyebrow ber-index + judul besar + deskripsi, reveal konsisten.
- `Stats` — angka terhitung dengan Anime.js saat masuk viewport.
- `AnimatedContent` — `TiltCard` (3D + glare), `LiquidGlass`, `SmartImage` (fallback gradien).
- `Hero` — timeline GSAP, headline `ParticleText` interaktif, chip kaca 3D, marquee `ScrollVelocity`.
- `Footer` — wordmark outline raksasa.

## Aset

- `public/design/1.png … 17a.jpg` — tangkapan layar produk untuk `GalleriesSection`.
  Belum ada? `SmartImage` menampilkan placeholder gradien bernomor, dan section
  menampilkan petunjuk path-nya.
- `public/logo.png` — dihasilkan `node scripts/generate-logo.mjs` (pin gradien lime→violet).
- `public/Satoshi-Variable.ttf` — font display (Satoshi, lisensi bebas via Fontshare).
- `public/icons.svg` — sprite ikon sosial.

## Section & Alur

```
Hero → Stats → About → Features → HowItWorks → Tracking → Reasons
     → Safety → Testimonials → Galleries → Umkm → Download → Footer
```

Setiap section diberi index numerik (01–09) pada eyebrow untuk kesan editorial.