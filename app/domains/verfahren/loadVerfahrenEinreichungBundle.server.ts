import z from "zod";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import loadVerfahrenEinreichungenOverview from "./loadVerfahrenEinreichungenOverview.server";
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
  const { verfahren, einreichungen } = await loadVerfahrenEinreichungenOverview(
    authData,
    verfahrenId,
  );
  const initialEinreichungSummary = einreichungen[0];

  return {
    verfahren,
    einreichung: initialEinreichungSummary.einreichung,
    dokumente: initialEinreichungSummary.dokumente,
    einreichungId: initialEinreichungSummary.einreichung.id,
  };
}
