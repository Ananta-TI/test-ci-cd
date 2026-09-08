const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'cicd_auth',
})

const defaultLandingContent = {
  hero: {
    badge: 'Pipeline CI/CD sedang aktif',
    title: 'Platform <gradient>CI/CD Modern</gradient> untuk Developer',
    description: 'Bangun, test, dan deploy aplikasi kamu dengan mudah. Integrasi seamless dengan GitHub Actions, Docker, dan infrastructure cloud modern.',
    ctaPrimary: { label: 'Mulai Sekarang', href: '#/login' },
    ctaSecondary: { label: 'Pelajari Lebih Lanjut', href: '#fitur' },
    stats: [
      { value: '99.9%', label: 'Uptime' },
      { value: '< 30s', label: 'Deploy Time' },
      { value: '10k+', label: 'Developers' },
    ],
  },
  features: {
    eyebrow: 'Fitur Unggulan',
    title: 'Semua yang kamu butuhkan untuk <gradient>deploy</gradient>',
    description: 'Solusi lengkap untuk pipeline CI/CD modern yang powerful namun sederhana.',
    items: [
      { icon: '🚀', title: 'Deploy Instan', desc: 'Push ke repository dan langsung ter-deploy. Tanpa konfigurasi rumit.' },
      { icon: '🔒', title: 'Keamanan Terjamin', desc: 'Autentikasi terintegrasi dengan enkripsi data end-to-end.' },
      { icon: '📊', title: 'Monitoring Real-time', desc: 'Pantau performa aplikasi dan pipeline CI/CD secara langsung.' },
      { icon: '🔄', title: 'Auto Scaling', desc: 'Infrastructure menyesuaikan otomatis sesuai kebutuhan traffic.' },
      { icon: '🌐', title: 'Global CDN', desc: 'Akses cepat dari mana saja dengan distribusi konten global.' },
      { icon: '💡', title: 'Developer Friendly', desc: 'Tooling modern yang dirancang untuk produktivitas developer.' },
    ],
  },
  steps: {
    eyebrow: 'Cara Kerja',
    title: 'Tiga langkah sederhana',
    items: [
      { num: '01', title: 'Connect Repository', desc: 'Hubungkan repository GitHub atau GitLab kamu' },
      { num: '02', title: 'Configure Pipeline', desc: 'Atur workflow CI/CD sesuai kebutuhan project' },
      { num: '03', title: 'Deploy & Monitor', desc: 'Push kode dan pantau deployment secara real-time' },
    ],
  },
  cta: {
    title: 'Siap memulai?',
    description: 'Bergabung dengan ribuan developer yang sudah menggunakan platform kami untuk pipeline CI/CD mereka.',
    button: { label: 'Daftar Gratis', href: '#/register' },
  },
  navbar: {
    brand: 'Lancar CI/CD',
    links: [
      { label: 'Fitur', href: '#fitur' },
      { label: 'Cara Kerja', href: '#cara-kerja' },
    ],
  },
  footer: {
    about: 'Platform CI/CD modern untuk developer. Bangun, test, dan deploy aplikasi dengan mudah.',
    columns: [
      {
        title: 'Produk',
        links: [
          { label: 'Fitur', href: '#fitur' },
          { label: 'Cara Kerja', href: '#cara-kerja' },
          { label: 'Dokumentasi', href: '#' },
          { label: 'API Reference', href: '#' },
        ],
      },
      {
        title: 'Perusahaan',
        links: [
          { label: 'Tentang', href: '#' },
          { label: 'Blog', href: '#' },
          { label: 'Karir', href: '#' },
          { label: 'Kontak', href: '#' },
        ],
      },
      {
        title: 'Dukungan',
        links: [
          { label: 'Help Center', href: '#' },
          { label: 'Status', href: '#' },
          { label: 'Syarat', href: '#' },
          { label: 'Privasi', href: '#' },
        ],
      },
    ],
    bottom: '© 2026 Lancar CI/CD. Seluruh hak cipta dilindungi.',
    location: 'Bandung',
  },
}

async function initDB() {
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS landing_content (
        section VARCHAR(50) PRIMARY KEY,
        content JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)

    for (const [section, content] of Object.entries(defaultLandingContent)) {
      await client.query(
        'INSERT INTO landing_content (section, content) VALUES ($1, $2) ON CONFLICT (section) DO NOTHING',
        [section, JSON.stringify(content)]
      )
    }

    console.log('Database initialized')
  } finally {
    client.release()
  }
}

module.exports = { pool, initDB }
