import { useAuth } from '../context/AuthContext'
import { useLanding } from '../context/LandingContext'

function GradientText({ text }) {
  const parts = text.split(/<gradient>(.*?)<\/gradient>/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <span key={i} className="display-gradient">{part}</span> : part
  )
}

export default function LandingPage() {
  const { user } = useAuth()
  const { landing } = useLanding()
  const { hero, features, steps, cta } = landing

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-svh flex items-center justify-center overflow-hidden">
        <div className="mesh" aria-hidden />

        <div className="container-x relative z-10 text-center py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas/80 px-4 py-1.5 text-sm text-body backdrop-blur-sm mb-6">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            {hero.badge}
          </div>

          <h1 className="display text-[clamp(40px,6vw,72px)] max-w-4xl mx-auto">
            <GradientText text={hero.title} />
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-body leading-relaxed">
            {hero.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {user ? (
              <a href="#/dashboard" className="btn btn--primary">
                Buka Dashboard
                <span aria-hidden>→</span>
              </a>
            ) : (
              <>
                <a href={hero.ctaPrimary.href} className="btn btn--primary">
                  {hero.ctaPrimary.label}
                  <span aria-hidden>→</span>
                </a>
                <a href={hero.ctaSecondary.href} className="btn btn--ghost">
                  {hero.ctaSecondary.label}
                </a>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-12">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="display text-3xl">{stat.value}</div>
                <div className="mt-1 text-sm text-body">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="section">
        <div className="container-x">
          <div className="text-center mb-16">
            <span className="eyebrow">{features.eyebrow}</span>
            <h2 className="display mt-4 text-[clamp(28px,4vw,48px)]">
              <GradientText text={features.title} />
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-body">
              {features.description}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.items.map((f) => (
              <div key={f.title} className="glass group p-6 transition-all hover:shadow-float hover:-translate-y-1">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm text-body leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="cara-kerja" className="section band-dark">
        <div className="container-x">
          <div className="text-center mb-16">
            <span className="eyebrow">{steps.eyebrow}</span>
            <h2 className="display mt-4 text-[clamp(28px,4vw,48px)]">
              {steps.title}
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.items.map((step) => (
              <div key={step.num} className="text-center">
                <div className="display text-6xl text-on-primary/20">{step.num}</div>
                <h3 className="mt-4 text-xl font-semibold text-on-primary">{step.title}</h3>
                <p className="mt-2 text-on-primary/70">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container-x text-center">
          <h2 className="display text-[clamp(28px,4vw,48px)]">
            {cta.title}
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-body">
            {cta.description}
          </p>
          <div className="mt-8">
            {user ? (
              <a href="#/dashboard" className="btn btn--primary">
                Buka Dashboard →
              </a>
            ) : (
              <a href={cta.button.href} className="btn btn--primary">
                {cta.button.label} →
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
