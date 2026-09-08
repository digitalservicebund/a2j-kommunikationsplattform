import z from "zod";
import { AnschriftInputSchema } from "~/domains/verfahren/infrastructure/schemas/requests/anschrift.input.schema";
import { BeteiligungenRequestSchema } from "~/domains/verfahren/infrastructure/schemas/requests/beteiligung.request.schema";
import { KommunikationsanschlussInputSchema } from "~/domains/verfahren/infrastructure/schemas/requests/kommunikationsanschluss.input.schema";
import { RollenInputSchema } from "~/domains/verfahren/infrastructure/schemas/requests/rollen.input.schema";

type BeteiligungenRequestDTO = z.infer<typeof BeteiligungenRequestSchema>;

// Shared fields, spread AFTER beteiligtenart in each concrete schema below —
// see beteiligung.request.schema.ts for why the field order matters.
const beteiligteInputFields = {
  rollen: z.array(RollenInputSchema).min(1),
  anschriften: z.nullable(z.array(AnschriftInputSchema)),
  kommunikationsanschluesse: z.nullable(
    z.array(KommunikationsanschlussInputSchema),
  ),
};

// These stay plain z.object() (no .transform()) so z.discriminatedUnion can
// statically read the "beteiligtenart" literal off each branch. The
// snake_case field renames (RaKanzlei's rechtsform_id/kanzleiform_id) are
// applied once, after the union, in BeteiligungenInputSchema below.
export const NatuerlichePersonInputSchema = z.object({
  beteiligtenart: z.literal("natuerlichePerson"),
  vorname: z.nullable(z.string()),
  titel: z.nullable(z.string()),
  namensvorsatz: z.nullable(z.string()),
  nachname: z.string().min(1),
  ...beteiligteInputFields,
});

export const OrganisationInputSchema = z.object({
  beteiligtenart: z.literal("organisation"),
  bezeichnung: z.string().min(1),
  ...beteiligteInputFields,
});

export const RaKanzleiInputSchema = z.object({
  beteiligtenart: z.literal("raKanzlei"),
  bezeichnung: z.string().min(1),
  rechtsformId: z.nullable(z.string()),
  kanzleiformId: z.string().min(1),
  ...beteiligteInputFields,
});

export const BeteiligungInputSchema = z.discriminatedUnion("beteiligtenart", [
  NatuerlichePersonInputSchema,
  OrganisationInputSchema,
  RaKanzleiInputSchema,
]);

export const BeteiligungenInputSchema = z
  .nullable(z.array(BeteiligungInputSchema))
  .transform((beteiligungen): BeteiligungenRequestDTO => {
    if (beteiligungen === null) {
      return null;
    }

    return beteiligungen.map((beteiligung) => {
      if (beteiligung.beteiligtenart !== "raKanzlei") {
        return beteiligung;
      }

      return {
        beteiligtenart: beteiligung.beteiligtenart,
        bezeichnung: beteiligung.bezeichnung,
        rechtsform_id: beteiligung.rechtsformId,
        kanzleiform_id: beteiligung.kanzleiformId,
        rollen: beteiligung.rollen,
        anschriften: beteiligung.anschriften,
        kommunikationsanschluesse: beteiligung.kommunikationsanschluesse,
      };
    });
  });
