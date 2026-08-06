import z from "zod";

/**
 * DokumentSchema
 *
 * See Dokument Schema at: https://app.kompla-justiz.sinc.de/main/swagger/index.html
 */

export const DokumentTypeSchema = z.enum([
  "XJUSTIZ",
  "ANHANG",
  "SCHRIFTSTUECK",
  "SIGNATURDATEI",
]);

export const DokumentStatusSchema = z.enum([
  "ERSTELLT",
  "EINGEREICHT",
  "VERSENDET",
  "VERAKTET",
  "NICHT_EINGEREICHT",
  "GELOESCHT",
]);

export const ValidierungslaufStatusSchema = z.enum([
  "AUSSTEHEND",
  "LAEUFT",
  "ABGESCHLOSSEN",
]);

// Matches DokumentResponse: returned when fetching a single Dokument or a liste of Dokumente.
export const DokumentSchema = z.object({
  id: z.string(),
  status: DokumentStatusSchema,
  validierungslauf_status: ValidierungslaufStatusSchema,
  dateiname: z.string(),
  anzeigename: z.string(),
  size_in_bytes: z.number(),
  content_type: z.string(),
  hash: z.string(),
  hash_algorithmus: z.string(),
  typ: DokumentTypeSchema,
  gesendet_am: z.nullable(z.string()),
  eingereicht_am: z.nullable(z.string()),
  erstellt_von: z.string(),
  erstellt_am: z.string(),
  sichtbarkeit_alle: z.boolean(),
});

export const DokumenteSchema = z.array(DokumentSchema);

// Matches DokumentErstellenResponse: returned when creating (uploading) a Dokument.
// Unlike DokumentSchema, it has no validierungslauf_status/gesendet_am/eingereicht_am yet,
// since validation and submission haven't happened at creation time.
export const DokumentErstellenResponseSchema = z.object({
  id: z.string(),
  status: DokumentStatusSchema,
  dateiname: z.string(),
  anzeigename: z.string(),
  size_in_bytes: z.number(),
  content_type: z.string(),
  hash: z.string(),
  hash_algorithmus: z.string(),
  typ: DokumentTypeSchema,
  erstellt_von: z.string(),
  erstellt_am: z.string(),
  sichtbarkeit_alle: z.boolean(),
});
