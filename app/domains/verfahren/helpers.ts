import z from "zod";

export const getListeResponseSchema = <T extends z.ZodTypeAny>(
  elementSchema: T,
) =>
  z.object({
    list_version: z.string().optional(),
    elemente: z.array(elementSchema),
  });

export const extractElementeFromListeResponse = <T extends z.ZodTypeAny>(
  responseData: z.infer<ReturnType<typeof getListeResponseSchema<T>>>,
): z.infer<T>[] => {
  try {
    return responseData.elemente;
  } catch (error) {
    console.error("Error extracting elemente from liste response:", error);
    return [];
  }
};
