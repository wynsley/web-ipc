import { Paragraph } from "@/components/atoms/paragraph"
import { Title } from "@/components/atoms/titles"
import { beginning } from "@/data/aboutUs/beginning"

function Beginning () {
  return(
    <ol className="">
            {beginning.map((item) => (
              <li key={item.number}>
                <span className="block font-hani text-xl py-3 leading-none text-blue-deep font-extrabold">
                  {item.number}
                </span>
                <div className="mt-2 flex gap-3">
                  {/* Línea vertical debajo del número */}
                  <span
                    className="ml-2 w-0.5 shrink-0 self-stretch bg-orange"
                    aria-hidden="true"
                  />
                  <div>
                    <Title
                      text={item.title}
                      level="h4"
                      weight="bold"
                      className="font-hani"
                    />
                    <Paragraph
                      text={item.text}
                      variant="secondary"
                      size="base"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ol>
  )
}

export {Beginning}