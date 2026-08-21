import z from "zod";
import { AuthenticationResponse } from "~/services/auth/auth.types";
import { apiRequest } from "./apiClient";
import {
  DokumentErstellenResponseSchema,
  DokumentTypeSchema,
} from "./schemas/dokumentSchema";

export type DokumentType = z.infer<typeof DokumentTypeSchema>;
export type DokumentErstellenResponse = z.infer<
  typeof DokumentErstellenResponseSchema
>;

const buildErrorMessage = (
  verfahrenId: string,
  einreichungId: string,
): string =>
  `Dokument upload for Einreichung with id ${einreichungId} of Verfahren with ${verfahrenId} could not be uploaded.`;

function extractSingleObject(data: unknown): unknown {
  return Array.isArray(data) ? data[0] : data;
}

export default async function uploadDokument(
  authData: AuthenticationResponse,
  verfahrenId: string,
  einreichungId: string,
  file: File,
  type: DokumentType,
): Promise<DokumentErstellenResponse> {
  const formData = new FormData();
  formData.append("datei", file);

  const rawData = await apiRequest({
    authData,
    path: `/api/v1/verfahren/${verfahrenId}/einreichungen/${einreichungId}/dokumente`,
    method: "POST",
    body: formData,
    headers: {
      "Dokument-Typ": type,
      "Dokument-Sichtbarkeit-Alle": "true",
      "Dokument-Anzeigename": file.name,
    },
    errorMessage: buildErrorMessage(verfahrenId, einreichungId),
  });

  const singleObject = extractSingleObject(rawData);
  console.log("Successfully uploaded dokument", singleObject);
  return DokumentErstellenResponseSchema.parse(singleObject);
}
