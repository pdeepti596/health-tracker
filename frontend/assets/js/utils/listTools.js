export function makeSearchHaystack(obj, fields) {
  return (fields || [])
    .map((f) => String(obj?.[f] ?? ""))
    .join(" ")
    .toLowerCase();
}

export function filterList(list, query, fields) {
  const q = (query ?? "").trim().toLowerCase();
  if (!q) return [...(list || [])];

  return (list || []).filter((item) => {
    const haystack = makeSearchHaystack(item, fields);
    return haystack.includes(q);
  });
}

export function sortList(list, sortKey, sortDir = "asc") {
  const dir = sortDir === "desc" ? -1 : 1;
  const arr = [...(list || [])];

  arr.sort((a, b) => {
    let av = a?.[sortKey];
    let bv = b?.[sortKey];

    if (av == null && bv == null) return 0;
    if (av == null) return -1 * dir;
    if (bv == null) return 1 * dir;

    const an = Number(av);
    const bn = Number(bv);
    const bothNumeric = !Number.isNaN(an) && !Number.isNaN(bn);

    if (bothNumeric) {
      return (an - bn) * dir;
    }

    const ad = Date.parse(av);
    const bd = Date.parse(bv);
    if (!Number.isNaN(ad) && !Number.isNaN(bd)) {
      return (ad - bd) * dir;
    }

    return String(av).localeCompare(String(bv)) * dir;
  });

  return arr;
}
