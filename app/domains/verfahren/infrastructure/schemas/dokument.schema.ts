import z from "zod";
import {
  Dokument,
  DokumentErstellenResponse,
  DokumentStatusSchema,
  DokumentTypeSchema,
} from "~/domains/verfahren/entities/dokument/dokument.entity";
import { ValidierungslaufStatusSchema } from "~/domains/verfahren/entities/validierungsstatus/validierungsstatus.entity";
import { getListeResponseSchema } from "~/domains/verfahren/infrastructure/api/listResponse";

/**
 * DokumentApiSchema
 *
 * Raw API contract (snake_case). Matches DokumentResponse: returned when
 * fetching a single Dokument or a liste of Dokumente. See Dokument Schema
 * at: https://app.kompla-justiz.sinc.de/main/swagger/index.html
 */
const DokumentApiSchema = z.object({
  id: z.string(),
  status: DokumentStatusSchema,
  validierungslauf_status: ValidierungslaufStatusSchema,
  dateiname: z.nullish(z.string()),
  anzeigename: z.string(),
  size_in_bytes: z.nullish(z.number()),
  content_type: z.nullish(z.string()),
  hash: z.nullish(z.string()),
  hash_algorithmus: z.nullish(z.string()),
  typ: DokumentTypeSchema,
  gesendet_am: z.nullable(z.string()),
  eingereicht_am: z.nullable(z.string()),
  erstellt_von: z.string(),
  erstellt_am: z.string(),
  sichtbarkeit_alle: z.boolean(),
});

export const DokumentSchema = DokumentApiSchema.transform((dto): Dokument => ({
  id: dto.id,
  status: dto.status,
  validierungslaufStatus: dto.validierungslauf_status,
  dateiname: dto.dateiname,
  anzeigename: dto.anzeigename,
  sizeInBytes: dto.size_in_bytes,
  contentType: dto.content_type,
  hash: dto.hash,
  hashAlgorithmus: dto.hash_algorithmus,
  typ: dto.typ,
  gesendetAm: dto.gesendet_am,
  eingereichtAm: dto.eingereicht_am,
  erstelltVon: dto.erstellt_von,
  erstelltAm: dto.erstellt_am,
  sichtbarkeitAlle: dto.sichtbarkeit_alle,
}));

export const DokumenteSchema = getListeResponseSchema(DokumentSchema);

/**
 * DokumentErstellenResponseApiSchema
 *
 * Raw API contract (snake_case). Matches DokumentErstellenResponse: returned
 * by `POST .../dokumente`, which only creates the Dokument's metadata (no
 * binary content yet, so none of the file-derived fields are present).
 */
const DokumentErstellenResponseApiSchema = z.object({
  id: z.string(),
  status: DokumentStatusSchema,
  anzeigename: z.string(),
  typ: DokumentTypeSchema,
  erstellt_von: z.string(),
  erstellt_am: z.string(),
  sichtbarkeit_alle: z.boolean(),
});

export const DokumentErstellenResponseSchema =
  DokumentErstellenResponseApiSchema.transform(
    (dto): DokumentErstellenResponse => ({
      id: dto.id,
      status: dto.status,
      anzeigename: dto.anzeigename,
      typ: dto.typ,
      erstelltVon: dto.erstellt_von,
      erstelltAm: dto.erstellt_am,
      sichtbarkeitAlle: dto.sichtbarkeit_alle,
    }),
  );
