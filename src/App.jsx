import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import MainLayout from './layouts/MainLayout'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import './App.css'

function Navigate({ to }) {
  useEffect(() => {
    window.location.hash = to
  }, [to])
  return null
}

function Router() {
  const { user } = useAuth()
  const [route, setRoute] = useState(() => window.location.hash || '#/')

  useEffect(() => {
    const handleHash = () => setRoute(window.location.hash || '#/')
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  // Redirect logged-in users from auth pages
  if ((route === '#/login' || route === '#/register') && user) {
    return <Navigate to="#/dashboard" />
  }

  // Redirect non-logged-in users from dashboard
  if (route === '#/dashboard' && !user) {
    return <Navigate to="#/login" />
  }

  // Auth pages (no layout)
  if (route === '#/login') {
    return <LoginPage onSwitch={() => { window.location.hash = '#/register' }} />
  }

  if (route === '#/register') {
    return <RegisterPage onSwitch={() => { window.location.hash = '#/login' }} />
  }

  // Dashboard (protected)
  if (route === '#/dashboard') {
    return <DashboardPage />
  }

  // Default: Landing page
  return (
    <MainLayout>
      <LandingPage />
    </MainLayout>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
