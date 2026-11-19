import assert from "node:assert/strict";
import { test } from "node:test";
import { buildPaginationRange } from "../src/helpers/paginationRange.js";

test("buildPaginationRange muestra todas las páginas hasta 10 sin elipsis", () => {
  assert.deepEqual(buildPaginationRange(1, 1), [1]);
  assert.deepEqual(buildPaginationRange(2, 5), [1, 2, 3, 4, 5]);
  assert.deepEqual(buildPaginationRange(4, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test("buildPaginationRange nunca sustituye una sola página por puntos suspensivos", () => {
  assert.deepEqual(buildPaginationRange(1, 11), [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  ]);
});

test("buildPaginationRange usa puntos suspensivos y las 3 últimas páginas al inicio, centro y final", () => {
  assert.deepEqual(buildPaginationRange(2, 25), [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    "ellipsis-7",
    23,
    24,
    25,
  ]);

  assert.deepEqual(buildPaginationRange(12, 25), [
    1,
    2,
    "ellipsis-2",
    10,
    11,
    12,
    13,
    14,
    "ellipsis-7",
    23,
    24,
    25,
  ]);

  assert.deepEqual(buildPaginationRange(24, 25), [
    1,
    2,
    3,
    "ellipsis-3",
    19,
    20,
    21,
    22,
    23,
    24,
    25,
  ]);
});
