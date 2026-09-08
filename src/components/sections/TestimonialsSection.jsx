import reviews from '../../data/reviews.json'
import SectionTitle from '../SectionTitle'
import { Reveal } from '../MotionSystem'

function Stars({ n }) {
  return (
    <div className="flex gap-0.5 text-accent" aria-label={`${n} dari 5 bintang`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < n ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6">
          <path d="m12 3 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8L6.6 19.6l1-6L3.3 9.4l6-.9L12 3Z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ r }) {
  return (
    <figure className="quote-card glass w-[340px] max-w-[82vw] shrink-0 sm:w-[420px]">
      <div>
        <Stars n={r.rating} />
        <blockquote className="quote-text mt-4">“{r.text}”</blockquote>
      </div>
      <figcaption className="quote-author">
        <span className="quote-avatar">{r.name.charAt(0)}</span>
        <div>
          <div className="quote-name">{r.name}</div>
          <div className="quote-role">{r.role} · {r.location}</div>
        </div>
      </figcaption>
    </figure>
  )
}

export default function TestimonialsSection() {
  const rowA = reviews
  const rowB = [...reviews].reverse()

  return (
    <section id="testimoni" className="section overflow-hidden">
      <div className="container-x">
        <SectionTitle
          index="07"
          eyebrow="Testimoni"
          align="center"
          title={<>Kata mereka yang <span className="display-gradient">tiap hari kirim.</span></>}
        />
      </div>

      <Reveal y={40}>
        <div className="mask-fade-x flex flex-col gap-5">
          <div className="marquee-track" style={{ '--marquee-speed': '42s' }}>
            {rowA.map((r) => <ReviewCard key={r.id} r={r} />)}
            {rowA.map((r) => <ReviewCard key={`a-${r.id}`} r={r} />)}
          </div>
          <div
            className="marquee-track"
            style={{ '--marquee-speed': '54s', animationDirection: 'reverse' }}
          >
            {rowB.map((r) => <ReviewCard key={`b-${r.id}`} r={r} />)}
            {rowB.map((r) => <ReviewCard key={`c-${r.id}`} r={r} />)}
          </div>
        </div>
      </Reveal>
    </section>
  )
}