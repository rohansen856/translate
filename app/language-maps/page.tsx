"use client"

import { useState } from "react"
import { Country } from "@/types"
import { motion } from "framer-motion"

import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import DashboardNav from "@/components/dashboard-nav"
import { CountryGrid } from "@/components/language-maps/country-grid"
import { CountryModal } from "@/components/language-maps/country-modal"
import { SearchCountries } from "@/components/language-maps/search-countries"
import { Footer } from "@/components/layout/footer"

export default function LanguageMapsPage() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="bg-background relative min-h-screen">
      <AnimatedGradientBackground />
      <DashboardNav />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-6xl"
        >
          <h1 className="gradient-text mb-8 text-3xl font-bold">
            Language Maps
          </h1>

          <SearchCountries value={searchQuery} onChange={setSearchQuery} />

          <CountryGrid
            searchQuery={searchQuery}
            onCountrySelect={setSelectedCountry}
          />

          <CountryModal
            country={selectedCountry}
            onClose={() => setSelectedCountry(null)}
          />
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
