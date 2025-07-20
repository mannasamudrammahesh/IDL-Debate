import { HeroSection } from "@/components/landing/hero-section"
import { HowItWorksSection } from "@/components/landing/how-it-works"
import { TestimonialsSection } from "@/components/landing/testimonials"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100svh-65px)]">
      <HeroSection />
      <HowItWorksSection />
      <TestimonialsSection />
    </div>
  )
}
