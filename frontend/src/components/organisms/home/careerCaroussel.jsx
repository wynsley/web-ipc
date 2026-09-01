// molecules/careersCarousel.jsx
import { useState, useEffect, useRef, useCallback } from "react"
import { CareerCard } from "../../molecules/home/homeCareerCards"
import { CarouselDots } from "../../molecules/home/careerDostCaroussel"
import { careers } from "../../../data/carees"
function CareersCarousel() {
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

  const visibleIndexes = [current, (current + 1) % total]

  return (
    <div className="w-full">
      <div
        className="grid grid-cols-2 gap-3"
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