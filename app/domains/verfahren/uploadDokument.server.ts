import z from "zod";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";
import { DokumentSchema, DokumentTypeSchema } from "./schemas/dokumentSchema";

export type DokumentType = z.infer<typeof DokumentTypeSchema>;
export type Dokument = z.infer<typeof DokumentSchema>;

const errorMessage = "Dokument konnte nicht hochgeladen werden.";

function extractSingleObject(data: unknown): unknown {
  return Array.isArray(data) ? data[0] : data;
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

  const singleObject = extractSingleObject(rawData);
  return DokumentSchema.parse(singleObject);
}
