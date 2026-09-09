// Entry point untuk Vercel Functions (folder api/).
// Semua request /api/* di-rewrite ke sini oleh vercel.json, lalu URL asli
// dipulihkan dari query param ?path= sebelum diteruskan ke Express app.
// Dibungkus try/catch Vercel tidak perlu — error handler ada di server/app.js.

const { app } = require('../server/app')

function restoreOriginalUrl(req) {
  const queryIndex = req.url.indexOf('?')
  if (queryIndex === -1) return

  const params = new URLSearchParams(req.url.slice(queryIndex + 1))
  const originalPath = params.get('path')
  if (originalPath === null) return

  params.delete('path')
  const rest = params.toString()
  req.url = `/api/${originalPath}${rest ? `?${rest}` : ''}`
}

module.exports = async function handler(req, res) {
  restoreOriginalUrl(req)
  return app(req, res)
}
