import z from "zod";
import { ValidierungsstatusSchema } from "~/domains/verfahren/schemas/validierungsStatusSchema";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";

type FetchDokumentValidierungsstatusOptions = {
  verfahrenId: string;
  einreichungId: string;
  id: string;
};

const buildErrorMessage = (id: string): string =>
  `Validierungsstatus for Dokument with id ${id} could not be fetched.`;

export default async function fetchDokumentValidierungsstatus(
  authData: AuthenticationResponse,
  options: FetchDokumentValidierungsstatusOptions,
): Promise<z.infer<typeof ValidierungsstatusSchema>> {
  return apiRequest({
    authData,
    path: `/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.einreichungId}/dokumente/${options.id}/validierungsstatus`,
    schema: ValidierungsstatusSchema,
    errorMessage: buildErrorMessage(options.id),
  });
}
