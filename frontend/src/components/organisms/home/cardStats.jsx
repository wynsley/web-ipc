import { Paragraph } from "../../atoms/paragraph"
import { AnimatedNumber } from "../../atoms/animateNumber"
import { ScrollReveal } from "../../layouts/scrollReveal"

const POSITION_CLASSES = {
  top: "absolute -top-3 -left-3 sm:-top-4 sm:-left-4 lg:-top-6 lg:-left-8",
  middle: "absolute top-1/2 -left-4 -translate-y-1/2 sm:-left-8 lg:-left-14",
  bottom: "absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-6 lg:-bottom-6 lg:-right-15",
}

function CardStats({ stats }) {
  return (
    <>
      {stats.map((item, i) => {
        const Icon = item.icon
        return (
          <ScrollReveal
            key={item.id}
            delay={0.15 * (i + 1)}
            y={30}
            className={`
              w-[9.5em] xs:w-[11.5em] lg:w-[15em]
              ${POSITION_CLASSES[item.position] ?? ""}
            `}
          >
            <div
              className="flex items-center gap-2 sm:gap-3 lg:gap-4 rounded-xl border border-gray-400
                bg-white p-2.5 sm:p-3 lg:p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                transition-all duration-300 hover:-translate-y-1 hover:shadow-blue/30
              "
            >
              <Icon className="size-5 sm:size-6 lg:size-8 text-blue shrink-0" />
              <div className="min-w-0">
                {item.id === 1 ? (
                  <Paragraph
                    weight="bold"
                    variant="danger"
                    size="xlarge"
                    text={<><AnimatedNumber value={item.value} prefix={item.prefix} />+</>}
                  />
                ) : item.id === 2 ? (
                  <Paragraph
                    size="xlarge"
                    weight="bold"
                    variant="danger"
                    text={<AnimatedNumber value={item.value} prefix={item.prefix} />}
                  />
                ) : (
                  <Paragraph
                    variant="danger"
                    weight="bold"
                    text={item.value}
                  />
                )}
                <small className="text-[10px] sm:text-xs lg:text-sm text-gray-500 block">
                  {item.description}
                </small>
              </div>
            </div>
          </ScrollReveal>
        )
      })}
    </>
  )
}

export { CardStats }