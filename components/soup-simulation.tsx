"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"

type SimulationStep = "intro" | "stirring" | "heat" | "simmer" | "all-controls" | "result"

type HeatLevel = "low" | "medium" | "high"

export function SoupSimulation() {
  // State for simulation steps
  const [currentStep, setCurrentStep] = useState<SimulationStep>("intro")

  // Interactive variables
  const [stirringSpeed, setStirringSpeed] = useState<number>(50) // 0-100
  const [heatLevel, setHeatLevel] = useState<HeatLevel>("medium")
  const [simmerTimeRemaining, setSimmerTimeRemaining] = useState<number>(120) // 2 minutes in seconds
  const [simmerSpeed, setSimmerSpeed] = useState<number>(50) // 0-100
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)

  // Intensity meter
  const [intensityValue, setIntensityValue] = useState<number>(50) // 0-100
  const [feedback, setFeedback] = useState<string>("")

  // Animation refs
  const containerRef = useRef<HTMLDivElement>(null)
  const potRef = useRef<HTMLDivElement>(null)
  const momRef = useRef<HTMLDivElement>(null)
  const speechRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const bubblesRef = useRef<HTMLDivElement>(null)
  const spoonRef = useRef<HTMLDivElement>(null)
  const vegetablesRef = useRef<HTMLDivElement>(null)

  // Ideal values and weights for intensity calculation
  const idealValues = {
    stirring: 50,
    heat: 1, // 0=low, 1=medium, 2=high
    simmerTime: 60, // 1 minute is ideal
  }

  const weights = {
    stirring: 0.4,
    heat: 0.3,
    simmerTime: 0.3,
  }

  // Initialize animations
  useEffect(() => {
    if (containerRef.current && momRef.current && speechRef.current) {
      const timeline = gsap.timeline()

      // Animate mom appearing
      timeline.fromTo(
        momRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      )

      // Animate speech bubble
      timeline.fromTo(
        speechRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.4",
      )

      // Animate pot
      if (potRef.current) {
        timeline.fromTo(
          potRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
          "-=0.2",
        )
      }
    }
  }, [])

  // Timer effect
  useEffect(() => {
    let timerInterval: NodeJS.Timeout | null = null

    if (isTimerRunning && simmerTimeRemaining > 0 && (currentStep === "simmer" || currentStep === "all-controls")) {
      // Calculate the timer speed based on simmerSpeed (50 is normal speed)
      const timerSpeed = 1000 / (simmerSpeed / 25) // Adjusted for more noticeable effect

      timerInterval = setInterval(() => {
        setSimmerTimeRemaining((prev) => {
          if (prev <= 1) {
            // Timer has reached zero, end simulation
            setCurrentStep("result")
            setIsTimerRunning(false)
            return 0
          }
          return prev - 1
        })
      }, timerSpeed)
    }

    return () => {
      if (timerInterval) clearInterval(timerInterval)
    }
  }, [isTimerRunning, simmerTimeRemaining, simmerSpeed, currentStep])

  // Update intensity meter based on current values
  useEffect(() => {
    // Only calculate intensity when all controls are available
    if (currentStep === "all-controls" || currentStep === "result") {
      calculateIntensity()
    }

    // Update bubbling animation based on heat level
    updateBubbling()

    // Update spoon animation based on stirring speed
    updateStirring()

    // Update vegetable animation
    updateVegetables()
  }, [stirringSpeed, heatLevel, simmerTimeRemaining, currentStep])

  // Calculate intensity based on the formula
  const calculateIntensity = () => {
    // Convert heat level to numeric value
    const heatValue = heatLevel === "low" ? 0 : heatLevel === "medium" ? 1 : 2

    // Calculate intensity using the formula
    const stirringDiff = Math.abs(stirringSpeed - idealValues.stirring) / 50
    const heatDiff = Math.abs(heatValue - idealValues.heat) / 2
    const simmerDiff = Math.abs(simmerTimeRemaining - idealValues.simmerTime) / 120

    // Apply weights
    const weightedIntensity =
      weights.stirring * stirringDiff + weights.heat * heatDiff + weights.simmerTime * simmerDiff

    // Convert to 0-100 scale (invert the calculation to make it more intuitive)
    const intensityScore = 100 - weightedIntensity * 100

    // Clamp between 0-100
    const clampedIntensity = Math.max(0, Math.min(100, intensityScore))

    setIntensityValue(clampedIntensity)

    // Set feedback based on intensity
    if (intensityValue < 25) {
      setFeedback("Too hot! The soup is burning!")
    } else if (intensityValue > 75) {
      setFeedback("Too cold! Turn up the heat a bit.")
    } else {
      setFeedback("Perfect! The soup is cooking nicely.")
    }
  }

  // Update bubbling animation based on heat level
  const updateBubbling = () => {
    if (!bubblesRef.current) return

    // Clear existing animations
    gsap.killTweensOf(bubblesRef.current.children)

    // Set bubbling intensity based on heat level
    const bubbles = bubblesRef.current.children
    const bubbleIntensity = heatLevel === "low" ? 0.3 : heatLevel === "medium" ? 0.7 : 1.2

    // Animate each bubble
    Array.from(bubbles).forEach((bubble, index) => {
      gsap.to(bubble, {
        y: -20 * bubbleIntensity,
        opacity: 0,
        duration: 1 + Math.random() * 2,
        repeat: -1,
        delay: index * 0.2,
        ease: "power1.out",
        yoyo: true,
      })
    })
  }

  // Update spoon animation based on stirring speed
  const updateStirring = () => {
    if (!spoonRef.current) return

    // Clear existing animations
    gsap.killTweensOf(spoonRef.current)

    // Only animate if we're in the right steps
    if (currentStep === "stirring" || currentStep === "all-controls") {
      // Calculate rotation speed based on stirring speed (inverse relationship)
      // Lower stirringSpeed = slower rotation (higher duration)
      const rotationDuration = 5 - stirringSpeed / 25 // 5s at 0, 1s at 100

      // Animate spoon rotation
      gsap.to(spoonRef.current, {
        rotation: 360,
        duration: rotationDuration,
        repeat: -1,
        ease: "none",
      })
    } else {
      // Reset rotation
      gsap.to(spoonRef.current, {
        rotation: 0,
        duration: 0.5,
      })
    }
  }

  // Update vegetable animation based on stirring
  const updateVegetables = () => {
    if (!vegetablesRef.current) return

    // Clear existing animations
    gsap.killTweensOf(vegetablesRef.current.children)

    // Only animate if we're in the right steps
    if ((currentStep === "stirring" || currentStep === "all-controls") && stirringSpeed > 10) {
      // Calculate movement based on stirring speed
      const moveAmount = stirringSpeed / 10 // 0-10px

      // Animate each vegetable
      Array.from(vegetablesRef.current.children).forEach((veg, index) => {
        gsap.to(veg, {
          x: `random(-${moveAmount}, ${moveAmount})`,
          y: `random(-${moveAmount}, ${moveAmount})`,
          rotation: `random(-${moveAmount * 2}, ${moveAmount * 2})`,
          duration: 0.5 + Math.random() * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.1,
        })
      })
    }
  }

  const handleNextClick = () => {
    // Progress through the simulation steps
    switch (currentStep) {
      case "intro":
        setCurrentStep("stirring")
        break
      case "stirring":
        setCurrentStep("heat")
        break
      case "heat":
        setCurrentStep("simmer")
        setIsTimerRunning(true) // Start the timer when we reach the simmer step
        break
      case "simmer":
        setCurrentStep("all-controls")
        break
      default:
        break
    }
  }

  // Format time remaining as MM:SS
  const formatTimeRemaining = () => {
    const minutes = Math.floor(simmerTimeRemaining / 60)
    const seconds = simmerTimeRemaining % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  // Get speech text based on current step
  const getSpeechText = () => {
    switch (currentStep) {
      case "intro":
        return "Time to test your skills! Let's begin with the spoon."
      case "stirring":
        return "The spoon is meant for stirring! We need all the ingredients to be well-mixed together. But be careful! Over-stirring or under-stirring will ruin your soup!"
      case "heat":
        return "Heat is important! This is where the real cooking happens. But remember, too much or too little heat will impact your soup!"
      case "simmer":
        return "Ah yes, the simmer! We need to ensure it cooks for the right amount of time. You can increase or decrease the simmer time, but remember, your decision will affect the soup's taste!"
      case "all-controls":
        return "Try not to go over or under the threshold of the Intensity Meter!"
      case "result":
        return feedback
      default:
        return ""
    }
  }

  // Get content based on current step
  const getContent = () => {
    if (currentStep === "intro") {
      return (
        <div ref={contentRef} className="w-full max-w-2xl text-center">
          <h2
            className="mb-8 text-center text-3xl font-bold text-amber-900 md:text-4xl"
            style={{ fontFamily: '"Patrick Hand", cursive' }}
          >
            Time to Cook a Soup!
          </h2>
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleNextClick}
              className="transform rounded-full bg-orange-500 px-8 py-3 text-xl font-bold text-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 md:text-2xl"
              style={{ fontFamily: '"Patrick Hand", cursive' }}
            >
              Next
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="relative w-full">
        <div className="mx-auto w-full max-w-4xl">
          {/* First-person POV cooking scene */}
          <div className="relative mx-auto h-[400px] w-full overflow-hidden rounded-lg">
            {/* Kitchen background */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-50 to-amber-100">
              {/* Countertop */}
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-b from-amber-700 to-amber-800">
                <div className="absolute inset-0 bg-[url('/wood-texture.svg')] bg-cover opacity-50"></div>
              </div>
            </div>

            {/* Stove from first-person view */}
            <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] perspective-800">
              {/* Stove surface */}
              <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-gray-800 transform-gpu rotateX(60deg) origin-bottom"></div>

              {/* Burner */}
              <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[40%] h-[10%] transform-gpu rotateX(60deg) origin-bottom">
                <div className="absolute inset-0 rounded-full bg-gray-900"></div>
                <div className="absolute inset-[10%] rounded-full bg-gray-700"></div>

                {/* Flame effect */}
                {heatLevel === "low" && (
                  <div className="absolute inset-[20%] rounded-full bg-blue-500 opacity-40 animate-pulse"></div>
                )}
                {heatLevel === "medium" && (
                  <div className="absolute inset-[20%] rounded-full bg-yellow-500 opacity-60 animate-pulse"></div>
                )}
                {heatLevel === "high" && (
                  <div className="absolute inset-[20%] rounded-full bg-red-500 opacity-80 animate-pulse"></div>
                )}
              </div>

              {/* Pot from first-person view */}
              <div ref={potRef} className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-[60%] h-[60%]">
                {/* Pot rim - elliptical to simulate perspective */}
                <div className="absolute top-0 left-0 right-0 h-[10%] bg-gray-300 rounded-full transform-gpu rotateX(70deg) origin-bottom"></div>

                {/* Pot interior with soup */}
                <div className="absolute top-[10%] left-[5%] right-[5%] bottom-0 overflow-hidden">
                  {/* Soup surface - elliptical to simulate perspective */}
                  <div className="absolute top-0 left-0 right-0 h-[90%] bg-amber-300 rounded-full transform-gpu rotateX(70deg) origin-bottom">
                    {/* Bubbles */}
                    <div ref={bubblesRef} className="absolute inset-0">
                      <div className="absolute top-[20%] left-[30%] h-3 w-3 rounded-full bg-amber-100 opacity-60"></div>
                      <div className="absolute top-[40%] left-[50%] h-2 w-2 rounded-full bg-amber-100 opacity-60"></div>
                      <div className="absolute top-[30%] left-[70%] h-4 w-4 rounded-full bg-amber-100 opacity-60"></div>
                      <div className="absolute top-[50%] left-[40%] h-3 w-3 rounded-full bg-amber-100 opacity-60"></div>
                      <div className="absolute top-[60%] left-[60%] h-2 w-2 rounded-full bg-amber-100 opacity-60"></div>
                    </div>

                    {/* Vegetables floating in soup */}
                    <div ref={vegetablesRef} className="absolute inset-0">
                      <div className="absolute top-[20%] left-[20%] h-6 w-6 rounded-full bg-green-500 transform-gpu rotateX(70deg)"></div>
                      <div className="absolute top-[40%] left-[60%] h-5 w-5 rounded-full bg-orange-500 transform-gpu rotateX(70deg)"></div>
                      <div className="absolute top-[60%] left-[30%] h-7 w-7 rounded-full bg-red-500 transform-gpu rotateX(70deg)"></div>
                      <div className="absolute top-[30%] left-[70%] h-5 w-5 rounded-full bg-yellow-500 transform-gpu rotateX(70deg)"></div>
                      <div className="absolute top-[50%] left-[40%] h-4 w-4 rounded-full bg-purple-500 transform-gpu rotateX(70deg)"></div>
                    </div>

                    {/* Steam effect */}
                    {(heatLevel === "medium" || heatLevel === "high") && (
                      <div className="absolute -top-10 left-0 right-0 flex justify-center">
                        <div className="h-20 w-20 opacity-40">
                          <div className="absolute h-full w-full animate-steam-1 bg-gradient-to-t from-white to-transparent rounded-full"></div>
                          <div className="absolute h-full w-full animate-steam-2 bg-gradient-to-t from-white to-transparent rounded-full"></div>
                          <div className="absolute h-full w-full animate-steam-3 bg-gradient-to-t from-white to-transparent rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Spoon from first-person view */}
                <div ref={spoonRef} className="absolute top-[5%] left-1/2 -translate-x-1/2 origin-bottom z-10">
                  {/* Spoon handle coming toward viewer */}
                  <div className="h-[200px] w-4 bg-gradient-to-b from-amber-700 to-amber-900 rounded-b-full transform-gpu rotateX(20deg) origin-bottom"></div>

                  {/* Spoon bowl */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-gradient-to-b from-amber-600 to-amber-800 shadow-md transform-gpu rotateX(70deg)"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-amber-50 p-6 rounded-lg shadow-md">
            {/* Left column */}
            <div className="space-y-6">
              {/* Stirring control - visible in stirring step and all-controls */}
              {(currentStep === "stirring" || currentStep === "all-controls") && (
                <div className="flex flex-col space-y-2 bg-white p-4 rounded-lg shadow-sm">
                  <label className="text-lg font-semibold text-amber-900">Stirring Speed: {stirringSpeed}</label>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm">Slow</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={stirringSpeed}
                      onChange={(e) => setStirringSpeed(Number.parseInt(e.target.value))}
                      className="flex-1 accent-amber-500"
                    />
                    <span className="text-sm">Fast</span>
                  </div>
                </div>
              )}

              {/* Heat control - visible in heat step and all-controls */}
              {(currentStep === "heat" || currentStep === "all-controls") && (
                <div className="flex flex-col space-y-2 bg-white p-4 rounded-lg shadow-sm">
                  <label className="text-lg font-semibold text-amber-900">Heat Level</label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setHeatLevel("low")}
                      className={`flex-1 px-4 py-2 rounded-md transition-colors ${
                        heatLevel === "low" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                    >
                      Low
                    </button>
                    <button
                      onClick={() => setHeatLevel("medium")}
                      className={`flex-1 px-4 py-2 rounded-md transition-colors ${
                        heatLevel === "medium"
                          ? "bg-yellow-500 text-white"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                    >
                      Medium
                    </button>
                    <button
                      onClick={() => setHeatLevel("high")}
                      className={`flex-1 px-4 py-2 rounded-md transition-colors ${
                        heatLevel === "high" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                    >
                      High
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Simmer time control - visible in simmer step and all-controls */}
              {(currentStep === "simmer" || currentStep === "all-controls") && (
                <div className="flex flex-col space-y-2 bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center">
                    <label className="text-lg font-semibold text-amber-900">Simmer Time</label>
                    <span className="text-xl font-mono bg-gray-100 px-3 py-1 rounded-md">{formatTimeRemaining()}</span>
                  </div>
                  <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all"
                      style={{ width: `${(simmerTimeRemaining / 120) * 100}%` }}
                    ></div>
                  </div>

                  <label className="mt-2 text-lg font-semibold text-amber-900">Simmer Speed: {simmerSpeed}</label>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm">Slow</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={simmerSpeed}
                      onChange={(e) => setSimmerSpeed(Number.parseInt(e.target.value))}
                      className="flex-1 accent-amber-500"
                    />
                    <span className="text-sm">Fast</span>
                  </div>
                </div>
              )}

              {/* Intensity meter - visible in all-controls and result */}
              {(currentStep === "all-controls" || currentStep === "result") && (
                <div className="flex flex-col space-y-2 bg-white p-4 rounded-lg shadow-sm">
                  <label className="text-lg font-semibold text-amber-900">Intensity Meter</label>
                  <div className="h-8 w-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded-full overflow-hidden relative">
                    <div
                      className="absolute top-0 bottom-0 w-4 bg-black border-2 border-white rounded-full shadow-md transition-all"
                      style={{ left: `calc(${intensityValue}% - 8px)` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-600 font-medium">Too Low</span>
                    <span className="text-green-600 font-medium">Balanced</span>
                    <span className="text-red-600 font-medium">Too High</span>
                  </div>
                </div>
              )}
            </div>

            {/* Next button - not visible in all-controls or result step */}
            {currentStep !== "all-controls" && currentStep !== "result" && (
              <div className="col-span-1 md:col-span-2 mt-4 flex justify-center">
                <button
                  onClick={handleNextClick}
                  className="transform rounded-full bg-orange-500 px-8 py-3 text-xl font-bold text-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                  style={{ fontFamily: '"Patrick Hand", cursive' }}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative flex h-full w-full flex-col items-center justify-center bg-amber-100">
      {/* Mom avatar in top-left */}
      <div ref={momRef} className="absolute top-4 left-4 z-10">
        <div className="relative h-24 w-24">
          <img src="https://i.imgur.com/XSf9CHN.png" alt="Mom" className="h-full w-full object-contain" />
        </div>

        {/* Speech bubble */}
        <div ref={speechRef} className="absolute top-0 left-24 w-64 rounded-xl bg-white p-4 shadow-md">
          <div className="absolute -left-2 top-8 h-4 w-4 rotate-45 bg-white"></div>
          <p className="text-lg text-amber-900" style={{ fontFamily: '"Patrick Hand", cursive' }}>
            {getSpeechText()}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex w-full max-w-6xl flex-col items-center justify-center p-6">{getContent()}</div>
    </div>
  )
}

