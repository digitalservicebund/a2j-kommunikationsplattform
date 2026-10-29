import { redirect } from "react-router";
import z from "zod";
import { UploadDokumentTypeSchema } from "~/domains/verfahren/entities/dokument/dokument.entity";
import {
  deleteDokumentFromEinreichung,
  fetchDokument,
  updateDokumentSichtbarkeit,
  uploadDokument,
} from "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server";
import type { CanDeleteDokumentOptions } from "~/domains/verfahren/services/canDeleteDokument";
import { AuthSession } from "~/services/auth/auth.types";
import de from "~/services/translations/de";
import { safeParseActionFormData } from "~/utils/actionInput";
import {
  actionErrorResponse,
  actionResultFromApiError,
  actionSuccess,
} from "~/utils/actionResult";
import { ApiError } from "~/utils/apiError";

/**
 * Form actions for the Dokumente of a draft Einreichung, shared by the
 * Klageeinreichung's Dokumente step and the Verfahren page (draft
 * Klageeinreichung, Weitere Einreichung). Routes register them under the
 * formTypes "upload", "delete" and "sichtbarkeit".
 */
export type EinreichungDokumentActionContext = {
  authSession: AuthSession;
  verfahrenId: string;
  // Where the page continues after an upload or delete
  redirectTo: string;
} & CanDeleteDokumentOptions;

export const DokumentUploadInputSchema = z.object({
  einreichungId: z.string().optional(),
  typ: UploadDokumentTypeSchema,
  file: z.file().min(1),
});

export function buildUploadResultData(formData: FormData) {
  return { formType: "upload", typ: formData.get("typ") } as const;
}

// The API allows only one Schriftstück per Einreichung
function isDokumentTypAlreadyExistsError(error: unknown): boolean {
  return (
    error instanceof ApiError &&
    error.status === 409 &&
    error.problemDetails?.type === "/problems/dokument-typ-already-exists"
  );
}

// Uploads a Dokument to an existing Einreichung
export async function handleDokumentUpload(
  formData: FormData,
  { authSession, verfahrenId, redirectTo }: EinreichungDokumentActionContext,
) {
  const actionResultData = buildUploadResultData(formData);

  const input = safeParseActionFormData(formData, DokumentUploadInputSchema, {
    errorResultData: actionResultData,
  });

  if (!input.success) {
    return input.error;
  }

  const { einreichungId, typ, file } = input.data;

  if (!einreichungId) {
    return actionErrorResponse(de.shared.form.errors.invalidSubmission, {
      data: actionResultData,
      status: 400,
    });
  }

  try {
    await uploadDokument(authSession, verfahrenId, einreichungId, file, typ);
  } catch (error) {
    return actionResultFromApiError(error, {
      // The page only offers one Schriftstück, but e.g. a second tab could
      // still submit another one, which the API refuses
      message: isDokumentTypAlreadyExistsError(error)
        ? de.shared.form.errors.schriftstueckExists
        : de.shared.form.errors.uploadFailed,
      data: actionResultData,
    });
  }

  return redirect(redirectTo);
}

const DokumentDeletionInputSchema = z.object({
  einreichungId: z.string().min(1),
  dokumentId: z.string().min(1),
});

// Deletes a Dokument, unless it's protected (see canDeleteDokument). That's
// checked here rather than trusted from the page.
export async function handleDokumentDelete(
  formData: FormData,
  {
    authSession,
    verfahrenId,
    redirectTo,
    allowSchriftstueckDeletion,
  }: EinreichungDokumentActionContext,
) {
  const actionResultData = {
    formType: "delete",
    dokumentId: formData.get("dokumentId"),
  } as const;

  const input = safeParseActionFormData(formData, DokumentDeletionInputSchema, {
    errorResultData: actionResultData,
  });

  if (!input.success) {
    return input.error;
  }

  const { einreichungId, dokumentId } = input.data;

  try {
    const deleteResult = await deleteDokumentFromEinreichung({
      authSession,
      verfahrenId,
      einreichungId,
      dokumentId,
      allowSchriftstueckDeletion,
    });

    if (deleteResult.status === "protected-dokument") {
      return actionErrorResponse(de.shared.form.errors.deleteFailed, {
        data: actionResultData,
        status: 403,
      });
    }

    if (deleteResult.status !== "deleted") {
      return actionErrorResponse(de.shared.form.errors.deleteFailed, {
        data: actionResultData,
        status: 500,
      });
    }
  } catch (error) {
    return actionResultFromApiError(error, {
      message: de.shared.form.errors.deleteFailed,
      data: actionResultData,
    });
  }

  return redirect(redirectTo);
}

const DokumentSichtbarkeitInputSchema = z.object({
  einreichungId: z.string().min(1),
  dokumentId: z.string().min(1),
  sichtbarkeitAlle: z.enum(["true", "false"]).transform((v) => v === "true"),
});

// Changes who can see a Dokument. Submitted via a fetcher, so the page stays
// in place and its loader is revalidated afterwards.
export async function handleDokumentSichtbarkeit(
  formData: FormData,
  { authSession, verfahrenId }: EinreichungDokumentActionContext,
) {
  const actionResultData = {
    formType: "sichtbarkeit",
    dokumentId: formData.get("dokumentId"),
  } as const;

  const input = safeParseActionFormData(
    formData,
    DokumentSichtbarkeitInputSchema,
    { errorResultData: actionResultData },
  );

  if (!input.success) {
    return input.error;
  }

  const { einreichungId, dokumentId, sichtbarkeitAlle } = input.data;

  try {
    // The API requires the current eTag for the update
    const { eTag } = await fetchDokument(authSession, {
      verfahrenId,
      einreichungId,
      id: dokumentId,
    });

    await updateDokumentSichtbarkeit(authSession, {
      verfahrenId,
      einreichungId,
      id: dokumentId,
      sichtbarkeitAlle,
      eTag: eTag ?? "",
    });
  } catch (error) {
    return actionResultFromApiError(error, {
      message: de.shared.form.sichtbarkeit.updateFailed,
      data: actionResultData,
    });
  }

  return actionSuccess(actionResultData);
}
