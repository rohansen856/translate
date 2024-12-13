"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CallToAction() {
  const router = useRouter()

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="from-primary/20 to-secondary/20 absolute inset-0 bg-gradient-to-r backdrop-blur-xl" />
          <div className="relative px-6 py-20 text-center md:py-28">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 text-3xl font-bold md:text-5xl"
            >
              Ready to Break Language Barriers?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl"
            >
              Join thousands of users who trust our platform for their
              translation needs. Start translating now and experience the
              difference.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
            >
              <Button
                size="lg"
                onClick={() => router.push("/translate")}
                className="h-12 min-w-[200px] text-lg"
              >
                Start Translating
                <ArrowRight className="ml-2 size-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/contact")}
                className="glass-morphism h-12 min-w-[200px] text-lg"
              >
                Contact Sales
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
