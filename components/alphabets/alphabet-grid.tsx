"use client"

import { motion } from "framer-motion"

import { useAlphabets } from "@/lib/hooks/use-alphabets"

import { AlphabetCard } from "./alphabet-card"

interface AlphabetGridProps {
  language: string
  searchQuery: string
}

export function AlphabetGrid({ language, searchQuery }: AlphabetGridProps) {
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
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8"
    >
      {isLoading ? (
        Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="h-40 rounded-lg glass-morphism animate-pulse"
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
              character={alphabet.character}
              romanization={alphabet.romanization}
              pronunciation={alphabet.pronunciation}
              examples={alphabet.examples}
            />
          </motion.div>
        ))
      ) : (
        <div className="col-span-full text-center py-8 text-muted-foreground">
          No alphabets found matching your search.
        </div>
      )}
    </motion.div>
  )
}
