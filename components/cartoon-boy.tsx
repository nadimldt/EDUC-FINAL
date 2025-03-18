"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"

// Array of phrases the boy can say
const phrases = ["Wow!", "Nice cut!", "I'm hungry!", "Mom, when is lunch?", "Can I try?", "Looks yummy!", "Cool!"]

export function CartoonBoy() {
  const [currentPhrase, setCurrentPhrase] = useState("")
  const [showFromLeft, setShowFromLeft] = useState(true)
  const boyRef = useRef<HTMLDivElement>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set up the animation to run every 10 seconds
    const interval = setInterval(() => {
      showBoy()
    }, 10000)

    // Show the boy initially after a short delay
    const initialTimeout = setTimeout(() => {
      showBoy()
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(initialTimeout)
    }
  }, [])

  const showBoy = () => {
    if (!boyRef.current || !bubbleRef.current) return

    // Choose a random phrase
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]
    setCurrentPhrase(randomPhrase)

    // Create animation timeline
    const timeline = gsap.timeline({
      onComplete: () => {
        // Toggle side for next appearance
        setShowFromLeft((prev) => !prev)
      },
    })

    // Reset position
    gsap.set(boyRef.current, {
      x: showFromLeft ? "-100%" : "100%",
      opacity: 0,
    })

    gsap.set(bubbleRef.current, {
      scale: 0,
      opacity: 0,
    })

    // Animate boy coming in
    timeline
      .to(boyRef.current, {
        duration: 0.8,
        x: 0,
        opacity: 1,
        ease: "elastic.out(1, 0.5)",
      })
      .to(bubbleRef.current, {
        duration: 0.5,
        scale: 1,
        opacity: 1,
        ease: "back.out(1.7)",
      })
      .to(bubbleRef.current, {
        duration: 0.2,
        y: -5,
        repeat: 3,
        yoyo: true,
        ease: "sine.inOut",
      })
      .to([boyRef.current, bubbleRef.current], {
        duration: 0.7,
        x: showFromLeft ? "-100%" : "100%",
        opacity: 0,
        ease: "back.in(1.7)",
        delay: 2.5,
      })
  }

  return (
    <>
      {/* Boy from left side */}
      {showFromLeft && (
        <div className="absolute bottom-[30vh] left-0 z-20">
          <div ref={boyRef} className="relative -left-full opacity-0">
            {/* Boy's head and upper body */}
            <div className="relative h-40 w-40 md:h-48 md:w-48">
              {/* Body/shirt */}
              <div className="absolute bottom-0 left-1/2 h-16 w-24 -translate-x-1/2 rounded-t-lg bg-blue-500 md:h-20 md:w-28"></div>

              {/* Head */}
              <div className="absolute bottom-16 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-amber-200 md:bottom-20 md:h-32 md:w-32">
                {/* Face features */}
                <div className="absolute left-1/4 top-1/3 h-4 w-4 rounded-full bg-black md:h-5 md:w-5">
                  {/* Eye shine */}
                  <div className="absolute left-1/4 top-1/4 h-1.5 w-1.5 rounded-full bg-white md:h-2 md:w-2"></div>
                </div>

                <div className="absolute right-1/4 top-1/3 h-4 w-4 rounded-full bg-black md:h-5 md:w-5">
                  {/* Eye shine */}
                  <div className="absolute left-1/4 top-1/4 h-1.5 w-1.5 rounded-full bg-white md:h-2 md:w-2"></div>
                </div>

                {/* Smile */}
                <div className="absolute bottom-1/3 left-1/2 h-6 w-12 -translate-x-1/2 rounded-b-full border-b-4 border-black md:h-7 md:w-14"></div>

                {/* Rosy cheeks */}
                <div className="absolute bottom-1/3 left-1/6 h-3 w-3 rounded-full bg-red-300 opacity-60 md:h-4 md:w-4"></div>
                <div className="absolute bottom-1/3 right-1/6 h-3 w-3 rounded-full bg-red-300 opacity-60 md:h-4 md:w-4"></div>

                {/* Hair */}
                <div className="absolute -top-1 left-0 right-0 h-1/3 rounded-t-full bg-amber-800"></div>
                <div className="absolute -left-1 -top-1 h-6 w-6 rounded-full bg-amber-800 md:h-8 md:w-8"></div>
                <div className="absolute -right-1 -top-1 h-6 w-6 rounded-full bg-amber-800 md:h-8 md:w-8"></div>
              </div>

              {/* Arms */}
              <div className="absolute -left-4 bottom-8 h-4 w-10 rounded-full bg-blue-500 md:h-5 md:w-12"></div>
            </div>

            {/* Speech bubble */}
            <div
              ref={bubbleRef}
              className="absolute -right-4 top-0 origin-bottom-left scale-0 rounded-xl bg-white p-3 opacity-0 shadow-md"
            >
              <div className="absolute -bottom-2 left-2 h-4 w-4 rotate-45 bg-white"></div>
              <p
                className="whitespace-nowrap text-center text-lg font-bold text-gray-800 md:text-xl"
                style={{ fontFamily: '"Patrick Hand", cursive' }}
              >
                {currentPhrase}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Boy from right side */}
      {!showFromLeft && (
        <div className="absolute bottom-[30vh] right-0 z-20">
          <div ref={boyRef} className="relative -right-full opacity-0">
            {/* Boy's head and upper body */}
            <div className="relative h-40 w-40 md:h-48 md:w-48">
              {/* Body/shirt */}
              <div className="absolute bottom-0 left-1/2 h-16 w-24 -translate-x-1/2 rounded-t-lg bg-blue-500 md:h-20 md:w-28"></div>

              {/* Head */}
              <div className="absolute bottom-16 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-amber-200 md:bottom-20 md:h-32 md:w-32">
                {/* Face features */}
                <div className="absolute left-1/4 top-1/3 h-4 w-4 rounded-full bg-black md:h-5 md:w-5">
                  {/* Eye shine */}
                  <div className="absolute left-1/4 top-1/4 h-1.5 w-1.5 rounded-full bg-white md:h-2 md:w-2"></div>
                </div>

                <div className="absolute right-1/4 top-1/3 h-4 w-4 rounded-full bg-black md:h-5 md:w-5">
                  {/* Eye shine */}
                  <div className="absolute left-1/4 top-1/4 h-1.5 w-1.5 rounded-full bg-white md:h-2 md:w-2"></div>
                </div>

                {/* Smile */}
                <div className="absolute bottom-1/3 left-1/2 h-6 w-12 -translate-x-1/2 rounded-b-full border-b-4 border-black md:h-7 md:w-14"></div>

                {/* Rosy cheeks */}
                <div className="absolute bottom-1/3 left-1/6 h-3 w-3 rounded-full bg-red-300 opacity-60 md:h-4 md:w-4"></div>
                <div className="absolute bottom-1/3 right-1/6 h-3 w-3 rounded-full bg-red-300 opacity-60 md:h-4 md:w-4"></div>

                {/* Hair */}
                <div className="absolute -top-1 left-0 right-0 h-1/3 rounded-t-full bg-amber-800"></div>
                <div className="absolute -left-1 -top-1 h-6 w-6 rounded-full bg-amber-800 md:h-8 md:w-8"></div>
                <div className="absolute -right-1 -top-1 h-6 w-6 rounded-full bg-amber-800 md:h-8 md:w-8"></div>
              </div>

              {/* Arms */}
              <div className="absolute -right-4 bottom-8 h-4 w-10 rounded-full bg-blue-500 md:h-5 md:w-12"></div>
            </div>

            {/* Speech bubble */}
            <div
              ref={bubbleRef}
              className="absolute -left-4 top-0 origin-bottom-right scale-0 rounded-xl bg-white p-3 opacity-0 shadow-md"
            >
              <div className="absolute -bottom-2 right-2 h-4 w-4 rotate-45 bg-white"></div>
              <p
                className="whitespace-nowrap text-center text-lg font-bold text-gray-800 md:text-xl"
                style={{ fontFamily: '"Patrick Hand", cursive' }}
              >
                {currentPhrase}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

