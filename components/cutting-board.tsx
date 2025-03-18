"use client"

import { useState, useRef } from "react"
import { gsap } from "gsap"
import { Knife } from "./knife"
import { Vegetable } from "./vegetable"

type VegetableType = "carrot" | "cucumber" | "tomato"

export function CuttingBoard() {
  const [currentVegetable, setCurrentVegetable] = useState<VegetableType>("carrot")
  const [sliceCount, setSliceCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const boardRef = useRef<HTMLDivElement>(null)
  const slicesRef = useRef<HTMLDivElement>(null)

  // Maximum slices for each vegetable
  const maxSlices = {
    carrot: 5,
    cucumber: 4,
    tomato: 3,
  }

  // Rotate through vegetables
  const nextVegetable = () => {
    const vegetables: VegetableType[] = ["carrot", "cucumber", "tomato"]
    const currentIndex = vegetables.indexOf(currentVegetable)
    const nextIndex = (currentIndex + 1) % vegetables.length
    return vegetables[nextIndex]
  }

  const handleClick = () => {
    if (isAnimating) return

    setIsAnimating(true)

    if (sliceCount >= maxSlices[currentVegetable]) {
      // Clear the board and spawn new vegetable
      clearBoard()
    } else {
      // Slice the vegetable
      sliceVegetable()
    }
  }

  const sliceVegetable = () => {
    // Animate knife
    const knife = document.querySelector(".knife")
    const timeline = gsap.timeline({
      onComplete: () => {
        createSlice()
        setSliceCount((prev) => prev + 1)
        setIsAnimating(false)
      },
    })

    timeline
      .to(knife, {
        duration: 0.15,
        y: -25,
        rotation: -15,
        ease: "power1.out",
      })
      .to(knife, {
        duration: 0.25,
        y: 25,
        rotation: 0,
        ease: "power3.in",
      })
  }

  const createSlice = () => {
    if (!slicesRef.current) return

    const slice = document.createElement("div")
    slice.className = `absolute slice ${currentVegetable}-slice`

    // Position the slice based on the current slice count
    const offset = sliceCount * 15
    slice.style.left = `${50 + offset}px`
    slice.style.top = `${20 + (sliceCount % 2) * 10}px`

    slicesRef.current.appendChild(slice)

    // Animate the slice
    gsap.fromTo(
      slice,
      {
        opacity: 0,
        scale: 0.5,
        rotation: Math.random() * 20 - 10,
      },
      {
        duration: 0.5,
        opacity: 1,
        scale: 1,
        rotation: Math.random() * 40 - 20,
        ease: "back.out(1.7)",
      },
    )
  }

  const clearBoard = () => {
    if (!slicesRef.current) return

    const timeline = gsap.timeline({
      onComplete: () => {
        // Reset and spawn new vegetable
        setSliceCount(0)
        setCurrentVegetable(nextVegetable())
        setIsAnimating(false)

        // Clear slices
        if (slicesRef.current) {
          slicesRef.current.innerHTML = ""
        }
      },
    })

    // Animate slices falling off toward the bottom of the screen with enhanced bounce
    const slices = slicesRef.current.querySelectorAll(".slice")
    slices.forEach((slice, index) => {
      timeline.to(
        slice,
        {
          duration: 0.8 + Math.random() * 0.4,
          y: 300 + Math.random() * 100,
          x: (Math.random() - 0.5) * 300,
          rotation: Math.random() * 720 - 360,
          ease: "bounce.out",
        },
        index * 0.05,
      )
    })

    // Spawn new vegetable with enhanced fade in and scale up
    timeline.fromTo(
      ".vegetable",
      {
        opacity: 0,
        scale: 0.2,
        y: -30,
      },
      {
        duration: 0.8,
        opacity: 1,
        scale: 1,
        y: 0,
        ease: "elastic.out(1, 0.5)",
      },
      0.5,
    )
  }

  return (
    <div
      ref={boardRef}
      className="relative h-64 w-80 cursor-pointer rounded-lg bg-amber-200 shadow-xl md:h-72 md:w-96"
      onClick={handleClick}
      style={{ transform: "perspective(1000px) rotateX(10deg)" }}
    >
      {/* Wooden texture for cutting board */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-amber-100 to-amber-300 opacity-50"></div>
      <div className="absolute inset-0 rounded-lg bg-[url('/cutting-board-texture.svg')] bg-cover opacity-40"></div>

      {/* Vegetable */}
      <div className="vegetable absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Vegetable type={currentVegetable} sliceCount={sliceCount} maxSlices={maxSlices[currentVegetable]} />
      </div>

      {/* Knife */}
      <Knife />

      {/* Container for slices */}
      <div ref={slicesRef} className="absolute inset-0 overflow-visible rounded-lg"></div>
    </div>
  )
}

