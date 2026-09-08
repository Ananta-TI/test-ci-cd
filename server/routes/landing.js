const express = require('express')
const { pool } = require('../db')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

// GET /api/landing - public, get all sections
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT section, content FROM landing_content ORDER BY section')
    const data = {}
    for (const row of result.rows) {
      data[row.section] = row.content
    }
    res.json(data)
  } catch (err) {
    console.error('Get landing error:', err)
    res.status(500).json({ message: 'Gagal mengambil data landing' })
  }
})

// GET /api/landing/:section - public, get one section
router.get('/:section', async (req, res) => {
  try {
    const { section } = req.params
    const result = await pool.query('SELECT content FROM landing_content WHERE section = $1', [section])
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Section tidak ditemukan' })
    }
    res.json(result.rows[0].content)
  } catch (err) {
    console.error('Get section error:', err)
    res.status(500).json({ message: 'Gagal mengambil section' })
  }
})

// PUT /api/landing/:section - auth required, update section
router.put('/:section', authMiddleware, async (req, res) => {
  try {
    const { section } = req.params
    const { content } = req.body

    if (!content || typeof content !== 'object') {
      return res.status(400).json({ message: 'Content harus berupa object' })
    }

    const result = await pool.query(
      `INSERT INTO landing_content (section, content, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (section) DO UPDATE SET content = $2, updated_at = NOW()
       RETURNING section, content, updated_at`,
      [section, JSON.stringify(content)]
    )

    res.json(result.rows[0])
  } catch (err) {
    console.error('Update section error:', err)
    res.status(500).json({ message: 'Gagal update section' })
  }
})

module.exports = router
