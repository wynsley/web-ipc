import { useState, useEffect, useRef, useCallback } from "react"
import { CareerCard } from "../../molecules/home/homeCareerCards"
import { CarouselDots } from "../../molecules/home/carouselDots"
import { careers } from "../../../data/careers"
import { useCardsPerView } from "../../../hooks/globals/useCardPowerView"

function CareersCarousel() {
  const cardsPerView = useCardsPerView()
  const [current, setCurrent] = useState(0)
  const timerRef              = useRef(null)
  const touchStartX           = useRef(null)
  const paused                = useRef(false)
  const total                 = careers.length

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (!paused.current) {
        setCurrent(prev => (prev + 1) % total)
      }
    }, 3000)
  }, [total])

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer])

  // Si cambia cardsPerView (resize) y el índice actual queda fuera de rango, lo corrige
  useEffect(() => {
    setCurrent(prev => prev % total)
  }, [cardsPerView, total])

  const pauseAndResume = () => {
    paused.current = true
    clearInterval(timerRef.current)
    setTimeout(() => {
      paused.current = false
      startTimer()
    }, 5000)
  }

  const handleDotClick = (i) => {
    setCurrent(i)
    pauseAndResume()
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    paused.current = true
    clearInterval(timerRef.current)
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      setCurrent(prev => {
        const next = diff > 0 ? prev + 1 : prev - 1
        return (next + total) % total
      })
    }
    touchStartX.current = null
    setTimeout(() => {
      paused.current = false
      startTimer()
    }, 5000)
  }

  // Genera N índices consecutivos (con wrap), N = cardsPerView
  const visibleIndexes = Array.from(
    { length: Math.min(cardsPerView, total) },
    (_, i) => (current + i) % total
  )

  return (
    <div className="w-full">
      <div
        className={`grid gap-3 ${cardsPerView === 3 ? "grid-cols-3" : "grid-cols-2"}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {visibleIndexes.map((idx, i) => (
          <div key={`${idx}-${i}`} onTouchStart={pauseAndResume}>
            <CareerCard career={careers[idx]} />
          </div>
        ))}
      </div>

      <CarouselDots
        total={total}
        current={current}
        onDotClick={handleDotClick}
      />
    </div>
  )
}

export { CareersCarousel }