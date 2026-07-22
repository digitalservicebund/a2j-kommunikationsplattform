import {
  mockedEinreichungen,
  mockedEinreichungenStatus,
} from "../data/einreichungen.js";

export const einreichungenStore = [...mockedEinreichungen];

export const getAllEinreichungen = () => {
  return einreichungenStore;
};

export const getEinreichungById = (verfahrenId, einreichungId) => {
  const einreichung = einreichungenStore.find(
    (e) => e.verfahren_id === verfahrenId && e.id === einreichungId,
  );
  if (einreichung) {
    return einreichung;
  } else {
    return einreichungenStore.at(-1);
  }
};

export const getEinreichungStatusByIds = (verfahrenId, einreichungId) => {
  const einreichungStatus = mockedEinreichungenStatus.find(
    (e) => e.verfahren_id === verfahrenId && e.id === einreichungId,
  );

  if (einreichungStatus) {
    return einreichungStatus.status;
  } else {
    return mockedEinreichungenStatus.at(0).status;
  }
};
