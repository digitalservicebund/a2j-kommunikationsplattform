import { AuthenticationResponse } from "~/services/auth/auth.types";
import deleteDokument from "./deleteDokument.server";
import fetchDokument from "./fetchDokument";
import fetchDokumente from "./fetchDokumente";

type DeleteDokumentFromEinreichungOptions = {
  authData: AuthenticationResponse;
  verfahrenId: string;
  einreichungId: FormDataEntryValue | null;
  dokumentId: FormDataEntryValue | null;
};

export type DeleteDokumentFromEinreichungResult =
  | { status: "invalid-form-data" }
  // Klageschrift
  | { status: "protected-initial-dokument" }
  | { status: "deleted" }
  | { status: "delete-failed" };

export default async function deleteDokumentFromEinreichung({
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

  // The first dokument is the initial filing and must not be deleted.
  if (dokumente[0]?.id === dokumentId) {
    return { status: "protected-initial-dokument" };
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
