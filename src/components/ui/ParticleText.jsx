import { useEffect, useRef } from 'react'

const MAX_PARTICLES = 4200

/**
 * Interactive text rendered as particles on a canvas.
 * - Hover: particles repel away from the pointer
 * - Click: burst outward, then spring back into the letters
 * The same text is layered on top as an invisible label for a11y.
 */
export default function ParticleText({ text, className, fontSize = 120, gap = 3, speed = 0.035 }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return undefined
    const ctx = canvas.getContext('2d')

    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    let particles = []
    let raf = 0
    let running = true
    let mouse = { x: -1e4, y: -1e4, active: false }

    const css = getComputedStyle(document.documentElement)
    const ink = css.getPropertyValue('--ink').trim() || '#f2f1ec'
    const accent = css.getPropertyValue('--accent').trim() || '#d7ff3e'

    const randomColor = () => (Math.random() < 0.12 ? accent : ink)

    function sample() {
      const rect = wrap.getBoundingClientRect()
      const w = Math.max(rect.width, 1)
      const h = Math.max(rect.height, 1)
      canvas.width = w * DPR
      canvas.height = h * DPR
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)

      const off = document.createElement('canvas')
      off.width = w
      off.height = h
      const octx = off.getContext('2d')
      octx.fillStyle = '#fff'
      octx.font = `800 ${fontSize}px "Satoshi Variable", system-ui, sans-serif`
      octx.textAlign = 'center'
      octx.textBaseline = 'middle'
      octx.fillText(text, w / 2, h / 2 + fontSize * 0.02)

      const img = octx.getImageData(0, 0, w, h).data
      const next = []
      const step = Math.max(gap, 1)
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const i = (y * w + x) * 4
          if (img[i + 3] > 128) {
            next.push({
              x: Math.random() * w,
              y: Math.random() * h,
              tx: x,
              ty: y,
              r: 0.9 + Math.random() * 1.4,
              color: randomColor(),
              vx: 0,
              vy: 0,
            })
            if (next.length >= MAX_PARTICLES) break
          }
        }
        if (next.length >= MAX_PARTICLES) break
      }
      particles = next
    }

    function tick() {
      if (!running) return
      const w = canvas.width / DPR
      const h = canvas.height / DPR
      ctx.clearRect(0, 0, w, h)

      const repelR = 110
      const spring = speed
      const damp = 0.86

      for (const p of particles) {
        const dx = p.tx - p.x
        const dy = p.ty - p.y
        p.vx += dx * spring
        p.vy += dy * spring

        if (mouse.active) {
          const mdx = p.x - mouse.x
          const mdy = p.y - mouse.y
          const d2 = mdx * mdx + mdy * mdy
          if (d2 < repelR * repelR && d2 > 0.01) {
            const d = Math.sqrt(d2)
            const force = ((repelR - d) / repelR) * 1.6
            p.vx += (mdx / d) * force
            p.vy += (mdy / d) * force
          }
        }

        p.vx *= damp
        p.vy *= damp
        p.x += p.vx
        p.y += p.vy

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true }
    }

    function onLeave() {
      mouse.active = false
    }

    function onDown() {
      for (const p of particles) {
        p.vx += (Math.random() - 0.5) * 14
        p.vy += (Math.random() - 0.5) * 14
      }
    }

    sample()
    raf = requestAnimationFrame(tick)
    canvas.addEventListener('pointermove', onMove, { passive: true })
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('pointerdown', onDown)
    const ro = new ResizeObserver(sample)
    ro.observe(wrap)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('pointerdown', onDown)
      ro.disconnect()
    }
  }, [text, fontSize, gap, speed])

  return (
    <div ref={wrapRef} className={className} style={{ position: 'relative', width: '100%' }}>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="block h-full w-full cursor-crosshair"
        style={{ height: '100%', minHeight: Math.round(fontSize * 1.08) }}
      />
      <span className="sr-only">{text}</span>
    </div>
  )
}