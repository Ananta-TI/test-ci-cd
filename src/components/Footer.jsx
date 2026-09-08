import { footer } from '../data/content'
import { Reveal } from './MotionSystem'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="container-x pb-10 pt-20">
        <Reveal>
          <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="eyebrow">Lancar</span>
              <p className="mt-4 max-w-sm text-lg leading-relaxed text-muted">{footer.about}</p>
            </div>
            <a href="#beranda" className="btn btn--ghost btn--sm w-fit">
              Kembali ke atas ↑
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 gap-10 border-y border-line py-14 md:grid-cols-4">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.12em] text-body">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-sm text-muted transition-colors hover:text-ink">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="flex flex-col items-center justify-between gap-5 pt-8 text-sm text-faint sm:flex-row">
          <span>{footer.bottom}</span>
          <div className="flex items-center gap-3">
            <span className="text-xs">Dibuat di Bandung dengan</span>
            <span className="text-accent" aria-hidden>♥</span>
          </div>
        </div>
      </div>

      {/* Giant wordmark */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <div className="display text-outline whitespace-nowrap text-center text-[clamp(80px,18vw,240px)] leading-[0.85] opacity-60">
          Lancar
        </div>
      </div>
    </footer>
  )
}