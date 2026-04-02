import { serverConfig } from "~/config/config.server";
import { getBearerToken } from "~/services/auth/getBearerToken.server";
import type { AuthenticationResponse } from "~/services/auth/oAuth.server";

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

export default async function uploadDokument(
  authData: AuthenticationResponse,
  verfahrenId: string,
  einreichungId: string,
  file: File,
  type: DokumentType,
): Promise<Dokument> {
  const bearerToken = await getBearerToken(authData);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);

  const response = await fetch(
    `${serverConfig().KOMPLA_API_URL}/api/v1/verfahren/${verfahrenId}/einreichungen/${einreichungId}/dokumente`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      body: formData,
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Dokument konnte nicht hochgeladen werden (${response.status} ${response.statusText}). Body: ${errorBody}`,
    );
  }

  // API observation: POST /dokumente returns an array [{...}] instead of a single object
  const data = await response.json();
  return (Array.isArray(data) ? data[0] : data) as Dokument;
}
