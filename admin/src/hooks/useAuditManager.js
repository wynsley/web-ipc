import { useCallback, useEffect, useState } from "react";
import { triggerFileDownload } from "../helpers/fileDownload";
import {
  exportAuditCsv,
  listAuditActors,
  listAuditLogs,
} from "../services/audit";
import { useAutoRefresh } from "./useAutoRefresh";

export function useAuditManager() {
  const [category, setCategory] = useState("all");
  const [actor, setActor] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [refreshTick, setRefreshTick] = useState(0);

  const invalidRange = Boolean(from && to && from > to);
  const queryKey = JSON.stringify({
    page,
    category,
    actor,
    from: invalidRange ? "" : from,
    to: invalidRange ? "" : to,
    q: query,
  });

  const [fetched, setFetched] = useState({
    queryKey: "",
    refreshTick: -1,
    list: null,
    error: "",
  });
  const [counts, setCounts] = useState(null);
  const [actors, setActors] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [exporting, setExporting] = useState(false);
  const [actionError, setActionError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (invalidRange) return;
    let current = true;
    listAuditLogs({ page, category, actor, from, to, q: query })
      .then((data) => {
        if (!current) return;
        setFetched({ queryKey, refreshTick, list: data, error: "" });
        if (data.counts) setCounts(data.counts);
      })
      .catch((failure) => {
        if (!current) return;
        setFetched((prev) => ({
          queryKey,
          refreshTick,
          list: prev.queryKey === queryKey ? prev.list : null,
          error: failure.message,
        }));
      });
    return () => {
      current = false;
    };
  }, [page, category, actor, from, to, query, invalidRange, queryKey, refreshTick]);

  useEffect(() => {
    let current = true;
    listAuditActors()
      .then((data) => {
        if (current && Array.isArray(data?.actors)) setActors(data.actors);
      })
      .catch(() => {});
    return () => {
      current = false;
    };
  }, []);

  const silentRefresh = useCallback(() => {
    setRefreshTick((value) => value + 1);
  }, []);

  useAutoRefresh(silentRefresh, {
    intervalMs: 30_000,
    paused: exporting || invalidRange,
  });

  const isSameQuery = fetched.queryKey === queryKey;
  const list = isSameQuery ? fetched.list : null;
  const refreshing = Boolean(
    !invalidRange && isSameQuery && list && fetched.refreshTick !== refreshTick,
  );
  const rangeError = invalidRange
    ? "La fecha inicial no puede ser posterior a la fecha final."
    : "";
  const error =
    rangeError || actionError || (isSameQuery ? fetched.error : "");
  const hasActiveFilters = Boolean(
    actor !== "all" || from || to || query,
  );

  function refresh() {
    if (invalidRange) return;
    setActionError("");
    setRefreshTick((value) => value + 1);
  }

  function selectCategory(nextCategory) {
    if (nextCategory === category) return;
    setExpandedId(null);
    setActionError("");
    setNotice("");
    setPage(1);
    setCategory(nextCategory);
  }

  function updateFilter(field, value) {
    setExpandedId(null);
    setActionError("");
    setNotice("");
    setPage(1);
    if (field === "actor") setActor(value);
    else if (field === "from") setFrom(value);
    else if (field === "to") setTo(value);
  }

  function submitSearch(event) {
    event.preventDefault();
    const trimmed = searchInput.trim();
    if (trimmed === query) return;
    setExpandedId(null);
    setActionError("");
    setNotice("");
    setPage(1);
    setQuery(trimmed);
  }

  function resetFilters() {
    setExpandedId(null);
    setActionError("");
    setNotice("");
    setActor("all");
    setFrom("");
    setTo("");
    setSearchInput("");
    setQuery("");
    setPage(1);
  }

  function goToPage(nextPage) {
    if (nextPage < 1) return;
    setExpandedId(null);
    setActionError("");
    setPage(nextPage);
  }

  function toggleEntry(id) {
    setExpandedId((current) => (current === id ? null : id));
  }

  async function exportCsv() {
    if (exporting || invalidRange) return;
    setExporting(true);
    setActionError("");
    setNotice("");
    try {
      const { blob, filename } = await exportAuditCsv({
        category,
        actor,
        from,
        to,
        q: query,
      });
      triggerFileDownload(blob, filename);
      setNotice("Archivo CSV de auditoría descargado con los filtros actuales.");
      setRefreshTick((value) => value + 1);
    } catch (failure) {
      setActionError(failure.message);
    } finally {
      setExporting(false);
    }
  }

  return {
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
  };
}
