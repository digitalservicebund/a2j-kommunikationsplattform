import { describe, expect, it } from "vitest";
import {
  DokumentErstellenResponseSchema,
  DokumentSchema,
} from "../dokument.schema";

describe("DokumentSchema", () => {
  it("maps the snake_case API response to the camelCase domain shape", () => {
    const apiResponse = {
      id: "d-1",
      status: "ERSTELLT",
      validierungslauf_status: "ABGESCHLOSSEN",
      dateiname: "klage.pdf",
      anzeigename: "Klageschrift.pdf",
      size_in_bytes: 1234,
      content_type: "application/pdf",
      hash: "abc123",
      hash_algorithmus: "SHA3-384",
      typ: "SCHRIFTSTUECK",
      gesendet_am: null,
      eingereicht_am: null,
      erstellt_von: "DE.BRAK.1234",
      erstellt_am: "2026-07-22T10:00:00.000Z",
      sichtbarkeit_alle: true,
    };

    expect(DokumentSchema.parse(apiResponse)).toEqual({
      id: "d-1",
      status: "ERSTELLT",
      validierungslaufStatus: "ABGESCHLOSSEN",
      dateiname: "klage.pdf",
      anzeigename: "Klageschrift.pdf",
      sizeInBytes: 1234,
      contentType: "application/pdf",
      hash: "abc123",
      hashAlgorithmus: "SHA3-384",
      typ: "SCHRIFTSTUECK",
      gesendetAm: null,
      eingereichtAm: null,
      erstelltVon: "DE.BRAK.1234",
      erstelltAm: "2026-07-22T10:00:00.000Z",
      sichtbarkeitAlle: true,
    });
  });

  it("allows the file-derived fields to be missing while status is ANGELEGT (no binary content uploaded yet)", () => {
    const apiResponse = {
      id: "d-1",
      status: "ANGELEGT",
      validierungslauf_status: "AUSSTEHEND",
      anzeigename: "Klageschrift.pdf",
      typ: "SCHRIFTSTUECK",
      gesendet_am: null,
      eingereicht_am: null,
      erstellt_von: "DE.BRAK.1234",
      erstellt_am: "2026-07-22T10:00:00.000Z",
      sichtbarkeit_alle: true,
    };

    const result = DokumentSchema.parse(apiResponse);

    expect(result.dateiname).toBeUndefined();
    expect(result.sizeInBytes).toBeUndefined();
    expect(result.contentType).toBeUndefined();
    expect(result.hash).toBeUndefined();
    expect(result.hashAlgorithmus).toBeUndefined();
  });
});

describe("DokumentErstellenResponseSchema", () => {
  it("maps the snake_case create-metadata response to the camelCase domain shape", () => {
    const apiResponse = {
      id: "d-1",
      status: "ANGELEGT",
      anzeigename: "test.txt",
      typ: "ANHANG",
      erstellt_von: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
      erstellt_am: "2026-03-08T05:00:29.659Z",
      sichtbarkeit_alle: true,
    };

    expect(DokumentErstellenResponseSchema.parse(apiResponse)).toEqual({
      id: "d-1",
      status: "ANGELEGT",
      anzeigename: "test.txt",
      typ: "ANHANG",
      erstelltVon: "DE.BRAK.bdda0cd6-ccdd-44a1-a42c-f13ced17235b.334d",
      erstelltAm: "2026-03-08T05:00:29.659Z",
      sichtbarkeitAlle: true,
    });
  });
});
