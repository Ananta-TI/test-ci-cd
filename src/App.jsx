import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import { LandingProvider } from './context/LandingContext'
import MainLayout from './layouts/MainLayout'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import './App.css'

function Redirect({ to }) {
  useEffect(() => {
    window.location.replace(to)
  }, [to])
  return null
}

function Router() {
  const { user, loading } = useAuth()
  const [route, setRoute] = useState(() => window.location.hash || '#/')

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || '#/')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  if (loading) {
    return (
      <div className="min-h-svh flex items-center justify-center bg-bg">
        <div className="text-body">Memuat...</div>
      </div>
    )
  }

  if (route === '#/dashboard' && !user) {
    return <Redirect to="#/login" />
  }

  if ((route === '#/login' || route === '#/register') && user) {
    return <Redirect to="#/dashboard" />
  }

  if (route === '#/login') {
    return (
      <LoginPage
        onSwitch={() => { window.location.hash = '#/register' }}
        onLoginSuccess={() => { window.location.hash = '#/dashboard' }}
      />
    )
  }

  if (route === '#/register') {
    return (
      <RegisterPage
        onSwitch={() => { window.location.hash = '#/login' }}
        onLoginSuccess={() => { window.location.hash = '#/dashboard' }}
      />
    )
  }

  if (route === '#/dashboard') {
    return <DashboardPage />
  }

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
        <LandingProvider>
          <Router />
        </LandingProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
