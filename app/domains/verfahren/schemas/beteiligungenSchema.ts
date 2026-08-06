import z from "zod";
import { AnschriftSchema } from "~/domains/verfahren/schemas/anschriftSchema";
import { CodeWertSchema } from "~/domains/verfahren/schemas/codeWertSchema";
import { RollenSchema } from "~/domains/verfahren/schemas/rollenSchema";
import { TelekommunikationSchema } from "~/domains/verfahren/schemas/telekommunikationSchema";

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

export const BeteiligungenSchema = z.nullable(
  z.array(
    z.union([NatuerlichePersonSchema, OrganisationSchema, RaKanzleiSchema]),
  ),
);
