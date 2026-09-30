import { z } from "zod";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "../api/apiClient";
import { VerfahrenSchema } from "../schemas/verfahren.schema";

export const LiftResponseSchema = z.object({
  id: z.string(),
  beteiligung_id: z.string(),
  verfahren: VerfahrenSchema,
});

export type LiftResponse = z.infer<typeof LiftResponseSchema>;

/**
 * Converts a "lift code" (Beitrittscode) to its canonical form, by uppercasing
 * it, removing dashes, and removing any whitespace.
 */
function normalizeLiftCode(code: string) {
  return code.toUpperCase().replaceAll(/[-\s]/g, "");
}

/**
 * Check a "lift code" (Beitrittscode) for joining a particular Verfahren.
 * If it is valid and has not been used yet, the associated "lift", including
 * information about the associated Verfahren, is returned. Otherwise, an
 * error is thrown.
 */
export async function validateLiftCode(
  authData: AuthenticationResponse,
  code: string,
): Promise<{ lift: LiftResponse; eTag: string }> {
  const { data: lift, eTag } = await apiRequest({
    authData,
    path: "/api/v1/lift?lift-schluessel=123",
    headers: { "lift-schluessel": normalizeLiftCode(code) },
    schema: LiftResponseSchema,
    includeResponseETag: true,
  });
  return { lift, eTag: eTag! };
}

export type PerformLiftOptions = {
  code: string;
  liftId: string;
  liftETag: string;
  safeId: string;
};

export const PerformLiftResponseSchema = z
  .object({ verfahren_id: z.string() })
  .transform((dto) => ({ verfahrenId: dto.verfahren_id }));

export type PerformLiftResponse = z.infer<typeof PerformLiftResponseSchema>;

/**
 * Redeem a code for a "lift" after it has been validated with
 * {@link validateLiftCode}, which results in the user with the given Safe ID
 * joining and gaining access to the Verfahren.
 */
export async function performLift(
  authData: AuthenticationResponse,
  { code, liftId, liftETag, safeId }: PerformLiftOptions,
): Promise<{ verfahrenId: string }> {
  return apiRequest({
    authData,
    method: "POST",
    path: `/api/v1/lift/${liftId}`,
    headers: { "If-Match": liftETag },
    body: {
      lift_schluessel: normalizeLiftCode(code),
      safe_id: safeId,
    },
    schema: PerformLiftResponseSchema,
  });
}
