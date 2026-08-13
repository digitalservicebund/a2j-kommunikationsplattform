import z from "zod";

export const KommunikationsanschlussRequestSchema = z.object({
  telekommunikationsart_id: z.string(),
  verbindung: z.string().min(1),
});
