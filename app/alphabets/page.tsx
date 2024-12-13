"use client"

import { useState } from "react"
import { Alphabet } from "@/types"
import { motion } from "framer-motion"

import { Slider } from "@/components/ui/slider"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { AlphabetGrid } from "@/components/alphabets/alphabet-grid"
import { AlphabetModal } from "@/components/alphabets/alphabet-modal"
import { SearchAlphabets } from "@/components/alphabets/search-alphabets"
import DashboardNav from "@/components/dashboard-nav"
import { LanguageSelector } from "@/components/translate/language-selector"

export default function AlphabetsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("ja")
  const [selectedAlphabet, setSelectedAlphabet] = useState<Alphabet | null>(
    null
  )
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="bg-background relative min-h-screen">
      <DashboardNav />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl"
        >
          <h1 className="gradient-text mb-8 text-3xl font-bold">
            Language Alphabets
          </h1>

          <div className="mb-8 flex w-full flex-col items-center justify-between gap-4 md:flex-row">
            <LanguageSelector
              value={selectedLanguage}
              onChange={setSelectedLanguage}
              type="source"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="w-full max-w-[300px]">
                  <Slider
                    className="w-full"
                    defaultValue={[33]}
                    max={100}
                    step={1}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Set Text Size</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <SearchAlphabets
            value={searchQuery}
            onChange={setSearchQuery}
            language={selectedLanguage}
          />

          <AlphabetGrid
            language={selectedLanguage}
            searchQuery={searchQuery}
            setSelectedAlphabet={setSelectedAlphabet}
          />
        </motion.div>
        <AlphabetModal
          alphabet={selectedAlphabet}
          onClose={() => setSelectedAlphabet(null)}
        />
      </main>
    </div>
  )
}
