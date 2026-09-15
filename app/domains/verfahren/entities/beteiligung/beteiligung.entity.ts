import z from "zod";
import { AnschriftSchema } from "~/domains/verfahren/entities/beteiligung/anschrift.entity";
import { CodeWertSchema } from "~/domains/verfahren/entities/beteiligung/codeWert.entity";
import { RolleSchema } from "~/domains/verfahren/entities/beteiligung/rollen.entity";
import { TelekommunikationSchema } from "~/domains/verfahren/entities/beteiligung/telekommunikation.entity";

const BeteiligteSchema = z.object({
  id: z.string(),
  rollen: z.array(RolleSchema),
  anschriften: z.nullable(z.array(AnschriftSchema)),
  telekommunikation: z.nullable(z.array(TelekommunikationSchema)),
});
export type Beteiligte = z.infer<typeof BeteiligteSchema>;

const NatuerlichePersonBeteiligungSchema = BeteiligteSchema.extend({
  beteiligtenart: z.literal("natuerlichePerson"),
  vorname: z.nullable(z.string()),
  titel: z.nullable(z.string()),
  namensvorsatz: z.nullable(z.string()),
  nachname: z.string(),
});
export type NatuerlichePersonBeteiligung = z.infer<
  typeof NatuerlichePersonBeteiligungSchema
>;

const OrganisationBeteiligungSchema = BeteiligteSchema.extend({
  beteiligtenart: z.literal("organisation"),
  bezeichnung: z.string(),
});
export type OrganisationBeteiligung = z.infer<
  typeof OrganisationBeteiligungSchema
>;

const RAKanzleiBeteiligungSchema = BeteiligteSchema.extend({
  beteiligtenart: z.literal("raKanzlei"),
  bezeichnung: z.string(),
  // TODO: remove the nullable part after confirming it with SINC
  rechtsform: z.nullable(CodeWertSchema),
  kanzleiform: CodeWertSchema,
});
export type RAKanzleiBeteiligung = z.infer<typeof RAKanzleiBeteiligungSchema>;

// A plain z.union tries branches in order and accepts the first structural
// match — since Organisation's fields are a subset of RaKanzlei's, a
// RaKanzlei response could be silently matched (and stripped down) as an
// Organisation. Discriminating on beteiligtenart picks the exact branch.
export const BeteiligungSchema = z.discriminatedUnion("beteiligtenart", [
  NatuerlichePersonBeteiligungSchema,
  OrganisationBeteiligungSchema,
  RAKanzleiBeteiligungSchema,
]);
export type Beteiligung = z.infer<typeof BeteiligungSchema>;

export const BeteiligungenSchema = z.array(BeteiligungSchema);
export type Beteiligungen = z.infer<typeof BeteiligungenSchema>;
