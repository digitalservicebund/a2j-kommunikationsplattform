import {
  mockedEinreichungen,
  mockedEinreichungenStatus,
} from "../data/einreichungen.js";

export const getAllEinreichungen = () => {
  return mockedEinreichungen;
};

export const getEinreichungById = (verfahrenId, einreichungId) => {
  const einreichung = mockedEinreichungen.find(
    (e) => e.verfahren_id === verfahrenId && e.id === einreichungId,
  );
  return einreichung;
};

export const getEinreichungStatusByIds = (verfahrenId, einreichungId) => {
  const einreichungStatus = mockedEinreichungenStatus.find(
    (e) => e.verfahren_id === verfahrenId && e.id === einreichungId,
  ).status;
  return einreichungStatus;
};
