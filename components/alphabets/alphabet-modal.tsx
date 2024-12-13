"use client"

import { useState } from "react"
import Image from "next/image"
import { type Alphabet } from "@/types"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle, Copy } from "lucide-react"

import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "../ui/button"

interface AlphabetModalProps {
  alphabet: Alphabet | null
  onClose: () => void
}

export function AlphabetModal({ alphabet, onClose }: AlphabetModalProps) {
  const [copiedText, copyToClipboard] = useCopyToClipboard()

  if (!alphabet) return null

  return (
    <Dialog open={!!alphabet} onOpenChange={() => onClose()}>
      <DialogContent className="max-h-screen max-w-3xl">
        <p className="text-center text-[12rem]">{alphabet.character}</p>
        <p className="text-center text-3xl">{alphabet.pronunciation}</p>
        <DialogFooter className="relative">
          <Button
            size="sm"
            variant="outline"
            className="absolute bottom-0 right-0"
            onClick={() => {
              copyToClipboard(alphabet.character)
            }}
          >
            {copiedText ? (
              <CheckCircle className="size-4" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
