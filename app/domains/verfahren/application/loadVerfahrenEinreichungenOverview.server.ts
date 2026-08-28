import { fetchDokumente } from "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server";
import {
  fetchEinreichungenById,
  fetchEinreichungStatus,
} from "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server";
import { fetchVerfahrenById } from "~/domains/verfahren/infrastructure/repositories/verfahrenRepository.server";
import { AuthenticationResponse } from "~/services/auth/auth.types";
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
  const verfahren = await fetchVerfahrenById(authData, {
    id: verfahrenId,
  });

  const { elemente: einreichungenList } = await fetchEinreichungenById(
    authData,
    { id: verfahrenId },
  );

  console.log("einreichungenList", einreichungenList);

  const einreichungen = await Promise.all(
    einreichungenList.map(async (einreichung) => {
      const einreichungsStatus: EinreichungStatus =
        await fetchEinreichungStatus(authData, {
          id: einreichung.id,
          verfahrenId,
        });

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
