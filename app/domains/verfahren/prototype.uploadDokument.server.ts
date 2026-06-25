import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";

export type DokumentType = "XJUSTIZ" | "ANHANG" | "SCHRIFTSTUECK";

export type Dokument = {
  id: string;
  einreichung_id: string;
  status: string;
  name: string;
  size_in_bytes: number;
  type: DokumentType;
  gesendet_am: string | null;
  eingereicht_am: string | null;
  erstellt_von: string;
  erstellt_am: string;
};

const errorMessage = "Dokument konnte nicht hochgeladen werden.";

export default async function uploadDokument(
  authData: AuthenticationResponse,
  verfahrenId: string,
  einreichungId: string,
  file: File,
  type: DokumentType,
): Promise<Dokument> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);

  return apiRequest({
    authData,
    path: `/api/v1/verfahren/${verfahrenId}/einreichungen/${einreichungId}/dokumente`,
    method: "POST",
    body: formData,
    errorMessage,
  });
}
