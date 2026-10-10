import { Paragraph } from "@/components/atoms/paragraph"
import { Title } from "@/components/atoms/titles"

function ActivityCard({ title, description, image, alt }) {
  return (
    <article className="group relative isolate h-full">
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 translate-x-3 translate-y-3 border-2 border-blue transition-transform duration-500 ease-out group-hover:translate-x-4 group-hover:translate-y-4"
      />

      <div className="relative aspect-[4/5] overflow-hidden bg-blue-deep shadow-xl shadow-blue-deep/30">
        {image ? (
          <img
            src={image}
            alt={alt}
            width="1200"
            height="1500"
            loading="lazy"
            decoding="async"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:-rotate-[30deg] group-hover:scale-150"
          />
        ) : (
          // Placeholder mientras no hay imagen
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-blue-deep via-blue to-sky/60 transition-transform duration-700 ease-out group-hover:-rotate-[30deg] group-hover:scale-150"
          />
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-blue-deep/75 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
        />

        <div className="absolute inset-0 flex flex-col items-start justify-end px-6 pb-4 text-left">
          <Title
            text={title}
            level="h3"
            variant="primary"
            className="font-hani uppercase text-shadow-[2px_2px_3px] text-shadow-black"
            weight="bold"
          />

          <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100">
            <Paragraph
              text={description}
              variant="primary"
              size="small"
              className="overflow-hidden font-poppins leading-relaxed"
            />
          </div>
        </div>
      </div>
    </article>
  )
}

export { ActivityCard }