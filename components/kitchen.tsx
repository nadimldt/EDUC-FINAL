"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function Kitchen() {
  const kitchenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!kitchenRef.current) return

    // Add a subtle animation to the background
    gsap.to(kitchenRef.current, {
      duration: 20,
      backgroundPosition: "0% 100%",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
  }, [])

  return (
    <div
      ref={kitchenRef}
      className="absolute inset-0 blur-[2px]"
      style={{
        backgroundImage: `url('/kitchen-bg.svg')`,
        backgroundSize: "cover",
        backgroundPosition: "0% 0%",
      }}
    >
      {/* Kitchen elements are part of the SVG background */}
    </div>
  )
}

