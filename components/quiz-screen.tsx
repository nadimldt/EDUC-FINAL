"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { SoupSimulation } from "./soup-simulation"

type AnswerState = "unanswered" | "correct" | "incorrect"

interface QuizOption {
  text: string
  isCorrect: boolean
}

// Define the different explanation steps
type ExplanationStep =
  | "quiz"
  | "theory"
  | "impact"
  | "egg-alone"
  | "combination"
  | "exclusion"
  | "final"
  | "conclusion"
  | "soup"

export function QuizScreen() {
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: boolean }>({})
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered")
  const [currentStep, setCurrentStep] = useState<ExplanationStep>("quiz")

  const containerRef = useRef<HTMLDivElement>(null)
  const momRef = useRef<HTMLDivElement>(null)
  const speechRef = useRef<HTMLDivElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const eggRef = useRef<HTMLImageElement>(null)
  const milkRef = useRef<HTMLImageElement>(null)
  const scrambledEggRef = useRef<HTMLImageElement>(null)
  const soupSimulationRef = useRef<HTMLDivElement>(null)

  const quizOptions: QuizOption[] = [
    { text: "Eggs are an important ingredient!", isCorrect: false },
    { text: "Social Identity theory", isCorrect: true },
    { text: "Bread and eggs are good together", isCorrect: false },
  ]

  useEffect(() => {
    // Animate elements on mount
    if (containerRef.current && momRef.current && speechRef.current && optionsRef.current) {
      const timeline = gsap.timeline()

      // Animate mom appearing
      timeline.fromTo(
        momRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      )

      // Animate speech bubble
      timeline.fromTo(
        speechRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.4",
      )

      // Animate options
      if (currentStep === "quiz") {
        timeline.fromTo(
          optionsRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" },
          "-=0.2",
        )
      }
    }
  }, [currentStep])

  // Handle content transitions when step changes
  useEffect(() => {
    if (contentRef.current && currentStep !== "quiz" && currentStep !== "soup") {
      // Animate content transition
      gsap.fromTo(contentRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" })
    }

    // Handle egg and milk animation for the combination step
    if (currentStep === "combination" && eggRef.current && milkRef.current && scrambledEggRef.current) {
      // Set initial states
      gsap.set(eggRef.current, { x: 0, opacity: 1 })
      gsap.set(milkRef.current, { x: 0, opacity: 1 })
      gsap.set(scrambledEggRef.current, { scale: 0, opacity: 0 })

      // Create animation timeline
      const timeline = gsap.timeline()

      // Move egg and milk toward center
      timeline.to([eggRef.current, milkRef.current], {
        x: (i) => (i === 0 ? 100 : -100), // Move egg right, milk left
        duration: 1.5,
        ease: "power2.inOut",
      })

      // Fade out egg and milk, fade in scrambled egg
      timeline.to(
        [eggRef.current, milkRef.current],
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.2",
      )

      timeline.to(
        scrambledEggRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.1",
      )
    }

    // Handle transition to soup simulation
    if (currentStep === "soup" && containerRef.current && soupSimulationRef.current) {
      // Prepare soup simulation screen
      gsap.set(soupSimulationRef.current, { display: "block", x: "100%" })

      // Fade out current content
      gsap.to(containerRef.current.children[0], {
        x: "-100%",
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(containerRef.current.children[0], { display: "none" })
        },
      })

      // Fade in soup simulation
      gsap.to(soupSimulationRef.current, {
        x: "0%",
        duration: 0.8,
        ease: "power2.inOut",
      })
    }
  }, [currentStep])

  const handleOptionClick = (index: number) => {
    // Skip if this option was already selected
    if (selectedOptions[index] !== undefined) return

    // Check if the selected option is correct
    if (quizOptions[index].isCorrect) {
      setSelectedOptions((prev) => ({ ...prev, [index]: true }))
      setAnswerState("correct")

      // Transition to theory explanation after a short delay
      setTimeout(() => {
        setCurrentStep("theory")
      }, 1000)
    } else {
      setSelectedOptions((prev) => ({ ...prev, [index]: false }))
      setAnswerState("incorrect")
    }
  }

  const handleNextClick = () => {
    // Progress through the explanation steps
    switch (currentStep) {
      case "theory":
        setCurrentStep("impact")
        break
      case "impact":
        setCurrentStep("egg-alone")
        break
      case "egg-alone":
        setCurrentStep("combination")
        break
      case "combination":
        setCurrentStep("exclusion")
        break
      case "exclusion":
        setCurrentStep("final")
        break
      case "final":
        setCurrentStep("conclusion")
        break
      case "conclusion":
        setCurrentStep("soup")
        break
      default:
        break
    }
  }

  const getFeedbackText = () => {
    if (answerState === "correct") {
      return "That's right!"
    } else if (answerState === "incorrect") {
      return "So close, not that one!"
    }
    return "Do you know what this demonstrates?"
  }

  // Get content based on current step
  const getContent = () => {
    switch (currentStep) {
      case "quiz":
        return (
          <>
            {/* Speech bubble */}
            <div ref={speechRef} className="mb-8 w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
              <p
                className="text-center text-xl font-bold text-amber-900 md:text-2xl lg:text-3xl"
                style={{ fontFamily: '"Patrick Hand", cursive' }}
              >
                {getFeedbackText()}
              </p>
            </div>

            {/* Multiple choice options */}
            <div ref={optionsRef} className="flex w-full flex-col space-y-4">
              {quizOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  className={`w-full rounded-full px-6 py-4 text-lg font-bold shadow-md transition-all duration-300 md:text-xl
                  ${
                    selectedOptions[index] === true
                      ? "bg-green-500 text-white"
                      : selectedOptions[index] === false
                        ? "bg-red-500 text-white pointer-events-none"
                        : "bg-white text-amber-900 hover:bg-amber-50"
                  }`}
                  style={{ fontFamily: '"Patrick Hand", cursive' }}
                  disabled={selectedOptions[index] === false}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </>
        )

      case "theory":
        return (
          <div ref={contentRef} className="w-full max-w-2xl">
            <h2
              className="mb-4 text-center text-3xl font-bold text-amber-900 md:text-4xl"
              style={{ fontFamily: '"Patrick Hand", cursive' }}
            >
              Social Identity Theory
            </h2>
            <p
              className="text-center text-lg text-amber-800 md:text-xl"
              style={{ fontFamily: '"Patrick Hand", cursive' }}
            >
              Social Identity Theory is a theory about how people, like us, are prone to categorizing others into
              'in-groups' and 'out-groups,' ultimately leading to the exclusion and discrimination of groups that they
              do not relate to; in other words, undermining the importance of diversity.
            </p>
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

      case "impact":
        return (
          <div ref={contentRef} className="w-full max-w-2xl">
            <p
              className="text-center text-xl text-amber-800 md:text-2xl"
              style={{ fontFamily: '"Patrick Hand", cursive' }}
            >
              It demonstrates the impact of incorporating different mindsets and viewpoints within collaboration to
              achieve creative and innovative solutions.
            </p>
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

      case "egg-alone":
        return (
          <div ref={contentRef} className="w-full max-w-2xl">
            <p
              className="text-center text-xl text-amber-800 md:text-2xl"
              style={{ fontFamily: '"Patrick Hand", cursive' }}
            >
              Like you just saw, the egg by itself was alright – not the tastiest thing I can make with them!
            </p>
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

      case "combination":
        return (
          <div ref={contentRef} className="w-full max-w-2xl">
            <p
              className="mb-8 text-center text-xl text-amber-800 md:text-2xl"
              style={{ fontFamily: '"Patrick Hand", cursive' }}
            >
              However, when you put the egg and milk together, it makes for a nice scrambled egg! Your favorite! And
              adding more ingredients elevates it even more!
            </p>

            {/* Animation container */}
            <div className="relative h-40 flex items-center justify-center">
              <img
                ref={eggRef}
                src="https://i.imgur.com/V8GJcsc.png"
                alt="Egg"
                className="absolute h-28 w-28 object-contain left-1/4 -translate-x-1/2"
              />
              <img
                ref={milkRef}
                src="https://i.imgur.com/Z0nOFR2.png"
                alt="Milk"
                className="absolute h-28 w-28 object-contain right-1/4 translate-x-1/2"
              />
              <img
                ref={scrambledEggRef}
                src="https://i.imgur.com/dazghvv.png"
                alt="Scrambled Eggs"
                className="absolute h-32 w-32 object-contain opacity-0"
              />
            </div>

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

      case "exclusion":
        return (
          <div ref={contentRef} className="w-full max-w-2xl">
            <p
              className="text-center text-xl text-amber-800 md:text-2xl"
              style={{ fontFamily: '"Patrick Hand", cursive' }}
            >
              If we excluded the other ingredients, we would have never known the yummy dishes we had the possibility of
              making!
            </p>
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

      case "final":
        return (
          <div ref={contentRef} className="w-full max-w-2xl">
            <p
              className="mb-6 text-center text-xl text-amber-800 md:text-2xl"
              style={{ fontFamily: '"Patrick Hand", cursive' }}
            >
              Remember, a team diverse in this regard approaches goals through many different lenses, analyzing
              different routes to create well-rounded and thorough solutions. In critical times of change it increases
              adaptability, and in parallel, helps embrace creativity and innovation by reducing groupthink. Ultimately,
              a diverse team maximizes knowledge-sharing, providing an opportunity for teammates to grow and learn how
              to be better collaborators.
            </p>
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

      case "conclusion":
        return (
          <div ref={contentRef} className="w-full max-w-2xl">
            <p
              className="text-center text-xl text-amber-800 md:text-2xl"
              style={{ fontFamily: '"Patrick Hand", cursive' }}
            >
              But you are right, it is not always easy to work in a group with many different ideas! Let me show you
              another example to better help explain this...
            </p>
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

      default:
        return null
    }
  }

  return (
    <div ref={containerRef} className="relative flex h-full w-full flex-col items-center justify-center bg-amber-100">
      <div className="flex w-full max-w-6xl flex-col md:flex-row">
        {/* Mom on the left */}
        <div ref={momRef} className="flex-shrink-0 p-6 md:w-1/3">
          <div className="relative mx-auto h-64 w-64 md:h-80 md:w-80">
            <img src="https://i.imgur.com/XSf9CHN.png" alt="Mom" className="h-full w-full object-contain" />
          </div>
        </div>

        {/* Content on the right */}
        <div className="flex flex-1 flex-col items-center justify-center p-6">{getContent()}</div>
      </div>

      {/* Soup simulation */}
      <div ref={soupSimulationRef} className="absolute inset-0 hidden">
        <SoupSimulation />
      </div>
    </div>
  )
}

