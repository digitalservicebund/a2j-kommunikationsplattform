import type { Dokument } from "~/domains/verfahren/entities/dokument/dokument.entity";
import type { Validierungsstatus } from "~/domains/verfahren/entities/validierungsstatus/validierungsstatus.entity";
import { fetchDokumentValidierungsstatus } from "~/domains/verfahren/infrastructure/repositories/dokumentRepository.server";
import { AuthSession } from "~/services/auth/auth.types";

export type DokumentWithValidierungsstatus = Dokument & {
  validierungsstatus: Validierungsstatus;
};

/**
 * Adds each Dokument's Validierungsstatus (e.g. the virus check), which the
 * Dokumente list of the API doesn't include.
 */
export default function loadDokumenteWithValidierungsstatus(
  authSession: AuthSession,
  {
    verfahrenId,
    einreichungId,
    dokumente,
  }: { verfahrenId: string; einreichungId: string; dokumente: Dokument[] },
): Promise<DokumentWithValidierungsstatus[]> {
  return Promise.all(
    dokumente.map(async (dokument) => ({
      ...dokument,
      validierungsstatus: await fetchDokumentValidierungsstatus(authSession, {
        verfahrenId,
        einreichungId,
        id: dokument.id,
      }),
    })),
  );
}
