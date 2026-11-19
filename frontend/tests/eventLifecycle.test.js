import assert from "node:assert/strict";
import { test } from "node:test";
import {
  CANCELLED_NOTICE_GRACE_MS,
  POSTPONED_NOTICE_GRACE_MS,
  eventEndTime,
  nextLifecycleBoundary,
  noticeExpiresAt,
  partitionEvents,
  visibleEventNotices,
} from "../src/helpers/eventLifecycle.js";
test("Un evento pasa a recuerdos al finalizar, no al comenzar", () => {
  const event = {
    id: "a",
    startsAt: "2030-01-01T10:00:00-05:00",
    endsAt: "2030-01-03T18:00:00-05:00",
  };
  assert.equal(
    partitionEvents([event], Date.parse("2030-01-02T12:00:00-05:00")).active
      .length,
    1,
  );
  assert.equal(
    partitionEvents([event], Date.parse(event.endsAt)).past.length,
    1,
  );
});
test("Eventos anteriores sin fin duran hasta terminar su día en Lima", () => {
  const event = { startsAt: "2030-01-02T03:00:00Z" };
  assert.equal(eventEndTime(event), Date.parse("2030-01-02T04:59:59.999Z"));
  assert.equal(
    partitionEvents([event], Date.parse("2030-01-02T04:00:00Z")).past.length,
    0,
  );
});

test("Pospuestos y cancelados no pasan al histórico aunque sus fechas vencieran", () => {
  const events = ["postponed", "cancelled"].map((status, i) => ({
    id: i,
    status,
    startsAt: "2020-01-01T10:00:00Z",
    endsAt: "2020-01-01T12:00:00Z",
  }));
  const groups = partitionEvents(events, Date.now());
  assert.equal(groups.active.length, 0);
  assert.equal(groups.past.length, 0);
  assert.equal(groups.exceptions.length, 2);
});

test("nextLifecycleBoundary devuelve el próximo inicio, cierre o vencimiento de aviso", () => {
  const events = [
    {
      id: "cancelled",
      status: "cancelled",
      startsAt: "2030-01-01T08:00:00Z",
      endsAt: "2030-01-01T09:00:00Z",
    },
    {
      id: "ongoing",
      status: "scheduled",
      startsAt: "2030-01-01T09:00:00Z",
      endsAt: "2030-01-01T12:00:00Z",
    },
    {
      id: "upcoming",
      status: "scheduled",
      startsAt: "2030-01-01T11:00:00Z",
      endsAt: "2030-01-01T13:00:00Z",
    },
  ];
  assert.equal(
    nextLifecycleBoundary(events, Date.parse("2030-01-01T10:00:00Z")),
    Date.parse("2030-01-01T11:00:00Z"),
  );
  assert.equal(
    nextLifecycleBoundary(events, Date.parse("2030-01-01T11:00:00Z")),
    Date.parse("2030-01-01T12:00:00Z"),
  );
  assert.equal(
    nextLifecycleBoundary(events, Date.parse("2030-01-01T13:00:00Z")),
    Date.parse("2030-01-02T09:00:00Z"),
  );
  assert.equal(
    nextLifecycleBoundary(events, Date.parse("2030-01-02T09:00:00Z")),
    null,
  );
});

test("visibleEventNotices oculta reprogramados al terminar, cancelados tras 24h y pospuestos tras 7d", () => {
  const baseEnd = Date.parse("2030-06-10T18:00:00Z");
  const rescheduled = {
    id: "r1",
    status: "scheduled",
    scheduleNotice: "Nuevo horario por disponibilidad",
    startsAt: "2030-06-10T16:00:00Z",
    endsAt: "2030-06-10T18:00:00Z",
  };
  const cancelled = {
    id: "c1",
    status: "cancelled",
    scheduleNotice: "Suspendido por clima",
    startsAt: "2030-06-10T16:00:00Z",
    endsAt: "2030-06-10T18:00:00Z",
  };
  const postponed = {
    id: "p1",
    status: "postponed",
    scheduleNotice: "Nueva fecha por confirmar",
    startsAt: "2030-06-10T16:00:00Z",
    endsAt: "2030-06-10T18:00:00Z",
  };
  const all = [rescheduled, postponed, cancelled];

  // Antes de terminar: los tres aparecen ordenados por prioridad (cancelado -> pospuesto -> reprogramado)
  assert.deepEqual(
    visibleEventNotices(all, baseEnd - 1000).map((e) => e.id),
    ["c1", "p1", "r1"],
  );
  // Al terminar el evento: el reprogramado desaparece al instante; cancelado y pospuesto siguen visibles
  assert.deepEqual(
    visibleEventNotices(all, baseEnd).map((e) => e.id),
    ["c1", "p1"],
  );
  // 23h después: cancelado sigue visible; al cumplir 24h desaparece automáticamente
  assert.deepEqual(
    visibleEventNotices(all, baseEnd + CANCELLED_NOTICE_GRACE_MS - 1000).map(
      (e) => e.id,
    ),
    ["c1", "p1"],
  );
  assert.deepEqual(
    visibleEventNotices(all, baseEnd + CANCELLED_NOTICE_GRACE_MS).map(
      (e) => e.id,
    ),
    ["p1"],
  );
  // Al cumplir 7 días: pospuesto también deja de mostrarse en el aviso público
  assert.deepEqual(
    visibleEventNotices(all, baseEnd + POSTPONED_NOTICE_GRACE_MS),
    [],
  );
  assert.equal(noticeExpiresAt(cancelled), baseEnd + CANCELLED_NOTICE_GRACE_MS);
  // nextLifecycleBoundary programa la expiración automática de un aviso cancelado
  assert.equal(
    nextLifecycleBoundary([cancelled], baseEnd + 1000),
    baseEnd + CANCELLED_NOTICE_GRACE_MS,
  );
});
