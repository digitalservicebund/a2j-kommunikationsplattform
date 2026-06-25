import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";
import { DokumenteSchema } from "./schemas/dokumentSchema";

type FetchDokumenteByIdOptions = {
  id: string;
  verfahrenId: string;
};

const buildErrorMessage = (id: string): string =>
  `Die Dokumente für die Einreichung mit der ID ${id} konnten nicht abgerufen werden.`;

export default async function fetchDokumenteById(
  authData: AuthenticationResponse,
  options: FetchDokumenteByIdOptions,
) {
  return apiRequest({
    authData,
    path: `/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.id}/dokumente`,
    schema: DokumenteSchema,
    errorMessage: buildErrorMessage(options.id),
  });
}
