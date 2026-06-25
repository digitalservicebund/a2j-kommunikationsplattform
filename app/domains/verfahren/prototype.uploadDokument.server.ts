import type { AuthenticationResponse } from "~/services/auth/oAuth.server";
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

// This can be removed and adjusted as soon as API v3.0.4 has been released,
// align with SINC and API REST guidelines on this
function extractSingleObject<T>(data: unknown): T {
  return (Array.isArray(data) ? data[0] : data) as T;
}

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

  const rawData = await apiRequest({
    authData,
    path: `/api/v1/verfahren/${verfahrenId}/einreichungen/${einreichungId}/dokumente`,
    method: "POST",
    body: formData,
    errorMessage,
  });

  // API observation: POST /dokumente returns an array [{...}] instead of a single object
  return extractSingleObject<Dokument>(rawData);
}
