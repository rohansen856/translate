"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight } from "lucide-react"

interface LanguageSwapProps {
    onSwap: () => void
}

export function LanguageSwap({ onSwap }: LanguageSwapProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <Button
                size="icon"
                variant="ghost"
                onClick={onSwap}
                className="rounded-full hover:bg-primary/10"
            >
                <ArrowLeftRight className="h-4 w-4" />
            </Button>
        </motion.div>
    )
}