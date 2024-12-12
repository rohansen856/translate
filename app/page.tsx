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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

  const faqItems = [
    {
      question: "How accurate are the translations?",
      answer:
        "Our translations are powered by advanced AI technology, providing high accuracy across multiple languages.",
    },
    {
      question: "Which file formats are supported?",
      answer:
        "Currently, we support .txt files for translation. More formats coming soon!",
    },
    {
      question: "Is there a limit to translation length?",
      answer:
        "You can translate texts up to 5000 characters at once. For longer texts, please use our file translation feature.",
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedGradientBackground />
      <FloatingIcons />

      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div
            variants={itemVariants}
            className="mb-8 flex justify-center"
          >
            <GlobeIcon className="text-primary size-20" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="gradient-text mb-6 text-5xl font-bold md:text-7xl"
          >
            Translate Hub
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-muted-foreground mx-auto mb-8 max-w-3xl text-xl md:text-2xl"
          >
            Break language barriers with our advanced translation platform.
            Powered by cutting-edge AI technology.
          </motion.p>

          <motion.div variants={itemVariants} className="space-x-4">
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

            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/login")}
              className="glass-morphism h-14 px-8 text-lg"
            >
              Sign In
            </Button>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-32 grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
                onClick={() => router.push(feature.path)}
              >
                <Card className="glass-morphism border-border/50 hover:border-primary/50 rounded-xl border p-8 transition-all">
                  <feature.icon className="text-primary group-hover:text-secondary mb-4 size-10 transition-colors" />
                  <h3 className="mb-3 text-2xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-32"
          >
            <motion.h2
              variants={itemVariants}
              className="gradient-text mb-8 text-3xl font-bold"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.div variants={itemVariants} className="mx-auto max-w-2xl">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-left">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16 mt-32"
          >
            <motion.h2
              variants={itemVariants}
              className="gradient-text mb-8 text-3xl font-bold"
            >
              Ready to Get Started?
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="flex justify-center space-x-4"
            >
              <Button
                size="lg"
                onClick={() => router.push("/translate")}
                className="bg-primary hover:bg-primary/90 h-14 px-8 text-lg"
              >
                Try for Free <Sparkles className="ml-2 size-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/dashboard")}
                className="glass-morphism h-14 px-8 text-lg"
              >
                View Dashboard
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
