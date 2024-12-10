"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowRight, Copy, Volume2, VolumeX } from "lucide-react"
import DashboardNav from "@/components/dashboard-nav"
import { useSpeech } from "@/lib/hooks/use-speech"
import { AnimatedGradientBackground } from "@/components/animated-gradient-background"

const LANGUAGE_CODES: Record<string, string> = {
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
}

export default function TranslatePage() {
  const [isTranslating, setIsTranslating] = useState(false)
  const [sourceText, setSourceText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [sourceLang, setSourceLang] = useState("en")
  const [targetLang, setTargetLang] = useState("es")
  
  const { speak, stop, isSpeaking } = useSpeech()

  const handleTranslate = () => {
    setIsTranslating(true)
    // Simulate translation
    setTimeout(() => {
      setTranslatedText(sourceText)
      setIsTranslating(false)
    }, 1000)
  }

  const handleSpeak = (text: string, lang: string) => {
    if (isSpeaking) {
      stop()
    } else {
      speak(text, LANGUAGE_CODES[lang])
    }
  }

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedGradientBackground />
      <DashboardNav />
      
      <main className="container mx-auto px-4 py-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-8">Translate</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Select 
                value={sourceLang}
                onValueChange={setSourceLang}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="relative">
                <Textarea
                  placeholder="Enter text to translate"
                  className="h-[200px] glass-morphism pr-12"
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-2"
                  onClick={() => handleSpeak(sourceText, sourceLang)}
                  disabled={!sourceText}
                >
                  {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Select
                value={targetLang}
                onValueChange={setTargetLang}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select target language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="relative">
                <Textarea
                  placeholder="Translation will appear here"
                  className="h-[200px] glass-morphism pr-12"
                  value={translatedText}
                  readOnly
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-2"
                  onClick={() => handleSpeak(translatedText, targetLang)}
                  disabled={!translatedText}
                >
                  {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          <motion.div 
            className="flex justify-center mt-8 space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              size="lg"
              onClick={handleTranslate}
              disabled={!sourceText || isTranslating}
              className="min-w-[150px]"
            >
              {isTranslating ? (
                "Translating..."
              ) : (
                <>
                  Translate
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigator.clipboard.writeText(translatedText)}
              disabled={!translatedText}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}