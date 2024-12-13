"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowRight,
  FileText,
  GlobeIcon,
  History,
  Languages,
  Settings,
  Sparkles,
  Upload,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export function HeroSection() {
  const router = useRouter()

  const features = [
    {
      title: "Text Translation",
      description: "Translate text in real-time with high accuracy.",
      icon: Languages,
      path: "/translate",
    },
    {
      title: "File Translation",
      description: "Upload and translate text files seamlessly.",
      icon: FileText,
      path: "/translate/document",
    },
    {
      title: "Batch Translation",
      description: "Translate multiple texts at once efficiently.",
      icon: Upload,
      path: "/translate/multi",
    },
  ]

  return (
    <div className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h1
            className="gradient-text mb-6 text-4xl font-bold md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Break Language Barriers with Translation
          </motion.h1>

          <motion.p
            className="text-muted-foreground mb-8 text-xl md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Experience seamless communication across languages with our advanced
            AI-powered translation platform. Perfect for individuals, teams, and
            enterprises.
          </motion.p>

          <motion.div
            className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 h-14 px-8 text-lg"
                >
                  Start Translating <ArrowRight className="ml-2 size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-morphism w-56">
                {features.map((feature) => (
                  <DropdownMenuItem
                    key={feature.path}
                    onClick={() => router.push(feature.path)}
                    className="flex items-center space-x-2"
                  >
                    <feature.icon className="size-4" />
                    <span>{feature.title}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* <Button
              size="lg"
              onClick={() => router.push("/translate")}
              className="min-w-[200px] h-12 text-lg"
            >
              Start Translating
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button> */}
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/features")}
              className="glass-morphism h-12 min-w-[200px] text-lg"
            >
              Explore Features
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="bg-primary/20 absolute -right-40 -top-40 size-80 rounded-full blur-3xl" />
      <div className="bg-secondary/20 absolute -bottom-40 -left-40 size-80 rounded-full blur-3xl" />
    </div>
  )
}
