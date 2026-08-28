import z from "zod";
import { AnschriftRequestSchema } from "~/domains/verfahren/infrastructure/schemas/requests/anschrift.request.schema";

type AnschriftRequestDTO = z.infer<typeof AnschriftRequestSchema>;

/**
 * AnschriftInputSchema
 *
 * Domain-facing (camelCase) counterpart of AnschriftRequestSchema. Transforms
 * into the snake_case wire shape the API expects.
 */
export const AnschriftInputSchema = z
  .object({
    anschriftstypId: z.nullable(z.string()),
    strasse: z.nullable(z.string()),
    hausnummer: z.nullable(z.string()),
    postleitzahl: z.nullable(z.string()),
    ort: z.nullable(z.string()),
    postfachnummer: z.nullable(z.string()),
    staatId: z.nullable(z.string()),
  })
  .transform((input): AnschriftRequestDTO => ({
    anschriftstyp_id: input.anschriftstypId,
    strasse: input.strasse,
    hausnummer: input.hausnummer,
    postleitzahl: input.postleitzahl,
    ort: input.ort,
    postfachnummer: input.postfachnummer,
    staat_id: input.staatId,
  }));
