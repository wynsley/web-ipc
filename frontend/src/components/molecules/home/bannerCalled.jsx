import { Paragraph } from "../../atoms/paragraph"
import { useTypewriter } from "../../../hooks/globals/useKeyboardText"

function BannerCalled() {
  const fullText = 'No solo formamos técnicos, formamos personas que transformen su mundo...'

  const displayed = useTypewriter(fullText)

  return (
    <div className="flex text-center
      items-center justify-center
    ">
      <Paragraph 
        variant="primary"
        weight="bold"
        align="center"
        size="large"
        className="font-hani bg-blue
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