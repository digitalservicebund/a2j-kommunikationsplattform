import type { Dokument } from "~/domains/verfahren/entities/dokument/dokument.entity";
import type { Einreichung } from "~/domains/verfahren/entities/einreichung/einreichung.entity";
import type { Validierungsstatus } from "~/domains/verfahren/entities/validierungsstatus/validierungsstatus.entity";
import type { Verfahren } from "~/domains/verfahren/entities/verfahren/verfahren.entity";
import { AuthenticationResponse } from "~/services/auth/auth.types";
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
  authData: AuthenticationResponse,
  verfahrenId: string,
): Promise<VerfahrenEinreichungBundle> {
  const { verfahren, einreichungen } = await loadVerfahrenEinreichungenOverview(
    authData,
    verfahrenId,
  );
  const initialEinreichungData = einreichungen[0];

  if (!initialEinreichungData) {
    throw new Error("No Einreichung could be fetched");
  }

  return {
    verfahren,
    einreichung: initialEinreichungData.einreichung,
    dokumente: initialEinreichungData.dokumente,
    einreichungId: initialEinreichungData.einreichung.id,
  };
}
