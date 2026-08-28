import z from "zod";
import { ValidierungslaufStatusSchema } from "~/domains/verfahren/entities/validierungsstatus/validierungsstatus.entity";

export const EinreichungStatusSchema = z.enum([
  "ERSTELLT",
  "EINGEREICHT",
  "FEHLGESCHLAGEN",
  "BEANTRAGT",
  "VERSENDET",
  "VERAKTET",
  "GELOESCHT",
]);

/**
 * Einreichung — domain shape (camelCase). Mirrors the wire contract defined
 * in infrastructure/schemas/einreichung.schema.ts, which is responsible for
 * mapping the API's snake_case response into this shape.
 */
export const EinreichungSchema = z.object({
  id: z.string(),
  name: z.string(),
  erstelltVon: z.string(),
  erstelltAm: z.string(),
  status: EinreichungStatusSchema,
  beantragtAm: z.nullable(z.string()),
  gesendetAm: z.nullable(z.string()),
  eingereichtAm: z.nullable(z.string()),
  validierungsStatus: ValidierungslaufStatusSchema,
});

export type Einreichung = z.infer<typeof EinreichungSchema>;

/**
 * EinreichungErstellenResponse — domain shape (camelCase) for the response of
 * creating an Einreichung. Distinct from `Einreichung`: the API's
 * `EinreichungErstellenResponse` DTO is a narrower shape (no
 * beantragt_am/gesendet_am/eingereicht_am/validierungs_status — those don't
 * exist yet for a just-created Einreichung), same pattern as
 * `DokumentErstellenResponse` vs `Dokument`.
 */
export const EinreichungErstellenResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  erstelltVon: z.string(),
  erstelltAm: z.string(),
  status: EinreichungStatusSchema,
});

export type EinreichungErstellenResponse = z.infer<
  typeof EinreichungErstellenResponseSchema
>;

/**
 * EinreichenResponse — domain shape (camelCase) for the result of the
 * "Einreichen" action.
 */
export const EinreichenResponseSchema = z.object({
  belegId: z.string(),
});

export type EinreichenResponse = z.infer<typeof EinreichenResponseSchema>;
