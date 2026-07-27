import { AuthenticationResponse } from "~/services/auth/auth.types";
import deleteDokument from "./deleteDokument.server";
import fetchDokument from "./fetchDokument";
import fetchDokumente from "./fetchDokumente";
import type { Dokument } from "./loadVerfahrenEinreichungBundle.server";

type DeleteDokumentFromEinreichungOptions = {
  authData: AuthenticationResponse;
  verfahrenId: string;
  einreichungId: FormDataEntryValue | null;
  dokumentId: FormDataEntryValue | null;
};

export default async function deleteDokumentFromEinreichung({
  authData,
  verfahrenId,
  einreichungId,
  dokumentId,
}: DeleteDokumentFromEinreichungOptions): Promise<void> {
  if (typeof einreichungId !== "string" || typeof dokumentId !== "string") {
    return;
  }

  const dokumente = (await fetchDokumente(authData, {
    verfahrenId,
    einreichungId,
  })) as Dokument[];

  // The first dokument is the initial filing and must not be deleted.
  if (dokumente[0]?.id === dokumentId) {
    return;
  }

  const { eTag } = await fetchDokument(authData, {
    verfahrenId,
    einreichungId,
    id: dokumentId,
  });

  await deleteDokument(authData, {
    verfahrenId,
    einreichungId,
    id: dokumentId,
    eTag: eTag ?? "",
  });
}
