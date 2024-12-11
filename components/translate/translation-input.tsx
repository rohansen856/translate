"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, Copy, RotateCcw } from "lucide-react"
import { useSpeech } from "@/lib/hooks/use-speech"

interface TranslationInputProps {
    value: string
    onChange?: (value: string) => void
    placeholder: string
    lang: string
    readOnly?: boolean
}

export function TranslationInput({
    value,
    onChange,
    placeholder,
    lang,
    readOnly = false,
}: TranslationInputProps) {
    const { speak, stop, isSpeaking } = useSpeech()
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (copied) {
            const timeout = setTimeout(() => setCopied(false), 2000)
            return () => clearTimeout(timeout)
        }
    }, [copied])

    const handleCopy = async () => {
        await navigator.clipboard.writeText(value)
        setCopied(true)
    }

    const handleSpeak = () => {
        if (isSpeaking) {
            stop()
        } else {
            speak(value, lang)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
        >
            <Textarea
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                className="min-h-[200px] glass-morphism pr-12"
                readOnly={readOnly}
            />
            <div className="absolute right-2 top-2 flex flex-col space-y-2">
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleSpeak}
                    disabled={!value}
                    className="hover:bg-primary/10"
                >
                    {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                {!readOnly && value && (
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onChange?.("")}
                        className="hover:bg-primary/10"
                    >
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                )}
                {readOnly && (
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={handleCopy}
                        className="hover:bg-primary/10"
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <AnimatePresence>
                {copied && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-2 right-2 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm"
                    >
                        Copied!
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}