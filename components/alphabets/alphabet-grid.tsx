"use client"

import { Alphabet } from "@/types"
import { motion } from "framer-motion"

import { useAlphabets } from "@/lib/hooks/use-alphabets"

import { AlphabetCard } from "./alphabet-card"

interface AlphabetGridProps {
  language: string
  searchQuery: string
  setSelectedAlphabet: (data: Alphabet) => void
}

export function AlphabetGrid({
  language,
  searchQuery,
  setSelectedAlphabet,
}: AlphabetGridProps) {
  const { alphabets, isLoading } = useAlphabets(language)

  const filteredAlphabets = alphabets.filter(
    (alphabet) =>
      alphabet.character.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alphabet.romanization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alphabet.pronunciation.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
    >
      {isLoading ? (
        Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="glass-morphism h-40 animate-pulse rounded-lg"
          />
        ))
      ) : filteredAlphabets.length > 0 ? (
        filteredAlphabets.map((alphabet, index) => (
          <motion.div
            key={alphabet.character}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <AlphabetCard
              index={alphabet.index}
              character={alphabet.character}
              romanization={alphabet.romanization}
              pronunciation={alphabet.pronunciation}
              examples={alphabet.examples}
              setSelectedAlphabet={setSelectedAlphabet}
            />
          </motion.div>
        ))
      ) : (
        <div className="text-muted-foreground col-span-full py-8 text-center">
          No alphabets found matching your search.
        </div>
      )}
    </motion.div>
  )
}
