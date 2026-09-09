const express = require('express')
const cors = require('cors')
const { initDB } = require('./db')
const authRoutes = require('./routes/auth')
const landingRoutes = require('./routes/landing')
const scannerRoutes = require('./routes/scanner')

const app = express()

app.disable('x-powered-by')
app.use(cors())
app.use(express.json())

// Ensure schema exists before the first request (runs once per process)
app.use(async (req, res, next) => {
  try {
    await initDB()
    next()
  } catch (err) {
    console.error('DB init error:', err)
    res.status(500).json({ message: 'Database tidak siap' })
  }
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRoutes)
app.use('/api/landing', landingRoutes)
app.use('/api/scanner', scannerRoutes)

// 404 untuk API yang tidak dikenal
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan' })
})

// Error handler terakhir (best practice untuk serverless)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  if (res.headersSent) return next(err)
  res.status(500).json({ message: 'Terjadi kesalahan pada server' })
})

module.exports = { app, initDB }
