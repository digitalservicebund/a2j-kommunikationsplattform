import { Dokument } from "~/domains/verfahren/entities/dokument/dokument.entity";

export function makeDokument(params: Partial<Dokument> = {}): Dokument {
  return {
    id: "dok-1",
    status: "ERSTELLT",
    validierungslaufStatus: "AUSSTEHEND",
    dateiname: "klage.pdf",
    anzeigename: "Klage.pdf",
    sizeInBytes: 1024,
    contentType: "application/pdf",
    hash: "hash",
    hashAlgorithmus: "SHA-256",
    typ: "SCHRIFTSTUECK",
    gesendetAm: null,
    eingereichtAm: null,
    erstelltVon: "user-1",
    erstelltAm: "2026-01-01T00:00:00.000Z",
    sichtbarkeitAlle: true,
    ...params,
  };
}
