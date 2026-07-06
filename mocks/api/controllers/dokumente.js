import { mockedDokumente } from "../data/dokumente.js";

export const getAllDokumenteByIds = (verfahrenId, einreichungId) => {
  const dokumente = mockedDokumente.find(
    (d) => d.verfahren_id === verfahrenId && d.id === einreichungId,
  );
  return dokumente ? dokumente.dokumente : [];
};
