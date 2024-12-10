"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { GlobeIcon, ArrowRight, Sparkles } from "lucide-react"
import { AnimatedGradientBackground } from "@/components/animated-gradient-background"
import { FloatingIcons } from "@/components/floating-icons"

export default function Home() {
  const router = useRouter()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedGradientBackground />
      <FloatingIcons />

      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <GlobeIcon className="h-20 w-20 text-primary" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary"
          >
            Translate Hub
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto"
          >
            Break language barriers with our advanced translation platform. 
            Powered by cutting-edge AI technology.
          </motion.p>

          <motion.div variants={itemVariants} className="space-x-4">
            <Button
              size="lg"
              onClick={() => router.push("/translate")}
              className="bg-primary hover:bg-primary/90 h-14 px-8 text-lg"
            >
              Start Translating <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/login")}
              className="h-14 px-8 text-lg"
            >
              Sign In
            </Button>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-xl backdrop-blur-lg bg-card/30 border border-border/50 hover:border-primary/50 transition-all"
              >
                <feature.icon className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-lg">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

const features = [
  {
    title: "Real-time Translation",
    description: "Get instant translations with high accuracy across 100+ languages.",
    icon: GlobeIcon,
  },
  {
    title: "Document Translation",
    description: "Upload and translate entire documents while maintaining formatting.",
    icon: Sparkles,
  },
  {
    title: "AI-Powered",
    description: "Advanced machine learning ensures natural and context-aware translations.",
    icon: GlobeIcon,
  },
]