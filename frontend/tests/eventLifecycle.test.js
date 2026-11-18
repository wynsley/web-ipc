import assert from "node:assert/strict";
import { test } from "node:test";
import {
  eventEndTime,
  partitionEvents,
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
