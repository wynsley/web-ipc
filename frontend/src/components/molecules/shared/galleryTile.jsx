const TITLE_SIZE = {
  lg: "text-2xl sm:text-3xl lg:text-4xl",
  md: "text-xl sm:text-2xl",
  sm: "text-base sm:text-lg",
  xs: "text-sm sm:text-base",
}

const DESC_CLAMP = {
  lg: "line-clamp-4",
  md: "line-clamp-3",
  sm: "line-clamp-2",
  xs: "line-clamp-2",
}

const SHOW_ON_HOVER =
  "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"

function GalleryTile({
  item,
  size = "md",
  titleSize, // opcional: tamaño solo del título (xs | sm | md | lg)
  showDescription = true,
  onOpen,
}) {
  const { image, alt, title, category, date, description } = item
  const desc = showDescription ? description : null
  const hasText = Boolean(category || title || date || desc)

  const titleClass = TITLE_SIZE[titleSize ?? size] ?? TITLE_SIZE.md
  const descClass = DESC_CLAMP[size] ?? DESC_CLAMP.md

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={title ? `Ver fotos de ${title}` : "Ver foto"}
      className="group absolute inset-0 block overflow-hidden bg-blue-deep shadow-md shadow-blue-deep/30 outline-none focus-visible:ring-2 focus-visible:ring-orange"
    >
      {image ? (
        <img
          src={image}
          alt={alt ?? title ?? ""}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-blue-deep via-blue to-sky/60 transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}

      {hasText && (
        <>
          <span
            aria-hidden="true"
            className={`absolute inset-0 bg-gradient-to-t from-blue-deep/90 via-blue-deep/40 to-transparent transition-opacity duration-500 ${SHOW_ON_HOVER}`}
          />

          <span
            className={`absolute inset-0 flex translate-y-2 flex-col items-start justify-end px-4 pb-5 text-left transition-all duration-500 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0 ${SHOW_ON_HOVER}`}
          >
            {title && (
              <span
                className={`block font-hani font-bold uppercase leading-tight tracking-[0.1em] text-white ${titleClass}`}
              >
                {title}
              </span>
            )}

            {title && (date || desc) && (
              <span aria-hidden="true" className="mt-3 block h-0.5 w-full bg-blue" />
            )}

            {date && (
              <span className="block pt-2 font-poppins text-xs text-white/85">
                {date}
              </span>
            )}

            {desc && (
              <span
                className={`block pt-2 font-poppins text-xs leading-relaxed text-white/90 ${descClass}`}
              >
                {desc}
              </span>
            )}
          </span>
        </>
      )}
    </button>
  )
}

export { GalleryTile }