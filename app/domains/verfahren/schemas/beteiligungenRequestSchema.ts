import z from "zod";
import { AnschriftRequestSchema } from "~/domains/verfahren/schemas/anschriftRequestSchema";
import { KommunikationsanschlussRequestSchema } from "~/domains/verfahren/schemas/kommunikationsanschlussRequestSchema";
import { RollenRequestSchema } from "~/domains/verfahren/schemas/rollenRequestSchema";

// Shared fields, spread AFTER beteiligtenart in each concrete schema below.
// The API's discriminated deserializer requires "beteiligtenart" to be the
// first JSON property of a beteiligungen entry; zod's `.extend()` would put
// it last (base-shape fields first), so we build each shape by hand instead.
const beteiligteRequestFields = {
  rollen: z.array(RollenRequestSchema).min(1),
  anschriften: z.nullable(z.array(AnschriftRequestSchema)),
  kommunikationsanschluesse: z.nullable(
    z.array(KommunikationsanschlussRequestSchema),
  ),
};

export const NatuerlichePersonRequestSchema = z.object({
  beteiligtenart: z.literal("natuerlichePerson"),
  vorname: z.nullable(z.string()),
  titel: z.nullable(z.string()),
  namensvorsatz: z.nullable(z.string()),
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
  rechtsform: z.nullable(z.string()),
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
