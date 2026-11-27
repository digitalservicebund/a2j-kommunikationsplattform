import { fetchDokumente } from "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server";
import {
  fetchEinreichungenById,
  fetchEinreichungValidierungsstatus,
} from "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server";
import { fetchVerfahrenById } from "~/domains/verfahren/infrastructure/repositories/verfahrenRepository.server";
import { AuthSession } from "~/services/auth/auth.types";
import { logger } from "~/utils/logger.server";
import { Validierungsstatus } from "../entities/validierungsstatus/validierungsstatus.entity";
import type {
  Dokument,
  EinreichungWithValidierungsstatusDetails,
  Verfahren,
} from "./loadVerfahrenEinreichungBundle.server";

export type EinreichungSummary = {
  einreichung: EinreichungWithValidierungsstatusDetails;
  dokumente: Dokument[];
};

export type VerfahrenEinreichungenOverview = {
  verfahren: Verfahren;
  einreichungen: EinreichungSummary[];
};

export default async function loadVerfahrenEinreichungenOverview(
  authSession: AuthSession,
  verfahrenId: string,
): Promise<VerfahrenEinreichungenOverview> {
  const verfahren = await fetchVerfahrenById(authSession, {
    id: verfahrenId,
  });

  const { elemente: einreichungenList } = await fetchEinreichungenById(
    authSession,
    {
      id: verfahrenId,
    },
  );

  logger.debug({ einreichungenList }, "Fetched Einreichungen list");

  const einreichungen = await Promise.all(
    einreichungenList.map(async (einreichung) => {
      const validierungsstatus: Validierungsstatus =
        await fetchEinreichungValidierungsstatus(authSession, {
          id: einreichung.id,
          verfahrenId,
        });

      const { elemente: dokumente } = await fetchDokumente(authSession, {
        verfahrenId,
        einreichungId: einreichung.id,
      });

      return {
        einreichung: {
          ...einreichung,
          validierungsstatusDetails: validierungsstatus,
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
