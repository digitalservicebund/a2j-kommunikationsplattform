import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";

type FetchEinreichungXJustizOptions = {
  verfahrenId: string;
  id: string;
};

const buildErrorMessage = (id: string, verfahrenId: string): string =>
  `XJustiz-Nachricht for Einreichung with id ${id} of Verfahren with id ${verfahrenId} could not be fetched.`;

export default async function fetchEinreichungXJustiz(
  authData: AuthenticationResponse,
  options: FetchEinreichungXJustizOptions,
): Promise<string> {
  return apiRequest<string>({
    authData,
    path: `/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.id}/xjustiz`,
    responseType: "text",
    errorMessage: buildErrorMessage(options.id, options.verfahrenId),
  });
}
