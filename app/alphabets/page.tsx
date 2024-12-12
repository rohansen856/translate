"use client"

import { useState } from "react"
import { motion } from "framer-motion"

import { AlphabetGrid } from "@/components/alphabets/alphabet-grid"
import { SearchAlphabets } from "@/components/alphabets/search-alphabets"
import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import DashboardNav from "@/components/dashboard-nav"
import { LanguageSelector } from "@/components/translate/language-selector"

export default function AlphabetsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("ja")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedGradientBackground />
      <DashboardNav />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-8 gradient-text">
            Language Alphabets
          </h1>

          <div className="mb-8">
            <LanguageSelector
              value={selectedLanguage}
              onChange={setSelectedLanguage}
              type="source"
            />
          </div>

          <SearchAlphabets
            value={searchQuery}
            onChange={setSearchQuery}
            language={selectedLanguage}
          />

          <AlphabetGrid language={selectedLanguage} searchQuery={searchQuery} />
        </motion.div>
      </main>
    </div>
  )
}
