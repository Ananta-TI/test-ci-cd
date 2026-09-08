import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CursorGlow, useSmoothScroll } from '../components/MotionSystem'

export default function MainLayout({ children }) {
  useSmoothScroll()

  return (
    <>
      <div className="grain" aria-hidden />
      <CursorGlow />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}