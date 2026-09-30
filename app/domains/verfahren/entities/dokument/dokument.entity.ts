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
  "ANGELEGT",
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
 *
 * dateiname/sizeInBytes/contentType/hash/hashAlgorithmus are only populated
 * once the Dokument's binary content has been uploaded via
 * `PUT .../dokumente/{id}/datei` (status ANGELEGT has none of these yet).
 */
export const DokumentSchema = z.object({
  id: z.string(),
  status: DokumentStatusSchema,
  validierungslaufStatus: ValidierungslaufStatusSchema,
  dateiname: z.nullish(z.string()),
  anzeigename: z.string(),
  sizeInBytes: z.nullish(z.number()),
  contentType: z.nullish(z.string()),
  hash: z.nullish(z.string()),
  hashAlgorithmus: z.nullish(z.string()),
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
 * `POST .../dokumente`, which only creates the Dokument's metadata (status
 * ANGELEGT). The binary content, and the fields that depend on it
 * (dateiname/sizeInBytes/contentType/hash/hashAlgorithmus), are added
 * afterwards by `PUT .../dokumente/{id}/datei`, whose response is a full
 * Dokument.
 */
export const DokumentErstellenResponseSchema = z.object({
  id: z.string(),
  status: DokumentStatusSchema,
  anzeigename: z.string(),
  typ: DokumentTypeSchema,
  erstelltVon: z.string(),
  erstelltAm: z.string(),
  sichtbarkeitAlle: z.boolean(),
});

export type DokumentErstellenResponse = z.infer<
  typeof DokumentErstellenResponseSchema
>;
