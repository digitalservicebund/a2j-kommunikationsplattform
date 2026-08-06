import z from "zod";
import { ValidierungsstatusSchema } from "~/domains/verfahren/schemas/validierungsStatusSchema";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import loadVerfahrenEinreichungenOverview from "./loadVerfahrenEinreichungenOverview.server";
import { DokumentSchema } from "./schemas/dokumentSchema";
import { EinreichungSchema } from "./schemas/einreichungSchema";
import { VerfahrenSchema } from "./schemas/verfahrenSchema";

export type Verfahren = z.infer<typeof VerfahrenSchema>;
export type Einreichung = z.infer<typeof EinreichungSchema>;
export type EinreichungStatus = z.infer<typeof ValidierungsstatusSchema>;
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
