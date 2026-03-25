import { serverConfig } from "~/config/config.server";
import { getBearerToken } from "~/services/auth/getBearerToken.server";
import type { AuthenticationResponse } from "~/services/auth/oAuth.server";

export type DokumentType = "XJUSTIZ" | "ANHANG" | "SCHRIFTSTUECK";

export type Dokument = {
  id: string;
  einreichung_id: string;
  status: string;
  name: string;
  type: DokumentType;
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

  return response.json() as Promise<Dokument>;
}
