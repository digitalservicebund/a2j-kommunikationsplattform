import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";
import { EinreichungenSchema } from "./schemas/einreichungSchema";

type FetchEinreichungenByIdOptions = {
  id: string;
};

const buildErrorMessage = (id: string): string =>
  `Einreichungen of Verfahren with id ${id} could not be fetched.`;

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
