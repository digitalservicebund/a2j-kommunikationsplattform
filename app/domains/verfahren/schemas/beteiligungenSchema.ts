import z from "zod";
import { AnschriftSchema } from "~/domains/verfahren/schemas/anschriftSchema";
import { CodeWertSchema } from "~/domains/verfahren/schemas/codeWertSchema";
import { RollenSchema } from "~/domains/verfahren/schemas/rollenSchema";
import { TelekommunikationSchema } from "~/domains/verfahren/schemas/telekommunikationSchema";

const BeteiligteSchema = z.object({
  id: z.string(),
  rollen: z.array(RollenSchema),
  anschriften: z.nullable(z.array(AnschriftSchema)),
  telekommunikation: z.nullable(z.array(TelekommunikationSchema)),
});

const NatuerlichePersonSchema = BeteiligteSchema.extend({
  beteiligtenart: z.literal("natuerlichePerson"),
  vorname: z.nullable(z.string()),
  titel: z.nullable(z.string()),
  namensvorsatz: z.nullable(z.string()),
  nachname: z.string(),
});

const OrganisationSchema = BeteiligteSchema.extend({
  beteiligtenart: z.literal("organisation"),
  bezeichnung: z.string(),
});
const RaKanzleiSchema = BeteiligteSchema.extend({
  beteiligtenart: z.literal("raKanzlei"),
  bezeichnung: z.string(),
  // TODO: remove the nullable part after confirming it with SINC
  rechtsform: z.nullable(CodeWertSchema),
  kanzleiform: CodeWertSchema,
});

// A plain z.union tries branches in order and accepts the first structural
// match — since Organisation's fields are a subset of RaKanzlei's, a
// RaKanzlei response could be silently matched (and stripped down) as an
// Organisation. Discriminating on beteiligtenart picks the exact branch.
export const BeteiligungenSchema = z.nullable(
  z.array(
    z.discriminatedUnion("beteiligtenart", [
      NatuerlichePersonSchema,
      OrganisationSchema,
      RaKanzleiSchema,
    ]),
  ),
);
