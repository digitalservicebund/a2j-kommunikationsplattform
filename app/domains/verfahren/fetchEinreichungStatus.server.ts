import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";
import { StatusSchema } from "./schemas/statusSchema";

type FetchEinreichungStatusOptions = {
  id: string;
  verfahrenId: string;
};

const buildErrorMessage = (id: string, verfahrenId: string): string =>
  `Validierungsstatus for Einreichung ${id} of Verfahren with id ${verfahrenId} could not be fetched.`;

export default async function fetchEinreichungStatus(
  authData: AuthenticationResponse,
  options: FetchEinreichungStatusOptions,
) {
  return apiRequest({
    authData,
    path: `/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.id}/validierungsstatus`,
    schema: StatusSchema,
    errorMessage: buildErrorMessage(options.id, options.verfahrenId),
  });
}
