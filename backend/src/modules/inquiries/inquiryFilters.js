export const inquiryOrderBy = [{ createdAt: "desc" }, { id: "desc" }];

export function buildInquiryWhere(query, actorAdminId) {
  const filters = [];
  if (query.status !== "all") filters.push({ status: query.status });
  if (query.career !== "all") filters.push({ career: query.career });
  if (query.shift !== "all") filters.push({ shift: query.shift });
  if (query.assigned === "unassigned") {
    filters.push({ assignedToId: null });
  } else if (query.assigned === "mine") {
    filters.push({ assignedToId: actorAdminId });
  } else if (query.assigned !== "all") {
    filters.push({ assignedToId: query.assigned });
  }
  if (query.q) {
    filters.push({
      OR: [
        { name: { contains: query.q, mode: "insensitive" } },
        { email: { contains: query.q, mode: "insensitive" } },
        { phone: { contains: query.q, mode: "insensitive" } },
        { message: { contains: query.q, mode: "insensitive" } },
      ],
    });
  }
  return filters.length ? { AND: filters } : {};
}
