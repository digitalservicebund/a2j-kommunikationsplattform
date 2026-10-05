import z from "zod";
import {
  Dokument,
  DokumentErstellenResponse,
  DokumentType,
} from "~/domains/verfahren/entities/dokument/dokument.entity";
import { Validierungsstatus } from "~/domains/verfahren/entities/validierungsstatus/validierungsstatus.entity";
import { apiRequest } from "~/domains/verfahren/infrastructure/api/apiClient";
import { fetchEinreichungById } from "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server";
import {
  DokumentErstellenResponseSchema,
  DokumenteSchema,
  DokumentSchema,
} from "~/domains/verfahren/infrastructure/schemas/dokument.schema";
import { ValidierungsstatusSchema } from "~/domains/verfahren/infrastructure/schemas/validierungsstatus.schema";
import canDeleteDokument from "~/domains/verfahren/services/canDeleteDokument";
import { AuthSession } from "~/services/auth/auth.types";
import { logger } from "~/utils/logger.server";

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
  authSession: AuthSession,
  options: FetchDokumentOptions,
): Promise<FetchDokumentResult> {
  const { data, eTag } = await apiRequest<Dokument>({
    authSession,
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
  authSession: AuthSession,
  options: FetchDokumenteOptions,
): Promise<z.infer<typeof DokumenteSchema>> {
  return apiRequest({
    authSession,
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
  authSession: AuthSession,
  options: FetchDokumentValidierungsstatusOptions,
): Promise<Validierungsstatus> {
  return apiRequest({
    authSession,
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
  authSession: AuthSession,
  options: DeleteDokumentOptions,
): Promise<DeleteDokumentResult> {
  const deleteResult = await apiRequest({
    authSession,
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
  authSession: AuthSession;
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
  authSession,
  verfahrenId,
  einreichungId,
  dokumentId,
}: DeleteDokumentFromEinreichungOptions): Promise<DeleteDokumentFromEinreichungResult> {
  if (typeof einreichungId !== "string" || typeof dokumentId !== "string") {
    return { status: "invalid-form-data" };
  }

  // Which Dokumente are protected depends on the kind of Einreichung, so it's
  // looked up here rather than trusted from the form.
  const [{ elemente: dokumente }, { einreichung }] = await Promise.all([
    fetchDokumente(authSession, { verfahrenId, einreichungId }),
    fetchEinreichungById(authSession, { verfahrenId, id: einreichungId }),
  ]);

  const targetDokument = dokumente.find(
    (dokument) => dokument.id === dokumentId,
  );

  if (targetDokument && !canDeleteDokument(targetDokument, einreichung)) {
    return { status: "protected-dokument" };
  }

  const { eTag } = await fetchDokument(authSession, {
    verfahrenId,
    einreichungId,
    id: dokumentId,
  });

  const deleteResult = await deleteDokument(authSession, {
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

type CreateDokumentOptions = {
  verfahrenId: string;
  einreichungId: string;
  typ: DokumentType;
  anzeigename: string;
  sichtbarkeitAlle: boolean;
};

export type CreateDokumentResult = {
  dokument: DokumentErstellenResponse;
  eTag: string | null;
};

/**
 * Creates the Dokument's metadata (status `ANGELEGT`). The binary content is
 * uploaded separately afterwards via `uploadDokumentDatei`.
 */
export async function createDokument(
  authSession: AuthSession,
  options: CreateDokumentOptions,
): Promise<CreateDokumentResult> {
  const { data, eTag } = await apiRequest<DokumentErstellenResponse>({
    authSession,
    path: `/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.einreichungId}/dokumente`,
    method: "POST",
    body: {
      typ: options.typ,
      anzeigename: options.anzeigename,
      sichtbarkeit_alle: options.sichtbarkeitAlle,
    },
    schema: DokumentErstellenResponseSchema,
    includeResponseETag: true,
    errorMessage: `Dokument for Einreichung with id ${options.einreichungId} of Verfahren with id ${options.verfahrenId} could not be created.`,
  });

  return { dokument: data, eTag };
}

type UploadDokumentDateiOptions = {
  verfahrenId: string;
  einreichungId: string;
  id: string;
  file: File;
  eTag: string;
};

// Uploads the binary content for a Dokument that was already created via
// createDokument. Requires the eTag from that creation (or a subsequent
// fetch) for optimistic concurrency control.
export async function uploadDokumentDatei(
  authSession: AuthSession,
  options: UploadDokumentDateiOptions,
): Promise<Dokument> {
  const formData = new FormData();
  formData.append("datei", options.file);

  return apiRequest({
    authSession,
    path: `/api/v1/verfahren/${options.verfahrenId}/einreichungen/${options.einreichungId}/dokumente/${options.id}/datei`,
    method: "PUT",
    body: formData,
    eTag: options.eTag,
    schema: DokumentSchema,
    errorMessage: `Datei for Dokument with id ${options.id} could not be uploaded.`,
  });
}

// Convenience wrapper composing createDokument + uploadDokumentDatei, since
// today every caller wants "create a Dokument from this file" as one step.
export async function uploadDokument(
  authSession: AuthSession,
  verfahrenId: string,
  einreichungId: string,
  file: File,
  type: DokumentType,
  sichtbarkeitAlle = true,
): Promise<Dokument> {
  const { dokument, eTag } = await createDokument(authSession, {
    verfahrenId,
    einreichungId,
    typ: type,
    anzeigename: file.name,
    sichtbarkeitAlle,
  });

  try {
    return await uploadDokumentDatei(authSession, {
      verfahrenId,
      einreichungId,
      id: dokument.id,
      file,
      eTag: eTag ?? "",
    });
  } catch (error) {
    // Best-effort cleanup: don't leave an orphaned, file-less Dokument
    // (status ANGELEGT) behind if the actual file upload failed. A cleanup
    // failure is only logged — the original upload error is what the caller
    // needs to see.
    const cleanupSucceeded = await deleteDokument(authSession, {
      verfahrenId,
      einreichungId,
      id: dokument.id,
      eTag: eTag ?? "",
    }).then(
      (result) => result.success,
      () => false,
    );

    if (!cleanupSucceeded) {
      logger.error(
        { verfahrenId, einreichungId, dokumentId: dokument.id },
        "Failed to delete orphaned Dokument after Datei upload failed",
      );
    }

    throw error;
  }
}
