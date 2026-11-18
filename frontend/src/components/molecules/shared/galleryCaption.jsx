function GalleryCaption({ item }) {
  const line = [item.date, item.meta].filter(Boolean).join(" · ");

  return (
    <div className="mx-auto max-h-[30dvh] w-full max-w-3xl shrink-0 overflow-y-auto overscroll-contain break-words px-5 pt-3 pb-5 text-white sm:px-6">
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
      {line && (
        <p className="mt-2 font-poppins text-sm text-white/90">{line}</p>
      )}
      {item.description && (
        <p className="mt-2 max-w-xl font-poppins text-sm leading-relaxed text-white/80">
          {item.description}
        </p>
      )}
    </div>
  );
}

export { GalleryCaption };
