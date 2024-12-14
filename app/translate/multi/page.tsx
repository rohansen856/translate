"use client"

import { motion } from "framer-motion"

import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import DashboardNav from "@/components/dashboard-nav"
import { Footer } from "@/components/layout/footer"
import { MultiTranslateForm } from "@/components/translate/multi-translate-form"

export default function MultiTranslatePage() {
  return (
    <div className="bg-background relative min-h-screen">
      <AnimatedGradientBackground />
      <DashboardNav />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl"
        >
          <h1 className="gradient-text mb-8 text-3xl font-bold">
            Batch Translation
          </h1>

          <MultiTranslateForm />
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
