import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";
import { GerichtSchema } from "./schemas/gerichtSchema";

const errorMessage = "Gericht data could not be fetched.";

export default async function fetchGerichte(authData: AuthenticationResponse) {
  return apiRequest({
    authData,
    path: "/api/v1/gerichte",
    schema: GerichtSchema.array(),
    errorMessage,
  });
}
