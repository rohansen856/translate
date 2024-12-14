"use client"

import { useState } from "react"
import axios, { AxiosError } from "axios"
import { motion } from "framer-motion"
import { Loader2, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export interface TranslationResult {
  id: number
  text: string
  targetLang: string
  isTranslating: boolean
  error?: string
}

export function MultiTranslateForm() {
  const [sourceText, setSourceText] = useState("")
  const [translationResults, setTranslationResults] = useState<
    TranslationResult[]
  >([{ id: 1, text: "", targetLang: "es", isTranslating: false }])
  const { toast } = useToast()

  const addTranslationResult = () => {
    const allLanguages = ["es", "fr", "de", "it", "pt", "ru", "zh", "ja", "ko"]

    const usedLanguages = translationResults.map((t) => t.targetLang)
    const availableLanguage =
      allLanguages.find((lang) => !usedLanguages.includes(lang)) || "es"

    const newId = Math.max(...translationResults.map((t) => t.id)) + 1
    setTranslationResults([
      ...translationResults,
      {
        id: newId,
        text: "",
        targetLang: availableLanguage,
        isTranslating: false,
      },
    ])
  }

  const removeTranslationResult = (id: number) => {
    setTranslationResults(translationResults.filter((t) => t.id !== id))
  }

  const updateTranslationResult = (
    id: number,
    field: keyof TranslationResult,
    value: string
  ) => {
    const isLanguageAlreadySelected = translationResults.some(
      (t) => t.id !== id && t.targetLang === value
    )

    if (isLanguageAlreadySelected) {
      toast({
        title: "Language Already Selected",
        description:
          "This language has already been chosen for another translation.",
        variant: "destructive",
      })
      return
    }

    setTranslationResults(
      translationResults.map((t) =>
        t.id === id ? { ...t, [field]: value } : t
      )
    )
  }

  const translateText = async (translationResult: TranslationResult) => {
    setTranslationResults((prev) =>
      prev.map((t) =>
        t.id === translationResult.id
          ? { ...t, isTranslating: true, error: undefined }
          : t
      )
    )

    try {
      const response = await axios.post<{ translatedText: string }>(
        "/api/translate",
        {
          text: sourceText,
          targetLang: translationResult.targetLang,
        }
      )

      if (response.status === 200) {
        setTranslationResults((prev) =>
          prev.map((t) =>
            t.id === translationResult.id
              ? {
                  ...t,
                  text: response.data.translatedText,
                  isTranslating: false,
                }
              : t
          )
        )
      } else {
        throw new Error("TranslationResult failed")
      }
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? `${error.code}: ${error.message}`
          : "An unexpected error occurred"

      setTranslationResults((prev) =>
        prev.map((t) =>
          t.id === translationResult.id
            ? { ...t, isTranslating: false, error: errorMessage }
            : t
        )
      )

      toast({
        title: "TranslationResult Error",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }

  const handleTranslateAll = async () => {
    if (!sourceText) {
      toast({
        title: "Please enter text to translate",
        variant: "destructive",
      })
      return
    }

    for (const translationResult of translationResults) {
      await translateText(translationResult)
    }
  }

  const getAvailableLanguages = (currentLang: string) => {
    const selectedLanguages = translationResults.map((t) => t.targetLang)
    const languages = [
      { value: "es", label: "Spanish" },
      { value: "fr", label: "French" },
      { value: "de", label: "German" },
      { value: "it", label: "Italian" },
      { value: "pt", label: "Portuguese" },
      { value: "ru", label: "Russian" },
      { value: "zh", label: "Chinese" },
      { value: "ja", label: "Japanese" },
      { value: "ko", label: "Korean" },
    ]

    return languages.filter(
      (lang) =>
        lang.value === currentLang || !selectedLanguages.includes(lang.value)
    )
  }

  return (
    <div className="space-y-6">
      <div className="glass-morphism rounded-lg p-6">
        <h2 className="mb-4 text-xl font-semibold">Source Text</h2>
        <Textarea
          placeholder="Enter your text here"
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
          className="h-[100px]"
        />
      </div>

      <div className="space-y-4">
        {translationResults.map((translationResult, index) => (
          <motion.div
            key={translationResult.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-morphism rounded-lg p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-medium">Translation Result {index + 1}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeTranslationResult(translationResult.id)}
                className="text-destructive"
                disabled={translationResult.isTranslating}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="md:col-span-1">
                <Select
                  value={translationResult.targetLang}
                  onValueChange={(value) =>
                    updateTranslationResult(
                      translationResult.id,
                      "targetLang",
                      value
                    )
                  }
                  disabled={translationResult.isTranslating}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableLanguages(translationResult.targetLang).map(
                      (lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="relative md:col-span-3">
                <Textarea
                  placeholder="TranslationResult will appear here"
                  value={translationResult.text}
                  className="h-[100px]"
                  readOnly
                />
                {translationResult.isTranslating && (
                  <div className="bg-background/50 absolute inset-0 flex items-center justify-center backdrop-blur-sm">
                    <Loader2 className="text-primary size-6 animate-spin" />
                  </div>
                )}
                {translationResult.error && (
                  <p className="text-destructive mt-1 text-sm">
                    {translationResult.error}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={addTranslationResult}
          disabled={
            translationResults.some((t) => t.isTranslating) ||
            translationResults.length >= 9
          }
        >
          <Plus className="mr-2 size-4" />
          Add Language
        </Button>

        <Button
          size="lg"
          onClick={handleTranslateAll}
          disabled={
            !sourceText || translationResults.some((t) => t.isTranslating)
          }
        >
          {translationResults.some((t) => t.isTranslating) ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Translating...
            </>
          ) : (
            "Translate All"
          )}
        </Button>
      </div>
    </div>
  )
}
