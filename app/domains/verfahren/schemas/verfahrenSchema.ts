import z from "zod";
import { AnschriftSchema } from "~/domains/verfahren/schemas/anschriftSchema";
import { CodeWertSchema } from "~/domains/verfahren/schemas/codeWertSchema";
import { RollenSchema } from "~/domains/verfahren/schemas/rollenSchema";
import { TelekommunikationSchema } from "~/domains/verfahren/schemas/telekommunikationSchema";

/**
 * VerfahrenSchema
 *
 * See Verfahren Schema at: https://app.kompla-justiz.sinc.de/main/swagger/index.html
 */

export { CodeWertSchema };

const BeteiligteSchema = z.object({
  beteiligtenart: z.string(),
  id: z.string(),
  rollen: z.array(RollenSchema),
  anschriften: z.nullable(z.array(AnschriftSchema)),
  telekommunikation: z.nullable(z.array(TelekommunikationSchema)),
});

const NatuerlichePersonSchema = BeteiligteSchema.extend({
  vorname: z.nullable(z.string()),
  titel: z.nullable(z.string()),
  namensvorsatz: z.nullable(z.string()),
  nachname: z.string(),
});

const OrganisationSchema = BeteiligteSchema.extend({
  bezeichnung: z.string(),
});
const RaKanzleiSchema = BeteiligteSchema.extend({
  bezeichnung: z.string(),
  rechtsform: z.nullable(z.string()),
  kanzleiform: CodeWertSchema,
});
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
  beteiligungen: z.nullable(
    z.array(
      z.union([NatuerlichePersonSchema, OrganisationSchema, RaKanzleiSchema]),
    ),
  ),
});
