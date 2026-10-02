function Dost({
  dots,
  next,
  current,
  goTo,
  onAbsolute = false,
  variant = "light",
}) {
  const inactiveColor =
    variant === "dark"
      ? "rgba(255,255,255,0.45)"
      : "#2222";

  return (
    <div
      className={`
        ${onAbsolute
          ? "absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2"
          : ""
        }
        z-100 flex items-center justify-center gap-1 md:gap-3
      `}
    >
      {dots.map((_, i) => {
        const active =
          i === (next !== null ? next : current);

        return (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir al slide ${i + 1}`}
            className="p-1"
          >
            <span
              className={`
                block rounded-full
                transition-all duration-300
                ${active
                  ? "w-8 h-2 sm:w-10 sm:h-3"
                  : "w-2 h-2 sm:w-3 sm:h-3"
                }
              `}
              style={{
                background: active
                  ? "#f97316"
                  : inactiveColor,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

export { Dost };