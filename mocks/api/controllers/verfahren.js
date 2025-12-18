import { verfahrenMockData } from "../data/verfahren.js";

export const getAllVerfahren = () => {
  return verfahrenMockData;
};

export const getVerfahrenById = (id) => {
  return verfahrenMockData.find((verfahren) => verfahren.id === id);
};

export const filterVerfahrenByGericht = (verfahren, gerichtId) => {
  const filteredVerfahren = verfahren.filter((v) => v.gericht.id === gerichtId);
  return filteredVerfahren;
};

export const searchVerfahren = (verfahren, searchParam) => {
  let filteredVerfahren = [...verfahren];
  const matchesString = (val) =>
    typeof val === "string" &&
    val.toLowerCase().includes(searchParam.toLowerCase());

  filteredVerfahren = filteredVerfahren.filter((verfahren) => {
    // Top-level string fields
    if (
      matchesString(verfahren.aktenzeichen_gericht) ||
      matchesString(verfahren.gericht?.wert) ||
      matchesString(verfahren.gericht?.id)
    ) {
      return true;
    }

    // Beteiligungen and nested fields
    return verfahren.beteiligungen?.some((b) => {
      // Beteiligung itself
      if (matchesString(b.name) || matchesString(b.id)) return true;

      // Rollen
      if (b.rollen?.some((r) => matchesString(r.id))) return true;

      // Prozessbevollmaechtigte
      return b.prozessbevollmaechtigte?.some((p) => {
        const bev = p.bevollmaechtigter;
        return (
          matchesString(p.aktenzeichen) ||
          matchesString(bev?.id) ||
          matchesString(bev?.safe_id) ||
          matchesString(bev?.name)
        );
      });
    });
  });
  return filteredVerfahren;
};

export const sortVerfahren = (verfahren, sortParam) => {
  let sortedVerfahren = [...verfahren];
  const isDescending = sortParam.startsWith("-");
  const sortField = isDescending ? sortParam.slice(1) : sortParam;

  sortedVerfahren.sort((a, b) => {
    if (a[sortField] < b[sortField]) return isDescending ? 1 : -1;
    if (a[sortField] > b[sortField]) return isDescending ? -1 : 1;
    return 0;
  });
  return sortedVerfahren;
};

export const paginateVerfahren = (verfahren, offsetParam, limitParam) => {
  const total = verfahren.length;
  let pagedVerfahren = [...verfahren];

  const offsetNum = offsetParam ? Number.parseInt(offsetParam, 10) || 0 : 0;
  const limitNum = limitParam
    ? Number.parseInt(limitParam, 10) || total
    : total;

  pagedVerfahren = pagedVerfahren.slice(offsetNum, offsetNum + limitNum);
  return pagedVerfahren;
};
