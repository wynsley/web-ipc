function GalleryCaption({ item }) {
  const line = [item.date, item.meta].filter(Boolean).join(" · ")

  return (
    <div className="mx-auto w-full max-w-3xl px-6 pb-8 pt-4 text-white">
      {item.category && (
        <p className="font-euro text-xs uppercase tracking-[0.3em] text-orange">
          {item.category}
        </p>
      )}
      {item.title && (
        <h3 className="mt-2 font-hani text-2xl font-bold uppercase tracking-wide sm:text-3xl">
          {item.title}
        </h3>
      )}
      {item.description && (
        <p className="mt-2 max-h-24 max-w-xl font-poppins text-sm leading-relaxed text-white/80">
          {item.description}
        </p>
      )}
    </div>
  )
}

export { GalleryCaption }