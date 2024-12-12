"use client"

export function AnimatedGradientBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 opacity-30"
      style={{
        background:
          "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))",
        backgroundSize: "200% 200%",
      }}
    />
  )
}
