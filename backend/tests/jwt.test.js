import { test } from "node:test";
import { createJwtContext } from "./helpers/jwtContext.js";
import { claimsCases } from "./jwt/claimsCases.js";
import { rotationCases } from "./jwt/rotationCases.js";
import { lifecycleCases } from "./jwt/lifecycleCases.js";
import { csrfCases } from "./jwt/csrfCases.js";

test("JWT y refresh rotativo con PostgreSQL real", async (t) => {
  const context = await createJwtContext();
  try {
    await claimsCases(t, context);
    await rotationCases(t, context);
    await lifecycleCases(t, context);
    await csrfCases(t, context);
  } finally {
    await context.db.$disconnect();
  }
});
