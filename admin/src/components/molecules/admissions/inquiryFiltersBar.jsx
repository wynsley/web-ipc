import { FiSearch, FiX } from "react-icons/fi";
import { ROLE_LABELS } from "../../../data/workspaceAreas";
import {
  INQUIRY_CAREER_OPTIONS,
  INQUIRY_SHIFT_OPTIONS,
} from "../../../helpers/inquiryMeta";
import { Button } from "../../atoms/button";
import { Input } from "../../atoms/input";
import { Select } from "../../atoms/select";

export function InquiryFiltersBar({
  career,
  shift,
  assigned,
  searchInput,
  assignees,
  hasActiveFilters,
  disabled,
  onSearchInputChange,
  onSubmitSearch,
  onFilterChange,
  onResetFilters,
}) {
  const assigneeOptions = [
    { value: "all", text: "Todos los responsables" },
    { value: "unassigned", text: "Sin asignar" },
    { value: "mine", text: "Mis consultas" },
    ...assignees.map((person) => ({
      value: person.id,
      text: `${person.name} (${ROLE_LABELS[person.role] || person.role})`,
    })),
  ];

  return (
    <div className="mt-3.5 rounded-xl border border-line bg-card p-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
      <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
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
              placeholder="Buscar por nombre, correo, teléfono o mensaje…"
              aria-label="Buscar consultas"
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
          aria-label="Filtrar por carrera"
          value={career}
          options={INQUIRY_CAREER_OPTIONS}
          disabled={disabled}
          onChange={(event) => onFilterChange("career", event.target.value)}
          className="min-h-10 py-1.5 text-sm"
        />

        <Select
          aria-label="Filtrar por turno"
          value={shift}
          options={INQUIRY_SHIFT_OPTIONS}
          disabled={disabled}
          onChange={(event) => onFilterChange("shift", event.target.value)}
          className="min-h-10 py-1.5 text-sm"
        />

        <Select
          aria-label="Filtrar por responsable"
          value={assigned}
          options={assigneeOptions}
          disabled={disabled}
          onChange={(event) => onFilterChange("assigned", event.target.value)}
          className="min-h-10 py-1.5 text-sm"
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
