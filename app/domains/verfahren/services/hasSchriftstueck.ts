import type { DokumentType } from "~/domains/verfahren/entities/dokument/dokument.entity";

// Every Einreichung needs its Schriftstück before it can be submitted
export default function hasSchriftstueck(
  dokumente: readonly { typ: DokumentType | null }[],
): boolean {
  return dokumente.some(({ typ }) => typ === "SCHRIFTSTUECK");
}
