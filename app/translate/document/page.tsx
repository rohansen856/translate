"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import DashboardNav from "@/components/dashboard-nav"
import { FileDropzone } from "@/components/translate/file-dropzone"
import { FilePreview } from "@/components/translate/file-preview"
import { LanguageSelector } from "@/components/translate/language-selector"
import { TranslationInput } from "@/components/translate/translation-input"

export default function FileTranslatePage() {
  const [fileContent, setFileContent] = useState<string>("")
  const [translatedContent, setTranslatedContent] = useState<string>("")
  const [isTranslating, setIsTranslating] = useState(false)
  const [sourceLang, setSourceLang] = useState("en")
  const [targetLang, setTargetLang] = useState("es")

  const handleFileSelect = (content: string) => {
    setFileContent(content)
    setTranslatedContent("")
  }

  const handleTranslate = () => {
    setIsTranslating(true)
    // Simulate translation
    setTimeout(() => {
      setTranslatedContent(fileContent)
      setIsTranslating(false)
    }, 1500)
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
          <h1 className="gradient-text mb-8 text-3xl font-bold">
            Translate Text File
          </h1>

          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <LanguageSelector
                value={sourceLang}
                onChange={setSourceLang}
                type="source"
              />
              <LanguageSelector
                value={targetLang}
                onChange={setTargetLang}
                type="target"
              />
            </div>

            <FileDropzone onFileSelect={handleFileSelect} />

            <AnimatePresence mode="wait">
              {fileContent && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <FilePreview content={fileContent} />

                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      onClick={handleTranslate}
                      disabled={isTranslating}
                      className="min-w-[200px]"
                    >
                      {isTranslating ? (
                        <>
                          <div className="loading-spinner mr-2" />
                          Translating...
                        </>
                      ) : (
                        <>
                          Translate File
                          <ArrowRight className="ml-2 size-4" />
                        </>
                      )}
                    </Button>
                  </div>

                  {translatedContent && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <TranslationInput
                        value={translatedContent}
                        placeholder="Translation will appear here"
                        lang={targetLang}
                        readOnly
                      />
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
