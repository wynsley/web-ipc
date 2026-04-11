import { useEffect, useRef, useState } from "react"
import { Paragraph } from "../../atoms/paragraph"

function BannerCalled() {
  const fullText = 'No solo formamos técnicos, formamos personas que transformen su mundo...'
  const [displayed, setDisplayed] = useState('')
  const indexRef = useRef(0)
  const deletingRef = useRef(false)

  useEffect(() => {
    let timeout

    const tick = () => {
      const i = indexRef.current
      const deleting = deletingRef.current

      if (!deleting) {
        setDisplayed(fullText.slice(0, i + 1))
        indexRef.current++

        if (indexRef.current === fullText.length) {
          timeout = setTimeout(() => {
            deletingRef.current = true
            tick()
          }, 4000)
          return
        }
      } else {
        setDisplayed(fullText.slice(0, i - 1))
        indexRef.current--

        if (indexRef.current === 0) {
          deletingRef.current = false
          timeout = setTimeout(tick, 1000)
          return
        }
      }

      const delay = deleting ? 30 : Math.random() * 40 + 55
      timeout = setTimeout(tick, delay)
    }

    tick()
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="flex text-center
      items-center justify-center
      absolute left-1/2
      -translate-x-1/2 
    ">
      <Paragraph 
        variant="primary"
        weight="bold"
        align="center"
        size="large"
        className="font-hani bg-orange/90
        py-2 sm:py-3 px-1 sm:px-10 
        w-screen sm:w-[90vw] md:w-[85vw] lg:w-[73vw]
        shadow-md shadow-black/40
      ">
        {displayed}
        <span className="animate-pulse text:3xl md:text-4xl">|</span>
      </Paragraph>
    </div>
  )
}

export { BannerCalled }