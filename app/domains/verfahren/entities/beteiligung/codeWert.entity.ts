import z from "zod";

export const CodeWertSchema = z.object({
  id: z.string(),
  wert: z.nullable(z.string()),
  code: z.nullable(z.string()),
});

export type CodeWert = z.infer<typeof CodeWertSchema>;
