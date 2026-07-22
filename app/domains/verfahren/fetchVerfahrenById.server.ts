import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";
import { VerfahrenSchema } from "./schemas/verfahrenSchema";

type FetchVerfahrenByIdOptions = {
  id: string;
};

const buildErrorMessage = (id: string): string =>
  `Verfahren with ${id} could not be fetched.`;

export default async function fetchVerfahrenById(
  authData: AuthenticationResponse,
  options: FetchVerfahrenByIdOptions,
) {
  return apiRequest({
    authData,
    path: `/api/v1/verfahren/${options.id}`,
    schema: VerfahrenSchema,
    errorMessage: buildErrorMessage(options.id),
  });
}
