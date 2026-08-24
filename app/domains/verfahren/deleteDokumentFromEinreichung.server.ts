import { AuthenticationResponse } from "~/services/auth/auth.types";
import canDeleteDokument from "./canDeleteDokument";
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
  | { status: "protected-dokument" }
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
