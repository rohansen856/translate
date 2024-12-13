"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

import { Card } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    content:
      "The translation quality is exceptional. It has significantly improved our international marketing efforts.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    name: "David Chen",
    role: "Software Engineer",
    company: "DevHub",
    content:
      "Fast, accurate, and easy to use. The API integration was seamless and the documentation is excellent.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  {
    name: "Maria Garcia",
    role: "Content Manager",
    company: "GlobalMedia",
    content:
      "A game-changer for our content localization. The batch translation feature saves us hours of work.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
  },
]

export function Testimonials() {
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
            What Our Users Say
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Join thousands of satisfied users who trust our translation
            platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-morphism h-full p-6">
                <div className="mb-4 flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="mr-4 size-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-muted-foreground text-sm">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
                <div className="mb-4 flex">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-current text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
