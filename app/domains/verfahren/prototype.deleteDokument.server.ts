import type { AuthenticationResponse } from "~/services/auth/oAuth.server";
import { apiRequest } from "./apiClient";

const errorMessage = "Dokument konnte nicht gelöscht werden.";

export default async function deleteDokument(
  authData: AuthenticationResponse,
  id: string,
  verfahrenId: string,
  einreichungId: string,
): Promise<void> {
  await apiRequest({
    authData,
    path: `/api/v1/verfahren/${verfahrenId}/einreichungen/${einreichungId}/dokumente/${id}`,
    method: "DELETE",
    errorMessage,
  });
}
