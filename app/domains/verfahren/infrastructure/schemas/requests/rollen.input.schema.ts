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
    rollennummer: z.nullable(z.string()),
    rollenbezeichnungId: z.string(),
    geschaeftszeichen: z.nullable(z.string()),
    referenz: z.nullable(z.string()),
  })
  .transform((input): RollenRequestDTO => ({
    rollennummer: input.rollennummer,
    rollenbezeichnung_id: input.rollenbezeichnungId,
    geschaeftszeichen: input.geschaeftszeichen,
    referenz: input.referenz,
  }));
