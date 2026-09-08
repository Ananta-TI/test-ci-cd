import { gallery } from '../../data/content'
import SectionTitle from '../SectionTitle'
import { SmartImage, TiltCard } from '../AnimatedContent'
import { Reveal } from '../MotionSystem'

const aspects = ['aspect-[4/5]', 'aspect-[3/4]', 'aspect-square', 'aspect-[3/4]', 'aspect-[4/5]']

export default function GalleriesSection() {
  return (
    <section id="galeri" className="section">
      <div className="container-x">
        <SectionTitle
          index="08"
          eyebrow="Galeri desain"
          title={<>Tampilan yang <span className="display-gradient">enak dipandang.</span></>}
          description="Beberapa layar dari aplikasi — desain yang kami kerjakan untuk setiap alur kirim."
        />

        <div className="columns-2 gap-5 md:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {gallery.map((g, i) => (
            <Reveal key={g.src} delay={(i % 3) * 0.06} y={40}>
              <TiltCard max={8} scale={1.01} className={aspects[i % aspects.length]}>
                <figure className="tile h-full">
                  <span className="tile-index">0{i + 1}</span>
                  <SmartImage src={g.src} alt={g.caption} index={i + 1} />
                  <figcaption className="tile-caption">{g.caption}</figcaption>
                </figure>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-faint">
          Masukkan tangkapan layar desain ke <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">public/design/</code> —
          galeri otomatis memuatnya dengan nama <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">1.png … 17a.jpg</code>.
        </p>
      </div>
    </section>
  )
}