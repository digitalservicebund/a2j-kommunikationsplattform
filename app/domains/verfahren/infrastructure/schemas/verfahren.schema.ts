import z from "zod";
import { BeteiligungenSchema } from "~/domains/verfahren/entities/beteiligung/beteiligung.entity";
import { GerichtSchema } from "~/domains/verfahren/entities/codelisten/gericht.entity";

/**
 * The KomPla API's `VerfahrenStatus` schema.
 * @see https://app.kompla-justiz.sinc.de/main/swagger/index.html
 */
export const VerfahrenStatusApiSchema = z.enum([
  "ERSTELLT",
  "EINGEREICHT",
  "GERICHTSVERFAHRENANGELEGT",
  "GELOESCHT",
  "ABGESCHLOSSEN",
]);

/**
 * The KomPla API's `VerfahrenResponse` schema.
 * @see https://app.kompla-justiz.sinc.de/main/swagger/index.html
 */
export const VerfahrenResponseApiSchema = z.object({
  id: z.string(),
  aktenzeichen_gericht: z.nullable(z.string()),
  verfahrensgegenstand: z.nullable(z.string()),
  kurzrubrum: z.nullable(z.string()),
  status: VerfahrenStatusApiSchema,
  status_geaendert_am: z.iso.datetime(),
  erstellt_von: z.string(),
  erstellt_am: z.iso.datetime(),
  eingereicht_am: z.nullable(z.iso.datetime()),
  gericht: z.nullable(GerichtSchema),
  beteiligungen: BeteiligungenSchema,
});
