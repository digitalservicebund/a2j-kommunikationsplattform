import z from "zod";
import { BeteiligungenSchema } from "~/domains/verfahren/entities/beteiligung/beteiligung.entity";
import { CodeWertSchema } from "~/domains/verfahren/entities/beteiligung/codeWert.entity";

export const VerfahrenStatusSchema = z.enum([
  "ERSTELLT",
  "EINGEREICHT",
  "GERICHTSVERFAHRENANGELEGT",
  "GELOESCHT",
  "ABGESCHLOSSEN",
]);

/**
 * Verfahren — domain shape (camelCase). Mirrors the wire contract defined in
 * infrastructure/schemas/verfahren.schema.ts, which is responsible for
 * mapping the API's snake_case response into this shape.
 */
export const VerfahrenSchema = z.object({
  id: z.string(),
  aktenzeichenGericht: z.nullable(z.string()),
  verfahrensgegenstand: z.nullable(z.string()),
  kurzrubrum: z.nullable(z.string()),
  status: VerfahrenStatusSchema,
  statusGeaendertAm: z.iso.datetime(),
  erstelltVon: z.string(),
  erstelltAm: z.iso.datetime(),
  eingereichtAm: z.nullable(z.iso.datetime()),
  gericht: CodeWertSchema,
  beteiligungen: BeteiligungenSchema,
});

export type Verfahren = z.infer<typeof VerfahrenSchema>;
