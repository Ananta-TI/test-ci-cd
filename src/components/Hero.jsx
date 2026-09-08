import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { hero, marqueeWords } from '../data/content'
import { useTheme } from '../context/ThemeContext'
import ParticleText from './ui/ParticleText'
import ScrollVelocity from './ui/ScrollVelocity'
import { TiltCard } from './AnimatedContent'

export default function Hero() {
  const rootRef = useRef(null)
  const { theme } = useTheme()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-mesh', { opacity: 0, duration: 1.2 })
        .from('.hero-eyebrow', { y: 24, opacity: 0, duration: 0.7 }, '-=0.8')
        .from('.hero-particle', { opacity: 0, scale: 0.96, duration: 1 }, '-=0.35')
        .from('.hero-title', { y: 60, opacity: 0, duration: 0.9 }, '-=0.55')
        .from('.hero-desc', { y: 32, opacity: 0, duration: 0.7 }, '-=0.55')
        .from('.hero-cta', { y: 24, opacity: 0, stagger: 0.08, duration: 0.6 }, '-=0.45')
        .from(
          '.hero-chip',
          { y: 60, opacity: 0, rotate: 0, stagger: 0.12, duration: 0.8, ease: 'back.out(1.6)' },
          '-=0.3',
        )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="beranda"
      ref={rootRef}
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      {/* Mesh gradient — the brand's atmospheric backdrop, hero scale only */}
      <div className="mesh hero-mesh" aria-hidden />

      <div className="container-x relative z-10 flex flex-1 flex-col items-center justify-center pb-14 pt-32 text-center">
        <a href="#fitur" className="banner-pill hero-eyebrow">
          <span className="banner-tag">Baru</span>
          Lacak multi-ekspedisi dalam satu resi
          <span aria-hidden className="text-link">→</span>
        </a>

        <div className="hero-particle mt-5 w-full max-w-3xl">
          <ParticleText key={theme} text="Lancar" fontSize={132} />
        </div>

        <h1 className="display hero-title mt-1 text-[clamp(38px,5.5vw,64px)]">
          {hero.titleA} {hero.titleB} {hero.titleC}
        </h1>

        <p className="hero-desc mt-5 max-w-xl text-base leading-relaxed text-body md:text-lg">
          {hero.description}
        </p>

        <div className="hero-cta mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#unduh" className="btn btn--primary">
            Unduh Aplikasi
            <span aria-hidden>→</span>
          </a>
          <a href="#lacak" className="btn btn--ghost">
            Lacak Paket
          </a>
        </div>

        {/* Floating 3D chips */}
        <div className="relative mt-16 h-[190px] w-full max-w-4xl sm:h-[210px]" aria-hidden>
          <TiltCard className="hero-chip absolute left-[2%] top-4 w-60 -rotate-6 sm:left-[6%]">
            <div className="glass p-5 text-left">
              <div className="text-xs uppercase tracking-widest text-muted">Status</div>
              <div className="mt-1 text-sm font-semibold">Dalam perjalanan</div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-strong">
                <div className="h-full w-[68%] rounded-full bg-accent" />
              </div>
              <div className="mt-2 text-xs text-muted">68% · menuju Surabaya</div>
            </div>
          </TiltCard>

          <TiltCard className="hero-chip absolute right-[2%] top-0 w-64 rotate-6 sm:right-[5%]">
            <div className="glass p-5 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-muted">Ongkir</span>
                <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">HEMAT</span>
              </div>
              <div className="mt-1 text-2xl font-semibold">Rp 12.500</div>
              <div className="mt-1 text-xs text-muted">JNE Reguler · estimasi 2 hari</div>
            </div>
          </TiltCard>

          <TiltCard className="hero-chip absolute bottom-0 left-[22%] w-60 rotate-2 sm:left-[30%]">
            <div className="glass p-5 text-left">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-[11px] text-accent-ink">✓</span>
                Paket terlindungi
              </div>
              <div className="mt-1.5 pl-8 text-xs text-muted">Asuransi aktif · Rp 2.000.000</div>
            </div>
          </TiltCard>
        </div>
      </div>

      {/* Velocity-driven marquee band */}
      <div className="relative z-10 border-y border-line bg-bg/40 backdrop-blur-sm">
        <ScrollVelocity texts={marqueeWords} velocity={50} className="mask-fade-x py-3" />
      </div>
    </section>
  )
}