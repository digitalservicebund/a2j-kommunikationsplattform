import { z } from "zod";
import { BeteiligungRequestSchema } from "~/domains/verfahren/infrastructure/schemas/requests/beteiligung.request.schema";

export const VerfahrenAendernRequestSchema = z.object({
  verfahrensgegenstand: z.string().min(1),
  kurzrubrum: z.string().nullable(),
  gericht_id: z.string(),
  beteiligungen: z.nullable(z.array(BeteiligungRequestSchema)),
});

export type VerfahrenAendernRequestDTO = z.infer<
  typeof VerfahrenAendernRequestSchema
>;
