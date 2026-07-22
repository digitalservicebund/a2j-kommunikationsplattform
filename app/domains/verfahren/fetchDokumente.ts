import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";
import { DokumenteSchema } from "./schemas/dokumentSchema";

type FetchDokumenteOptions = {
  verfahrenId: string;
  einreichungId: string;
};

const buildErrorMessage = (id: string): string =>
  `Dokumente for Einreichung with id ${id} could not be fetched.`;

export default async function fetchDokumente(
  authData: AuthenticationResponse,
  options: FetchDokumenteOptions,
) {
  return apiRequest({
    authData,
    path: `/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.einreichungId}/dokumente`,
    schema: DokumenteSchema,
    errorMessage: buildErrorMessage(options.einreichungId),
  });
}
