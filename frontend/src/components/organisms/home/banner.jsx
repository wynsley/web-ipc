import { BannerDescription } from "../../molecules/home/bannerDescriptions"
import { BannerCalled } from "../../molecules/home/bannerCalled"
import { useState, useEffect, useCallback, useRef } from "react"

const SLIDES = [
  { src: '/BANNER_HOME.webp', alt: 'Banner principal' },
  { src: '/BANNER2.webp',     alt: 'Banner 2' },
  { src: '/BANNER3.webp',     alt: 'Banner 3' },
  { src: '/BANNER4.webp',     alt: 'Banner 4' },
]

const AUTOPLAY_DELAY = 6000
const TRANSITION_MS  = 700
const DRAG_THRESHOLD = 50  // px mínimos para considerar swipe válido

function preloadImages(slides) {
  slides.forEach(({ src }) => {
    const img = new Image()
    img.src = src
  })
}

function HomeBanner() {
  const title       = 'Compromiso | Exelencia | innovación'
  const description = `En el Instituto Privado Celendín te brindamos las herramientas y el 
    acompañamiento necesario para alcanzar tus metas y destacar en el mundo laboral.`
  const text2       = `Forma 
    parte de una comunidad que impulsa tu crecimiento personal y profesional.`

  const [current,    setCurrent]    = useState(0)
  const [next,       setNext]       = useState(null)
  const [sliding,    setSliding]    = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const dragStartX = useRef(null)

  useEffect(() => { preloadImages(SLIDES) }, [])

  const goTo = useCallback((index, byUser = false) => {
    if (sliding || index === current) return
    if (byUser) setUserPaused(true)
    setNext(index)
    setSliding(true)
    setTimeout(() => {
      setCurrent(index)
      setNext(null)
      setSliding(false)
    }, TRANSITION_MS)
  }, [sliding, current])

  const goPrev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length, true)
  }, [current, goTo])

  const goNext = useCallback((byUser = false) => {
    goTo((current + 1) % SLIDES.length, byUser)
  }, [current, goTo])

  // ── Autoplay ──
  useEffect(() => {
    if (userPaused) return
    const id = setInterval(() => goNext(false), AUTOPLAY_DELAY)
    return () => clearInterval(id)
  }, [userPaused, goNext])

  // ── Drag / Swipe ──
  const onDragStart = (clientX) => {
    dragStartX.current = clientX
    setIsDragging(true)
  }

  const onDragEnd = (clientX) => {
    if (dragStartX.current === null) return
    const delta = clientX - dragStartX.current
    if (Math.abs(delta) >= DRAG_THRESHOLD) {
      if (delta < 0) goNext(true)
      else           goPrev()
    }
    dragStartX.current = null
    setIsDragging(false)
  }

  const onDragCancel = () => {
    dragStartX.current = null
    setIsDragging(false)
  }

  return (
    <>
      <section
        className="
          relative
          h-[32vh] xs:h-[36vh] sm:h-[47vh] md:h-[63vh] lg:h-[75vh] xl:h-[85vh]
          overflow-hidden
          z-0
          select-none
        "
        style={{ cursor: isDragging ? 'grabbing' : 'default' }}
        onMouseDown={(e)  => onDragStart(e.clientX)}
        onMouseUp={(e)    => onDragEnd(e.clientX)}
        onMouseLeave={onDragCancel}
        onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
        onTouchEnd={(e)   => onDragEnd(e.changedTouches[0].clientX)}
        onTouchCancel={onDragCancel}
        onDragStart={(e)  => e.preventDefault()}
      >
        {/* ── Slide actual ── */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${SLIDES[current].src}')` }}
        />

        {/* ── Slide entrante con crossfade ── */}
        {next !== null && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${SLIDES[next].src}')`,
              opacity:    sliding ? 1 : 0,
              transition: `opacity ${TRANSITION_MS}ms ease-in-out`,
            }}
          />
        )}

        {/* ── Capas decorativas ── */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="relative h-full w-full overflow-hidden">
            <div
              className="
                absolute top-0 left-0 h-full
                w-[75%] xs:w-[77%] sm:w-[70%] md:w-[70%] lg:w-[68%] xl:w-[65%] 2xl:w-[60%]
                bg-sky/80 z-20 -skew-x-12 origin-top
              "
            />
          </div>
          <div
            className="
              absolute
              top-0 left-[72%] xs:left-[74%] sm:left-[67%] md:left-[68%] lg:left-[66%] xl:left-[63%] 2xl:left-[58%]
              h-full w-[8%] sm:w-[7%] lg:w-[5%]
              bg-orange/60 transform -skew-x-12 z-20
            "
          />
        </div>

        {/* ── Contenido ── */}
        <BannerDescription
          title={title}
          description={description}
          text2={text2}
        />

        {/* ── Dots (solo indicadores, sin clic) ── */}
        <div className="
          absolute bottom-4 sm:bottom-6
          left-1/2 -translate-x-1/2
          z-100 flex items-center gap-3
          pointer-events-none
        ">
          {SLIDES.map((_, i) => {
            const active = i === (next !== null ? next : current)
            return (
              <div
                key={i}
                style={{
                  width:        active ? '2.5rem' : '0.75rem',
                  height:       '0.75rem',
                  background:   active ? '#f97316' : 'rgba(255,255,255,0.45)',
                  borderRadius: '9999px',
                  transition:   'width 300ms ease, background 300ms ease',
                }}
              />
            )
          })}
        </div>

      </section>

      <BannerCalled />
    </>
  )
}

export { HomeBanner }