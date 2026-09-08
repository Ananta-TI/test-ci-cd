import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { cn } from '../lib/utils'

/** 3D tilt-on-hover wrapper with a follow glare. */
export function TiltCard({ children, className, max = 9, glare = true, scale = 1.02 }) {
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 220,
    damping: 22,
  })
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 220,
    damping: 22,
  })
  const s = useSpring(useTransform(px, [0, 1], [1, scale]), { stiffness: 220, damping: 22 })
  const glareX = useTransform(px, (v) => `${v * 100}%`)
  const glareY = useTransform(py, (v) => `${v * 100}%`)
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(260px circle at ${gx} ${gy}, rgba(255,255,255,0.10), transparent 60%)`,
  )

  function onMove(e) {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }

  function onLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn('tilt-3d relative', className)}
      style={{ rotateX, rotateY, scale: s }}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  )
}

/** Glass panel with an animated liquid sheen. */
export function LiquidGlass({ children, className }) {
  return <div className={cn('glass liquid', className)}>{children}</div>
}

/** Image that gracefully falls back to a branded gradient tile. */
export function SmartImage({ src, alt, index, className, imgClassName }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className={cn('grid h-full w-full place-items-center', className)}>
        <div className="text-center">
          <div className="display text-5xl text-outline">{index}</div>
          <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">
            {alt || 'desain'}
          </div>
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt || ''}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn('h-full w-full object-cover', imgClassName)}
    />
  )
}