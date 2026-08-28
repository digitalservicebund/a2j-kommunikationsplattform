import z from "zod";
import { KommunikationsanschlussRequestSchema } from "~/domains/verfahren/infrastructure/schemas/requests/kommunikationsanschluss.request.schema";

type KommunikationsanschlussRequestDTO = z.infer<
  typeof KommunikationsanschlussRequestSchema
>;

/**
 * KommunikationsanschlussInputSchema
 *
 * Domain-facing (camelCase) counterpart of KommunikationsanschlussRequestSchema.
 * Transforms into the snake_case wire shape the API expects.
 */
export const KommunikationsanschlussInputSchema = z
  .object({
    telekommunikationsartId: z.string(),
    verbindung: z.string().min(1),
  })
  .transform((input): KommunikationsanschlussRequestDTO => ({
    telekommunikationsart_id: input.telekommunikationsartId,
    verbindung: input.verbindung,
  }));
