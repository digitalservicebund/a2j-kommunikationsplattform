import z from "zod";
import { getListeResponseSchema } from "~/domains/verfahren/helpers";
import { CodeWertSchema } from "~/domains/verfahren/schemas/codeWertSchema";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";

const errorMessage = "Staat data could not be fetched.";

export const fetchStaatenSchema = getListeResponseSchema(CodeWertSchema);

export default async function fetchStaaten(
  authData: AuthenticationResponse,
): Promise<z.infer<typeof fetchStaatenSchema>> {
  return apiRequest({
    authData,
    path: "/api/v1/codelisten/staaten",
    schema: fetchStaatenSchema,
    errorMessage,
  });
}
