function CarouselDots({ total, current, onDotClick }) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          className={`h-2 rounded-full transition-all duration-300 ${
            i === current ? "bg-blue-dark w-4" : "bg-gray-300 w-2"
          }`}
        />
      ))}
    </div>
  )
}

export { CarouselDots }