import HeroSection from '@/components/Hero'
import FeaturesGrid from '@/components/Features'
import DynamicPricing from '@/components/Pricing'
import ContentShowcase from '@/components/Showcase'
import MissionStatement from '@/components/Mission'
import Testimonials from '@/components/Testimonials'
import FinalCTA from '@/components/Cta'
import Navbar from '@/components/FloatingNav'
import FeatureComparison from '@/components/FeatureComparison'

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <HeroSection />
      <MissionStatement />
      <FeaturesGrid />
      <ContentShowcase />
      <FeatureComparison />
      <DynamicPricing />
      <Testimonials />
      <FinalCTA />
    </div>
  )
}