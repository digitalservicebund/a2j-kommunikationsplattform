import z from "zod";
import { getListeResponseSchema } from "~/domains/verfahren/helpers";
import { CodeWertSchema } from "~/domains/verfahren/schemas/codeWertSchema";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";

const errorMessage = "Telekommunikationsart data could not be fetched.";

const TelekommunikationsartCodeWertSchema = CodeWertSchema.extend({
  beschreibung: z.nullable(z.string()),
});

export const fetchTelekommunikationsartenSchema = getListeResponseSchema(
  TelekommunikationsartCodeWertSchema,
);

export default async function fetchTelekommunikationsarten(
  authData: AuthenticationResponse,
): Promise<z.infer<typeof fetchTelekommunikationsartenSchema>> {
  return apiRequest({
    authData,
    path: "/api/v1/codelisten/telekommunikationsarten",
    schema: fetchTelekommunikationsartenSchema,
    errorMessage,
  });
}
