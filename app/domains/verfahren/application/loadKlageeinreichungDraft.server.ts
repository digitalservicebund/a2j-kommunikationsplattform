import { redirect } from "react-router";
import z from "zod";
import { KLAGEEINREICHUNG_PATHS } from "~/config/klageeinreichungRoutes";
import loadVerfahrenEinreichungBundle, {
  type VerfahrenEinreichungBundle,
} from "~/domains/verfahren/application/loadVerfahrenEinreichungBundle.server";
import { fetchLatestBelegForEinreichung } from "~/domains/verfahren/infrastructure/repositories/belegRepository.server";
import { AuthSession } from "~/services/auth/auth.types";
import { isClientSideApiError } from "~/utils/apiError";

// The id ends up in API paths, so anything but an id (e.g. containing "/" or
// "..") must be rejected. z.guid() rather than z.uuid(), as the latter also
// requires a valid UUID version, which the API's ids don't guarantee.
const VerfahrenIdSchema = z.guid();

/**
 * Reads the draft's Verfahren id from the optional `?verfahren=` search
 * param. An invalid id can't identify a draft, so the user starts over by
 * picking a court.
 */
export function readVerfahrenSearchParam(
  searchParams: URLSearchParams,
): string | undefined {
  const verfahrenId = searchParams.get("verfahren");

  if (verfahrenId === null) {
    return undefined;
  }

  if (!VerfahrenIdSchema.safeParse(verfahrenId).success) {
    throw redirect(KLAGEEINREICHUNG_PATHS.gerichtAuswahl);
  }

  return verfahrenId;
}

/**
 * Like `readVerfahrenSearchParam()`, but for steps that require a draft:
 * without it, the user starts over by picking a court.
 */
export function requireVerfahrenSearchParam(
  searchParams: URLSearchParams,
): string {
  const verfahrenId = readVerfahrenSearchParam(searchParams);

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
