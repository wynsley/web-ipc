import { z } from "zod";

export const auditOrderBy = [{ createdAt: "desc" }, { id: "desc" }];

const uuidValidator = z.uuid();

export function buildAuditWhere(query) {
  const filters = [];

  if (query.category !== "all") {
    filters.push({ action: { startsWith: query.category + "." } });
  }

  if (query.actor === "system") {
    filters.push({ actorId: null });
  } else if (query.actor !== "all") {
    filters.push({ actorId: query.actor });
  }

  if (query.from) {
    filters.push({ createdAt: { gte: new Date(query.from + "T00:00:00.000-05:00") } });
  }

  if (query.to) {
    filters.push({ createdAt: { lte: new Date(query.to + "T23:59:59.999-05:00") } });
  }

  if (query.q) {
    const orFilters = [
      { action: { contains: query.q, mode: "insensitive" } },
      { requestId: { contains: query.q, mode: "insensitive" } },
    ];
    if (uuidValidator.safeParse(query.q).success) {
      orFilters.push({ targetId: query.q }, { actorId: query.q });
    }
    filters.push({ OR: orFilters });
  }

  return filters.length ? { AND: filters } : {};
}
