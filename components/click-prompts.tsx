"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function ClickPrompts() {
  const leftPromptRef = useRef<HTMLDivElement>(null)
  const rightPromptRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!leftPromptRef.current || !rightPromptRef.current) return

    // Animate left prompt
    gsap.to(leftPromptRef.current, {
      scale: 1.2,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    // Animate right prompt with slight delay
    gsap.to(rightPromptRef.current, {
      scale: 1.2,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      delay: 0.4,
      ease: "sine.inOut",
    })
  }, [])

  return (
    <>
      {/* Left click prompt */}
      <div
        ref={leftPromptRef}
        className="click-prompt absolute left-[25%] top-[60%] z-10 -rotate-12 transform"
        aria-hidden="true"
      >
        <p
          className="text-2xl font-bold text-yellow-500 drop-shadow-md md:text-3xl"
          style={{ fontFamily: '"Patrick Hand", cursive' }}
        >
          click!
        </p>
      </div>

      {/* Right click prompt */}
      <div
        ref={rightPromptRef}
        className="click-prompt absolute right-[25%] top-[65%] z-10 rotate-12 transform"
        aria-hidden="true"
      >
        <p
          className="text-2xl font-bold text-red-500 drop-shadow-md md:text-3xl"
          style={{ fontFamily: '"Patrick Hand", cursive' }}
        >
          click!
        </p>
      </div>
    </>
  )
}

