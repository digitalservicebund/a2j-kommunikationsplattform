import { mockedDokumente } from "../data/dokumente.js";

export const dokumenteStore = [...mockedDokumente];

export const getAllDokumenteByIds = (verfahrenId, einreichungId) => {
  const dokumente = dokumenteStore.find(
    (d) => d.verfahren_id === verfahrenId && d.id === einreichungId,
  );
  return dokumente ? dokumente.dokumente : [];
};

export const getDokumentById = (verfahrenId, einreichungId, dokumentId) => {
  let dokument = {};
  const findDokumente = dokumenteStore.find(
    (d) => d.verfahren_id === verfahrenId && d.id === einreichungId,
  );
  if (findDokumente?.dokumente) {
    dokument = findDokumente.dokumente.find((d) => d.id === dokumentId);
  }
  return dokument;
};

export const deleteDokument = (verfahrenId, einreichungId, dokumentId) => {
  const dokumenteEntry = dokumenteStore.find(
    (entry) => entry.verfahren_id === verfahrenId && entry.id === einreichungId,
  );

  if (!dokumenteEntry?.dokumente) {
    return;
  }

  const dokumentIndex = dokumenteEntry.dokumente.findIndex(
    (dokument) => dokument.id === dokumentId,
  );

  if (dokumentIndex === -1) {
    return;
  }

  dokumenteEntry.dokumente.splice(dokumentIndex, 1);
};
