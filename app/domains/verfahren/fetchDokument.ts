import z from "zod";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";
import { DokumentSchema } from "./schemas/dokumentSchema";

type FetchDokumentOptions = {
  verfahrenId: string;
  einreichungId: string;
  id: string;
};

export type FetchDokumentResult = {
  dokument: ReturnType<typeof DokumentSchema.parse>;
  eTag: string | null;
};

type Dokument = z.infer<typeof DokumentSchema>;

const buildErrorMessage = (id: string): string =>
  `Dokument with id ${id} could not be fetched.`;

export default async function fetchDokument(
  authData: AuthenticationResponse,
  options: FetchDokumentOptions,
): Promise<FetchDokumentResult> {
  const { data, eTag } = await apiRequest<Dokument>({
    authData,
    path: `/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.einreichungId}/dokumente/${options.id}`,
    schema: DokumentSchema,
    includeResponseETag: true,
    errorMessage: buildErrorMessage(options.id),
  });

  return {
    dokument: data,
    eTag,
  };
}
