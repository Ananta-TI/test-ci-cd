import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
  </svg>
)

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
)

const stats = [
  { label: 'Total Kiriman', value: '128', icon: '📦' },
  { label: 'Dalam Perjalanan', value: '23', icon: '🚚' },
  { label: 'Selesai', value: '105', icon: '✓' },
  { label: 'Masalah', value: '0', icon: '⚠️' },
]

const recentOrders = [
  { id: 'PKG-001', destination: 'Jakarta', status: 'Dalam Perjalanan', date: '08 Sep 2026' },
  { id: 'PKG-002', destination: 'Surabaya', status: 'Selesai', date: '07 Sep 2026' },
  { id: 'PKG-003', destination: 'Bandung', status: 'Selesai', date: '07 Sep 2026' },
  { id: 'PKG-004', destination: 'Yogyakarta', status: 'Dalam Perjalanan', date: '06 Sep 2026' },
  { id: 'PKG-005', destination: 'Medan', status: 'Selesai', date: '05 Sep 2026' },
]

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-svh bg-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="" className="h-7 w-7" />
            <span className="text-[15px] font-semibold tracking-[-0.02em]">Dashboard</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              aria-label={`Ubah ke mode ${theme === 'dark' ? 'terang' : 'gelap'}`}
              className="grid h-8 w-8 place-items-center rounded-full border border-line bg-canvas text-body transition-colors hover:text-ink"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-ink">{user?.name}</p>
                <p className="text-xs text-body">{user?.email}</p>
              </div>
              <button
                onClick={logout}
                className="btn btn--ghost btn--sm"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-5 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="display text-3xl">Selamat datang, {user?.name?.split(' ')[0]}!</h1>
          <p className="mt-2 text-body">Kelola semua pengirimanmu dari satu tempat.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="glass p-5">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="display text-3xl">{stat.value}</div>
              <div className="mt-1 text-sm text-body">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="glass p-6 mb-8">
          <h2 className="text-lg font-semibold text-ink mb-4">Aksi Cepat</h2>
          <div className="flex flex-wrap gap-3">
            <button className="btn btn--primary">
              <span>📦</span> Kirim Paket
            </button>
            <button className="btn btn--ghost">
              <span>🔍</span> Lacak Resi
            </button>
            <button className="btn btn--ghost">
              <span>📊</span> Lihat Analitik
            </button>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="glass">
          <div className="border-b border-line p-6">
            <h2 className="text-lg font-semibold text-ink">Kiriman Terbaru</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-line text-left text-sm text-body">
                  <th className="px-6 py-3 font-medium">ID</th>
                  <th className="px-6 py-3 font-medium">Tujuan</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-line last:border-0 hover:bg-canvas-soft-2 transition-colors">
                    <td className="px-6 py-4 font-medium text-ink">{order.id}</td>
                    <td className="px-6 py-4 text-body">{order.destination}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.status === 'Selesai'
                          ? 'bg-success/10 text-success'
                          : 'bg-warning/10 text-warning'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-body">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
