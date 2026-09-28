function GraduateCard ({ name, description, year, photo, isHovered, onMouseEnter, onMouseLeave }) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-medium
        transition-transform duration-300 ease-out
        ${isHovered ? "scale-[1.04] shadow-xl z-10" : "scale-100"}
      `}
    >
      <div className="relative h-48 sm:h-52 md:h-56 w-full overflow-hidden">
        <img
          src={photo}
          alt={name}
          draggable={false}
          className="h-full w-full object-cover select-none"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-5">
        <div>
          <p className="font-hani text-base sm:text-lg font-bold text-neutral-black">
            {name}
          </p>
          <p className="mt-1 font-poppins text-sm text-neutral-dark/60 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span
            className="
              inline-flex items-center gap-1
              rounded-full bg-blue-deep/10
              px-3 py-1
              font-hani text-xs font-bold text-blue-deep
            "
          >
            Promoción {year}
          </span>

          <button
            type="button"
            className="
              rounded-full border border-orange
              px-3 py-1.5
              font-hani text-xs font-bold text-orange
              transition-colors duration-200
              hover:bg-orange hover:text-white
            "
          >
            Contáctalo
          </button>
        </div>
      </div>
    </div>
  );
}

export {GraduateCard}
