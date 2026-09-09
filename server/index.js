const path = require('path')
const express = require('express')
require('dotenv').config({ path: path.join(__dirname, '.env') })
const fs = require('fs')
const { app, initDB } = require('./app')

// Number() menangani PORT kosong/"0"/bukan angka dari environment ambient
const PORT = Number(process.env.PORT) || 3000
const distPath = path.join(__dirname, '..', 'dist')

// Sajikan hasil build Vite bila ada (jalankan `npm run build` dulu)
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

async function start() {
  try {
    await initDB()
  } catch (err) {
    // Jangan crash saat DB belum siap (mis. docker-compose cold start);
    // initDB dipanggil ulang otomatis di middleware pada tiap request.
    console.error('Initial DB init failed (will retry on request):', err.message)
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

start()
