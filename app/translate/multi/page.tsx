"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import DashboardNav from "@/components/dashboard-nav"

export default function MultiTranslatePage() {
  const [translations, setTranslations] = useState([
    { id: 1, text: "", targetLang: "es" },
  ])

  const addTranslation = () => {
    const newId = Math.max(...translations.map((t) => t.id)) + 1
    setTranslations([
      ...translations,
      { id: newId, text: "", targetLang: "es" },
    ])
  }

  const removeTranslation = (id: number) => {
    setTranslations(translations.filter((t) => t.id !== id))
  }

  const updateTranslation = (id: number, field: string, value: string) => {
    setTranslations(
      translations.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-8">Batch Translation</h1>

          <div className="space-y-6">
            <div className="glass-morphism p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Source Text</h2>
              <Textarea
                placeholder="Enter your text here"
                className="h-[100px]"
              />
            </div>

            <div className="space-y-4">
              {translations.map((translation, index) => (
                <motion.div
                  key={translation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-morphism p-6 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Translation {index + 1}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTranslation(translation.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-1">
                      <Select
                        value={translation.targetLang}
                        onValueChange={(value) =>
                          updateTranslation(translation.id, "targetLang", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="it">Italian</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-3">
                      <Textarea
                        placeholder="Translation will appear here"
                        value={translation.text}
                        onChange={(e) =>
                          updateTranslation(
                            translation.id,
                            "text",
                            e.target.value
                          )
                        }
                        className="h-[100px]"
                        readOnly
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={addTranslation}>
                <Plus className="mr-2 h-4 w-4" />
                Add Language
              </Button>

              <Button size="lg">Translate All</Button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
