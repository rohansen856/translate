"use client"

import { motion } from "framer-motion"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"

interface SearchAlphabetsProps {
  value: string
  onChange: (value: string) => void
  language: string
}

export function SearchAlphabets({
  value,
  onChange,
  language,
}: SearchAlphabetsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="relative">
        <Search className="z-20 absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search alphabets, pronunciation, or examples..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 glass-morphism z-10"
        />
      </div>
    </motion.div>
  )
}
