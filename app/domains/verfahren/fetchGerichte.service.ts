import z from "zod";
import { getListeResponseSchema } from "~/domains/verfahren/helpers";
import { CodeWertSchema } from "~/domains/verfahren/schemas/codeWertSchema";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";

const errorMessage = "Gericht data could not be fetched.";

export const fetchGerichteSchema = getListeResponseSchema(CodeWertSchema);

export default async function fetchGerichte(
  authData: AuthenticationResponse,
): Promise<z.infer<typeof fetchGerichteSchema>> {
  return apiRequest({
    authData,
    path: "/api/v1/codelisten/gerichte",
    schema: fetchGerichteSchema,
    errorMessage,
  });
}
