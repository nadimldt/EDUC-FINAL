"use client"

import { CuttingBoard } from "./cutting-board"

export function Countertop() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-end perspective-800">
      {/* Wooden countertop with perspective - positioned at the bottom */}
      <div className="relative h-[40vh] w-[100vw] transform-gpu bg-gradient-to-b from-amber-700 to-amber-800">
        {/* Wood grain texture */}
        <div className="absolute inset-0 bg-[url('/wood-texture.svg')] bg-cover opacity-50"></div>

        {/* Countertop edge highlight */}
        <div className="absolute inset-x-0 top-0 h-4 bg-amber-600"></div>

        {/* Countertop shadow */}
        <div className="absolute inset-x-0 bottom-0 h-6 bg-black opacity-20"></div>

        {/* Cutting board placement */}
        <div className="absolute left-1/2 top-[10%] -translate-x-1/2">
          <CuttingBoard />
        </div>
      </div>
    </div>
  )
}

