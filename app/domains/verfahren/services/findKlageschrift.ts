import type { Dokument } from "~/domains/verfahren/entities/dokument/dokument.entity";

// The Klageschrift is the Klageeinreichung's only Schriftstück (Anlagen can't
// be uploaded as Schriftstück). The Einreichung also holds the XJustiz-Dokument
// and any Anlagen, so it's looked up by type rather than by position.
export default function findKlageschrift<T extends Pick<Dokument, "typ">>(
  dokumente: readonly T[],
): T | undefined {
  return dokumente.find((dokument) => dokument.typ === "SCHRIFTSTUECK");
}
