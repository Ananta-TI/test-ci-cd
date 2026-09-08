import { features } from '../../data/content'
import SectionTitle from '../SectionTitle'
import { TiltCard } from '../AnimatedContent'
import { Reveal } from '../MotionSystem'

const icons = {
  radar: <path d="M12 12m-9 0a9 9 0 1 0 18 0 9 9 0 1 0-18 0M12 12l4.5-2.5M12 12a2 2 0 1 1-2 2" />,
  tag: <path d="M3 7.5V3h4.5L19 14.5 14.5 19 3 7.5ZM7 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />,
  shield: <path d="M12 3 4 6v5c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-3Zm-2.5 9 2 2 3.5-4" />,
  route: <path d="M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6 17V7a2 2 0 0 1 2-2h8M8 15v-2a4 4 0 0 1 4-4" />,
  recycle: <path d="m7 19-2-2 2-2m11-6 2 2-2 2M5 15a8 8 0 0 1 13.5-5.2M7 19a8 8 0 0 0 13.5-5.2M19 9 15 7l-2-4" />,
  headset: <path d="M4 14v-2a8 8 0 0 1 16 0v2m-14 0a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4Zm14 0a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4Z" />,
}

export default function FeaturesSection() {
  return (
    <section id="fitur" className="section">
      <div className="container-x">
        <SectionTitle
          index="02"
          eyebrow="Fitur"
          title={<>Semua yang kamu butuhkan, <span className="display-gradient">tanpa berlebih.</span></>}
          description="Enam hal yang paling sering diminta penjual — dibuat sederhana sampai tidak perlu buku panduan."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.08}>
              <TiltCard max={7} className="h-full">
                <div className="glass card-hover card-spot flex h-full flex-col gap-4 p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-surface-strong text-accent">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      {icons[f.icon]}
                    </svg>
                  </span>
                  <h3 className="text-xl font-semibold">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{f.desc}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}