import { ThemeProvider } from './context/ThemeContext'
import MainLayout from './layouts/MainLayout'
import LandingPage from './pages/LandingPage'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <MainLayout>
        <LandingPage />
      </MainLayout>
    </ThemeProvider>
  )
}

export default App