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
 * Raw API contract (snake_case). Matches DokumentErstellenResponse:
 * returned when creating (uploading) a Dokument.
 */
const DokumentErstellenResponseApiSchema = z.object({
  id: z.string(),
  status: DokumentStatusSchema,
  dateiname: z.string(),
  anzeigename: z.string(),
  size_in_bytes: z.number(),
  content_type: z.string(),
  hash: z.string(),
  hash_algorithmus: z.string(),
  typ: DokumentTypeSchema,
  // TODO: remove the nullable part after confirming it with SINC
  erstellt_von: z.nullable(z.string()),
  erstellt_am: z.string(),
  sichtbarkeit_alle: z.boolean(),
});

export const DokumentErstellenResponseSchema =
  DokumentErstellenResponseApiSchema.transform(
    (dto): DokumentErstellenResponse => ({
      id: dto.id,
      status: dto.status,
      dateiname: dto.dateiname,
      anzeigename: dto.anzeigename,
      sizeInBytes: dto.size_in_bytes,
      contentType: dto.content_type,
      hash: dto.hash,
      hashAlgorithmus: dto.hash_algorithmus,
      typ: dto.typ,
      erstelltVon: dto.erstellt_von,
      erstelltAm: dto.erstellt_am,
      sichtbarkeitAlle: dto.sichtbarkeit_alle,
    }),
  );
