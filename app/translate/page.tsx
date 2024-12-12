"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import DashboardNav from "@/components/dashboard-nav"
import { LanguageSelector } from "@/components/translate/language-selector"
import { LanguageSwap } from "@/components/translate/language-swap"
import { TranslationHistory } from "@/components/translate/translation-history"
import { TranslationInput } from "@/components/translate/translation-input"

export default function TranslatePage() {
  const [isTranslating, setIsTranslating] = useState(false)
  const [sourceText, setSourceText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [sourceLang, setSourceLang] = useState("en")
  const [targetLang, setTargetLang] = useState("es")

  const handleTranslate = () => {
    setIsTranslating(true)
    // Simulate translation
    setTimeout(() => {
      setTranslatedText(sourceText)
      setIsTranslating(false)
    }, 1000)
  }

  const handleSwapLanguages = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    setSourceText(translatedText)
    setTranslatedText(sourceText)
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
          <h1 className="text-3xl font-bold mb-8 gradient-text">Translate</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <LanguageSelector
                value={sourceLang}
                onChange={setSourceLang}
                type="source"
              />

              <TranslationInput
                value={sourceText}
                onChange={setSourceText}
                placeholder="Enter text to translate"
                lang={sourceLang}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <LanguageSelector
                  value={targetLang}
                  onChange={setTargetLang}
                  type="target"
                />
                <LanguageSwap onSwap={handleSwapLanguages} />
              </div>

              <TranslationInput
                value={translatedText}
                placeholder="Translation will appear here"
                lang={targetLang}
                readOnly
              />
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
                <>
                  <div className="loading-spinner mr-2" />
                  Translating...
                </>
              ) : (
                <>
                  Translate
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </motion.div>

          <div className="mt-12">
            <TranslationHistory />
          </div>
        </motion.div>
      </main>
    </div>
  )
}
