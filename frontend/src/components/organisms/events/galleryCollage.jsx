import { GalleryTile } from "@/components/molecules/shared/galleryTile"
import { ScrollReveal } from "@/components/layouts/scrollReveal"
import { ASPECTS, chunk, COLUMNS, GROUP_SIZE } from "@/utils/galeryLayout"

function GalleryCollage({ items, onOpen }) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {chunk(items, GROUP_SIZE).map((group, g) => (
        <div
          key={g}
          className="grid grid-cols-2 items-center gap-3 sm:gap-4 lg:flex lg:gap-4"
        >
          {COLUMNS.map((slots, c) => (
            <div
              key={c}
              className="contents lg:flex lg:flex-1 lg:flex-col lg:gap-4"
            >
              {slots.map((slot) => {
                const item = group[slot]
                if (!item) return null
                return (
                  <ScrollReveal
                    key={item.id}
                    delay={slot * 0.12}
                    y={40}
                    className={`relative w-full ${ASPECTS[slot]}`}
                  >
                    <GalleryTile
                      item={item}
                      showDescription={false}
                      onOpen={() => onOpen(g * GROUP_SIZE + slot)}
                    />
                  </ScrollReveal>
                )
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export { GalleryCollage }