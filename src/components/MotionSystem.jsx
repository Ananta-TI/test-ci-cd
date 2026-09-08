/* eslint-disable react-refresh/only-export-components */

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { cn } from '../lib/utils'

gsap.registerPlugin(ScrollTrigger)

/** Initialise Lenis smooth scrolling, synced with GSAP ScrollTrigger. */
export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])
}

/** Parallax a child element on scroll (GSAP ScrollTrigger scrub). */
export function Parallax({ speed = 0.12, className, children, as: Tag = 'div' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -speed * 100 },
        {
          yPercent: speed * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    })
    return () => ctx.revert()
  }, [speed])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

/** Fade/slide reveal when the element enters the viewport (motion). */
export function Reveal({ children, className, delay = 0, y = 32, once = true }) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Ambient glow that follows the cursor (spring-smoothed). */
export function CursorGlow() {
  const x = useMotionValue(-600)
  const y = useMotionValue(-600)
  const sx = useSpring(x, { stiffness: 90, damping: 24, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 90, damping: 24, mass: 0.6 })
  const left = useTransform(sx, (v) => `${v - 260}px`)
  const top = useTransform(sy, (v) => `${v - 260}px`)

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  return <motion.div className="cursor-glow" style={{ left, top }} aria-hidden />
}