"use client"

import Image from "next/image"
import { type Country } from "@/types"
import { motion } from "framer-motion"

import { useCountries } from "@/lib/hooks/use-countries"
import { Card } from "@/components/ui/card"

interface CountryGridProps {
  searchQuery: string
  onCountrySelect: (country: Country) => void
}

export function CountryGrid({
  searchQuery,
  onCountrySelect,
}: CountryGridProps) {
  const { countries, isLoading } = useCountries()

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.primaryLanguage.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  )

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {isLoading ? (
        Array.from({ length: 12 }).map((_, index) => (
          <Card key={index} className="glass-morphism h-48 animate-pulse" />
        ))
      ) : filteredCountries.length > 0 ? (
        filteredCountries.map((country, index) => (
          <motion.div
            key={country.code}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card
              className="glass-morphism cursor-pointer p-4 transition-transform hover:scale-105"
              onClick={() => onCountrySelect(country)}
            >
              <div className="bg-background/50 relative mb-4 aspect-video rounded-lg p-2">
                <Image
                  src={`/flags/${country.code}.svg`}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="mb-1 font-semibold">{country.name}</h3>
              <p className="text-muted-foreground text-sm">
                Primary: {country.primaryLanguage.name}
              </p>
            </Card>
          </motion.div>
        ))
      ) : (
        <div className="text-muted-foreground col-span-full py-8 text-center">
          No countries found matching your search.
        </div>
      )}
    </div>
  )
}
