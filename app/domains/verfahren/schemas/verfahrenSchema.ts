import z from "zod";
import { BeteiligungenSchema } from "~/domains/verfahren/schemas/beteiligungenSchema";
import { CodeWertSchema } from "~/domains/verfahren/schemas/codeWertSchema";

/**
 * VerfahrenSchema
 *
 * See Verfahren Schema at: https://app.kompla-justiz.sinc.de/main/swagger/index.html
 */

export const VerfahrenSchema = z.object({
  id: z.string(),
  aktenzeichen_gericht: z.nullable(z.string()),
  verfahrensgegenstand: z.nullable(z.string()),
  kurzrubrum: z.nullable(z.string()),
  status: z.enum([
    "ERSTELLT",
    "EINGEREICHT",
    "GERICHTSVERFAHRENANGELEGT",
    "GELOESCHT",
    "ABGESCHLOSSEN",
  ]),
  status_geaendert_am: z.iso.datetime(),
  erstellt_von: z.string(),
  erstellt_am: z.iso.datetime(),
  eingereicht_am: z.nullable(z.iso.datetime()),
  gericht: CodeWertSchema,
  beteiligungen: BeteiligungenSchema,
});
