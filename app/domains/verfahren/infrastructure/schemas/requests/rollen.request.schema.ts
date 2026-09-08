import z from "zod";

export const RollenRequestSchema = z.object({
  rollennummer: z.nullable(z.string()),
  rollenbezeichnung_id: z.string(),
  geschaeftszeichen: z.nullable(z.string()),
  referenz: z.nullable(z.string()),
});
