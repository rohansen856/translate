"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Copy, RotateCcw, Volume2, VolumeX } from "lucide-react"

import { useSpeech } from "@/lib/hooks/use-speech"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

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
        className="glass-morphism min-h-[200px] pr-12"
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
          {isSpeaking ? (
            <VolumeX className="size-4" />
          ) : (
            <Volume2 className="size-4" />
          )}
        </Button>
        {!readOnly && value && (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onChange?.("")}
            className="hover:bg-primary/10"
          >
            <RotateCcw className="size-4" />
          </Button>
        )}
        {readOnly && (
          <Button
            size="icon"
            variant="ghost"
            onClick={handleCopy}
            className="hover:bg-primary/10"
          >
            <Copy className="size-4" />
          </Button>
        )}
      </div>
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-primary text-primary-foreground absolute bottom-2 right-2 rounded-md px-3 py-1 text-sm"
          >
            Copied!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
