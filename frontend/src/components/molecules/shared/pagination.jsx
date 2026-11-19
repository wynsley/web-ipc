import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function buildPageRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("ellipsis-" + i);
    result.push(sorted[i]);
  }
  return result;
}

function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  label = "Paginación",
}) {
  if (totalPages <= 1) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);
  const pages = buildPageRange(page, totalPages);

  return (
    <nav
      aria-label={label}
      className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-blue-dark/12 pt-6 sm:flex-row"
    >
      <p className="font-poppins text-sm text-neutral-600 tabular-nums">
        Mostrando <strong className="text-blue-deep">{from}–{to}</strong> de{" "}
        <strong className="text-blue-deep">{totalItems}</strong> eventos
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Página anterior"
          className="inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-lg border border-blue-dark/20 bg-white px-3 py-2 font-poppins text-sm font-semibold text-blue-deep transition hover:border-blue-deep hover:bg-blue-deep hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-dark disabled:pointer-events-none disabled:opacity-40"
        >
          <FaChevronLeft aria-hidden="true" className="h-3 w-3" />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        {pages.map((entry) =>
          typeof entry === "string" ? (
            <span
              key={entry}
              aria-hidden="true"
              className="px-1.5 font-poppins text-sm text-neutral-400"
            >
              …
            </span>
          ) : (
            <button
              key={entry}
              type="button"
              aria-current={entry === page ? "page" : undefined}
              onClick={() => onPageChange(entry)}
              className={`min-h-10 min-w-10 cursor-pointer rounded-lg border px-3 py-2 font-poppins text-sm font-semibold tabular-nums transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-dark ${
                entry === page
                  ? "border-blue-deep bg-blue-deep text-white shadow-xs"
                  : "border-blue-dark/15 bg-white text-blue-deep hover:border-orange hover:text-orange"
              }`}
            >
              {entry}
            </button>
          ),
        )}

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Página siguiente"
          className="inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-lg border border-blue-dark/20 bg-white px-3 py-2 font-poppins text-sm font-semibold text-blue-deep transition hover:border-blue-deep hover:bg-blue-deep hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-dark disabled:pointer-events-none disabled:opacity-40"
        >
          <span className="hidden sm:inline">Siguiente</span>
          <FaChevronRight aria-hidden="true" className="h-3 w-3" />
        </button>
      </div>
    </nav>
  );
}

export { Pagination };
