import { useEffect, useRef, useState } from 'react'
import { animate } from 'animejs'
import { Reveal } from './MotionSystem'
import { cn } from '../lib/utils'

function useCountUp(ref, value, enabled) {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return undefined

    const state = { v: 0 }
    const decimals = Number(value) % 1 !== 0 ? 1 : 0
    const anim = animate(state, {
      v: value,
      duration: 1600,
      ease: 'outExpo',
      onUpdate: () => {
        el.textContent = state.v.toFixed(decimals).replace('.', ',')
      },
    })
    return () => anim.cancel()
  }, [ref, value, enabled])
}

function StatCell({ value, suffix, label, enabled, delay = 0 }) {
  const ref = useRef(null)
  useCountUp(ref, value, enabled)

  return (
    <Reveal delay={delay} className="stat">
      <div className="stat-value">
        <span ref={ref}>0</span>
        <span data-suffix={suffix} className="text-accent">
          {suffix}
        </span>
      </div>
      <div className="stat-label">{label}</div>
    </Reveal>
  )
}

export default function Stats({ items, className }) {
  const wrapRef = useRef(null)
  const [inView] = useInViewOnce(wrapRef)

  return (
    <div
      ref={wrapRef}
      className={cn(
        'grid grid-cols-1 gap-10 border-y border-line py-14 sm:grid-cols-3',
        className,
      )}
    >
      {items.map((s, i) => (
        <StatCell key={s.label} {...s} enabled={inView} delay={i * 0.08} />
      ))}
    </div>
  )
}

function useInViewOnce(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return [inView, setInView]
}