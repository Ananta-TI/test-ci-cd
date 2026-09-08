import { safety } from '../../data/content'
import SectionTitle from '../SectionTitle'
import { Reveal } from '../MotionSystem'
import { LiquidGlass, TiltCard } from '../AnimatedContent'

export default function SafetySection() {
  return (
    <section id="keamanan" className="section">
      <div className="container-x">
        <SectionTitle
          index="06"
          eyebrow="Keamanan"
          title={<>Paketmu <span className="display-gradient">dijaga seperti punya kami.</span></>}
          description="Standar keamanan yang kami terapkan — dan yang bisa kamu buktikan sendiri di setiap kiriman."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          <Reveal className="lg:row-span-2">
            <LiquidGlass className="flex h-full flex-col justify-between gap-10 p-8">
              <div>
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent/15 text-accent">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3 4 6v5c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-3Zm-2.5 9 2 2 3.5-4" />
                  </svg>
                </span>
                <h3 className="mt-6 text-2xl font-semibold">Aman dari jemput sampai terima.</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Setiap langkah diverifikasi, didokumentasikan, dan bisa diaudit kapan pun dari aplikasi.
                </p>
              </div>
              <div className="text-outline display text-7xl" aria-hidden>99,9%</div>
              <p className="text-xs uppercase tracking-[0.2em] text-faint">
                kiriman tanpa insiden — 12 bulan terakhir
              </p>
            </LiquidGlass>
          </Reveal>

          {safety.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <TiltCard max={6} className="h-full">
                <div className="glass card-hover card-spot flex h-full flex-col gap-3 p-7">
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{s.desc}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}