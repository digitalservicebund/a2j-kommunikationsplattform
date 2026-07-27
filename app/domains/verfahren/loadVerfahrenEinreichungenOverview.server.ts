import { AuthenticationResponse } from "~/services/auth/auth.types";
import fetchDokumente from "./fetchDokumente";
import fetchEinreichungenById from "./fetchEinreichungenById.server";
import fetchEinreichungStatus from "./fetchEinreichungStatus.server";
import fetchVerfahrenById from "./fetchVerfahrenById.server";
import type {
  Dokument,
  Einreichung,
  EinreichungStatus,
  EinreichungWithStatus,
  Verfahren,
} from "./loadVerfahrenEinreichungBundle.server";

export type EinreichungSummary = {
  einreichung: EinreichungWithStatus;
  dokumente: Dokument[];
};

export type VerfahrenEinreichungenOverview = {
  verfahren: Verfahren;
  einreichungen: EinreichungSummary[];
};

export default async function loadVerfahrenEinreichungenOverview(
  authData: AuthenticationResponse,
  verfahrenId: string,
): Promise<VerfahrenEinreichungenOverview> {
  const verfahren = (await fetchVerfahrenById(authData, {
    id: verfahrenId,
  })) as Verfahren;

  const fetchedEinreichungen = (await fetchEinreichungenById(authData, {
    id: verfahrenId,
  })) as Einreichung[];

  const matchingEinreichungen = fetchedEinreichungen.filter(
    (einreichung) => einreichung.verfahren_id === verfahrenId,
  );

  if (matchingEinreichungen.length === 0) {
    throw new Error("No Einreichung could be fetched");
  }

  const einreichungen = await Promise.all(
    matchingEinreichungen.map(async (einreichung) => {
      const einreichungsStatus = (await fetchEinreichungStatus(authData, {
        id: einreichung.id,
        verfahrenId: einreichung.verfahren_id,
      })) as EinreichungStatus;

      const dokumente = (await fetchDokumente(authData, {
        verfahrenId: einreichung.verfahren_id,
        einreichungId: einreichung.id,
      })) as Dokument[];

      return {
        einreichung: {
          ...einreichung,
          einreichungsStatus,
        },
        dokumente,
      };
    }),
  );

  return {
    verfahren,
    einreichungen,
  };
}
