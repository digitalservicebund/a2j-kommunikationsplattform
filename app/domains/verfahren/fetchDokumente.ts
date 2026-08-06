import z from "zod";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";
import { getListeResponseSchema } from "./helpers";
import { DokumentSchema } from "./schemas/dokumentSchema";

type FetchDokumenteOptions = {
  verfahrenId: string;
  einreichungId: string;
};

const buildErrorMessage = (id: string): string =>
  `Dokumente for Einreichung with id ${id} could not be fetched.`;

export const fetchDokumenteSchema = getListeResponseSchema(DokumentSchema);

export default async function fetchDokumente(
  authData: AuthenticationResponse,
  options: FetchDokumenteOptions,
): Promise<z.infer<typeof fetchDokumenteSchema>> {
  return apiRequest({
    authData,
    path: `/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.einreichungId}/dokumente`,
    schema: fetchDokumenteSchema,
    errorMessage: buildErrorMessage(options.einreichungId),
  });
}
