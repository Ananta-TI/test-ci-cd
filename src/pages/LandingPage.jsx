import { useAuth } from '../context/AuthContext'

const features = [
  {
    icon: '🚀',
    title: 'Deploy Instan',
    desc: 'Push ke repository dan langsung ter-deploy. Tanpa konfigurasi rumit.',
  },
  {
    icon: '🔒',
    title: 'Keamanan Terjamin',
    desc: 'Autentikasi terintegrasi dengan enkripsi data end-to-end.',
  },
  {
    icon: '📊',
    title: 'Monitoring Real-time',
    desc: 'Pantau performa aplikasi dan pipeline CI/CD secara langsung.',
  },
  {
    icon: '🔄',
    title: 'Auto Scaling',
    desc: 'Infrastructure menyesuaikan otomatis sesuai kebutuhan traffic.',
  },
  {
    icon: '🌐',
    title: 'Global CDN',
    desc: 'Akses cepat dari mana saja dengan distribusi konten global.',
  },
  {
    icon: '💡',
    title: 'Developer Friendly',
    desc: 'Tooling modern yang dirancang untuk produktivitas developer.',
  },
]

const steps = [
  { num: '01', title: 'Connect Repository', desc: 'Hubungkan repository GitHub atau GitLab kamu' },
  { num: '02', title: 'Configure Pipeline', desc: 'Atur workflow CI/CD sesuai kebutuhan project' },
  { num: '03', title: 'Deploy & Monitor', desc: 'Push kode dan pantau deployment secara real-time' },
]

export default function LandingPage() {
  const { user } = useAuth()

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-svh flex items-center justify-center overflow-hidden">
        <div className="mesh" aria-hidden />
        
        <div className="container-x relative z-10 text-center py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas/80 px-4 py-1.5 text-sm text-body backdrop-blur-sm mb-6">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            Pipeline CI/CD sedang aktif
          </div>

          <h1 className="display text-[clamp(40px,6vw,72px)] max-w-4xl mx-auto">
            Platform <span className="display-gradient">CI/CD Modern</span> untuk Developer
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-body leading-relaxed">
            Bangun, test, dan deploy aplikasi kamu dengan mudah. Integrasi seamless dengan GitHub Actions, 
            Docker, dan infrastructure cloud modern.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {user ? (
              <a href="/dashboard" className="btn btn--primary">
                Buka Dashboard
                <span aria-hidden>→</span>
              </a>
            ) : (
              <>
                <a href="/login" className="btn btn--primary">
                  Mulai Sekarang
                  <span aria-hidden>→</span>
                </a>
                <a href="#fitur" className="btn btn--ghost">
                  Pelajari Lebih Lanjut
                </a>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-12">
            {[
              { value: '99.9%', label: 'Uptime' },
              { value: '< 30s', label: 'Deploy Time' },
              { value: '10k+', label: 'Developers' },
            ].map((stat) => (
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
            <span className="eyebrow">Fitur Unggulan</span>
            <h2 className="display mt-4 text-[clamp(28px,4vw,48px)]">
              Semua yang kamu butuhkan untuk <span className="display-gradient">deploy</span>
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-body">
              Solusi lengkap untuk pipeline CI/CD modern yang powerful namun sederhana.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
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
            <span className="eyebrow">Cara Kerja</span>
            <h2 className="display mt-4 text-[clamp(28px,4vw,48px)]">
              Tiga langkah sederhana
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
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
            Siap memulai?
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-body">
            Bergabung dengan ribuan developer yang sudah menggunakan platform kami untuk pipeline CI/CD mereka.
          </p>
          <div className="mt-8">
            {user ? (
              <a href="/dashboard" className="btn btn--primary">
                Buka Dashboard →
              </a>
            ) : (
              <a href="/register" className="btn btn--primary">
                Daftar Gratis →
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
