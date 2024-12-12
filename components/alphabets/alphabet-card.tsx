"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Volume2 } from "lucide-react"

import { useSpeech } from "@/lib/hooks/use-speech"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface AlphabetCardProps {
  character: string
  romanization: string
  pronunciation: string
  examples: Array<{
    word: string
    meaning: string
  }>
}

export function AlphabetCard({
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
    <div className="relative h-40 perspective">
      <motion.div
        className="w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <Card className="absolute w-full h-full glass-morphism p-4 flex flex-col items-center justify-center cursor-pointer backface-hidden">
          <span className="text-4xl font-bold mb-2">{character}</span>
          <span className="text-lg text-muted-foreground">{romanization}</span>
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
              handleSpeak()
            }}
            className="absolute top-2 right-2 opacity-50 hover:opacity-100"
          >
            <Volume2
              className={`h-4 w-4 ${isSpeaking ? "text-primary" : ""}`}
            />
          </Button>
        </Card>

        {/* Back of card */}
        <Card
          className="absolute w-full h-full glass-morphism p-4 cursor-pointer backface-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="h-full flex flex-col">
            <p className="text-sm mb-2">
              <span className="font-medium">Pronunciation:</span>{" "}
              {pronunciation}
            </p>
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">Examples:</p>
              <ul className="text-sm space-y-1">
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
