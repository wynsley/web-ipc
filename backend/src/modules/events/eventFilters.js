export const defaultEventOrder = [{ startsAt: "asc" }, { id: "asc" }];
export const pastEventOrder = [{ startsAt: "desc" }, { id: "desc" }];

export function startOfLimaDay(ms) {
  const limaDay = new Date(ms - 5 * 3600000).toISOString().slice(0, 10);
  return new Date(limaDay + "T05:00:00.000Z");
}

export function pastPublishedWhere(now) {
  const legacyCutoff = startOfLimaDay(now.getTime() + 1);
  return {
    published: true,
    status: "scheduled",
    OR: [{ endsAt: { lte: now } }, { endsAt: null, startsAt: { lt: legacyCutoff } }],
  };
}

export function activePublishedWhere(now) {
  const legacyCutoff = startOfLimaDay(now.getTime() + 1);
  return {
    published: true,
    OR: [
      { status: { not: "scheduled" } },
      { endsAt: { gt: now } },
      { endsAt: null, startsAt: { gte: legacyCutoff } },
    ],
  };
}

export function adminEventScope(scope, now) {
  const active = activePublishedWhere(now);
  const past = pastPublishedWhere(now);
  const drafts = { published: false };
  const where =
    scope === "published" ? active : scope === "drafts" ? drafts : scope === "past" ? past : {};
  const orderBy = scope === "past" ? pastEventOrder : defaultEventOrder;
  return { where, orderBy, active, drafts, past };
}
