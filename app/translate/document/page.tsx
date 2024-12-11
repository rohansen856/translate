"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import DashboardNav from "@/components/dashboard-nav"
import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
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
                    <h1 className="text-3xl font-bold mb-8 gradient-text">
                        Translate Text File
                    </h1>

                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                                                    <ArrowRight className="ml-2 h-4 w-4" />
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
