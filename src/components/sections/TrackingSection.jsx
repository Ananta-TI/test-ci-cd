import { useState } from 'react'
import { trackingExample } from '../../data/content'
import SectionTitle from '../SectionTitle'
import { Reveal, Parallax } from '../MotionSystem'
import { TiltCard } from '../AnimatedContent'

export default function TrackingSection() {
  const [resi, setResi] = useState('')

  return (
    <section id="lacak" className="section">
      <div className="container-x">
        <SectionTitle
          index="04"
          eyebrow="Lacak paket"
          title={<>Satu resi, <span className="display-gradient">semua ekspedisi.</span></>}
          description="Masukkan nomor resi di bawah — atau langsung coba dengan contoh pelacakan."
        />

        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Widget */}
          <div>
            <Reveal>
              <form
                className="glass liquid flex items-center gap-2 p-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  value={resi}
                  onChange={(e) => setResi(e.target.value)}
                  placeholder="Contoh: LNC202608123456"
                  aria-label="Nomor resi"
                  className="w-full flex-1 rounded-2xl bg-transparent px-4 py-3 text-sm outline-none placeholder:text-faint"
                />
                <button type="submit" className="btn btn--primary btn--sm">
                  Lacak
                </button>
              </form>
              <p className="mt-3 text-xs text-faint">
                Demo — masukkan apa saja, timeline di bawah tetap berjalan.
              </p>
            </Reveal>

            <div className="glass mt-6 p-7">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-faint">Resi</div>
                  <div className="font-mono text-sm font-medium">LNC-2026-0812-3456</div>
                </div>
                <span className="tag-pill">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  Real-time
                </span>
              </div>

              {trackingExample.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.1} y={18}>
                  <div
                    className={`step ${s.done ? 'step--done' : ''} ${s.active ? 'step--active' : ''}`}
                  >
                    <span className="step-dot">{s.done ? '✓' : s.active ? '●' : i + 1}</span>
                    <div>
                      <div className="step-title">{s.title}</div>
                      <div className="step-meta">{s.meta}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Phone mockup */}
          <div className="relative flex justify-center py-10 lg:py-0">
            <Parallax speed={0.08} className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-[480px] w-[480px] rounded-full bg-violet/15 blur-[110px]" />
            </Parallax>

            <TiltCard max={12} className="relative">
              <div className="phone">
                <div className="phone-screen">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-faint">Lacak kiriman</div>
                      <div className="text-sm font-semibold">LNC-2026-0812-3456</div>
                    </div>
                    <span className="h-8 w-8 rounded-full bg-accent/10 text-center leading-8 text-xs font-medium text-accent">L</span>
                  </div>

                  <div className="rounded-2xl border border-line bg-surface p-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted">Estimasi tiba</span>
                      <span className="font-semibold">Hari ini · 17.30</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-strong">
                      <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-accent to-violet" />
                    </div>
                    <div className="mt-2 flex justify-between text-[10px] text-faint">
                      <span>Jakarta</span><span>Surabaya</span>
                    </div>
                  </div>

                  {trackingExample.slice(0, 3).map((s) => (
                    <div key={s.title} className={`step ${s.done ? 'step--done' : ''} ${s.active ? 'step--active' : ''}`}>
                      <span className="step-dot">{s.done ? '✓' : '●'}</span>
                      <div>
                        <div className="step-title">{s.title}</div>
                        <div className="step-meta">{s.meta}</div>
                      </div>
                    </div>
                  ))}

                  <div className="mt-auto rounded-2xl bg-accent p-4 text-center text-sm font-medium text-accent-ink">
                    Paket terlindungi · asuransi aktif
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  )
}