"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function CartoonMom() {
  const momRef = useRef<HTMLDivElement>(null)
  const leftEyeRef = useRef<HTMLDivElement>(null)
  const rightEyeRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLDivElement>(null)

  // Store animation intervals for cleanup
  const animationRefs = useRef<{
    blinkInterval?: NodeJS.Timeout
  }>({})

  useEffect(() => {
    // Only proceed if all refs are available
    if (!momRef.current || !leftEyeRef.current || !rightEyeRef.current || !headRef.current) return

    // Blink animation
    animationRefs.current.blinkInterval = setInterval(
      () => {
        if (leftEyeRef.current && rightEyeRef.current) {
          gsap.to([leftEyeRef.current, rightEyeRef.current], {
            scaleY: 0.1,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "none",
          })
        }
      },
      Math.random() * 2000 + 3000,
    )

    // Head tilt animation
    const headTween = gsap.to(headRef.current, {
      rotation: -3,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    // Subtle breathing animation
    const breathingTween = gsap.to(momRef.current, {
      y: "+=5",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    // Cleanup function
    return () => {
      // Clear interval
      if (animationRefs.current.blinkInterval) {
        clearInterval(animationRefs.current.blinkInterval)
      }

      // Kill GSAP animations
      headTween.kill()
      breathingTween.kill()

      // Kill any animations on specific elements
      if (momRef.current) gsap.killTweensOf(momRef.current)
      if (headRef.current) gsap.killTweensOf(headRef.current)
      if (leftEyeRef.current) gsap.killTweensOf(leftEyeRef.current)
      if (rightEyeRef.current) gsap.killTweensOf(rightEyeRef.current)
    }
  }, [])

  return (
    <div ref={momRef} className="cartoon-mom absolute bottom-[5vh] left-1/2 z-10 -translate-x-1/2">
      <div className="relative h-80 w-60 md:h-96 md:w-72">
        {/* Mom's body */}
        <div className="absolute bottom-0 left-1/2 h-48 w-40 -translate-x-1/2 rounded-t-3xl bg-teal-500 md:h-56 md:w-48">
          {/* Apron */}
          <div className="absolute inset-x-[10%] top-[20%] bottom-0 rounded-t-xl bg-white">
            <div className="absolute inset-x-[20%] top-[10%] h-[10%] rounded-full bg-teal-300"></div>

            {/* Apron pattern */}
            <div className="absolute inset-x-[15%] top-[30%] h-[40%]">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-2 w-2 rounded-full bg-teal-300"
                  style={{
                    left: `${i * 40}%`,
                    top: `${i * 30}%`,
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Necklace */}
          <div className="absolute left-1/2 top-[15%] h-2 w-20 -translate-x-1/2 rounded-full bg-yellow-300"></div>

          {/* Arms */}
          <div className="absolute -left-8 top-1/4 h-6 w-16 rounded-full bg-teal-500 md:h-8 md:w-20"></div>
          <div className="absolute -right-8 top-1/4 h-6 w-16 rounded-full bg-teal-500 md:h-8 md:w-20"></div>

          {/* Hands */}
          <div className="absolute -left-12 top-1/4 h-8 w-8 rounded-full bg-amber-200 md:h-10 md:w-10"></div>
          <div className="absolute -right-12 top-1/4 h-8 w-8 rounded-full bg-amber-200 md:h-10 md:w-10"></div>
        </div>

        {/* Mom's head - Pixar-style */}
        <div
          ref={headRef}
          className="absolute bottom-48 left-1/2 h-32 w-32 -translate-x-1/2 origin-bottom rounded-full bg-amber-200 md:bottom-56 md:h-40 md:w-40"
        >
          {/* Face features - large Pixar-style eyes */}
          <div
            ref={leftEyeRef}
            className="absolute left-1/4 top-1/3 h-7 w-7 origin-center rounded-full bg-white md:h-9 md:w-9"
          >
            {/* Iris */}
            <div className="absolute inset-[15%] rounded-full bg-teal-400">
              {/* Pupil */}
              <div className="absolute inset-[30%] rounded-full bg-black"></div>
              {/* Eye shine */}
              <div className="absolute left-[60%] top-[20%] h-2 w-2 rounded-full bg-white md:h-3 md:w-3"></div>
            </div>

            {/* Eyelashes */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute h-2 w-0.5 bg-black"
                style={{
                  left: "50%",
                  top: "-8px",
                  transform: `translateX(-50%) rotate(${(i - 1) * 30}deg)`,
                  transformOrigin: "bottom",
                }}
              ></div>
            ))}
          </div>

          <div
            ref={rightEyeRef}
            className="absolute right-1/4 top-1/3 h-7 w-7 origin-center rounded-full bg-white md:h-9 md:w-9"
          >
            {/* Iris */}
            <div className="absolute inset-[15%] rounded-full bg-teal-400">
              {/* Pupil */}
              <div className="absolute inset-[30%] rounded-full bg-black"></div>
              {/* Eye shine */}
              <div className="absolute left-[60%] top-[20%] h-2 w-2 rounded-full bg-white md:h-3 md:w-3"></div>
            </div>

            {/* Eyelashes */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute h-2 w-0.5 bg-black"
                style={{
                  left: "50%",
                  top: "-8px",
                  transform: `translateX(-50%) rotate(${(i - 1) * 30}deg)`,
                  transformOrigin: "bottom",
                }}
              ></div>
            ))}
          </div>

          {/* Eyebrows */}
          <div className="absolute left-[20%] top-[25%] h-1.5 w-7 -rotate-15 transform rounded-full bg-amber-700 md:h-2 md:w-8"></div>
          <div className="absolute right-[20%] top-[25%] h-1.5 w-7 rotate-15 transform rounded-full bg-amber-700 md:h-2 md:w-8"></div>

          {/* Smile - warm and friendly */}
          <div className="absolute bottom-1/3 left-1/2 h-7 w-16 -translate-x-1/2 rounded-b-full border-b-4 border-black md:h-8 md:w-18">
            {/* Lipstick */}
            <div className="absolute inset-x-0 -bottom-4 h-2 rounded-full bg-red-400"></div>
          </div>

          {/* Rosy cheeks */}
          <div className="absolute bottom-1/3 left-1/6 h-4 w-4 rounded-full bg-red-300 opacity-60 md:h-5 md:w-5"></div>
          <div className="absolute bottom-1/3 right-1/6 h-4 w-4 rounded-full bg-red-300 opacity-60 md:h-5 md:w-5"></div>

          {/* Hair - styled and colorful */}
          <div className="absolute -top-2 left-0 right-0 h-1/2 rounded-t-full bg-amber-600"></div>
          <div className="absolute -left-2 top-0 h-16 w-8 rounded-l-full bg-amber-600 md:h-20 md:w-10"></div>
          <div className="absolute -right-2 top-0 h-16 w-8 rounded-r-full bg-amber-600 md:h-20 md:w-10"></div>

          {/* Hair bun */}
          <div className="absolute -top-6 left-1/2 h-10 w-10 -translate-x-1/2 rounded-full bg-amber-600 md:h-12 md:w-12"></div>

          {/* Hair highlights */}
          <div className="absolute left-[30%] top-[5%] h-6 w-2 rotate-30 transform rounded-full bg-amber-400"></div>
          <div className="absolute right-[40%] top-[10%] h-5 w-2 -rotate-15 transform rounded-full bg-amber-400"></div>

          {/* Earrings */}
          <div className="absolute -left-1 top-[40%] h-3 w-3 rounded-full bg-yellow-400 shadow-sm"></div>
          <div className="absolute -right-1 top-[40%] h-3 w-3 rounded-full bg-yellow-400 shadow-sm"></div>
        </div>
      </div>
    </div>
  )
}

