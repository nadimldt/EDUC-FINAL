"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"

interface ResetButtonProps {
  onReset: () => void
}

export function ResetButton({ onReset }: ResetButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!buttonRef.current) return

    // Set up hover animations
    buttonRef.current.addEventListener("mouseenter", () => {
      gsap.to(buttonRef.current, {
        scale: 1.1,
        backgroundColor: "#e05d00", // Darker orange
        duration: 0.3,
        ease: "back.out(1.7)",
      })
    })

    buttonRef.current.addEventListener("mouseleave", () => {
      gsap.to(buttonRef.current, {
        scale: 1,
        backgroundColor: "#f97316", // Original orange
        duration: 0.3,
        ease: "back.out(1.7)",
      })
    })

    // Add entrance animation
    gsap.from(buttonRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)",
      delay: 0.3,
    })
  }, [])

  return (
    <button
      ref={buttonRef}
      onClick={onReset}
      className="absolute top-4 right-4 z-50 rounded-full bg-orange-500 px-4 py-2 font-bold text-white shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
      style={{ fontFamily: '"Patrick Hand", cursive' }}
      aria-label="Reset to landing page"
    >
      reset
    </button>
  )
}

