import z from "zod";
import { TelekommunikationRequestSchema } from "~/domains/verfahren/infrastructure/schemas/requests/telekommunikation.request.schema";

type KommunikationsanschlussRequestDTO = z.infer<
  typeof TelekommunikationRequestSchema
>;

/**
 * KommunikationsanschlussInputSchema
 *
 * Domain-facing (camelCase) counterpart of KommunikationsanschlussRequestSchema.
 * Transforms into the snake_case wire shape the API expects.
 */
export const TelekommunikationInputSchema = z
  .object({
    telekommunikationsartId: z.string(),
    verbindung: z.string().min(1),
  })
  .transform((input): KommunikationsanschlussRequestDTO => ({
    telekommunikationsart_id: input.telekommunikationsartId,
    verbindung: input.verbindung,
  }));
