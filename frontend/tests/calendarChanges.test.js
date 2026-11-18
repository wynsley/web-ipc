import assert from "node:assert/strict";
import { test } from "node:test";
import { buildIcs, buildGoogleCalendarUrl } from "../utils/calendarLinks.js";
test("Calendarios omiten eventos sin horario vigente e incluyen aviso de copia", () => {
  const base = {
    id: "event",
    title: "Conferencia",
    date: "2030-01-01T10:00:00Z",
    endDate: "2030-01-01T12:00:00Z",
  };
  const text = buildIcs([
    { ...base, status: "scheduled" },
    { ...base, id: "cancel", status: "cancelled" },
    { ...base, id: "postpone", status: "postponed" },
  ]);
  assert.equal((text.match(/BEGIN:VEVENT/g) || []).length, 1);
  assert.match(text.replace(/\r\n /g, ""), /no se actualiza automáticamente/);
  assert.throws(() => buildGoogleCalendarUrl({ ...base, status: "cancelled" }));
});
