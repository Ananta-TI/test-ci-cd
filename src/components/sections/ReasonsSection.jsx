import { reasons } from '../../data/content'
import SectionTitle from '../SectionTitle'
import { Reveal, Parallax } from '../MotionSystem'

export default function ReasonsSection() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="relative grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <SectionTitle
              index="05"
              eyebrow="Kenapa Lancar"
              title={<>Alasan penjual <span className="display-gradient">pindah dan menetap.</span></>}
              description="Bukan karena kami paling murah — tapi karena kami paling jujur soal ongkir dan paket."
            />
            <Parallax speed={0.1} className="pointer-events-none absolute -left-24 top-1/3 hidden lg:block">
              <span className="text-outline display text-[160px]">?</span>
            </Parallax>
          </div>

          <div>
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.06}>
                <div className="row-item group">
                  <span className="row-num">0{i + 1}</span>
                  <div>
                    <h3 className="row-title">{r.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{r.desc}</p>
                  </div>
                  <span className="row-arrow" aria-hidden>→</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}