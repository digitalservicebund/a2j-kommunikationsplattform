import { serverConfig } from "~/config/config.server";
import { getBearerToken } from "~/services/auth/getBearerToken.server";
import type { AuthenticationResponse } from "~/services/auth/oAuth.server";

// IMPORTANT: Do NOT set Content-Type header — fetch must set it automatically
// with the multipart boundary, otherwise the API rejects the request.
export default async function uploadDokument(
  authData: AuthenticationResponse,
  verfahrenId: string,
  einreichungId: string,
  file: File,
  type: string,
) {
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
        // Content-Type intentionally omitted — let fetch set multipart boundary
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

  return response.json();
}
