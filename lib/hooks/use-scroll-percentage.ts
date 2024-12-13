import { useEffect, useState } from "react"

export function useScrollPercentage(): number {
  const [scrollPercentage, setScrollPercentage] = useState<number>(0)

  const updateScrollPercentage = (): void => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop // Current scroll position
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight // Total scrollable height
    const scrolled = (scrollTop / scrollHeight) * 100
    setScrollPercentage(Math.min(scrolled, 100)) // Ensure it doesn't exceed 100%
  }

  useEffect(() => {
    window.addEventListener("scroll", updateScrollPercentage)

    return () => {
      window.removeEventListener("scroll", updateScrollPercentage)
    }
  }, [])

  return scrollPercentage
}
