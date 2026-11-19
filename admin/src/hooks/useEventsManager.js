import { useEffect, useState } from "react";
import {
  deleteEvent,
  listEvents,
  setPublication,
} from "../services/events";
import { useUnsavedChanges } from "../context/unsavedChangesContext";

export function useEventsManager() {
  const { confirmExit } = useUnsavedChanges();
  const [scope, setScope] = useState("published");
  const [page, setPage] = useState(1);
  const [revision, setRevision] = useState(0);
  const requestKey = `${page}:${scope}:${revision}`;
  const [fetched, setFetched] = useState({ key: "", list: null, error: "" });
  const [counts, setCounts] = useState(null);
  const [editor, setEditor] = useState(null);
  const [operation, setOperation] = useState(null);
  const [historyEvent, setHistoryEvent] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let current = true;
    listEvents(page, scope)
      .then((data) => {
        if (current) {
          setFetched({ key: requestKey, list: data, error: "" });
          if (data.counts) setCounts(data.counts);
        }
      })
      .catch((failure) => {
        if (current)
          setFetched({ key: requestKey, list: null, error: failure.message });
      });
    return () => {
      current = false;
    };
  }, [page, scope, requestKey]);

  const list = fetched.key === requestKey ? fetched.list : null;
  const error =
    actionError || (fetched.key === requestKey ? fetched.error : "");

  function closePanels() {
    setEditor(null);
    setOperation(null);
    setHistoryEvent(null);
    setDeletingId(null);
  }

  function refresh(nextScope) {
    closePanels();
    setActionError("");
    if (nextScope && nextScope !== scope) {
      setScope(nextScope);
      setPage(1);
      return;
    }
    setRevision((value) => value + 1);
  }

  function selectTab(nextScope) {
    if (busy || nextScope === scope || !confirmExit()) return;
    closePanels();
    setActionError("");
    setNotice("");
    setPage(1);
    setScope(nextScope);
  }

  function goToPage(nextPage) {
    if (busy || !confirmExit()) return;
    closePanels();
    setActionError("");
    setPage(nextPage);
  }

  function openNewEvent() {
    if (busy || !confirmExit()) return;
    setOperation(null);
    setHistoryEvent(null);
    setDeletingId(null);
    setNotice("");
    setEditor((current) => (current && !current.id ? null : {}));
  }

  function openEditEvent(event) {
    if (busy || !confirmExit()) return;
    setOperation(null);
    setHistoryEvent(null);
    setDeletingId(null);
    setNotice("");
    setEditor((current) => (current?.id === event.id ? null : event));
  }

  function openScheduleAction(event, action) {
    if (busy || !confirmExit()) return;
    setEditor(null);
    setHistoryEvent(null);
    setDeletingId(null);
    setNotice("");
    setOperation((current) =>
      current?.event.id === event.id && current?.action === action
        ? null
        : { event, action },
    );
  }

  function openHistory(event) {
    if (busy || !confirmExit()) return;
    setEditor(null);
    setOperation(null);
    setDeletingId(null);
    setHistoryEvent((current) => (current?.id === event.id ? null : event));
  }

  function openDeleteConfirm(event) {
    if (busy || !confirmExit()) return;
    setEditor(null);
    setOperation(null);
    setHistoryEvent(null);
    setNotice("");
    setDeletingId((current) => (current === event.id ? null : event.id));
  }

  async function togglePublication(event) {
    if (busy || !confirmExit()) return;
    if (
      event.published &&
      !window.confirm(
        `¿Retirar «${event.title}» de la web? Pasará a la pestaña Borradores, donde podrás editarlo, volver a publicarlo o eliminarlo.`,
      )
    )
      return;
    setBusy(true);
    setActionError("");
    setNotice("");
    try {
      await setPublication(event);
      setNotice(
        event.published
          ? "Evento retirado a Borradores. Desde ahí puedes editarlo, volver a publicarlo o eliminarlo."
          : "Evento publicado en la web.",
      );
      if (scope !== "all" && list?.events.length === 1 && page > 1) {
        closePanels();
        setPage((current) => current - 1);
      } else {
        refresh();
      }
    } catch (failure) {
      setActionError(failure.message);
    } finally {
      setBusy(false);
    }
  }

  async function confirmDelete(event) {
    if (busy) return;
    setBusy(true);
    setActionError("");
    setNotice("");
    try {
      await deleteEvent(event);
      setNotice(`Borrador «${event.title}» eliminado definitivamente.`);
      if (list?.events.length === 1 && page > 1) {
        closePanels();
        setPage((current) => current - 1);
      } else {
        refresh();
      }
    } catch (failure) {
      setActionError(failure.message);
    } finally {
      setBusy(false);
    }
  }

  return {
    scope,
    page,
    list,
    counts,
    editor,
    operation,
    historyEvent,
    deletingId,
    busy,
    error,
    notice,
    setNotice,
    setEditor,
    setOperation,
    setHistoryEvent,
    setDeletingId,
    refresh,
    selectTab,
    goToPage,
    openNewEvent,
    openEditEvent,
    openScheduleAction,
    openHistory,
    openDeleteConfirm,
    togglePublication,
    confirmDelete,
  };
}
