import { umkm } from '../../data/content'
import { Reveal } from '../MotionSystem'
import { LiquidGlass, TiltCard } from '../AnimatedContent'

export default function UmkmSection() {
  return (
    <section className="section">
      <div className="container-x">
        <Reveal>
          <LiquidGlass className="band-dark liquid overflow-hidden p-8 md:p-14">
            <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <span className="eyebrow">{umkm.eyebrow}</span>
                <h2 className="display mt-4 text-[clamp(32px,5vw,58px)]">{umkm.title}</h2>
                <p className="mt-5 max-w-lg leading-relaxed text-muted md:text-lg">{umkm.desc}</p>

                <div className="mt-8 flex flex-wrap gap-2.5">
                  {umkm.perks.map((perk) => (
                    <span key={perk} className="tag-pill">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {perk}
                    </span>
                  ))}
                </div>
              </div>

              <TiltCard max={8} className="justify-self-center lg:justify-self-end">
                <div className="w-full max-w-sm rounded-xl border border-line bg-canvas p-8 text-center shadow-card">
                  <div className="display text-6xl" style={{ color: 'var(--link)' }}>{umkm.stat.value}{umkm.stat.suffix}</div>
                  <div className="mt-2 text-sm text-body">{umkm.stat.label}</div>
                  <div className="mt-6 h-px bg-line" />
                  <p className="mt-6 text-sm leading-relaxed text-muted">
                    “Dulu saya ragu pindah ekspedisi. Sekarang Lancar yang mengurus semuanya — saya tinggal jualan.”
                  </p>
                  <div className="mt-5 text-xs uppercase tracking-[0.2em] text-faint">
                    — penjual kerajinan, Yogyakarta
                  </div>
                </div>
              </TiltCard>
            </div>
          </LiquidGlass>
        </Reveal>
      </div>
    </section>
  )
}