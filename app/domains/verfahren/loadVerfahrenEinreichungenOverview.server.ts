import { AuthenticationResponse } from "~/services/auth/auth.types";
import fetchDokumente from "./fetchDokumente";
import fetchEinreichungenById from "./fetchEinreichungenById.server";
import fetchEinreichungStatus from "./fetchEinreichungStatus.server";
import fetchVerfahrenById from "./fetchVerfahrenById.server";
import type {
  Dokument,
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

  const { elemente: einreichungenList } = await fetchEinreichungenById(
    authData,
    { id: verfahrenId },
  );

  console.log("verfahren", einreichungenList);

  const einreichungen = await Promise.all(
    einreichungenList.map(async (einreichung) => {
      const einreichungsStatus = (await fetchEinreichungStatus(authData, {
        id: einreichung.id,
        verfahrenId,
      })) as EinreichungStatus;

      const { elemente: dokumente } = await fetchDokumente(authData, {
        verfahrenId,
        einreichungId: einreichung.id,
      });

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
