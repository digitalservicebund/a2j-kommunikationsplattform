import type { Dokument } from "~/domains/verfahren/entities/dokument/dokument.entity";
import type { Einreichung } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import type { Validierungsstatus } from "~/domains/verfahren/entities/validierungsstatus/validierungsstatus.entity";
import type { Verfahren } from "~/domains/verfahren/entities/verfahren/verfahren.entity";
import isKlageeinreichung from "~/domains/verfahren/services/isKlageeinreichung";
import { AuthSession } from "~/services/auth/auth.types";
import loadVerfahrenEinreichungenOverview from "./loadVerfahrenEinreichungenOverview.server";

export type { Dokument, Einreichung, Verfahren };
export type EinreichungStatus = Validierungsstatus;
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
  authSession: AuthSession,
  verfahrenId: string,
): Promise<VerfahrenEinreichungBundle> {
  const { verfahren, einreichungen } = await loadVerfahrenEinreichungenOverview(
    authSession,
    verfahrenId,
  );
  // A Verfahren can also hold Weitere Einreichungen, and the API's list order
  // isn't guaranteed — so pick the Klageeinreichung by name, not by position.
  const klageeinreichungData = einreichungen.find(({ einreichung }) =>
    isKlageeinreichung(einreichung),
  );

  if (!klageeinreichungData) {
    throw new Error("No Einreichung could be fetched");
  }

  return {
    verfahren,
    einreichung: klageeinreichungData.einreichung,
    dokumente: klageeinreichungData.dokumente,
    einreichungId: klageeinreichungData.einreichung.id,
  };
}
