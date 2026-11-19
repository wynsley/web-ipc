import { FiSearch, FiX } from "react-icons/fi";
import { ROLE_LABELS } from "../../../data/workspaceAreas";
import { Button } from "../../atoms/button";
import { Input } from "../../atoms/input";
import { Select } from "../../atoms/select";

export function AuditFiltersBar({
  actor,
  from,
  to,
  searchInput,
  actors,
  hasActiveFilters,
  disabled,
  onSearchInputChange,
  onSubmitSearch,
  onFilterChange,
  onResetFilters,
}) {
  const actorOptions = [
    { value: "all", text: "Todos los actores" },
    { value: "system", text: "Sistema / Público" },
    ...actors.map((person) => ({
      value: person.id,
      text:
        `${person.name} (${ROLE_LABELS[person.role] || person.role})` +
        (person.isActive ? "" : " · inactiva"),
    })),
  ];

  return (
    <div className="mt-3.5 rounded-xl border border-line bg-card p-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
      <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_repeat(2,minmax(0,0.75fr))]">
        <form onSubmit={onSubmitSearch} className="flex min-w-0 gap-2">
          <div className="relative min-w-0 flex-1">
            <FiSearch
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted"
            />
            <Input
              type="search"
              value={searchInput}
              onChange={(event) => onSearchInputChange(event.target.value)}
              placeholder="Buscar por acción, ID de solicitud o UUID…"
              aria-label="Buscar en auditoría"
              maxLength={100}
              disabled={disabled}
              className="min-h-10 py-1.5 pl-9 text-sm"
            />
          </div>
          <Button
            type="submit"
            variant="secondary"
            size="sm"
            text="Buscar"
            disabled={disabled}
          />
        </form>

        <Select
          aria-label="Filtrar por actor"
          value={actor}
          options={actorOptions}
          disabled={disabled}
          onChange={(event) => onFilterChange("actor", event.target.value)}
          className="min-h-10 py-1.5 text-sm"
        />

        <Input
          type="date"
          value={from}
          aria-label="Fecha inicial"
          title="Desde (hora de Lima)"
          disabled={disabled}
          onChange={(event) => onFilterChange("from", event.target.value)}
          className="min-h-10 py-1.5 text-sm tabular-nums"
        />

        <Input
          type="date"
          value={to}
          aria-label="Fecha final"
          title="Hasta (hora de Lima)"
          disabled={disabled}
          onChange={(event) => onFilterChange("to", event.target.value)}
          className="min-h-10 py-1.5 text-sm tabular-nums"
        />
      </div>

      {hasActiveFilters && (
        <div className="mt-2 flex justify-end">
          <Button
            type="button"
            variant="link"
            size="sm"
            disabled={disabled}
            onClick={onResetFilters}
            className="min-h-8 py-0.5 text-xs"
          >
            <FiX aria-hidden="true" />
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
}
