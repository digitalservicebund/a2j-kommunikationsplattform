import z from "zod";
import { logger } from "~/utils/logger.server";

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
    logger.error({ error }, "Error extracting Elemente from Liste response");
    return [];
  }
};
