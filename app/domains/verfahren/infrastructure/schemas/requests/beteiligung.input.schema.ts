import z from "zod";
import { AnschriftInputSchema } from "~/domains/verfahren/infrastructure/schemas/requests/anschrift.input.schema";
import { TelekommunikationInputSchema } from "~/domains/verfahren/infrastructure/schemas/requests/kommunikationsanschluss.input.schema";
import { RollenInputSchema } from "~/domains/verfahren/infrastructure/schemas/requests/rollen.input.schema";
import { BeteiligungRequest } from "./beteiligung.request.schema";

export const BeteiligungInputBaseSchema = z.object({
  rollen: z.array(RollenInputSchema).min(1),
  anschriften: z.nullish(z.array(AnschriftInputSchema)),
  telekommunikationen: z.nullish(z.array(TelekommunikationInputSchema)),
});

export type BeteiligungInputBase = z.input<typeof BeteiligungInputBaseSchema>;

// - The API's discriminated-union deserializer requires "beteiligtenart" to
//   be the first JSON property of a `BeteiligungInput`, but using
//   `BeteiligungInputSchema.extend(...)` would would put it last, so use
//   `z.object(..., ...BeteiligungInputBaseSchema.shape)` instead below.
//
// - The variants are defined using plain `z.object()` (no `.transform()`)
//   so `z.discriminatedUnion` can statically read the "beteiligtenart"
//   literal off each branch. The snake_case field renames (RaKanzlei's
//   `rechtsform_id` / `kanzleiform_id`) are applied once, on the union
//   itself, in BeteiligungInputSchema below.

export const NatuerlichePersonInputSchema = z.object({
  beteiligtenart: z.literal("natuerlichePerson"),
  vorname: z.nullish(z.string()),
  titel: z.nullish(z.string()),
  namensvorsatz: z.nullish(z.string()),
  nachname: z.string().min(1),
  ...BeteiligungInputBaseSchema.shape,
});

export const OrganisationInputSchema = z.object({
  beteiligtenart: z.literal("organisation"),
  bezeichnung: z.string().min(1),
  ...BeteiligungInputBaseSchema.shape,
});

export const RaKanzleiInputSchema = z.object({
  beteiligtenart: z.literal("raKanzlei"),
  bezeichnung: z.string().min(1),
  rechtsformId: z.nullish(z.string()),
  kanzleiformId: z.string().min(1),
  ...BeteiligungInputBaseSchema.shape,
});

export const BeteiligungInputSchema = z
  .discriminatedUnion("beteiligtenart", [
    NatuerlichePersonInputSchema,
    OrganisationInputSchema,
    RaKanzleiInputSchema,
  ])
  .transform((beteiligung): BeteiligungRequest => {
    if (beteiligung.beteiligtenart === "raKanzlei") {
      // Tranform `camelCase` to `snake_case`
      return {
        beteiligtenart: beteiligung.beteiligtenart,
        bezeichnung: beteiligung.bezeichnung,
        rechtsform_id: beteiligung.rechtsformId,
        kanzleiform_id: beteiligung.kanzleiformId,
        rollen: beteiligung.rollen,
        anschriften: beteiligung.anschriften,
        telekommunikationen: beteiligung.telekommunikationen,
      };
    } else {
      // No camel-case properties
      return beteiligung;
    }
  });

export type BeteiligungInput = z.input<typeof BeteiligungInputSchema>;

export const BeteiligungenInputSchema = z.nullable(
  z.array(BeteiligungInputSchema),
);
