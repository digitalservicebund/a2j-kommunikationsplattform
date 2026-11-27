import z from "zod";
import { AnschriftRequestSchema } from "~/domains/verfahren/infrastructure/schemas/requests/anschrift.request.schema";
import { RollenRequestSchema } from "~/domains/verfahren/infrastructure/schemas/requests/rollen.request.schema";
import { TelekommunikationRequestSchema } from "~/domains/verfahren/infrastructure/schemas/requests/telekommunikation.request.schema";

export const BeteiligungRequestBaseSchema = z.object({
  rollen: z.array(RollenRequestSchema).min(1),
  anschriften: z.nullish(z.array(AnschriftRequestSchema)),
  telekommunikationen: z.nullish(z.array(TelekommunikationRequestSchema)),
});

export type BeteiligungRequestBase = z.infer<
  typeof BeteiligungRequestBaseSchema
>;

// The API's discriminated-union deserializer requires "beteiligtenart" to be
// the first JSON property of a `BeteiligungRequest`, but using
// `BeteiligungRequestBaseSchema.extend(...)` would would put it last, so use
// `z.object(..., ...BeteiligungRequestBaseSchema.shape)` instead below.

export const NatuerlichePersonRequestSchema = z.object({
  beteiligtenart: z.literal("natuerlichePerson"),
  vorname: z.nullish(z.string()),
  titel: z.nullish(z.string()),
  namensvorsatz: z.nullish(z.string()),
  nachname: z.string().min(1),
  ...BeteiligungRequestBaseSchema.shape,
});

export type NatuerlichePersonRequest = z.infer<
  typeof NatuerlichePersonRequestSchema
>;

export const OrganisationRequestSchema = z.object({
  beteiligtenart: z.literal("organisation"),
  bezeichnung: z.string().min(1),
  ...BeteiligungRequestBaseSchema.shape,
});

export type OrganisationRequest = z.infer<typeof OrganisationRequestSchema>;

export const RaKanzleiRequestSchema = z.object({
  beteiligtenart: z.literal("raKanzlei"),
  bezeichnung: z.string().min(1),
  rechtsform_id: z.nullish(z.string()),
  kanzleiform_id: z.string().min(1),
  ...BeteiligungRequestBaseSchema.shape,
});

export type RaKanzleiRequest = z.infer<typeof RaKanzleiRequestSchema>;

export const BeteiligungRequestSchema = z.discriminatedUnion("beteiligtenart", [
  NatuerlichePersonRequestSchema,
  OrganisationRequestSchema,
  RaKanzleiRequestSchema,
]);

export type BeteiligungRequest = z.infer<typeof BeteiligungRequestSchema>;
