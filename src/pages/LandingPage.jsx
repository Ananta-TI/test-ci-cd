import Hero from '../components/Hero'
import AboutSection from '../components/sections/AboutSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import HowItWorksSection from '../components/sections/HowItWorksSection'
import TrackingSection from '../components/sections/TrackingSection'
import ReasonsSection from '../components/sections/ReasonsSection'
import SafetySection from '../components/sections/SafetySection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import GalleriesSection from '../components/sections/GalleriesSection'
import UmkmSection from '../components/sections/UmkmSection'
import DownloadSection from '../components/sections/DownloadSection'

export default function LandingPage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TrackingSection />
      <ReasonsSection />
      <SafetySection />
      <TestimonialsSection />
      <GalleriesSection />
      <UmkmSection />
      <DownloadSection />
    </>
  )
}