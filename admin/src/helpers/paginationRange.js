function addRange(set, start, end, total) {
  const from = Math.max(1, start);
  const to = Math.min(total, end);
  for (let page = from; page <= to; page += 1) set.add(page);
}

export function buildPaginationRange(currentPage, totalPages) {
  const total = Math.max(1, Math.floor(Number(totalPages) || 1));
  const current = Math.min(
    total,
    Math.max(1, Math.floor(Number(currentPage) || 1)),
  );

  if (total <= 10) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const selected = new Set();
  if (current <= 6) {
    addRange(selected, 1, 7, total);
    addRange(selected, total - 2, total, total);
  } else if (current >= total - 5) {
    addRange(selected, 1, 3, total);
    addRange(selected, total - 6, total, total);
  } else {
    addRange(selected, 1, 2, total);
    addRange(selected, current - 2, current + 2, total);
    addRange(selected, total - 2, total, total);
  }

  const sorted = [...selected].sort((a, b) => a - b);
  const items = [];
  for (let index = 0; index < sorted.length; index += 1) {
    const page = sorted[index];
    if (index > 0) {
      const gap = page - sorted[index - 1];
      if (gap === 2) {
        items.push(sorted[index - 1] + 1);
      } else if (gap > 2) {
        items.push(`ellipsis-${index}`);
      }
    }
    items.push(page);
  }

  return items;
}
