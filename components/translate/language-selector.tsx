"use client"

import { motion } from "framer-motion"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Languages } from "lucide-react"

interface LanguageSelectorProps {
    value: string
    onChange: (value: string) => void
    type: "source" | "target"
}

const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
]

export function LanguageSelector({ value, onChange, type }: LanguageSelectorProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-2"
        >
            <Languages className="h-5 w-5 text-muted-foreground" />
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-[180px] glass-morphism">
                    <SelectValue placeholder={`Select ${type} language`} />
                </SelectTrigger>
                <SelectContent>
                    {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </motion.div>
    )
}