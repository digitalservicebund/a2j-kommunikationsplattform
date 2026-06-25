import type { AuthenticationResponse } from "~/services/auth/oAuth.server";
import { apiRequest } from "./apiClient";
import { StatusSchema } from "./schemas/statusSchema";

type FetchEinreichungStatusOptions = {
  id: string;
  verfahrenId: string;
};

const errorMessage =
  "Der Validierungsstatus der Einreichung konnte nicht abgerufen werden.";

export default async function fetchEinreichungStatus(
  authData: AuthenticationResponse,
  options: FetchEinreichungStatusOptions,
) {
  return apiRequest({
    authData,
    path: `/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.id}/validierungsstatus`,
    schema: StatusSchema,
    errorMessage,
  });
}
