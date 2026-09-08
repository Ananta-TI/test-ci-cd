require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { initDB } = require('./db')
const authRoutes = require('./routes/auth')
const landingRoutes = require('./routes/landing')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/landing', landingRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

async function start() {
  try {
    await initDB()
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

start()
