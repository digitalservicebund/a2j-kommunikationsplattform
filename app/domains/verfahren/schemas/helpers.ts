import z from "zod";

export const getListeResponseSchema = <T extends z.ZodTypeAny>(
  elementSchema: T,
) =>
  z.object({
    list_version: z.string(),
    elemente: z.array(elementSchema),
  });
