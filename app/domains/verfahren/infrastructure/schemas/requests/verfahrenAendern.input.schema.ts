import { z } from "zod";
import { BeteiligungenInputSchema } from "~/domains/verfahren/infrastructure/schemas/requests/beteiligung.input.schema";
import { VerfahrenAendernRequestSchema } from "~/domains/verfahren/infrastructure/schemas/requests/verfahrenAendern.request.schema";

type VerfahrenAendernRequestDTO = z.infer<typeof VerfahrenAendernRequestSchema>;

/**
 * VerfahrenAendernInputSchema
 *
 * Domain-facing (camelCase) counterpart of VerfahrenAendernRequestSchema.
 * Routes validate form input against this schema; the parsed result is
 * already the snake_case wire DTO the API expects.
 */
export const VerfahrenAendernInputSchema = z
  .object({
    verfahrensgegenstand: z.string().min(1),
    kurzrubrum: z.string().nullable(),
    gerichtId: z.string(),
    beteiligungen: BeteiligungenInputSchema,
  })
  .transform((input): VerfahrenAendernRequestDTO => ({
    verfahrensgegenstand: input.verfahrensgegenstand,
    kurzrubrum: input.kurzrubrum,
    gericht_id: input.gerichtId,
    beteiligungen: input.beteiligungen,
  }));

export type VerfahrenAendernInput = z.input<typeof VerfahrenAendernInputSchema>;
