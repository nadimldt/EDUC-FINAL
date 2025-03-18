export function Knife() {
  return (
    <div className="knife absolute right-1/3 top-1/3 h-32 w-8 origin-bottom transform rotate-45 md:h-40 md:w-10">
      {/* Handle with enhanced wood texture */}
      <div className="absolute bottom-0 h-16 w-8 rounded-b-lg bg-gradient-to-b from-amber-800 to-amber-900 md:h-20 md:w-10">
        <div className="absolute inset-x-1 bottom-1 top-1 rounded-b-md bg-[url('/wood-texture.svg')] bg-cover opacity-70"></div>

        {/* Handle grip texture */}
        <div className="absolute inset-x-2 bottom-2 top-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-[2px] w-full bg-amber-950 opacity-30"
              style={{ top: `${i * 20 + 10}%` }}
            ></div>
          ))}
        </div>

        {/* Handle rivets */}
        <div className="absolute left-1/2 top-1/4 h-1 w-1 -translate-x-1/2 rounded-full bg-gray-400 shadow-sm"></div>
        <div className="absolute left-1/2 top-2/4 h-1 w-1 -translate-x-1/2 rounded-full bg-gray-400 shadow-sm"></div>
        <div className="absolute left-1/2 top-3/4 h-1 w-1 -translate-x-1/2 rounded-full bg-gray-400 shadow-sm"></div>
      </div>

      {/* Blade with enhanced metallic texture - made sharper */}
      <div className="absolute bottom-16 h-16 w-8 bg-gradient-to-t from-gray-300 to-gray-100 md:bottom-20 md:h-20 md:w-10">
        {/* Blade edge - made sharper with a more pronounced edge */}
        <div className="absolute inset-y-0 right-0 w-[1px] bg-white"></div>

        {/* Blade point - made sharper */}
        <div
          className="absolute left-0 top-0 h-4 w-8 md:h-5 md:w-10"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            background: "linear-gradient(135deg, #e5e5e5 0%, #f5f5f5 100%)",
          }}
        ></div>

        {/* Sharper tip */}
        <div
          className="absolute -top-2 left-0 h-4 w-8 md:h-5 md:w-10"
          style={{
            clipPath: "polygon(0 50%, 100% 50%, 50% 0)",
            background: "linear-gradient(135deg, #e5e5e5 0%, #f5f5f5 100%)",
          }}
        ></div>

        {/* Blade reflections */}
        <div className="absolute left-1/4 top-0 bottom-0 w-[2px] bg-white opacity-50"></div>
        <div className="absolute left-2/3 top-0 bottom-0 w-[1px] bg-white opacity-30"></div>

        {/* Additional reflections for more metallic look */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-white via-gray-200 to-white opacity-20"></div>
        <div className="absolute left-1/6 top-0 bottom-0 w-[1px] bg-white opacity-15"></div>
        <div className="absolute left-5/6 top-0 bottom-0 w-[1px] bg-white opacity-15"></div>
      </div>
    </div>
  )
}

