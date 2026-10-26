import { redirect } from "react-router";
import { KLAGEEINREICHUNG_PATHS } from "~/config/klageeinreichungRoutes";
import loadVerfahrenEinreichungBundle, {
  type VerfahrenEinreichungBundle,
} from "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server";
import { fetchLatestBelegForEinreichung } from "~/domains/verfahren/infrastructure/repositories/belegRepository.server";
import { AuthSession } from "~/services/auth/auth.types";
import { isClientSideApiError } from "~/utils/apiError";

/**
 * Reads the draft's Verfahren id from the `?verfahren=` search param. Without
 * it, there is no draft to continue, so the user starts over by picking a
 * court.
 */
export function requireVerfahrenSearchParam(
  searchParams: URLSearchParams,
): string {
  const verfahrenId = searchParams.get("verfahren");

  if (!verfahrenId) {
    throw redirect(KLAGEEINREICHUNG_PATHS.gerichtAuswahl);
  }

  return verfahrenId;
}

/**
 * Loads a Klageeinreichung that is still a draft. Throws a redirect
 * - to the court selection, if the Verfahren is unknown or inaccessible
 * - to the Verfahren, once the Einreichung has been submitted (a Beleg
 *   exists), as the API no longer accepts changes then
 */
export default async function loadKlageeinreichungDraft(
  authSession: AuthSession,
  verfahrenId: string,
): Promise<VerfahrenEinreichungBundle> {
  const bundle = await loadVerfahrenEinreichungBundle(
    authSession,
    verfahrenId,
  ).catch((error: unknown) => {
    if (isClientSideApiError(error)) {
      throw redirect(KLAGEEINREICHUNG_PATHS.gerichtAuswahl);
    }
    throw error;
  });

  const beleg = await fetchLatestBelegForEinreichung(authSession, {
    verfahrenId: bundle.verfahren.id,
    einreichungId: bundle.einreichung.id,
  });

  if (beleg) {
    throw redirect(`/verfahren/${bundle.verfahren.id}`);
  }

  return bundle;
}
