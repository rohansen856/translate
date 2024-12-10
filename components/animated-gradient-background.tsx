"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function AnimatedGradientBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({ repeat: -1 })
    
    tl.to(containerRef.current, {
      backgroundPosition: '200% 50%',
      duration: 15,
      ease: 'none'
    })

    return () => {tl.kill()}
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 opacity-30"
      style={{
        background: 'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))',
        backgroundSize: '200% 200%',
      }}
    />
  )
}