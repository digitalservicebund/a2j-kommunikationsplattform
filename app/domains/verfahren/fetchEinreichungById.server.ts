import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";
import { EinreichungSchema } from "./schemas/einreichungSchema";

type FetchEinreichungByIdOptions = {
  id: string;
  verfahrenId: string;
};

const buildErrorMessage = (id: string, verfahrenId: string): string =>
  `Die Einreichung mit der ID ${id} für das Verfahren mit der ID ${verfahrenId} konnten nicht abgerufen werden.`;

export default async function fetchEinreichungById(
  authData: AuthenticationResponse,
  options: FetchEinreichungByIdOptions,
) {
  return apiRequest({
    authData,
    path: `/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.id}`,
    schema: EinreichungSchema,
    errorMessage: buildErrorMessage(options.id, options.verfahrenId),
  });
}
