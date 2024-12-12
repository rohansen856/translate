"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Volume2 } from "lucide-react"

import { useSpeech } from "@/lib/hooks/use-speech"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface AlphabetCardProps {
  index: number
  character: string
  romanization: string
  pronunciation: string
  examples: Array<{
    word: string
    meaning: string
  }>
}

export function AlphabetCard({
  index,
  character,
  romanization,
  pronunciation,
  examples,
}: AlphabetCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const { speak, isSpeaking } = useSpeech()

  const handleSpeak = () => {
    speak(character)
  }

  return (
    <div className="perspective relative h-40">
      <motion.div
        className="size-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <Card className="glass-morphism backface-hidden absolute flex size-full cursor-pointer flex-col items-center justify-center p-4">
          <span className="mb-2 text-4xl font-bold">{character}</span>
          <span className="text-muted-foreground text-lg">{romanization}</span>
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
              handleSpeak()
            }}
            className="absolute right-2 top-2 opacity-50 hover:opacity-100"
          >
            <Volume2
              className={`size-4 ${isSpeaking ? "text-primary" : ""}`}
            />
          </Button>
          <p
            className="bg-secondary/50 absolute left-4 top-4 rounded-full border p-1 opacity-50 hover:opacity-100"
          >
            {index}
          </p>
        </Card>

        {/* Back of card */}
        <Card
          className="glass-morphism backface-hidden absolute size-full cursor-pointer p-4"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="flex h-full flex-col">
            <p className="mb-2 text-sm">
              <span className="font-medium">Pronunciation:</span>{" "}
              {pronunciation}
            </p>
            <div className="flex-1">
              <p className="mb-1 text-sm font-medium">Examples:</p>
              <ul className="space-y-1 text-sm">
                {examples.map((example, index) => (
                  <li key={index} className="text-muted-foreground">
                    {example.word} - {example.meaning}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
