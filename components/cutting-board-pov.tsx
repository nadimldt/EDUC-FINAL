"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { QuizScreen } from "./quiz-screen"

// Define the different recipe states
type RecipeState =
  | "initial"
  | "drag-eggs"
  | "sunny-side-up"
  | "drag-milk"
  | "scrambled-eggs"
  | "drag-tomato-spinach"
  | "colorful-scrambled"
  | "drag-bread"
  | "french-toast"
  | "final"
  | "quiz"

// Define the narration text for each state
const NARRATION_TEXT: Record<RecipeState, string> = {
  initial: "So many ingredients.",
  "drag-eggs": "Try dragging the eggs to the center.",
  "sunny-side-up": "Sunny-side-up egg! Amazing, but so ordinary. Can we spice things up?",
  "drag-milk": "Try dragging milk to the eggs to create something new!",
  "scrambled-eggs": "Wow, scrambled eggs! Who knew more ingredients create cool recipes? Let's try more.",
  "drag-tomato-spinach": "Let's add tomato and spinach to our eggs. Drag them to the center!",
  "colorful-scrambled": "Wow wow! So colorful and innovative! Let's try one more.",
  "drag-bread": "Let's try adding bread. Drag it to the center!",
  "french-toast":
    "Something completely new! Who would have thought all this was possible if we added new ingredients into the mix?",
  final:
    "Just like cooking, collaboration brings together different 'ingredients' (ideas and skills) to create something better than what any one person could make alone!",
  quiz: "",
}

// Replace the RECIPE_IMAGES constant with these external image URLs
const RECIPE_IMAGES = {
  "sunny-side-up": "https://i.imgur.com/8xMexev.jpeg",
  "scrambled-eggs": "https://i.imgur.com/dazghvv.png",
  "colorful-scrambled": "https://i.imgur.com/1xyXsUX.png",
  "french-toast": "https://i.imgur.com/KxFzw32.png",
}

