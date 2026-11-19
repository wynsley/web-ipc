import { FiDownload, FiRefreshCw } from "react-icons/fi";
import { useAuditManager } from "../../../hooks/useAuditManager";
import { useClockTick } from "../../../hooks/useClockTick";
import { Button } from "../../atoms/button";
import { Paragraph } from "../../atoms/paragraph";
import { Title } from "../../atoms/titles";
import { AuditEntryRow } from "../../molecules/audit/auditEntryRow";
import { AuditFiltersBar } from "../../molecules/audit/auditFiltersBar";
import { AuditTabs } from "../../molecules/audit/auditTabs";
import { Pagination } from "../../molecules/pagination";
import { StatusBanner } from "../../molecules/statusBanner";

export function AuditPanel() {
  const {
    category,
    actor,
    from,
    to,
    searchInput,
    page,
    list,
    counts,
    actors,
    expandedId,
    hasActiveFilters,
    refreshing,
    exporting,
    error,
    notice,
    setSearchInput,
    selectCategory,
    updateFilter,
    submitSearch,
    resetFilters,
    goToPage,
    toggleEntry,
    refresh,
    exportCsv,
  } = useAuditManager();

  const tickMs = useClockTick();
  const serverMs = list?.serverTime ? Date.parse(list.serverTime) : 0;
  const nowMs = Math.max(tickMs, Number.isFinite(serverMs) ? serverMs : 0);

  return (
    <section className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Title level="h3" text="Registro de auditoría" />
          <Paragraph
            size="sm"
            text="Historial inmutable de accesos, seguridad y operaciones administrativas sin datos sensibles."
            className="mt-0.5"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={refreshing || exporting}
            onClick={refresh}
          >
            <FiRefreshCw
              aria-hidden="true"
              className={refreshing ? "animate-spin" : ""}
            />
            {refreshing ? "Actualizando…" : "Actualizar"}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            disabled={exporting}
            onClick={exportCsv}
          >
            <FiDownload aria-hidden="true" />
            {exporting ? "Exportando CSV…" : "Exportar CSV"}
          </Button>
        </div>
      </div>

      <AuditTabs
        active={category}
        counts={counts}
        disabled={exporting}
        onChange={selectCategory}
      />

      <AuditFiltersBar
        actor={actor}
        from={from}
        to={to}
        searchInput={searchInput}
        actors={actors}
        hasActiveFilters={hasActiveFilters}
        disabled={exporting}
        onSearchInputChange={setSearchInput}
        onSubmitSearch={submitSearch}
        onFilterChange={updateFilter}
        onResetFilters={resetFilters}
      />

      {notice && (
        <StatusBanner
          role="status"
          variant="success"
          text={notice}
          className="mt-4"
        />
      )}

      {error && (
        <div role="alert" className="mt-4">
          <StatusBanner variant="danger" text={error} />
          <Button
            variant="link"
            text="Actualizar auditoría"
            onClick={refresh}
          />
        </div>
      )}

      {!list && !error && (
        <Paragraph
          role="status"
          text="Cargando registros de auditoría…"
          className="mt-4"
        />
      )}

      {list && !list.entries.length && (
        <div className="mt-4 rounded-xl border border-line bg-card p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
          <Paragraph
            text={
              hasActiveFilters
                ? "No hay eventos de auditoría que coincidan con los filtros aplicados."
                : "Todavía no hay registros en esta categoría."
            }
          />
          {hasActiveFilters && (
            <Button
              variant="link"
              size="sm"
              text="Limpiar filtros"
              className="mt-2"
              onClick={resetFilters}
            />
          )}
        </div>
      )}

      {list && list.entries.length > 0 && (
        <ul className="mt-4 grid gap-2">
          {list.entries.map((entry) => (
            <AuditEntryRow
              key={entry.id}
              entry={entry}
              nowMs={nowMs}
              isExpanded={expandedId === entry.id}
              onToggle={toggleEntry}
            />
          ))}
        </ul>
      )}

      {list && (
        <Pagination
          page={page}
          totalPages={list.totalPages}
          totalItems={list.total}
          pageSize={list.pageSize}
          disabled={exporting}
          onPageChange={goToPage}
          itemLabel="registros"
          ariaLabel="Paginación de auditoría"
        />
      )}
    </section>
  );
}
