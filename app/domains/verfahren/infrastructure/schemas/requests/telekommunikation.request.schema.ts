import z from "zod";

export const TelekommunikationRequestSchema = z.object({
  telekommunikationsart_id: z.string(),
  verbindung: z.string().min(1),
});
