import z from "zod";
import {
  Dokument,
  DokumentErstellenResponse,
  DokumentType,
} from "~/domains/verfahren/entities/dokument/dokument.entity";
import { Validierungsstatus } from "~/domains/verfahren/entities/validierungsstatus/validierungsstatus.entity";
import { apiRequest } from "~/domains/verfahren/infrastructure/api/apiClient";
import {
  DokumentErstellenResponseSchema,
  DokumenteSchema,
  DokumentSchema,
} from "~/domains/verfahren/infrastructure/schemas/dokument.schema";
import { ValidierungsstatusSchema } from "~/domains/verfahren/infrastructure/schemas/validierungsstatus.schema";
import canDeleteDokument from "~/domains/verfahren/services/canDeleteDokument";
import { AuthenticationResponse } from "~/services/auth/auth.types";

type FetchDokumentOptions = {
  verfahrenId: string;
  einreichungId: string;
  id: string;
};

export type FetchDokumentResult = {
  dokument: Dokument;
  eTag: string | null;
};

export async function fetchDokument(
  authData: AuthenticationResponse,
  options: FetchDokumentOptions,
): Promise<FetchDokumentResult> {
  const { data, eTag } = await apiRequest<Dokument>({
    authData,
    path: `/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.einreichungId}/dokumente/${options.id}`,
    schema: DokumentSchema,
    includeResponseETag: true,
    errorMessage: `Dokument with id ${options.id} could not be fetched.`,
  });

  return {
    dokument: data,
    eTag,
  };
}

type FetchDokumenteOptions = {
  verfahrenId: string;
  einreichungId: string;
};

export async function fetchDokumente(
  authData: AuthenticationResponse,
  options: FetchDokumenteOptions,
): Promise<z.infer<typeof DokumenteSchema>> {
  return apiRequest({
    authData,
    path: `/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.einreichungId}/dokumente`,
    schema: DokumenteSchema,
    errorMessage: `Dokumente for Einreichung with id ${options.einreichungId} could not be fetched.`,
  });
}

type FetchDokumentValidierungsstatusOptions = {
  verfahrenId: string;
  einreichungId: string;
  id: string;
};

export async function fetchDokumentValidierungsstatus(
  authData: AuthenticationResponse,
  options: FetchDokumentValidierungsstatusOptions,
): Promise<Validierungsstatus> {
  return apiRequest({
    authData,
    path: `/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.einreichungId}/dokumente/${options.id}/validierungsstatus`,
    schema: ValidierungsstatusSchema,
    errorMessage: `Validierungsstatus for Dokument with id ${options.id} could not be fetched.`,
  });
}

type DeleteDokumentOptions = {
  verfahrenId: string;
  einreichungId: string;
  id: string;
  eTag: string;
};

export type DeleteDokumentResult = { success: true } | { success: false };

export async function deleteDokument(
  authData: AuthenticationResponse,
  options: DeleteDokumentOptions,
): Promise<DeleteDokumentResult> {
  const deleteResult = await apiRequest({
    authData,
    path: `/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.einreichungId}/dokumente/${options.id}`,
    method: "DELETE",
    eTag: options.eTag,
    throwOnError: false,
    errorMessage: `Dokument with id ${options.id} could not be deleted.`,
  });

  if (deleteResult.ok) {
    return { success: true };
  }

  return { success: false };
}

type DeleteDokumentFromEinreichungOptions = {
  authData: AuthenticationResponse;
  verfahrenId: string;
  einreichungId: FormDataEntryValue | null;
  dokumentId: FormDataEntryValue | null;
};

export type DeleteDokumentFromEinreichungResult =
  | { status: "invalid-form-data" }
  | { status: "protected-dokument" }
  | { status: "deleted" }
  | { status: "delete-failed" };

export async function deleteDokumentFromEinreichung({
  authData,
  verfahrenId,
  einreichungId,
  dokumentId,
}: DeleteDokumentFromEinreichungOptions): Promise<DeleteDokumentFromEinreichungResult> {
  if (typeof einreichungId !== "string" || typeof dokumentId !== "string") {
    return { status: "invalid-form-data" };
  }

  const { elemente: dokumente } = await fetchDokumente(authData, {
    verfahrenId,
    einreichungId,
  });

  const targetDokument = dokumente.find(
    (dokument) => dokument.id === dokumentId,
  );

  if (targetDokument && !canDeleteDokument(targetDokument)) {
    return { status: "protected-dokument" };
  }

  const { eTag } = await fetchDokument(authData, {
    verfahrenId,
    einreichungId,
    id: dokumentId,
  });

  const deleteResult = await deleteDokument(authData, {
    verfahrenId,
    einreichungId,
    id: dokumentId,
    eTag: eTag ?? "",
  });

  if (!deleteResult.success) {
    return { status: "delete-failed" };
  }

  return { status: "deleted" };
}

function extractSingleObject(data: unknown): unknown {
  return Array.isArray(data) ? data[0] : data;
}

export async function uploadDokument(
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
    errorMessage: `Dokument upload for Einreichung with id ${einreichungId} of Verfahren with ${verfahrenId} could not be uploaded.`,
  });

  const singleObject = extractSingleObject(rawData);
  console.log("Successfully uploaded dokument", singleObject);
  return DokumentErstellenResponseSchema.parse(singleObject);
}
