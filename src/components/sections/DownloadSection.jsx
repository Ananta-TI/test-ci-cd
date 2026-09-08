import { download } from '../../data/content'
import SectionTitle from '../SectionTitle'
import { Reveal, Parallax } from '../MotionSystem'
import { TiltCard } from '../AnimatedContent'

const StoreIcon = ({ kind }) =>
  kind === 'play' ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.6 2.3c-.3.3-.6.8-.6 1.4v16.6c0 .6.3 1.1.6 1.4l9.3-9.7L3.6 2.3Zm11.3 8.1 3.4-3.5-11.5-6.6 8.1 10.1Zm3.1 3.1L17.6 12l1.4 1.5c.8.4.8 1.1 0 1.5l-5.6 3.2 4.6-4.7Zm-5.8-4.5L6.8 1.5 18.3 7.4l-6.1 1.6ZM6.8 22.5l-3.2-1.8 3.2-1.8v3.6Z" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.4 12.8c0-2.4 2-3.5 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.9-1.6 0-3.1 1-4 2.4-1.7 2.9-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3 2.4 1.2-.1 1.7-.8 3.1-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.5-1-2.5-3.8ZM13.9 4.2c.7-.8 1.1-1.9 1-3-.9 0-2 .6-2.7 1.4-.6.7-1.2 1.8-1 2.9 1.1.1 2-.6 2.7-1.3Z" />
    </svg>
  )

export default function DownloadSection() {
  return (
    <section id="unduh" className="section">
      <div className="container-x">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionTitle
              index="09"
              eyebrow="Unduh"
              title={<>Bawa Lancar <span className="display-gradient">di genggamanmu.</span></>}
              description={download.desc}
            />

            <Reveal delay={0.1}>
              <div className="flex flex-col gap-3 sm:flex-row">
                {download.stores.map((store) => (
                  <a
                    key={store.name}
                    href="#unduh"
                    className="btn btn--ghost !justify-start !px-6"
                  >
                    <StoreIcon kind={store.icon} />
                    <span className="text-left">
                      <span className="block text-[10px] uppercase tracking-wider text-faint">Tersedia di</span>
                      <span className="block font-semibold">{store.name}</span>
                    </span>
                  </a>
                ))}
              </div>
              <p className="mt-3 text-xs text-faint">Android 10+ &amp; iOS 15+ · gratis, tanpa iklan</p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex items-center gap-4">
                <div className="grid h-28 w-28 place-items-center rounded-2xl border border-line bg-surface">
                  <div className="grid grid-cols-3 gap-1.5" aria-hidden>
                    {Array.from({ length: 9 }).map((_, i) => (
                      <span key={i} className="h-3 w-3 rounded-[3px] bg-muted/50" />
                    ))}
                  </div>
                </div>
                <div className="max-w-[200px] text-sm text-muted">
                  {download.qr}
                  <div className="mt-2 flex items-center gap-2 text-xs text-faint">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                    versi 2.4.1 tersedia
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Phone mockup */}
          <div className="relative flex justify-center">
            <Parallax speed={-0.08} className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-[440px] w-[440px] rounded-full bg-accent/12 blur-[110px]" />
            </Parallax>

            <Reveal delay={0.15}>
              <TiltCard max={14} className="relative">
                <div className="phone">
                  <div className="phone-screen items-center justify-center gap-5 text-center">
                    <span className="grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-accent to-violet text-2xl font-semibold text-accent-ink">
                      L
                    </span>
                    <div>
                      <div className="text-lg font-semibold">Sampai lebih awal.</div>
                      <div className="text-xs text-muted">Paket kamu sudah di tangan penerima 🎉</div>
                    </div>
                    <div className="w-full rounded-2xl border border-line bg-surface p-4 text-left">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted">Jarak kurir ke tujuan</span>
                        <span className="font-semibold">1,2 km</span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-strong">
                        <div className="h-full w-[86%] rounded-full bg-accent" />
                      </div>
                    </div>
                    <div className="flex w-full justify-center gap-2">
                      <span className="tag-pill">4,9 ★</span>
                      <span className="tag-pill">100 rb+ unduhan</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}