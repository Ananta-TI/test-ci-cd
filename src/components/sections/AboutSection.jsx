import { about } from '../../data/content'
import { Parallax, Reveal } from '../MotionSystem'
import SectionTitle from '../SectionTitle'
import Stats from '../Stats'

export default function AboutSection() {
  return (
    <section id="tentang" className="section">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <SectionTitle index="01" eyebrow="Tentang Lancar" title={about.statement} />

            <div className="flex flex-col gap-5">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-base leading-relaxed text-muted md:text-lg">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <Parallax speed={0.15} className="pointer-events-none absolute select-none">
              <span className="text-outline display text-[clamp(180px,26vw,340px)]">12</span>
            </Parallax>
            <Reveal delay={0.15} className="relative">
              <div className="glass liquid p-8 max-w-sm">
                <p className="text-2xl font-semibold leading-snug">
                  “Dari satu paket untuk teman, menjadi satu resi untuk ribuan usaha.”
                </p>
                <p className="mt-4 text-sm text-muted">— Tim inti Lancar</p>
              </div>
            </Reveal>
          </div>
        </div>

        <Stats items={about.highlights} className="mt-24" />
      </div>
    </section>
  )
}