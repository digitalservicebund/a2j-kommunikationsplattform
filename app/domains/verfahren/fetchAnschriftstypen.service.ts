import z from "zod";
import { getListeResponseSchema } from "~/domains/verfahren/helpers";
import { CodeWertSchema } from "~/domains/verfahren/schemas/codeWertSchema";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";

const errorMessage = "Anschriftstyp data could not be fetched.";

export const fetchAnschriftstypenSchema =
  getListeResponseSchema(CodeWertSchema);

export default async function fetchAnschriftstypen(
  authData: AuthenticationResponse,
): Promise<z.infer<typeof fetchAnschriftstypenSchema>> {
  return apiRequest({
    authData,
    path: "/api/v1/codelisten/anschriftstypen",
    schema: fetchAnschriftstypenSchema,
    errorMessage,
  });
}
