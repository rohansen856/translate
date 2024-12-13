"use client"

import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import { CallToAction } from "@/components/home/call-to-action"
import { Features } from "@/components/home/features"
import { HeroSection } from "@/components/home/hero-section"
import { Statistics } from "@/components/home/statistics"
import { Testimonials } from "@/components/home/testimonials"
import { Footer } from "@/components/layout/footer"
import { MainNav } from "@/components/layout/main-nav"

export default function Home() {
  return (
    <div className="bg-background relative min-h-screen">
      <AnimatedGradientBackground />
      <MainNav />
      <main>
        <HeroSection />
        <Features />
        <Statistics />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
