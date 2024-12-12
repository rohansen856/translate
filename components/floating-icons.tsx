"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { FileText, GlobeIcon, Languages, MessageCircle } from "lucide-react"

const icons = [GlobeIcon, Languages, MessageCircle, FileText]

export function FloatingIcons() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-primary/20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 5,
            delay: index * 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            left: `${20 + index * 25}%`,
            top: `${20 + index * 15}%`,
          }}
        >
          <Icon size={40} />
        </motion.div>
      ))}
    </div>
  )
}
