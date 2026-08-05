import z from "zod";
import { CodeWertSchema } from "~/domains/verfahren/schemas/codeWertSchema";

export const RollenSchema = z.object({
  id: z.string(),
  rollennummer: z.nullable(z.string()),
  rollenbezeichnung: CodeWertSchema,
  geschaeftszeichen: z.nullable(z.string()),
  referenz: z.nullable(z.string()),
});
