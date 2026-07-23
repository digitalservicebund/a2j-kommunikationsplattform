import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";

type DeleteDokumentOptions = {
  verfahrenId: string;
  einreichungId: string;
  id: string;
  eTag: string;
};

export type DeleteDokumentResult = { success: true } | { success: false };

const buildErrorMessage = (id: string): string =>
  `Dokument with id ${id} could not be deleted.`;

export default async function deleteDokument(
  authData: AuthenticationResponse,
  options: DeleteDokumentOptions,
): Promise<DeleteDokumentResult> {
  const deleteResult = await apiRequest({
    authData,
    path: `/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.einreichungId}/dokumente/${options.id}`,
    method: "DELETE",
    eTag: options.eTag,
    throwOnError: false,
    errorMessage: buildErrorMessage(options.id),
  });

  if (deleteResult.ok) {
    return { success: true };
  }

  return { success: false };
}
