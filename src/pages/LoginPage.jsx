import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage({ onSwitch }) {
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const result = login(form.email, form.password)
    if (!result.success) setError(result.message)
  }

  return (
    <div className="min-h-svh flex items-center justify-center bg-bg px-4">
      <div className="w-full max-w-md">
        <div className="glass p-8">
          <div className="text-center mb-8">
            <h1 className="display text-3xl">Masuk</h1>
            <p className="mt-2 text-body">Selamat datang kembali di Lancar</p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-error/10 p-3 text-sm text-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-line bg-canvas px-4 py-2.5 text-ink placeholder-muted focus:border-link focus:outline-none focus:ring-1 focus:ring-link"
                placeholder="email@contoh.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-lg border border-line bg-canvas px-4 py-2.5 text-ink placeholder-muted focus:border-link focus:outline-none focus:ring-1 focus:ring-link"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn--primary w-full"
            >
              Masuk
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-body">
            Belum punya akun?{' '}
            <button
              onClick={onSwitch}
              className="font-medium text-link hover:underline"
            >
              Daftar
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
