import z from "zod";
import { DokumentTypeSchema } from "./schemas/dokumentSchema";

type DokumentType = z.infer<typeof DokumentTypeSchema>;

// Schriftstücke (the Klageschrift, and any further Schriftstück a user
// attaches) are part of the substantive filing and must stay in the
// Einreichung — only ancillary files (Anhang, Signaturdatei) and the
// auto-managed XJustiz-Dokument may be deleted.
export default function canDeleteDokument(dokument: {
  typ: DokumentType;
}): boolean {
  return dokument.typ !== "SCHRIFTSTUECK";
}
