import z from "zod";
import { ValidierungslaufStatusSchema } from "~/domains/verfahren/entities/validierungsstatus/validierungsstatus.entity";

export const DokumentTypeSchema = z.enum([
  "XJUSTIZ",
  "ANHANG",
  "SCHRIFTSTUECK",
  "SIGNATURDATEI",
]);

export type DokumentType = z.infer<typeof DokumentTypeSchema>;

export const DokumentStatusSchema = z.enum([
  "ERSTELLT",
  "EINGEREICHT",
  "VERSENDET",
  "VERAKTET",
  "NICHT_EINGEREICHT",
  "GELOESCHT",
]);

export type DokumentStatus = z.infer<typeof DokumentStatusSchema>;

/**
 * Dokument — domain shape (camelCase). Mirrors the wire contract defined in
 * infrastructure/schemas/dokument.schema.ts, which is responsible for
 * mapping the API's snake_case response into this shape.
 */
export const DokumentSchema = z.object({
  id: z.string(),
  status: DokumentStatusSchema,
  validierungslaufStatus: ValidierungslaufStatusSchema,
  dateiname: z.string(),
  anzeigename: z.string(),
  sizeInBytes: z.number(),
  contentType: z.string(),
  hash: z.string(),
  hashAlgorithmus: z.string(),
  typ: DokumentTypeSchema,
  gesendetAm: z.nullable(z.string()),
  eingereichtAm: z.nullable(z.string()),
  erstelltVon: z.string(),
  erstelltAm: z.string(),
  sichtbarkeitAlle: z.boolean(),
});

export type Dokument = z.infer<typeof DokumentSchema>;

/**
 * DokumentErstellenResponse — domain shape (camelCase) for the result of
 * uploading (creating) a Dokument. Unlike Dokument, it has no
 * validierungslaufStatus/gesendetAm/eingereichtAm yet, since validation and
 * submission haven't happened at creation time.
 */
export const DokumentErstellenResponseSchema = z.object({
  id: z.string(),
  status: DokumentStatusSchema,
  dateiname: z.string(),
  anzeigename: z.string(),
  sizeInBytes: z.number(),
  contentType: z.string(),
  hash: z.string(),
  hashAlgorithmus: z.string(),
  typ: DokumentTypeSchema,
  // TODO: remove the nullable part after confirming it with SINC
  erstelltVon: z.nullable(z.string()),
  erstelltAm: z.string(),
  sichtbarkeitAlle: z.boolean(),
});

export type DokumentErstellenResponse = z.infer<
  typeof DokumentErstellenResponseSchema
>;
