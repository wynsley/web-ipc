import { FiDownload, FiRefreshCw } from "react-icons/fi";
import { inquiryElapsedInfo } from "../../../helpers/inquiryElapsedTime";
import {
  INQUIRY_EMPTY_MESSAGES,
  INQUIRY_TAB_HINTS,
} from "../../../helpers/inquiryMeta";
import { useClockTick } from "../../../hooks/useClockTick";
import { useInquiriesManager } from "../../../hooks/useInquiriesManager";
import { Badge } from "../../atoms/badge";
import { Button } from "../../atoms/button";
import { Paragraph } from "../../atoms/paragraph";
import { Title } from "../../atoms/titles";
import { InquiryCard } from "../../molecules/admissions/inquiryCard";
import { InquiryFiltersBar } from "../../molecules/admissions/inquiryFiltersBar";
import { InquiryTabs } from "../../molecules/admissions/inquiryTabs";
import { Pagination } from "../../molecules/pagination";
import { StatusBanner } from "../../molecules/statusBanner";

export function AdmissionsPanel({ admin }) {
  const {
    status,
    career,
    shift,
    assigned,
    searchInput,
    page,
    list,
    counts,
    assignees,
    expandedId,
    detail,
    detailLoading,
    detailError,
    hasActiveFilters,
    busy,
    refreshing,
    exporting,
    error,
    notice,
    setSearchInput,
    selectStatusTab,
    updateFilter,
    submitSearch,
    resetFilters,
    goToPage,
    toggleDetail,
    retryDetail,
    refresh,
    assign,
    runAction,
    createNote,
    exportCsv,
  } = useInquiriesManager(admin);

  const tickMs = useClockTick();
  const serverMs = list?.serverTime ? Date.parse(list.serverTime) : 0;
  const nowMs = Math.max(tickMs, Number.isFinite(serverMs) ? serverMs : 0);

  const isAdmin = admin?.role === "admin";
  const tabHint = INQUIRY_TAB_HINTS[status];
  const overdueCount = (list?.inquiries ?? []).filter(
    (item) => inquiryElapsedInfo(item, nowMs).isOverdue,
  ).length;
  const emptyMessage = hasActiveFilters
    ? "No hay consultas que coincidan con los filtros aplicados."
    : INQUIRY_EMPTY_MESSAGES[status] ?? INQUIRY_EMPTY_MESSAGES.all;

  return (
    <section className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Title level="h3" text="Bandeja de consultas" />
          <Paragraph
            size="sm"
            text="Responde por WhatsApp o Gmail, sigue cada etapa y registra notas internas."
            className="mt-0.5"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={busy || refreshing}
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
            disabled={busy || exporting}
            onClick={exportCsv}
          >
            <FiDownload aria-hidden="true" />
            {exporting ? "Exportando CSV…" : "Exportar CSV"}
          </Button>
        </div>
      </div>

      <InquiryTabs
        active={status}
        counts={counts}
        disabled={busy}
        onChange={selectStatusTab}
      />

      {(tabHint || overdueCount > 0) && (
        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
          {tabHint ? (
            <Paragraph size="sm" text={tabHint} />
          ) : (
            <span />
          )}
          {overdueCount > 0 && (
            <Badge
              variant="danger"
              text={
                overdueCount === 1
                  ? "1 consulta nueva con más de 24 h"
                  : `${overdueCount} consultas nuevas con más de 24 h`
              }
            />
          )}
        </div>
      )}

      <InquiryFiltersBar
        career={career}
        shift={shift}
        assigned={assigned}
        searchInput={searchInput}
        assignees={assignees}
        hasActiveFilters={hasActiveFilters}
        disabled={busy}
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
            text="Actualizar bandeja"
            onClick={refresh}
          />
        </div>
      )}

      {!list && !error && (
        <Paragraph role="status" text="Cargando consultas…" className="mt-4" />
      )}

      {list && !list.inquiries.length && (
        <div className="mt-4 rounded-xl border border-line bg-card p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
          <Paragraph text={emptyMessage} />
          {hasActiveFilters && (
            <Button
              variant="link"
              size="sm"
              text="Limpiar filtros"
              className="mt-2"
              disabled={busy}
              onClick={resetFilters}
            />
          )}
        </div>
      )}

      {list && list.inquiries.length > 0 && (
        <ul className="mt-4 grid gap-2.5">
          {list.inquiries.map((inquiry) => (
            <InquiryCard
              key={inquiry.id}
              inquiry={inquiry}
              nowMs={nowMs}
              isAdmin={isAdmin}
              assignees={assignees}
              busy={busy}
              isExpanded={expandedId === inquiry.id}
              detail={expandedId === inquiry.id ? detail : null}
              detailLoading={expandedId === inquiry.id && detailLoading}
              detailError={expandedId === inquiry.id ? detailError : ""}
              onAction={runAction}
              onAssign={assign}
              onToggleDetail={toggleDetail}
              onRetryDetail={retryDetail}
              onAddNote={createNote}
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
          disabled={busy}
          onPageChange={goToPage}
          itemLabel="consultas"
          ariaLabel="Paginación de consultas"
        />
      )}
    </section>
  );
}
