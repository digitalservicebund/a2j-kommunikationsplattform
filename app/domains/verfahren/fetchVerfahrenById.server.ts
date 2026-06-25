import type { AuthenticationResponse } from "~/services/auth/oAuth.server";
import { apiRequest } from "./apiClient";
import { VerfahrenSchema } from "./schemas/verfahrenSchema";

type FetchVerfahrenByIdOptions = {
  id: string;
};

const errorMessage = "Das Verfahren konnte nicht abgerufen werden.";

export default async function fetchVerfahrenById(
  authData: AuthenticationResponse,
  options: FetchVerfahrenByIdOptions,
) {
  return apiRequest({
    authData,
    path: `/api/v1/verfahren/${options.id}`,
    schema: VerfahrenSchema,
    errorMessage,
  });
}
