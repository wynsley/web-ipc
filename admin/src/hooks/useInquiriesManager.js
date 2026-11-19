import { useCallback, useEffect, useState } from "react";
import { useUnsavedChanges } from "../context/unsavedChangesContext";
import { inquiryStatusNotice } from "../helpers/inquiryMeta";
import {
  addInquiryNote,
  assignInquiry,
  claimInquiry,
  exportInquiriesCsv,
  getInquiry,
  listInquiries,
  listInquiryAssignees,
  updateInquiryStatus,
} from "../services/inquiries";
import { useAutoRefresh } from "./useAutoRefresh";

function matchesActiveView(inquiry, filters, currentAdminId) {
  if (filters.status !== "all" && inquiry.status !== filters.status)
    return false;
  if (filters.assigned === "unassigned" && inquiry.assignedToId !== null)
    return false;
  if (filters.assigned === "mine" && inquiry.assignedToId !== currentAdminId)
    return false;
  if (
    filters.assigned !== "all" &&
    filters.assigned !== "unassigned" &&
    filters.assigned !== "mine" &&
    inquiry.assignedToId !== filters.assigned
  )
    return false;
  return true;
}

function triggerFileDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function useInquiriesManager(admin) {
  const { confirmExit } = useUnsavedChanges();
  const [status, setStatus] = useState("new");
  const [career, setCareer] = useState("all");
  const [shift, setShift] = useState("all");
  const [assigned, setAssigned] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [refreshTick, setRefreshTick] = useState(0);

  const queryKey = JSON.stringify({
    page,
    status,
    career,
    shift,
    assigned,
    q: query,
  });
  const [fetched, setFetched] = useState({
    queryKey: "",
    refreshTick: -1,
    list: null,
    error: "",
  });
  const [counts, setCounts] = useState(null);
  const [assignees, setAssignees] = useState([]);

  const [expandedId, setExpandedId] = useState(null);
  const [detailRevision, setDetailRevision] = useState(0);
  const detailKey = expandedId ? `${expandedId}:${detailRevision}` : "";
  const [detailFetched, setDetailFetched] = useState({
    key: "",
    inquiry: null,
    error: "",
  });

  const [busy, setBusy] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [actionError, setActionError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let current = true;
    listInquiries({ page, status, career, shift, assigned, q: query })
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
  }, [page, status, career, shift, assigned, query, queryKey, refreshTick]);

  useEffect(() => {
    let current = true;
    listInquiryAssignees()
      .then((data) => {
        if (current && Array.isArray(data?.assignees))
          setAssignees(data.assignees);
      })
      .catch(() => {});
    return () => {
      current = false;
    };
  }, []);

  useEffect(() => {
    if (!expandedId) return;
    let current = true;
    getInquiry(expandedId)
      .then((data) => {
        if (current)
          setDetailFetched({ key: detailKey, inquiry: data, error: "" });
      })
      .catch((failure) => {
        if (current)
          setDetailFetched({
            key: detailKey,
            inquiry: null,
            error: failure.message,
          });
      });
    return () => {
      current = false;
    };
  }, [expandedId, detailKey]);

  const silentRefresh = useCallback(() => {
    setRefreshTick((value) => value + 1);
  }, []);

  useAutoRefresh(silentRefresh, {
    intervalMs: 30_000,
    paused: busy || exporting || Boolean(expandedId),
  });

  const isSameQuery = fetched.queryKey === queryKey;
  const list = isSameQuery ? fetched.list : null;
  const refreshing = Boolean(
    isSameQuery && list && fetched.refreshTick !== refreshTick,
  );
  const error = actionError || (isSameQuery ? fetched.error : "");
  const detail =
    detailKey && detailFetched.key === detailKey ? detailFetched.inquiry : null;
  const detailError =
    detailKey && detailFetched.key === detailKey ? detailFetched.error : "";
  const detailLoading = Boolean(expandedId && detailFetched.key !== detailKey);
  const hasActiveFilters = Boolean(
    career !== "all" || shift !== "all" || assigned !== "all" || query,
  );

  function refresh() {
    setActionError("");
    setRefreshTick((value) => value + 1);
    if (expandedId) setDetailRevision((value) => value + 1);
  }

  function retryDetail() {
    if (!expandedId) return;
    setDetailRevision((value) => value + 1);
  }

  function selectStatusTab(nextStatus) {
    if (busy || nextStatus === status || !confirmExit()) return;
    setExpandedId(null);
    setActionError("");
    setNotice("");
    setPage(1);
    setStatus(nextStatus);
  }

  function updateFilter(field, value) {
    if (busy || !confirmExit()) return;
    setExpandedId(null);
    setActionError("");
    setNotice("");
    setPage(1);
    if (field === "career") setCareer(value);
    else if (field === "shift") setShift(value);
    else if (field === "assigned") setAssigned(value);
  }

  function submitSearch(event) {
    event.preventDefault();
    const trimmed = searchInput.trim();
    if (busy || trimmed === query || !confirmExit()) return;
    setExpandedId(null);
    setActionError("");
    setNotice("");
    setPage(1);
    setQuery(trimmed);
  }

  function resetFilters() {
    if (busy || !confirmExit()) return;
    setExpandedId(null);
    setActionError("");
    setNotice("");
    setCareer("all");
    setShift("all");
    setAssigned("all");
    setSearchInput("");
    setQuery("");
    setPage(1);
  }

  function goToPage(nextPage) {
    if (busy || nextPage < 1 || !confirmExit()) return;
    setExpandedId(null);
    setActionError("");
    setPage(nextPage);
  }

  function toggleDetail(id) {
    if (busy || !confirmExit()) return;
    setActionError("");
    setExpandedId((current) => (current === id ? null : id));
  }

  function syncAfterMutation(original, updated) {
    const stays = matchesActiveView(updated, { status, assigned }, admin?.id);
    if (!stays) {
      if (expandedId === original.id) setExpandedId(null);
      if (list?.inquiries.length === 1 && page > 1) {
        setPage((current) => current - 1);
        return;
      }
      setRefreshTick((value) => value + 1);
      return;
    }
    setRefreshTick((value) => value + 1);
    if (expandedId === original.id) setDetailRevision((value) => value + 1);
  }

  function handleMutationError(inquiry, failure) {
    setActionError(failure.message);
    if (failure.status === 409) {
      setRefreshTick((value) => value + 1);
      if (expandedId === inquiry.id) setDetailRevision((value) => value + 1);
    }
  }

  async function claim(inquiry) {
    if (busy || !confirmExit()) return;
    setBusy(true);
    setActionError("");
    setNotice("");
    try {
      const updated = await claimInquiry(inquiry);
      setNotice(
        inquiry.status === "new"
          ? "Consulta asignada a tu cuenta y movida a En seguimiento."
          : "Consulta asignada a tu cuenta.",
      );
      syncAfterMutation(inquiry, updated);
    } catch (failure) {
      handleMutationError(inquiry, failure);
    } finally {
      setBusy(false);
    }
  }

  async function assign(inquiry, nextAssigneeId) {
    const assigneeId = nextAssigneeId || null;
    if (busy || assigneeId === (inquiry.assignedToId ?? null) || !confirmExit())
      return;
    setBusy(true);
    setActionError("");
    setNotice("");
    try {
      const updated = await assignInquiry(inquiry, assigneeId);
      if (!assigneeId) {
        setNotice("Responsable retirado de la consulta.");
      } else if (inquiry.status === "new" && updated.status === "in_progress") {
        setNotice("Responsable asignado. La consulta pasó a En seguimiento.");
      } else {
        setNotice("Responsable actualizado.");
      }
      syncAfterMutation(inquiry, updated);
    } catch (failure) {
      handleMutationError(inquiry, failure);
    } finally {
      setBusy(false);
    }
  }

  async function changeStatus(inquiry, nextStatus) {
    if (busy || nextStatus === inquiry.status || !confirmExit()) return;
    setBusy(true);
    setActionError("");
    setNotice("");
    try {
      const updated = await updateInquiryStatus(inquiry, nextStatus);
      setNotice(inquiryStatusNotice(inquiry.status, updated.status));
      syncAfterMutation(inquiry, updated);
    } catch (failure) {
      handleMutationError(inquiry, failure);
    } finally {
      setBusy(false);
    }
  }

  function runAction(inquiry, action) {
    if (action.type === "claim") return claim(inquiry);
    if (action.type === "status") return changeStatus(inquiry, action.nextStatus);
  }

  async function createNote(inquiryId, body) {
    const trimmed = body.trim();
    if (!trimmed) return;
    setActionError("");
    setNotice("");
    const note = await addInquiryNote(inquiryId, trimmed);
    if (note.autoAdvanced) {
      setNotice(
        note.autoAssigned
          ? "Nota guardada. La consulta pasó automáticamente a En seguimiento y quedó asignada a tu cuenta."
          : "Nota guardada. La consulta pasó automáticamente a En seguimiento.",
      );
      const leavesCurrentView =
        status === "new" || (assigned === "unassigned" && note.autoAssigned);
      if (leavesCurrentView) {
        setExpandedId(null);
        if (list?.inquiries.length === 1 && page > 1) {
          setPage((current) => current - 1);
          return note;
        }
        setRefreshTick((value) => value + 1);
        return note;
      }
    } else {
      setNotice("Nota interna guardada.");
    }
    setDetailRevision((value) => value + 1);
    setRefreshTick((value) => value + 1);
    return note;
  }

  async function exportCsv() {
    if (busy || exporting) return;
    setExporting(true);
    setActionError("");
    setNotice("");
    try {
      const { blob, filename } = await exportInquiriesCsv({
        status,
        career,
        shift,
        assigned,
        q: query,
      });
      triggerFileDownload(blob, filename);
      setNotice("Archivo CSV descargado con los filtros actuales.");
    } catch (failure) {
      setActionError(failure.message);
    } finally {
      setExporting(false);
    }
  }

  return {
    status,
    career,
    shift,
    assigned,
    searchInput,
    query,
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
  };
}
