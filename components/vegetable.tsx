interface VegetableProps {
  type: "carrot" | "cucumber" | "tomato"
  sliceCount: number
  maxSlices: number
}

export function Vegetable({ type, sliceCount, maxSlices }: VegetableProps) {
  // Calculate how much of the vegetable is left based on slice count
  const percentLeft = 1 - sliceCount / maxSlices

  return (
    <div>
      {type === "carrot" && (
        <div
          className="relative h-16 w-48 md:h-20 md:w-60"
          style={{ clipPath: `inset(0 ${(1 - percentLeft) * 100}% 0 0)` }}
        >
          {/* Carrot body with enhanced ridges */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-600 to-orange-500">
            {/* Carrot ridges */}
            <div className="absolute inset-y-1 left-2 right-1/3 rounded-l-full bg-orange-400"></div>
            <div className="absolute inset-y-3 left-4 right-2/3 rounded-l-full bg-orange-300"></div>

            {/* Carrot texture lines */}
            <div className="absolute inset-y-0 left-0 w-full">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-orange-700 opacity-20"
                  style={{
                    height: "2px",
                    width: "100%",
                    top: `${i * 10 + 5}%`,
                    transform: `rotate(${i % 2 === 0 ? -1 : -2}deg)`,
                  }}
                ></div>
              ))}
            </div>

            {/* Carrot bumps */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-2 w-2 rounded-full bg-orange-600 opacity-30"
                  style={{
                    top: `${Math.random() * 80 + 10}%`,
                    left: `${Math.random() * 80 + 10}%`,
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Carrot top */}
          <div className="absolute -top-4 left-0 h-4 w-8 bg-green-600 md:-top-6 md:h-6 md:w-10">
            <div className="absolute -top-3 left-2 h-4 w-1 -rotate-15 transform bg-green-600"></div>
            <div className="absolute -top-4 left-4 h-5 w-1 bg-green-600"></div>
            <div className="absolute -top-3 left-6 h-4 w-1 rotate-15 transform bg-green-600"></div>

            {/* Additional stems */}
            <div className="absolute -top-2 left-1 h-3 w-[2px] -rotate-25 transform bg-green-600"></div>
            <div className="absolute -top-2 left-7 h-3 w-[2px] rotate-25 transform bg-green-600"></div>
          </div>
        </div>
      )}

      {type === "cucumber" && (
        <div
          className="relative h-12 w-56 md:h-16 md:w-72"
          style={{ clipPath: `inset(0 ${(1 - percentLeft) * 100}% 0 0)` }}
        >
          {/* Cucumber body with enhanced texture */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-green-600 to-green-500">
            {/* Cucumber lighter center */}
            <div className="absolute inset-y-2 inset-x-4 rounded-full bg-green-400 opacity-50"></div>

            {/* Cucumber skin texture - bumps */}
            <div className="absolute inset-0">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-green-700 opacity-20"
                  style={{
                    top: `${Math.random() * 80 + 10}%`,
                    left: `${Math.random() * 90 + 5}%`,
                  }}
                ></div>
              ))}
            </div>

            {/* Cucumber skin texture - stripes */}
            <div className="absolute inset-0 bg-[url('/cucumber-texture.svg')] bg-cover opacity-30"></div>

            {/* Cucumber seeds */}
            <div className="absolute inset-x-[20%] inset-y-[30%] rounded-full">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-1.5 w-1.5 rounded-full bg-green-200"
                  style={{
                    left: `${i * 6.5}%`,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {type === "tomato" && (
        <div
          className="relative h-20 w-20 md:h-24 md:w-24"
          style={{ clipPath: `inset(0 ${(1 - percentLeft) * 100}% 0 0)` }}
        >
          {/* Tomato body with enhanced shine */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600 to-red-500">
            {/* Tomato lighter areas */}
            <div className="absolute inset-2 rounded-full bg-red-400 opacity-50"></div>

            {/* Tomato shine - multiple highlights */}
            <div className="absolute left-[30%] top-[20%] h-[20%] w-[15%] rounded-full bg-white opacity-60"></div>
            <div className="absolute left-[60%] top-[30%] h-[10%] w-[10%] rounded-full bg-white opacity-40"></div>
            <div className="absolute left-[40%] top-[60%] h-[8%] w-[8%] rounded-full bg-white opacity-30"></div>

            {/* Tomato texture lines */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-red-700 opacity-10"
                  style={{
                    height: "100%",
                    width: "1px",
                    left: `${i * 14 + 8}%`,
                    transform: `rotate(${i * 22.5}deg)`,
                  }}
                ></div>
              ))}
            </div>

            {/* Tomato subtle texture */}
            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-red-700 opacity-10"
                  style={{
                    top: `${Math.random() * 80 + 10}%`,
                    left: `${Math.random() * 80 + 10}%`,
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Tomato stem with enhanced detail */}
          <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-green-700 md:-top-3 md:h-5 md:w-5">
            <div className="absolute -top-2 left-1/2 h-3 w-1 -translate-x-1/2 bg-green-800"></div>

            {/* Stem details */}
            <div className="absolute -top-1 left-1/4 h-2 w-[2px] -rotate-30 transform bg-green-800"></div>
            <div className="absolute -top-1 right-1/4 h-2 w-[2px] rotate-30 transform bg-green-800"></div>

            {/* Calyx (the green leafy part) */}
            <div className="absolute -left-1 top-0 h-2 w-3 -rotate-30 transform rounded-full bg-green-600"></div>
            <div className="absolute -right-1 top-0 h-2 w-3 rotate-30 transform rounded-full bg-green-600"></div>
          </div>
        </div>
      )}
    </div>
  )
}

