"use client"

import { motion } from "framer-motion"
import { Award, Globe2, Star, Users } from "lucide-react"

import { Card } from "@/components/ui/card"

const stats = [
  {
    label: "Active Users",
    value: "100K+",
    Icon: Users,
    description: "Trust our platform daily",
  },
  {
    label: "Languages",
    value: "50+",
    Icon: Globe2,
    description: "Supported languages",
  },
  {
    label: "Accuracy Rate",
    value: "99.9%",
    Icon: Star,
    description: "Translation accuracy",
  },
  {
    label: "Industry Leader",
    value: "#1",
    Icon: Award,
    description: "In customer satisfaction",
  },
]

export function Statistics() {
  return (
    <section className="bg-primary/5 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-morphism h-full p-6 text-center">
                <stat.Icon className="text-primary mx-auto mb-4 size-8" />
                <div className="mb-2 text-3xl font-bold">{stat.value}</div>
                <div className="mb-1 text-lg font-medium">{stat.label}</div>
                <p className="text-muted-foreground text-sm">
                  {stat.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
