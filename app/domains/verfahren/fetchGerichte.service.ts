import z from "zod";
import { getListeResponseSchema } from "~/domains/verfahren/schemas/helpers";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";
import { GerichtSchema } from "./schemas/gerichtSchema";

const errorMessage = "Gericht data could not be fetched.";

export const fetchGerichteSchema = getListeResponseSchema(GerichtSchema);

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
