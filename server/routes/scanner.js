const express = require('express')
const { pool } = require('../db')

const router = express.Router()

// Validasi & normalisasi ID hasil scan (alphanumeric, 1-64 karakter)
function normalizeId(rawId) {
  const id = String(rawId || '').trim()
  if (!id || id.length > 64 || !/^[A-Za-z0-9_-]+$/.test(id)) return null
  return id
}

function normalizeText(value, max = 100) {
  const text = String(value || '').trim()
  return text ? text.slice(0, max) : null
}

// GET /api/scanner/:id — cari data berdasarkan hasil scan
router.get('/:id', async (req, res) => {
  try {
    const id = normalizeId(req.params.id)
    if (!id) {
      return res.status(400).json({ message: 'ID tidak valid' })
    }

    const result = await pool.query(
      'SELECT id, nama, divisi, created_at, updated_at FROM scanner_items WHERE id = $1',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' })
    }

    res.json(result.rows[0])
  } catch (err) {
    console.error('Scanner get error:', err)
    res.status(500).json({ message: 'Gagal mengambil data scan' })
  }
})

// PUT /api/scanner/:id — update data kartu yang sudah ada
router.put('/:id', async (req, res) => {
  try {
    const id = normalizeId(req.params.id)
    if (!id) {
      return res.status(400).json({ message: 'ID tidak valid' })
    }

    const nama = normalizeText(req.body?.nama)
    const divisi = normalizeText(req.body?.divisi)
    if (!nama || !divisi) {
      return res.status(400).json({ message: 'Nama dan divisi wajib diisi' })
    }

    const result = await pool.query(
      `UPDATE scanner_items
       SET nama = $2, divisi = $3, updated_at = NOW()
       WHERE id = $1
       RETURNING id, nama, divisi, created_at, updated_at`,
      [id, nama, divisi]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' })
    }

    res.json(result.rows[0])
  } catch (err) {
    console.error('Scanner update error:', err)
    res.status(500).json({ message: 'Gagal mengubah data scan' })
  }
})

// POST /api/scanner — simpan data baru (upsert)
router.post('/', async (req, res) => {
  try {
    const id = normalizeId(req.body?.id)
    const nama = normalizeText(req.body?.nama)
    const divisi = normalizeText(req.body?.divisi)

    if (!id) {
      return res.status(400).json({ message: 'ID tidak valid' })
    }
    if (!nama || !divisi) {
      return res.status(400).json({ message: 'Nama dan divisi wajib diisi' })
    }

    const result = await pool.query(
      `INSERT INTO scanner_items (id, nama, divisi)
       VALUES ($1, $2, $3)
       ON CONFLICT (id) DO UPDATE SET nama = $2, divisi = $3, updated_at = NOW()
       RETURNING id, nama, divisi, created_at, updated_at`,
      [id, nama, divisi]
    )

    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('Scanner save error:', err)
    res.status(500).json({ message: 'Gagal menyimpan data scan' })
  }
})

module.exports = router
