import z from "zod";
import { getListeResponseSchema } from "~/domains/verfahren/helpers";
import { CodeWertSchema } from "~/domains/verfahren/schemas/codeWertSchema";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";

const errorMessage = "Kanzleiform data could not be fetched.";

export const fetchKanzleiformenSchema = getListeResponseSchema(CodeWertSchema);

export default async function fetchKanzleiformen(
  authData: AuthenticationResponse,
): Promise<z.infer<typeof fetchKanzleiformenSchema>> {
  return apiRequest({
    authData,
    path: "/api/v1/codelisten/kanzleiformen",
    schema: fetchKanzleiformenSchema,
    errorMessage,
  });
}
