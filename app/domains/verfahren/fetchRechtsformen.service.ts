import z from "zod";
import { getListeResponseSchema } from "~/domains/verfahren/helpers";
import { RechtsformSchema } from "~/domains/verfahren/schemas/rechtsformSchema";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";

const errorMessage = "Rechtsform data could not be fetched.";

export const fetchRechtsformenSchema = getListeResponseSchema(RechtsformSchema);

export default async function fetchRechtsformen(
  authData: AuthenticationResponse,
): Promise<z.infer<typeof fetchRechtsformenSchema>> {
  return apiRequest({
    authData,
    path: "/api/v1/codelisten/rechtsformen",
    schema: fetchRechtsformenSchema,
    errorMessage,
  });
}
