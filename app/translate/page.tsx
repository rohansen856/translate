"use client"

import { useState } from "react"
import axios, { AxiosError } from "axios"
import { motion } from "framer-motion"
import { ArrowRight, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import DashboardNav from "@/components/dashboard-nav"
import { Footer } from "@/components/layout/footer"
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
  const [translationErr, setTranslationError] = useState<string | null>(null)

  const handleTranslate = async () => {
    setIsTranslating(true)
    setTranslationError(null)
    try {
      const req = await axios.post<{ translatedText: string }>(
        "/api/translate",
        {
          text: sourceText,
          targetLang,
        }
      )
      if (req.status === 200) return setTranslatedText(req.data.translatedText)
      toast({
        title: "Error translating text",
        variant: "destructive",
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: "Error translating text",
          description: `${error.code}, ${error.message}`,
          variant: "destructive",
        })
        setTranslationError(`${error.code}, ${error.message}`)
      }
    } finally {
      setIsTranslating(false)
    }
  }

  const handleSwapLanguages = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    setSourceText(translatedText)
    setTranslatedText(sourceText)
  }

  return (
    <div className="bg-background relative min-h-screen">
      <AnimatedGradientBackground />
      <DashboardNav />

      <main className="container relative mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl"
        >
          <h1 className="gradient-text mb-8 text-3xl font-bold">Translate</h1>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
              {translationErr && (
                <p className="text-destructive mt-1 text-sm">
                  {translationErr}
                </p>
              )}
            </div>
          </div>

          <motion.div
            className="mt-8 flex justify-center space-x-4"
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
                  <ArrowRight className="ml-2 size-4" />
                </>
              )}
            </Button>
          </motion.div>

          <div className="mt-12">
            <TranslationHistory />
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
