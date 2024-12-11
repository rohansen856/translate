"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, ArrowRight } from "lucide-react"

interface HistoryItem {
    id: number
    sourceText: string
    targetText: string
    sourceLang: string
    targetLang: string
    timestamp: string
}

const recentHistory: HistoryItem[] = [
    {
        id: 1,
        sourceText: "Hello world",
        targetText: "Hola mundo",
        sourceLang: "en",
        targetLang: "es",
        timestamp: "2 minutes ago"
    },
    {
        id: 2,
        sourceText: "Good morning",
        targetText: "Bonjour",
        sourceLang: "en",
        targetLang: "fr",
        timestamp: "5 minutes ago"
    },
    {
        id: 3,
        sourceText: "Thank you",
        targetText: "Danke",
        sourceLang: "en",
        targetLang: "de",
        timestamp: "10 minutes ago"
    }
]

export function TranslationHistory() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="glass-morphism">
                <div className="p-4">
                    <div className="flex items-center space-x-2 mb-4">
                        <Clock className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Recent Translations</h3>
                    </div>
                    <div className="space-y-4">
                        {recentHistory.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="p-3 rounded-lg hover:bg-primary/5 transition-colors"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium">{item.sourceText}</p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {item.sourceLang.toUpperCase()} <ArrowRight className="inline h-3 w-3" /> {item.targetLang.toUpperCase()}
                                        </p>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                                </div>
                                <p className="mt-2 text-sm text-primary">{item.targetText}</p>
                            </motion.div>
                        ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                        View All History
                    </Button>
                </div>
            </Card>
        </motion.div>
    )
}