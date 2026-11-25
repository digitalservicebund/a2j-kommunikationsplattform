import z from "zod";
import { RollenRequestSchema } from "~/domains/verfahren/infrastructure/schemas/requests/rollen.request.schema";

type RollenRequestDTO = z.infer<typeof RollenRequestSchema>;

/**
 * RollenInputSchema
 *
 * Domain-facing (camelCase) counterpart of RollenRequestSchema. Transforms
 * into the snake_case wire shape the API expects.
 */
export const RollenInputSchema = z
  .object({
    rollennummer: z.nullish(z.string()),
    rollenbezeichnungId: z.string(),
    geschaeftszeichen: z.nullish(z.string()),
    referenz: z.array(z.string()),
  })
  .transform((input): RollenRequestDTO => ({
    rollennummer: input.rollennummer ?? null,
    rollenbezeichnung_id: input.rollenbezeichnungId,
    geschaeftszeichen: input.geschaeftszeichen ?? null,
    referenz: input.referenz,
  }));
