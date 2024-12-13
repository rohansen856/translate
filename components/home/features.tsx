"use client"

import { motion } from "framer-motion"
import {
  FileText,
  History,
  Keyboard,
  Languages,
  Sparkles,
  Upload,
} from "lucide-react"

import { Card } from "@/components/ui/card"

const features = [
  {
    title: "Text Translation",
    description:
      "Translate text in real-time with high accuracy powered by advanced AI.",
    Icon: Languages,
  },
  {
    title: "Document Translation",
    description:
      "Upload and translate entire documents while maintaining formatting.",
    Icon: FileText,
  },
  {
    title: "Batch Translation",
    description:
      "Translate multiple texts simultaneously for increased efficiency.",
    Icon: Upload,
  },
  {
    title: "Keyboard Shortcuts",
    description: "Speed up your workflow with convenient keyboard shortcuts.",
    Icon: Keyboard,
  },
  {
    title: "Translation History",
    description:
      "Access your past translations anytime with secure cloud storage.",
    Icon: History,
  },
  {
    title: "Smart Suggestions",
    description:
      "Get context-aware suggestions for more accurate translations.",
    Icon: Sparkles,
  },
]

export function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Powerful Features
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Everything you need for seamless translation, all in one place.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-morphism h-full p-6">
                <feature.Icon className="text-primary mb-4 size-12" />
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