export function CuttingBoardPOV() {
  const [recipeState, setRecipeState] = useState<RecipeState>("initial")
  const [showNextButton, setShowNextButton] = useState(true)
  const [showRecipeBubble, setShowRecipeBubble] = useState(false)
  const [activeDraggables, setActiveDraggables] = useState<string[]>([])
  const [droppedIngredients, setDroppedIngredients] = useState<string[]>([])
  const [showEggsOnRight, setShowEggsOnRight] = useState(true)

  const cuttingBoardRef = useRef<HTMLDivElement>(null)
  const narrationRef = useRef<HTMLDivElement>(null)
  const recipeBubbleRef = useRef<HTMLDivElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)
  const quizScreenRef = useRef<HTMLDivElement>(null)

  // Refs for ingredients
  const eggsRef = useRef<HTMLDivElement>(null)
  const milkRef = useRef<HTMLDivElement>(null)
  const tomatoRef = useRef<HTMLDivElement>(null)
  const spinachRef = useRef<HTMLDivElement>(null)
  const breadRef = useRef<HTMLDivElement>(null)

  // Initialize animations and effects
  useEffect(() => {
    // Initial animation for ingredients
    if (cuttingBoardRef.current) {
      gsap.fromTo(
        ".ingredient",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
      )
    }

    // Animate narration text
    if (narrationRef.current) {
      gsap.fromTo(
        narrationRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      )
    }

    // Initialize drop zone
    if (dropZoneRef.current) {
      gsap.to(dropZoneRef.current, {
        scale: 1.05,
        boxShadow: "0 0 15px rgba(255,215,0,0.5)",
        duration: 1,
        repeat: -1,
        yoyo: true,
      })
    }
  }, [])

  // Handle drag start
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("text/plain", id)
    e.currentTarget.style.opacity = "0.6"
  }

  // Handle drag end
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = "1"
  }

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.add("bg-amber-200")
  }

  // Handle drag leave
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("bg-amber-200")
  }

  // Handle drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.remove("bg-amber-200")

    const id = e.dataTransfer.getData("text/plain")
    const element = document.getElementById(id)

    if (element) {
      // Add to dropped ingredients
      setDroppedIngredients((prev) => [...prev, id])

      // If eggs are dropped, hide them from the right side
      if (id === "eggs-ingredient") {
        setShowEggsOnRight(false)
      }

      // Animate the element to the center of the drop zone
      const dropZoneRect = e.currentTarget.getBoundingClientRect()
      const elementRect = element.getBoundingClientRect()

      // Calculate the center position of the drop zone
      const centerX = dropZoneRect.left + dropZoneRect.width / 2
      const centerY = dropZoneRect.top + dropZoneRect.height / 2

      // Calculate the offset to position the element at the center
      const offsetX = centerX - (elementRect.left + elementRect.width / 2)
      const offsetY = centerY - (elementRect.top + elementRect.height / 2)

      // Apply the transformation
      gsap.to(element, {
        x: `+=${offsetX}px`,
        y: `+=${offsetY}px`,
        scale: 0.7,
        opacity: 0.9,
        duration: 0.3,
        onComplete: () => {
          // Ensure the element stays inside the circle
          const updatedRect = element.getBoundingClientRect()
          const distance = Math.sqrt(
            Math.pow(centerX - (updatedRect.left + updatedRect.width / 2), 2) +
              Math.pow(centerY - (updatedRect.top + updatedRect.height / 2), 2),
          )

          // If still outside the circle, force it to the center
          if (distance > dropZoneRect.width / 4) {
            gsap.to(element, {
              x: `+=${centerX - (updatedRect.left + updatedRect.width / 2)}px`,
              y: `+=${centerY - (updatedRect.top + updatedRect.height / 2)}px`,
              duration: 0.2,
            })
          }
        },
      })

      // Handle successful drop
      handleSuccessfulDrop(id)
    }
  }

  // Update state based on recipe state changes
  useEffect(() => {
    // Reset dropped ingredients when state changes
    setDroppedIngredients([])

    // Reset eggs visibility on state change
    if (recipeState === "initial") {
      setShowEggsOnRight(true)
    }

    // Determine which elements should be draggable based on current state
    if (recipeState === "drag-eggs") {
      setActiveDraggables(["eggs-ingredient"])
    } else if (recipeState === "drag-milk") {
      setActiveDraggables(["milk-ingredient"])
    } else if (recipeState === "drag-tomato-spinach") {
      setActiveDraggables(["tomato-ingredient", "spinach-ingredient"])
    } else if (recipeState === "drag-bread") {
      setActiveDraggables(["bread-ingredient"])
    }

    // Animate narration text when it changes
    if (narrationRef.current && recipeState !== "quiz") {
      gsap.fromTo(
        narrationRef.current,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
      )
    }

    // Show recipe bubble for recipe states
    if (["sunny-side-up", "scrambled-eggs", "colorful-scrambled", "french-toast"].includes(recipeState)) {
      setShowRecipeBubble(true)

      if (recipeBubbleRef.current) {
        gsap.fromTo(
          recipeBubbleRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
        )
      }
    } else {
      setShowRecipeBubble(false)
    }

    // Handle transition to quiz screen
    if (recipeState === "quiz" && cuttingBoardRef.current && quizScreenRef.current) {
      // Prepare quiz screen - position it off-screen to the right
      gsap.set(quizScreenRef.current, { display: "block", x: "100%" })

      // Slide cutting board to the left and quiz screen from right simultaneously
      gsap.to(cuttingBoardRef.current, {
        x: "-100%",
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(cuttingBoardRef.current, { display: "none" })
        },
      })

      gsap.to(quizScreenRef.current, {
        x: "0%",
        duration: 0.8,
        ease: "power2.inOut",
      })
    }
  }, [recipeState])

  const handleNextClick = () => {
    // State transitions
    switch (recipeState) {
      case "initial":
        setRecipeState("drag-eggs")
        break
      case "sunny-side-up":
        setRecipeState("drag-milk")
        break
      case "scrambled-eggs":
        setRecipeState("drag-tomato-spinach")
        break
      case "colorful-scrambled":
        setRecipeState("drag-bread")
        break
      case "french-toast":
        setRecipeState("final")
        break
      case "final":
        setRecipeState("quiz")
        break
      default:
        break
    }
  }

  const handleSuccessfulDrop = (elementId: string) => {
    // Handle successful drops based on current state
    switch (recipeState) {
      case "drag-eggs":
        if (elementId === "eggs-ingredient") {
          setRecipeState("sunny-side-up")
        }
        break
      case "drag-milk":
        if (elementId === "milk-ingredient") {
          setRecipeState("scrambled-eggs")
        }
        break
      case "drag-tomato-spinach":
        // Check if both tomato and spinach have been dropped
        const updatedDropped = [...droppedIngredients, elementId]
        if (updatedDropped.includes("tomato-ingredient") && updatedDropped.includes("spinach-ingredient")) {
          setRecipeState("colorful-scrambled")
        }
        break
      case "drag-bread":
        if (elementId === "bread-ingredient") {
          setRecipeState("french-toast")
        }
        break
      default:
        break
    }
  }

  // Replace the renderRecipeComponent function with a simpler image rendering approach
  const getCurrentRecipeImage = () => {
    switch (recipeState) {
      case "sunny-side-up":
        return RECIPE_IMAGES["sunny-side-up"]
      case "scrambled-eggs":
        return RECIPE_IMAGES["scrambled-eggs"]
      case "colorful-scrambled":
        return RECIPE_IMAGES["colorful-scrambled"]
      case "french-toast":
        return RECIPE_IMAGES["french-toast"]
      default:
        return ""
    }
  }

  // Check if an ingredient should be draggable
  const isDraggable = (id: string) => {
    return activeDraggables.includes(id)
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center">
      {/* Cutting board background */}
      <div
        ref={cuttingBoardRef}
        className="absolute inset-0 bg-amber-200"
        style={{
          backgroundImage: "url('/cutting-board-texture.svg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Narration text at the top */}
        <div
          ref={narrationRef}
          className="absolute top-8 left-1/2 z-30 w-4/5 -translate-x-1/2 rounded-xl bg-white bg-opacity-90 p-4 text-center shadow-lg"
        >
          <p
            className="text-xl font-bold text-amber-900 md:text-2xl lg:text-3xl"
            style={{ fontFamily: '"Patrick Hand", cursive' }}
          >
            {NARRATION_TEXT[recipeState]}
          </p>
        </div>

        {/* Drop zone in the center */}
        <div
          ref={dropZoneRef}
          className="absolute left-1/2 top-1/2 z-10 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-amber-600 bg-amber-100 bg-opacity-50"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-amber-800 opacity-70">
            <p className="text-lg font-semibold" style={{ fontFamily: '"Patrick Hand", cursive' }}>
              Drop here
            </p>
          </div>
        </div>

        {/* Left side ingredients */}
        <div className="absolute left-[10%] top-1/2 -translate-y-1/2 space-y-8">
          {/* Eggs */}
          <div
            id="eggs-ingredient"
            ref={eggsRef}
            className={`ingredient ${isDraggable("eggs-ingredient") ? "cursor-grab active:cursor-grabbing" : ""}`}
            draggable={isDraggable("eggs-ingredient")}
            onDragStart={(e) => isDraggable("eggs-ingredient") && handleDragStart(e, "eggs-ingredient")}
            onDragEnd={handleDragEnd}
          >
            <div className="relative h-32 w-32">
              <img src="https://i.imgur.com/V8GJcsc.png" alt="Eggs" className="h-full w-full object-contain" />
            </div>
            <p
              className="mt-2 text-center text-lg font-semibold text-amber-900"
              style={{ fontFamily: '"Patrick Hand", cursive' }}
            >
              Eggs
            </p>
          </div>
        </div>

        {/* Right side ingredients - organized in 2 rows of 2 */}
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 grid grid-cols-2 gap-6">
          {/* Row 1: Milk and Tomato */}
          {/* Milk */}
          <div
            id="milk-ingredient"
            ref={milkRef}
            className={`ingredient ${isDraggable("milk-ingredient") ? "cursor-grab active:cursor-grabbing" : ""}`}
            draggable={isDraggable("milk-ingredient")}
            onDragStart={(e) => isDraggable("milk-ingredient") && handleDragStart(e, "milk-ingredient")}
            onDragEnd={handleDragEnd}
          >
            <div className="relative h-28 w-28">
              <img src="https://i.imgur.com/Z0nOFR2.png" alt="Milk" className="h-full w-full object-contain" />
            </div>
            <p
              className="mt-2 text-center text-lg font-semibold text-amber-900"
              style={{ fontFamily: '"Patrick Hand", cursive' }}
            >
              Milk
            </p>
          </div>

          {/* Tomato */}
          <div
            id="tomato-ingredient"
            ref={tomatoRef}
            className={`ingredient ${isDraggable("tomato-ingredient") ? "cursor-grab active:cursor-grabbing" : ""}`}
            draggable={isDraggable("tomato-ingredient")}
            onDragStart={(e) => isDraggable("tomato-ingredient") && handleDragStart(e, "tomato-ingredient")}
            onDragEnd={handleDragEnd}
          >
            <div className="relative h-28 w-28">
              <img src="https://i.imgur.com/FFkdVzo.png" alt="Tomato" className="h-full w-full object-contain" />
            </div>
            <p
              className="mt-2 text-center text-lg font-semibold text-amber-900"
              style={{ fontFamily: '"Patrick Hand", cursive' }}
            >
              Tomato
            </p>
          </div>

          {/* Row 2: Spinach and Bread */}
          {/* Spinach */}
          <div
            id="spinach-ingredient"
            ref={spinachRef}
            className={`ingredient ${isDraggable("spinach-ingredient") ? "cursor-grab active:cursor-grabbing" : ""}`}
            draggable={isDraggable("spinach-ingredient")}
            onDragStart={(e) => isDraggable("spinach-ingredient") && handleDragStart(e, "spinach-ingredient")}
            onDragEnd={handleDragEnd}
          >
            <div className="relative h-28 w-28">
              <img src="https://i.imgur.com/Pt0tRNK.png" alt="Spinach" className="h-full w-full object-contain" />
            </div>
            <p
              className="mt-2 text-center text-lg font-semibold text-amber-900"
              style={{ fontFamily: '"Patrick Hand", cursive' }}
            >
              Spinach
            </p>
          </div>

          {/* Bread */}
          <div
            id="bread-ingredient"
            ref={breadRef}
            className={`ingredient ${isDraggable("bread-ingredient") ? "cursor-grab active:cursor-grabbing" : ""}`}
            draggable={isDraggable("bread-ingredient")}
            onDragStart={(e) => isDraggable("bread-ingredient") && handleDragStart(e, "bread-ingredient")}
            onDragEnd={handleDragEnd}
          >
            <div className="relative h-28 w-28">
              <div className="h-24 w-24 rounded-md bg-amber-300 shadow-md mx-auto">
                <div className="absolute inset-1 rounded-sm bg-amber-100 bg-opacity-30"></div>
              </div>
            </div>
            <p
              className="mt-2 text-center text-lg font-semibold text-amber-900"
              style={{ fontFamily: '"Patrick Hand", cursive' }}
            >
              Bread
            </p>
          </div>
        </div>

        {/* Recipe bubble popup */}
        {showRecipeBubble && (
          <div
            ref={recipeBubbleRef}
            className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-6 shadow-xl"
          >
            <div className="h-48 w-48 rounded-full bg-amber-50 p-4 flex items-center justify-center overflow-hidden">
              <img
                src={getCurrentRecipeImage() || "/placeholder.svg"}
                alt="Recipe"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
          </div>
        )}

        {/* Next button */}
        {showNextButton && (
          <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2">
            <button
              onClick={handleNextClick}
              className="transform rounded-full bg-orange-500 px-8 py-3 text-xl font-bold text-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 md:text-2xl"
              style={{ fontFamily: '"Patrick Hand", cursive' }}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Quiz screen */}
      <div ref={quizScreenRef} className="absolute inset-0 hidden">
        <QuizScreen />
      </div>
    </div>
  )
}

