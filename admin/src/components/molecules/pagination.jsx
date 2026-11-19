import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { buildPaginationRange } from "../../helpers/paginationRange";

export function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  disabled = false,
  onPageChange,
  itemLabel = "registros",
  ariaLabel = "Paginación",
}) {
  const safeTotal = Number(totalItems) || 0;
  const safeTotalPages = Math.max(1, Number(totalPages) || 1);
  if (safeTotal === 0 && safeTotalPages <= 1) return null;

  const from = safeTotal === 0 ? 0 : Math.min((page - 1) * pageSize + 1, safeTotal);
  const to = safeTotal === 0 ? 0 : Math.min(page * pageSize, safeTotal);
  const pages = buildPaginationRange(page, safeTotalPages);

  return (
    <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-line pt-4 sm:flex-row">
      <p className="font-poppins text-xs text-muted tabular-nums sm:text-sm">
        Mostrando{" "}
        <strong className="font-semibold text-ink">
          {from}–{to}
        </strong>{" "}
        de <strong className="font-semibold text-ink">{safeTotal}</strong>{" "}
        {itemLabel}
      </p>

      {safeTotalPages > 1 && (
        <nav
          aria-label={ariaLabel}
          className="flex flex-wrap items-center justify-center gap-1.5"
        >
          <button
            type="button"
            disabled={disabled || page <= 1}
            onClick={() => onPageChange(page - 1)}
            aria-label="Página anterior"
            className="inline-flex min-h-9 cursor-pointer items-center gap-1 rounded-lg border border-line bg-card px-2.5 py-1.5 font-poppins text-xs font-semibold text-ink transition-colors hover:border-blue-light/50 hover:bg-soft focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-45 sm:text-sm"
          >
            <FiChevronLeft aria-hidden="true" className="h-4 w-4" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          {pages.map((entry) =>
            typeof entry === "string" ? (
              <span
                key={entry}
                aria-hidden="true"
                className="px-1.5 font-poppins text-sm text-muted select-none"
              >
                …
              </span>
            ) : (
              <button
                key={entry}
                type="button"
                disabled={disabled}
                aria-current={entry === page ? "page" : undefined}
                aria-label={`Ir a la página ${entry}`}
                onClick={() => {
                  if (entry !== page) onPageChange(entry);
                }}
                className={`min-h-9 min-w-9 cursor-pointer rounded-lg border px-2.5 py-1.5 font-poppins text-xs font-semibold tabular-nums transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-55 sm:text-sm ${
                  entry === page
                    ? "border-blue-light/35 bg-blue text-white shadow-xs"
                    : "border-line bg-card text-muted hover:border-blue-light/45 hover:bg-soft hover:text-ink"
                }`}
              >
                {entry}
              </button>
            ),
          )}

          <button
            type="button"
            disabled={disabled || page >= safeTotalPages}
            onClick={() => onPageChange(page + 1)}
            aria-label="Página siguiente"
            className="inline-flex min-h-9 cursor-pointer items-center gap-1 rounded-lg border border-line bg-card px-2.5 py-1.5 font-poppins text-xs font-semibold text-ink transition-colors hover:border-blue-light/50 hover:bg-soft focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-45 sm:text-sm"
          >
            <span className="hidden sm:inline">Siguiente</span>
            <FiChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </nav>
      )}
    </div>
  );
}
