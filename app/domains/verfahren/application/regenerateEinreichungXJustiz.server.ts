import {
  deleteDokument,
  fetchDokument,
  fetchDokumente,
  uploadDokument,
} from "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server";
import { fetchEinreichungXJustiz } from "~/domains/verfahren/infrastructure/repositories/einreichungRepository.server";
import { AuthenticationResponse } from "~/services/auth/auth.types";

type RegenerateEinreichungXJustizOptions = {
  verfahrenId: string;
  einreichungId: string;
};

const XJUSTIZ_DATEINAME = "xjustiz.xml";

// Removes any previously attached XJustiz-Dokument(e) and uploads a freshly
// generated one, so the Einreichung always carries an XJustiz snapshot of
// the Verfahren's current data (rather than accumulating stale ones from
// earlier edits, or being validated against outdated data).
export default async function regenerateEinreichungXJustiz(
  authData: AuthenticationResponse,
  options: RegenerateEinreichungXJustizOptions,
): Promise<void> {
  const { verfahrenId, einreichungId } = options;

  const { elemente: dokumente } = await fetchDokumente(authData, {
    verfahrenId,
    einreichungId,
  });

  const existingXJustizDokumente = dokumente.filter(
    (dokument) => dokument.typ === "XJUSTIZ",
  );

  await Promise.all(
    existingXJustizDokumente.map(async (dokument) => {
      const { eTag } = await fetchDokument(authData, {
        verfahrenId,
        einreichungId,
        id: dokument.id,
      });

      await deleteDokument(authData, {
        verfahrenId,
        einreichungId,
        id: dokument.id,
        eTag: eTag ?? "",
      });
    }),
  );

  const xjustizXml = await fetchEinreichungXJustiz(authData, {
    verfahrenId,
    id: einreichungId,
  });

  const xjustizFile = new File([xjustizXml], XJUSTIZ_DATEINAME, {
    type: "application/xml",
  });

  await uploadDokument(
    authData,
    verfahrenId,
    einreichungId,
    xjustizFile,
    "XJUSTIZ",
  );
}
