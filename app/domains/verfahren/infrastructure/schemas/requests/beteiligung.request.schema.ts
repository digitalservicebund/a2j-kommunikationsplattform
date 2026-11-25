import z from "zod";
import { AnschriftRequestSchema } from "~/domains/verfahren/infrastructure/schemas/requests/anschrift.request.schema";
import { RollenRequestSchema } from "~/domains/verfahren/infrastructure/schemas/requests/rollen.request.schema";
import { TelekommunikationRequestSchema } from "~/domains/verfahren/infrastructure/schemas/requests/telekommunikation.request.schema";

// Shared fields, spread AFTER beteiligtenart in each concrete schema below.
// The API's discriminated deserializer requires "beteiligtenart" to be the
// first JSON property of a beteiligungen entry; zod's `.extend()` would put
// it last (base-shape fields first), so we build each shape by hand instead.
const beteiligteRequestFields = {
  rollen: z.array(RollenRequestSchema).min(1),
  anschriften: z.nullish(z.array(AnschriftRequestSchema)),
  telekommunikationen: z.nullish(z.array(TelekommunikationRequestSchema)),
};

export const NatuerlichePersonRequestSchema = z.object({
  beteiligtenart: z.literal("natuerlichePerson"),
  vorname: z.nullish(z.string()),
  titel: z.nullish(z.string()),
  namensvorsatz: z.nullish(z.string()),
  nachname: z.string().min(1),
  ...beteiligteRequestFields,
});

export const OrganisationRequestSchema = z.object({
  beteiligtenart: z.literal("organisation"),
  bezeichnung: z.string().min(1),
  ...beteiligteRequestFields,
});

export const RaKanzleiRequestSchema = z.object({
  beteiligtenart: z.literal("raKanzlei"),
  bezeichnung: z.string().min(1),
  rechtsform_id: z.nullish(z.string()),
  kanzleiform_id: z.string().min(1),
  ...beteiligteRequestFields,
});

export const BeteiligungenRequestSchema = z.nullable(
  z.array(
    z.discriminatedUnion("beteiligtenart", [
      NatuerlichePersonRequestSchema,
      OrganisationRequestSchema,
      RaKanzleiRequestSchema,
    ]),
  ),
);
