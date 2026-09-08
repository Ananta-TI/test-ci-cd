import { useEffect, useRef, useState } from 'react'
import { animate } from 'animejs'
import { steps } from '../../data/content'
import SectionTitle from '../SectionTitle'
import { Reveal } from '../MotionSystem'

function StepNumber({ target, active }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!active) return undefined
    const el = ref.current
    const state = { v: 0 }
    const anim = animate(state, {
      v: target,
      duration: 900,
      delay: 400,
      ease: 'outBack(1.4)',
      onUpdate: () => {
        el.textContent = String(Math.round(state.v)).padStart(2, '0')
      },
    })
    return () => anim.cancel()
  }, [active, target])

  return (
    <span ref={ref} className="step-dot" aria-hidden>
      00
    </span>
  )
}

export default function HowItWorksSection() {
  const wrapRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="cara-kerja" className="section">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <SectionTitle
              index="03"
              eyebrow="Cara kerja"
              title={<>Tiga langkah. <span className="display-gradient">Nol kebingungan.</span></>}
              description="Dari menekan “buat resi” sampai paket di tangan penerima — semua terlihat dan bisa dipantau."
            />
          </div>

          <div ref={wrapRef} className="flex flex-col justify-center">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.12}>
                <div className="step">
                  <StepNumber target={i + 1} active={inView} />
                  <div>
                    <h3 className="step-title">{s.title}</h3>
                    <p className="step-meta">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}