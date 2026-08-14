import z from "zod";
import { getListeResponseSchema } from "~/domains/verfahren/helpers";
import { CodeWertSchema } from "~/domains/verfahren/schemas/codeWertSchema";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";

const errorMessage = "Rollenbezeichnung data could not be fetched.";

export const fetchRollenbezeichnungenSchema =
  getListeResponseSchema(CodeWertSchema);

export default async function fetchRollenbezeichnungen(
  authData: AuthenticationResponse,
): Promise<z.infer<typeof fetchRollenbezeichnungenSchema>> {
  return apiRequest({
    authData,
    path: "/api/v1/codelisten/rollenbezeichnungen",
    schema: fetchRollenbezeichnungenSchema,
    errorMessage,
  });
}
