import z from "zod";
import { ValidierungsstatusSchema } from "~/domains/verfahren/schemas/validierungsStatusSchema";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";

type FetchEinreichungStatusOptions = {
  id: string;
  verfahrenId: string;
};

const buildErrorMessage = (id: string, verfahrenId: string): string =>
  `Validierungsstatus for Einreichung with id ${id} of Verfahren with id ${verfahrenId} could not be fetched.`;

export default async function fetchEinreichungStatus(
  authData: AuthenticationResponse,
  options: FetchEinreichungStatusOptions,
): Promise<z.infer<typeof ValidierungsstatusSchema>> {
  return apiRequest({
    authData,
    path: `/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.id}/validierungsstatus`,
    schema: ValidierungsstatusSchema,
    errorMessage: buildErrorMessage(options.id, options.verfahrenId),
  });
}
