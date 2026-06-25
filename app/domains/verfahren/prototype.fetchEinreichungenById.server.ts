import type { AuthenticationResponse } from "~/services/auth/oAuth.server";
import { apiRequest } from "./apiClient";
import { EinreichungenSchema } from "./schemas/einreichungSchema";

type FetchEinreichungenByIdOptions = {
  id: string;
};

const buildErrorMessage = (id: string): string =>
  `Die Einreichungen für das Verfahren mit der ID ${id} konnten nicht abgerufen werden.`;

export default async function fetchEinreichungenById(
  authData: AuthenticationResponse,
  options: FetchEinreichungenByIdOptions,
) {
  return apiRequest({
    authData,
    path: `/api/v1/verfahren/${options.id}/einreichungen`,
    schema: EinreichungenSchema,
    errorMessage: buildErrorMessage(options.id),
  });
}
