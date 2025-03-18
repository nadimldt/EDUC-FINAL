"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function KitchenBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!backgroundRef.current) return

    // Add a subtle animation to the background
    gsap.to(backgroundRef.current.querySelector(".sink-water"), {
      y: 2,
      opacity: 0.8,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    // Add subtle animations to fridge magnets
    const magnets = backgroundRef.current.querySelectorAll(".fridge-magnet")
    magnets.forEach((magnet) => {
      gsap.to(magnet, {
        rotation: `+=${Math.random() * 3 - 1.5}`,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    })
  }, [])

  return (
    <div ref={backgroundRef} className="absolute inset-0 bottom-0 overflow-hidden">
      {/* Kitchen background with first-person perspective */}
      <div className="absolute inset-0 bg-amber-50">
        {/* Wall */}
        <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-amber-100 to-amber-50"></div>

        {/* Window above sink */}
        <div className="absolute left-1/2 top-[10vh] h-[25vh] w-[30vw] -translate-x-1/2 rounded-t-lg border-4 border-amber-800 bg-sky-200">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-100 to-sky-300 opacity-50"></div>
          <div className="absolute inset-x-0 top-1/2 h-1 bg-amber-800"></div>
          <div className="absolute inset-y-0 left-1/2 w-1 bg-amber-800"></div>
        </div>

        {/* Sink */}
        <div className="absolute left-1/2 top-[35vh] h-[15vh] w-[35vw] -translate-x-1/2 rounded-t-md bg-gray-300">
          <div className="absolute inset-x-[10%] top-[20%] bottom-0 rounded-t-md bg-gray-400">
            {/* Sink water */}
            <div className="sink-water absolute inset-x-[10%] top-[20%] bottom-[30%] rounded-t-md bg-sky-300 opacity-60"></div>
          </div>
          {/* Faucet */}
          <div className="absolute left-1/2 top-0 h-[10vh] w-[5vw] -translate-x-1/2 -translate-y-[80%]">
            <div className="absolute bottom-0 left-1/2 h-[5vh] w-[1vw] -translate-x-1/2 rounded-t-md bg-gray-600"></div>
            <div className="absolute bottom-[5vh] left-1/2 h-[1vh] w-[3vw] -translate-x-1/2 rounded-md bg-gray-600"></div>
          </div>
        </div>

        {/* Left cabinet */}
        <div className="absolute left-[10vw] top-[15vh] h-[35vh] w-[25vw] bg-amber-700">
          <div className="absolute inset-[2%] bg-amber-800 bg-opacity-20"></div>
          <div className="absolute right-[10%] top-1/2 h-[3vh] w-[1vw] -translate-y-1/2 rounded-full bg-amber-900"></div>
        </div>

        {/* Right cabinet */}
        <div className="absolute right-[10vw] top-[15vh] h-[35vh] w-[25vw] bg-amber-700">
          <div className="absolute inset-[2%] bg-amber-800 bg-opacity-20"></div>
          <div className="absolute left-[10%] top-1/2 h-[3vh] w-[1vw] -translate-y-1/2 rounded-full bg-amber-900"></div>
        </div>

        {/* Fridge (right side) with enhanced decorations */}
        <div className="absolute right-[5vw] top-0 h-[60vh] w-[15vw] bg-gray-100">
          <div className="absolute inset-x-[5%] top-[5%] h-[45%] border-2 border-gray-300"></div>
          <div className="absolute inset-x-[5%] bottom-[5%] h-[45%] border-2 border-gray-300"></div>
          <div className="absolute left-[10%] top-[48%] h-[4vh] w-[2vw] rounded-md bg-gray-400"></div>

          {/* Fridge magnets and decorations */}
          {/* Apple magnet */}
          <div className="fridge-magnet absolute left-[20%] top-[15%] h-[5vh] w-[3vw] origin-center rounded-full bg-red-500 shadow-md">
            <div className="absolute inset-[15%] rounded-full bg-red-400"></div>
            <div className="absolute left-1/2 -top-1 h-[1vh] w-[0.5vw] -translate-x-1/2 bg-green-700"></div>
          </div>

          {/* Letter magnet */}
          <div className="fridge-magnet absolute left-[60%] top-[10%] h-[4vh] w-[4vh] origin-center rotate-12 bg-yellow-400 shadow-md">
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-yellow-700 md:text-sm">
              A
            </div>
          </div>

          {/* Star magnet */}
          <div
            className="fridge-magnet absolute left-[35%] top-[30%] h-[4vh] w-[4vh] origin-center -rotate-6 bg-blue-400 shadow-md"
            style={{
              clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
          ></div>

          {/* Family photo */}
          <div className="fridge-magnet absolute left-[30%] top-[40%] h-[8vh] w-[6vw] origin-center -rotate-3 rounded-md bg-white p-1 shadow-md">
            <div className="absolute inset-0 bg-[url('/family-photo.svg')] bg-cover"></div>
          </div>

          {/* Child drawing */}
          <div className="fridge-magnet absolute left-[55%] top-[60%] h-[10vh] w-[8vw] origin-center rotate-5 rounded-md bg-white p-1 shadow-md">
            <div className="absolute inset-0 bg-[url('/child-drawing.svg')] bg-cover"></div>
          </div>

          {/* Diamond magnet */}
          <div
            className="fridge-magnet absolute left-[70%] top-[70%] h-[4vh] w-[4vh] origin-center -rotate-6 bg-green-500 shadow-md"
            style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
          >
            <div
              className="absolute inset-[15%] bg-green-400"
              style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
            ></div>
          </div>

          {/* Heart magnet */}
          <div
            className="fridge-magnet absolute left-[15%] top-[75%] h-[5vh] w-[5vh] origin-center rotate-12 bg-pink-500 shadow-md"
            style={{
              clipPath:
                'path("M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z")',
            }}
          ></div>

          {/* Handwritten note */}
          <div className="fridge-magnet absolute left-[45%] top-[20%] h-[7vh] w-[5vw] origin-center rotate-3 bg-yellow-100 p-1 shadow-sm">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-[8px] text-gray-800 md:text-[10px]" style={{ fontFamily: '"Patrick Hand", cursive' }}>
                Grocery list:
                <br />- Milk
                <br />- Eggs
                <br />- Bread
              </p>
            </div>
          </div>
        </div>

        {/* Blur filter */}
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>
      </div>
    </div>
  )
}

