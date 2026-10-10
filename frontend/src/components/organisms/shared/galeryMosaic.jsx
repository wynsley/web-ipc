import { ScrollReveal } from "@/components/layouts/scrollReveal"
import { GalleryTile } from "@/components/molecules/shared/galleryTile"

function buildGroups(items, layout) {
  const groups = []
  let start = 0

  for (let g = 0; start < items.length; g++) {
    const pattern = layout[g % layout.length]
    groups.push({
      pattern,
      start,
      items: items.slice(start, start + pattern.cells.length),
    })
    start += pattern.cells.length
  }

  return groups
}

function GalleryMosaic({
  items,
  layout,
  onOpen,
  Card = GalleryTile,
  cardProps,
}) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {buildGroups(items, layout).map((group, g) => {
        const { pattern } = group
        const stagger = pattern.stagger ?? 0.15

        const renderCell = (slot) => {
          const item = group.items[slot]
          if (!item) return null
          const cell = pattern.cells[slot]

          return (
            <ScrollReveal
              key={item.id}
              delay={slot * stagger}
              y={40}
              duration={0.8}
              className={`relative ${cell.className}`}
            >
              <Card
                item={item}
                size={cell.size}
                titleSize={cell.titleSize}
                onOpen={() => onOpen(group.start + slot)}
                {...cardProps}
              />
            </ScrollReveal>
          )
        }

        return (
          <div key={g} className={pattern.container}>
            {pattern.columns
              ? pattern.columns.map((slots, c) => (
                <div key={c} className={pattern.columnClassName}>
                  {slots.map(renderCell)}
                </div>
              ))
              : pattern.cells.map((_, slot) => renderCell(slot))}
          </div>
        )
      })}
    </div>
  )
}

export { GalleryMosaic }