import z from "zod";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import fetchDokumente from "./fetchDokumente";
import fetchEinreichungById from "./fetchEinreichungById.server";
import fetchEinreichungenById from "./fetchEinreichungenById.server";
import fetchEinreichungStatus from "./fetchEinreichungStatus.server";
import fetchVerfahrenById from "./fetchVerfahrenById.server";
import { DokumentSchema } from "./schemas/dokumentSchema";
import { EinreichungSchema } from "./schemas/einreichungSchema";
import { StatusSchema } from "./schemas/statusSchema";
import { VerfahrenSchema } from "./schemas/verfahrenSchema";

export type Verfahren = z.infer<typeof VerfahrenSchema>;
export type Einreichung = z.infer<typeof EinreichungSchema>;
export type EinreichungStatus = z.infer<typeof StatusSchema>;
export type Dokument = z.infer<typeof DokumentSchema>;
export type EinreichungWithStatus = Einreichung & {
  einreichungsStatus: EinreichungStatus;
};

export type VerfahrenEinreichungBundle = {
  verfahren: Verfahren;
  einreichung: EinreichungWithStatus;
  dokumente: Dokument[];
  einreichungId: string;
};

export default async function loadVerfahrenEinreichungBundle(
  authData: AuthenticationResponse,
  verfahrenId: string,
): Promise<VerfahrenEinreichungBundle> {
  const verfahren = (await fetchVerfahrenById(authData, {
    id: verfahrenId,
  })) as Verfahren;

  const einreichungen = (await fetchEinreichungenById(authData, {
    id: verfahrenId,
  })) as Einreichung[];
  const firstEinreichungId = einreichungen[0]?.id;

  if (!firstEinreichungId) {
    throw new Error("No Einreichung could be fetched");
  }

  const einreichung = (await fetchEinreichungById(authData, {
    id: firstEinreichungId,
    verfahrenId,
  })) as Einreichung;

  const einreichungsStatus = (await fetchEinreichungStatus(authData, {
    id: firstEinreichungId,
    verfahrenId,
  })) as EinreichungStatus;

  const dokumente = (await fetchDokumente(authData, {
    einreichungId: firstEinreichungId,
    verfahrenId,
  })) as Dokument[];

  return {
    verfahren,
    einreichung: {
      ...einreichung,
      einreichungsStatus,
    },
    dokumente,
    einreichungId: firstEinreichungId,
  };
}
