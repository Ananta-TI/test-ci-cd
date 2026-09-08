import { useRef } from 'react'
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useAnimationFrame,
  useMotionValue,
} from 'motion/react'
import { cn } from '../../lib/utils'

const defaults = {
  damping: 60,
  stiffness: 260,
  restDelta: 0.001,
}

/**
 * Dual-row horizontal marquee. The rows scroll in opposite directions;
 * scrolling the page speeds it up, and scrolling up reverses it.
 */
export default function ScrollVelocity({
  texts = ['Lancar'],
  velocity = 40,
  numCopies = 4,
  className,
  children,
}) {
  const baseX = useMotionValue(0)
  const rowARef = useRef(null)
  const rowBRef = useRef(null)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, defaults)
  const velocityFactor = useTransform(smoothVelocity, [-1500, 1500], [-1.4, 1.4], {
    clamp: false,
  })

  useAnimationFrame((_, delta) => {
    const factor = velocityFactor.get()
    baseX.set(baseX.get() + (velocity + factor * velocity) * (delta / 1000))

    const rowA = rowARef.current
    const rowB = rowBRef.current
    if (!rowA || !rowB) return
    // Each row is two identical halves; animating over one half loops seamlessly.
    const half = rowA.scrollWidth / 2
    const x = baseX.get() % half
    rowA.style.transform = `translate3d(${-x}px, 0, 0)`
    rowB.style.transform = `translate3d(${x}px, 0, 0)`
  })

  const row = (ref) => (
    <div ref={ref} className="flex w-max items-center gap-10 pr-10 will-change-transform">
      {Array.from({ length: numCopies }).map((_, i) => (
        <div key={i} className="flex items-center gap-10">
          {children ? (
            children
          ) : (
            <>
              {texts.map((t, j) => (
                <span
                  key={j}
                  className="text-outline display whitespace-nowrap text-[clamp(64px,12vw,160px)]"
                >
                  {t}
                </span>
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  )

  return (
    <div className={cn('relative flex flex-col gap-2 overflow-hidden py-4', className)} aria-hidden>
      <motion.div className="flex w-full flex-col gap-2 whitespace-nowrap">
        {row(rowARef)}
        {row(rowBRef)}
      </motion.div>
    </div>
  )
}