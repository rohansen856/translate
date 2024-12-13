"use client"

import { useState } from "react"
import Image from "next/image"
import { type Country } from "@/types"
import { AnimatePresence, motion } from "framer-motion"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"

interface CountryModalProps {
  country: Country | null
  onClose: () => void
}

export function CountryModal({ country, onClose }: CountryModalProps) {
  const [mapScale, setMapScale] = useState([100])

  if (!country) return null

  return (
    <Dialog open={!!country} onOpenChange={() => onClose()}>
      <DialogContent className="max-h-screen max-w-3xl">
        <DialogHeader>
          <DialogTitle>{country.name}</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: mapScale[0] / 100 }}
            transition={{ duration: 0.3 }}
            className="bg-background/50 relative aspect-video rounded-lg p-4"
          >
            <Image
              src={`/countries/${country.code}.svg`}
              alt={country.name}
              fill
              className="object-contain "
            />
          </motion.div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Map Size</label>
            <Slider
              value={mapScale}
              onValueChange={setMapScale}
              min={50}
              max={200}
              step={10}
            />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Languages</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Primary:</span>
                  <span>{country.primaryLanguage.name}</span>
                </div>
                {country.otherLanguages.map((lang) => (
                  <div
                    key={lang.code}
                    className="text-muted-foreground flex justify-between"
                  >
                    <span>Secondary:</span>
                    <span>{lang.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">Demographics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Population:</span>
                  <span>{country.population.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Language Speakers:</span>
                  <span>
                    {country.primaryLanguage.speakers.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
