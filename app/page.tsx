"use client"

import { useEffect, useState, useRef } from "react"
import { KitchenBackground } from "@/components/kitchen-background"
import { Countertop } from "@/components/countertop"
import { ClickPrompts } from "@/components/click-prompts"
import { ChatInterface } from "@/components/chat-interface"
import { CuttingBoardPOV } from "@/components/cutting-board-pov"
import { gsap } from "gsap"

// Define the message sequence
const MESSAGE_SEQUENCE = [
  { sender: "boy", content: "I'm having trouble with my group project." },
  { sender: "mom", content: "What's wrong?" },
  {
    sender: "boy",
    content:
      "I'd rather work alone. All of these different people don't work like I do. If I did it myself, I would have finished long ago.",
  },
  {
    sender: "mom",
    content:
      "Well, collaboration is such an important life skill! It will be used in every part of your life— with your friends, your job, and even your partner!",
  },
  { sender: "boy", content: "Hmmm." },
  {
    sender: "mom",
    content: "You like my cooking, don't you? Well, let me use it to show you why collaboration is important.",
  },
  {
    sender: "mom",
    content: "Let's see some ingredients I have to begin.",
  },
]

export default function Home() {
  // Scene states: "kitchen", "intro1", "intro2", "chat", "cutting-board"
  const [currentScene, setCurrentScene] = useState("kitchen")
  const [messages, setMessages] = useState<Array<{ sender: string; content: string }>>([])
  const [messageIndex, setMessageIndex] = useState(0)

  const mainRef = useRef<HTMLDivElement>(null)
  const kitchenRef = useRef<HTMLDivElement>(null)
  const intro1Ref = useRef<HTMLDivElement>(null)
  const intro2Ref = useRef<HTMLDivElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const cuttingBoardRef = useRef<HTMLDivElement>(null)
  const cuttingBoardPOVRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  // Store active animations for cleanup
  const animationRefs = useRef<{
    timeline?: gsap.core.Timeline
  }>({})

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin()

    // Prepare next scenes to avoid white flash
    if (intro1Ref.current) {
      gsap.set(intro1Ref.current, { x: "100%" })
    }
    if (intro2Ref.current) {
      gsap.set(intro2Ref.current, { x: "100%" })
    }
    if (chatRef.current) {
      gsap.set(chatRef.current, { x: "100%" })
    }
    if (cuttingBoardPOVRef.current) {
      gsap.set(cuttingBoardPOVRef.current, { x: "100%" })
    }

    // Cleanup function
    return () => {
      // Kill any active animations
      if (animationRefs.current.timeline) {
        animationRefs.current.timeline.kill()
      }

      // Kill any animations on specific elements
      if (kitchenRef.current) gsap.killTweensOf(kitchenRef.current)
      if (intro1Ref.current) gsap.killTweensOf(intro1Ref.current)
      if (intro2Ref.current) gsap.killTweensOf(intro2Ref.current)
      if (chatRef.current) gsap.killTweensOf(chatRef.current)
      if (cuttingBoardRef.current) gsap.killTweensOf(cuttingBoardRef.current)
      if (cuttingBoardPOVRef.current) gsap.killTweensOf(cuttingBoardPOVRef.current)
      if (titleRef.current) gsap.killTweensOf(titleRef.current)
    }
  }, [])

  const handleEatClick = () => {
    if (!kitchenRef.current || !intro1Ref.current || !cuttingBoardRef.current) return

    // Kill any active animations
    if (animationRefs.current.timeline) {
      animationRefs.current.timeline.kill()
    }

    // Find knife and vegetable elements
    const knife = document.querySelector(".knife")
    const vegetable = document.querySelector(".vegetable")
    const clickPrompts = document.querySelectorAll(".click-prompt")

    // Create a new timeline
    const timeline = gsap.timeline({
      onComplete: () => {
        // Make sure intro1 is visible but off-screen before animating
        gsap.set(intro1Ref.current, { display: "flex", x: "100%" })

        // Slide kitchen to the left and intro1 from right simultaneously
        gsap.to(kitchenRef.current, {
          x: "-100%",
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            setCurrentScene("intro1")
          },
        })

        gsap.to(intro1Ref.current, {
          x: "0%",
          duration: 0.8,
          ease: "power2.inOut",
        })
      },
    })

    // Store the timeline for cleanup
    animationRefs.current.timeline = timeline

    // Hide the title with fade out
    timeline.to(
      titleRef.current,
      {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.in",
      },
      0,
    )

    // Hide click prompts
    if (clickPrompts.length) {
      timeline.to(
        clickPrompts,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        0,
      )
    }

    // Animate cutting board toward camera with scaling and blur
    timeline.to(
      cuttingBoardRef.current,
      {
        scale: 2,
        y: "-30%",
        filter: "blur(8px)",
        opacity: 0,
        duration: 1.2,
        ease: "power3.in",
      },
      0.2,
    )

    // Animate knife and vegetable separately for more dynamic effect
    if (knife) {
      timeline.to(
        knife,
        {
          scale: 1.5,
          y: "-50%",
          rotation: "-=15",
          filter: "blur(5px)",
          opacity: 0,
          duration: 1,
          ease: "power2.in",
        },
        0.3,
      )
    }

    if (vegetable) {
      timeline.to(
        vegetable,
        {
          scale: 1.8,
          y: "-40%",
          filter: "blur(6px)",
          opacity: 0,
          duration: 1.1,
          ease: "power2.in",
        },
        0.25,
      )
    }
  }

  const handleIntro1Next = () => {
    if (!intro1Ref.current || !intro2Ref.current) return

    // Make sure intro2 is visible but off-screen before animating
    gsap.set(intro2Ref.current, { display: "flex", x: "100%" })

    // Transition to second intro scene - simultaneous animation
    gsap.to(intro1Ref.current, {
      x: "-100%",
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentScene("intro2")
      },
    })

    gsap.to(intro2Ref.current, {
      x: "0%",
      duration: 0.8,
      ease: "power2.inOut",
    })
  }

  const handleIntro2Next = () => {
    if (!intro2Ref.current || !chatRef.current) return

    // Make sure chat is visible but off-screen before animating
    gsap.set(chatRef.current, { display: "flex", x: "100%" })

    // Transition to chat scene - simultaneous animation
    gsap.to(intro2Ref.current, {
      x: "-100%",
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentScene("chat")
        // Add first message
        setMessages([MESSAGE_SEQUENCE[0]])
        setMessageIndex(1)
      },
    })

    gsap.to(chatRef.current, {
      x: "0%",
      duration: 0.8,
      ease: "power2.inOut",
    })
  }

  const handleNextMessage = () => {
    if (messageIndex < MESSAGE_SEQUENCE.length) {
      // Add next message with a slight delay for natural conversation feel
      setTimeout(() => {
        setMessages((prev) => [...prev, MESSAGE_SEQUENCE[messageIndex]])
        setMessageIndex((prev) => prev + 1)

        // If this is the last message, prepare for transition to cutting board POV
        if (messageIndex === MESSAGE_SEQUENCE.length - 1) {
          setTimeout(() => {
            transitionToCuttingBoardPOV()
          }, 1500)
        }
      }, 300)
    }
  }

  const transitionToCuttingBoardPOV = () => {
    if (!chatRef.current || !cuttingBoardPOVRef.current) return

    // Make sure cutting board POV is visible but off-screen before animating
    gsap.set(cuttingBoardPOVRef.current, { display: "flex", x: "100%" })

    // Transition to cutting board POV scene - simultaneous animation
    gsap.to(chatRef.current, {
      x: "-100%",
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentScene("cutting-board")
      },
    })

    gsap.to(cuttingBoardPOVRef.current, {
      x: "0%",
      duration: 0.8,
      ease: "power2.inOut",
    })
  }

  return (
    <main ref={mainRef} className="relative h-screen w-full overflow-hidden bg-amber-50">
      {/* Kitchen Scene */}
      <div
        ref={kitchenRef}
        className={`absolute inset-0 flex flex-col items-center ${currentScene !== "kitchen" ? "hidden" : ""}`}
      >
        <KitchenBackground />

        {/* Title with semi-transparent background - positioned higher */}
        <div ref={titleRef} className="absolute left-1/2 top-[40vh] z-20 -translate-x-1/2 transform">
          <div className="rounded-xl bg-amber-50 bg-opacity-75 px-8 py-6 shadow-lg">
            <h1
              className="text-center text-4xl font-bold text-amber-900 drop-shadow-md md:text-5xl lg:text-6xl"
              style={{ fontFamily: '"Patrick Hand", cursive' }}
            >
              collaboration 101 (through food!)
            </h1>
            <h2
              className="text-center text-xl text-amber-800 drop-shadow-sm md:text-2xl lg:text-3xl"
              style={{ fontFamily: '"Patrick Hand", cursive' }}
            >
              by nadim kassymov
            </h2>

            {/* Let's eat button - larger */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleEatClick}
                className="transform rounded-full bg-orange-500 px-8 py-3 text-xl font-bold text-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 md:text-2xl"
                style={{ fontFamily: '"Patrick Hand", cursive' }}
              >
                let's eat!
              </button>
            </div>
          </div>
        </div>

        {/* Countertop at the bottom of the screen */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center">
          <div ref={cuttingBoardRef} className="w-full">
            <Countertop />
            <ClickPrompts />
          </div>
        </div>
      </div>

      {/* First Intro Text Screen */}
      <div
        ref={intro1Ref}
        className={`absolute inset-0 flex flex-col items-center justify-center bg-amber-50 ${currentScene !== "intro1" ? "hidden" : ""}`}
      >
        <div className="max-w-2xl rounded-xl bg-white p-8 shadow-lg">
          <p
            className="mb-8 text-center text-2xl text-amber-900 md:text-3xl"
            style={{ fontFamily: '"Patrick Hand", cursive' }}
          >
            Today we're going to learn about the importance of collaboration and how different minds create the most
            innovative ideas!
          </p>

          <div className="flex justify-center">
            <button
              onClick={handleIntro1Next}
              className="transform rounded-full bg-orange-500 px-8 py-3 text-xl font-bold text-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 md:text-2xl"
              style={{ fontFamily: '"Patrick Hand", cursive' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Second Intro Text Screen */}
      <div
        ref={intro2Ref}
        className={`absolute inset-0 flex flex-col items-center justify-center bg-amber-50 ${currentScene !== "intro2" ? "hidden" : ""}`}
      >
        <div className="max-w-2xl rounded-xl bg-white p-8 shadow-lg">
          <p
            className="mb-8 text-center text-2xl text-amber-900 md:text-3xl"
            style={{ fontFamily: '"Patrick Hand", cursive' }}
          >
            Let's begin with a boy named Timothee. He is doing a group project for high school and is not liking it. He
            would rather work alone..
          </p>

          <div className="flex justify-center">
            <button
              onClick={handleIntro2Next}
              className="transform rounded-full bg-orange-500 px-8 py-3 text-xl font-bold text-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 md:text-2xl"
              style={{ fontFamily: '"Patrick Hand", cursive' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Chat Interface Screen */}
      <div
        ref={chatRef}
        className={`absolute inset-0 flex flex-col bg-amber-50 ${currentScene !== "chat" ? "hidden" : ""}`}
      >
        <div className="flex h-full flex-col p-4">
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto pb-4">
            <ChatInterface messages={messages} />
          </div>

          {/* Next button */}
          <div className="flex justify-center pb-4">
            {messageIndex < MESSAGE_SEQUENCE.length && (
              <button
                onClick={handleNextMessage}
                className="transform rounded-full bg-orange-500 px-8 py-3 text-xl font-bold text-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 md:text-2xl"
                style={{ fontFamily: '"Patrick Hand", cursive' }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cutting Board POV Screen */}
      <div
        ref={cuttingBoardPOVRef}
        className={`absolute inset-0 flex flex-col bg-amber-50 ${currentScene !== "cutting-board" ? "hidden" : ""}`}
      >
        <CuttingBoardPOV />
      </div>
    </main>
  )
}

