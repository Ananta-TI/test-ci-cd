import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { useLanding } from '../context/LandingContext'
import { cn } from '../lib/utils'

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

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const { landing } = useLanding()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const navLinks = landing.navbar.links

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b bg-canvas/90 backdrop-blur-md transition-shadow duration-300',
          scrolled ? 'border-line shadow-[0_1px_2px_rgba(0,0,0,0.04)]' : 'border-transparent',
        )}
      >
        <nav className="relative mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between px-5 md:px-6">
          <a href="/" className="flex items-center gap-2.5" aria-label="Lancar beranda">
            <img src="/logo.png" alt="" className="h-7 w-7" />
            <span className="text-[15px] font-semibold tracking-[-0.02em]">{landing.navbar.brand}</span>
          </a>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3.5 py-1.5 text-sm text-body transition-colors hover:bg-canvas-soft-2 hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label={`Ubah ke mode ${theme === 'dark' ? 'terang' : 'gelap'}`}
              className="grid h-8 w-8 place-items-center rounded-full border border-line bg-canvas text-body transition-colors hover:text-ink"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.3 }}
                  className="grid place-items-center"
                >
                  {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                </motion.span>
              </AnimatePresence>
            </button>

            <div className="hidden items-center gap-2 sm:flex">
              {user ? (
                <>
                  <a href="#/dashboard" className="btn btn--nav btn--nav--ghost">
                    Dashboard
                  </a>
                  <button onClick={logout} className="btn btn--nav btn--nav--primary">
                    Keluar
                  </button>
                </>
              ) : (
                <>
                  <a href="#/login" className="btn btn--nav btn--nav--ghost">
                    Masuk
                  </a>
                  <a href="#/register" className="btn btn--nav btn--nav--primary">
                    Daftar
                  </a>
                </>
              )}
            </div>

            <button
              onClick={() => setOpen(true)}
              aria-label="Buka menu"
              className="grid h-8 w-8 place-items-center rounded-full border border-line bg-canvas sm:hidden"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h10" />
              </svg>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-canvas"
          >
            <div className="flex h-16 items-center justify-between border-b border-line px-5">
              <span className="text-[15px] font-semibold tracking-[-0.02em]">{landing.navbar.brand}</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Tutup menu"
                className="grid h-8 w-8 place-items-center rounded-full border border-line"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-1 px-6">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="display py-2.5 text-3xl text-ink transition-colors hover:text-link"
                >
                  {l.label}
                </motion.a>
              ))}
              {user ? (
                <>
                  <motion.a
                    href="#/dashboard"
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="btn btn--primary mt-6"
                  >
                    Dashboard
                  </motion.a>
                  <motion.button
                    onClick={() => { logout(); setOpen(false) }}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="btn btn--ghost mt-2"
                  >
                    Keluar
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.a
                    href="#/login"
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="btn btn--ghost mt-6"
                  >
                    Masuk
                  </motion.a>
                  <motion.a
                    href="#/register"
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="btn btn--primary mt-2"
                  >
                    Daftar
                  </motion.a>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
